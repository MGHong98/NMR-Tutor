/* app.js — 뷰 라우팅, 단원 렌더링, 퀴즈 엔진, 계산기, 학습 현황, 참고문헌
 * View routing, lessons, quiz engine, calculator, progress, bibliography.
 *
 * 설계 원칙 / design notes
 *  - 외부 의존성 없음. ES5 문법과 표준 DOM API만 사용합니다.
 *  - 이벤트는 document 한 곳에서 위임 처리합니다. 화면을 다시 그려도
 *    리스너를 새로 붙이지 않으므로 렌더 비용이 노드 수에 비례하지 않습니다.
 *  - 최신 브라우저 전용 API(Element.closest, 부드러운 스크롤, classList의
 *    두 번째 인자)는 모두 폴백이 있는 헬퍼로 감쌌습니다.
 */
(function (global) {
  'use strict';

  var t = I18N.t, L = I18N.L;
  var STORE_KEY = 'nmr-tutor-v1';
  var doc = global.document;

  /* ============================================================ 호환 헬퍼 */
  function $(sel, root) { return (root || doc).querySelector(sel); }

  /** Element.closest / matches 없이 조상 중 해당 속성을 가진 요소를 찾는다.
   *  Walks up for an element carrying the attribute, without closest() or
   *  matches() — both of which are missing in older engines. */
  function upAttr(el, name) {
    while (el && el.nodeType === 1) {
      if (el.getAttribute && el.getAttribute(name) != null) { return el; }
      el = el.parentNode;
    }
    return null;
  }
  function attr(el, name) { return el ? el.getAttribute(name) : null; }
  /** classList.toggle(cls, force)의 두 번째 인자를 쓰지 않는 대체 */
  function setClass(el, cls, on) {
    if (!el) { return; }
    if (on) { el.classList.add(cls); } else { el.classList.remove(cls); }
  }
  /** behavior 옵션 미지원 브라우저에서도 동작하는 스크롤 */
  function scrollTop() {
    try { global.scrollTo({ top: 0, behavior: 'smooth' }); }
    catch (e) { global.scrollTo(0, 0); }
  }
  function scrollToEl(el) {
    if (!el) { return; }
    try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    catch (e) { try { el.scrollIntoView(); } catch (e2) { scrollTop(); } }
  }

  var AMP = /&/g, LT = /</g, GT = />/g, NUMLEAD = /^[+−-]?[\d.]/, NONNUM = /[^0-9.\-+]/g;
  function esc(s) { return String(s).replace(AMP, '&amp;').replace(LT, '&lt;').replace(GT, '&gt;'); }
  function letter(i) { return String.fromCharCode(65 + i); }

  /* ============================================================ 색인 (1회) */
  var LESSON_BY_ID = {}, LESSON_INDEX = {}, SET_BY_ID = {}, Q_BY_SET = {};
  (function buildIndex() {
    var i;
    for (i = 0; i < LESSONS.length; i++) {
      LESSON_BY_ID[LESSONS[i].id] = LESSONS[i];
      LESSON_INDEX[LESSONS[i].id] = i;
    }
    for (i = 0; i < SETS.length; i++) { SET_BY_ID[SETS[i].id] = SETS[i]; Q_BY_SET[SETS[i].id] = []; }
    for (i = 0; i < QUESTIONS.length; i++) {
      if (Q_BY_SET[QUESTIONS[i].set]) { Q_BY_SET[QUESTIONS[i].set].push(QUESTIONS[i]); }
    }
  })();

  /* ============================================================ 상태 */
  var store = { lang: 'ko', theme: 'light', progress: {}, lesson: 'basics' };
  try {
    var saved = JSON.parse(global.localStorage.getItem(STORE_KEY) || '{}');
    if (saved && typeof saved === 'object') {
      var k;
      for (k in store) { if (store.hasOwnProperty(k) && saved[k] != null) { store[k] = saved[k]; } }
    }
  } catch (e) { /* localStorage 차단 환경에서는 기본값으로 진행 */ }

  function save() {
    try { global.localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* noop */ }
  }

  var view = 'learn';
  var quiz = null;                /* { setId, items, i, picked, checked, correct } */
  var lessonCache = {};           /* 'lang|id' -> HTML */

  /* ============================================================ 출처 표기 */
  /** src: ['pretsch'] 또는 [['pavia','Table 3.4'], 'sdbs'] -> 한 줄 출처 문자열 */
  function srcText(src) {
    if (!src) { return ''; }
    var parts = [], i, e, id, at;
    for (i = 0; i < src.length; i++) {
      e = src[i];
      id = (typeof e === 'string') ? e : e[0];
      at = (typeof e === 'string') ? null : e[1];
      if (!SOURCES[id]) { continue; }
      parts.push(L(SOURCES[id].short) + (at ? ' — ' + esc(at) : ''));
    }
    return parts.length ? t('src_label') + ': ' + parts.join(' &middot; ') : '';
  }
  function srcSpan(src) {
    var s = srcText(src);
    return s ? '<span class="src">' + s + '</span>' : '';
  }

  /* ============================================================ 단원 렌더링 */
  function cell(c) { return typeof c === 'string' ? c : L(c); }

  /** 구조식 목록을 하나의 그림으로 묶는다.
   *  각 항목은 { kind:'benzene'|'chain', ... } 이며 note 는 {ko,en} 도 허용한다. */
  function molFigure(mols, caption, source) {
    var list = [], i, m, spec, k;
    for (i = 0; i < mols.length; i++) {
      m = mols[i]; spec = {};
      for (k in m) { if (m.hasOwnProperty(k) && k !== 'kind') { spec[k] = m[k]; } }
      if (spec.note && typeof spec.note !== 'string') { spec.note = L(spec.note); }
      list.push(m.kind === 'chain' ? Structure.chain(spec) : Structure.benzene(spec));
    }
    return Structure.figure(list, caption, source);
  }

  function renderBlock(b) {
    var h, i;
    switch (b.type) {
      case 'h':       return '<h3>' + L(b) + '</h3>';
      case 'p':       return '<p>' + L(b) + '</p>';
      case 'formula': return '<div class="formula">' + L(b) + '</div>';
      case 'ul':
      case 'ol':
        h = ['<' + b.type + '>'];
        for (i = 0; i < b.items.length; i++) { h.push('<li>' + L(b.items[i]) + '</li>'); }
        h.push('</' + b.type + '>');
        return h.join('');
      case 'note':
        return '<div class="note note-' + b.kind + '"><h4>' + L(b.title) + '</h4><p>' + L(b.body) + '</p></div>';
      case 'table':
        h = ['<div class="tbl-wrap"><table><thead><tr>'];
        for (i = 0; i < b.headers.length; i++) { h.push('<th>' + cell(b.headers[i]) + '</th>'); }
        h.push('</tr></thead><tbody>');
        for (i = 0; i < b.rows.length; i++) {
          var row = b.rows[i], ci, v, isNum, c0;
          h.push('<tr>');
          for (ci = 0; ci < row.length; ci++) {
            v = cell(row[ci]);
            isNum = ci > 0 && NUMLEAD.test(v);
            c0 = v.charAt(0);
            h.push(isNum
              ? '<td class="num' + (c0 === '+' ? ' pos' : (c0 === '−' ? ' neg' : '')) + '">' + v + '</td>'
              : '<td>' + v + '</td>');
          }
          h.push('</tr>');
        }
        h.push('</tbody>');
        if (b.caption || b.src) {
          h.push('<caption>' + (b.caption ? L(b.caption) : '') + srcSpan(b.src) + '</caption>');
        }
        h.push('</table></div>');
        return h.join('');
      case 'spec':
        return Spectrum.figure(b.spec, b.caption ? L(b.caption) : '', srcText(b.src));
      case 'mol':
        return molFigure(b.mols, b.caption ? L(b.caption) : '', srcText(b.src));
      case 'compare':
        h = ['<div class="compare">'];
        for (i = 0; i < b.cards.length; i++) {
          var c = b.cards[i];
          h.push('<div class="card"><h4>' + L(c.title) + '</h4>' +
            (c.big ? '<div class="big">' + c.big + '</div>' : '') +
            '<div>' + L(c.body) + '</div></div>');
        }
        h.push('</div>');
        if (b.src) { h.push('<p class="srcline">' + srcText(b.src) + '</p>'); }
        return h.join('');
      default:
        return '';
    }
  }

  function renderLessonNav() {
    var h = [], i, l;
    for (i = 0; i < LESSONS.length; i++) {
      l = LESSONS[i];
      h.push('<li><button type="button" data-act="lesson" data-id="' + l.id + '"' +
        (l.id === store.lesson ? ' class="is-active"' : '') + '>' +
        '<span class="num">' + (l.badge ? esc(L(l.badge)) : (i + 1)) + '</span>' +
        '<span>' + L(l.title) + '</span></button></li>');
    }
    $('#lessonNav').innerHTML = h.join('');
  }

  function lessonHTML(l) {
    var key = store.lang + '|' + l.id;
    if (lessonCache[key]) { return lessonCache[key]; }
    var h = ['<p class="lesson-kicker">' + L(l.kicker) + '</p>',
             '<h2>' + L(l.title) + '</h2>',
             '<p class="lesson-lead">' + L(l.lead) + '</p>'], i;
    for (i = 0; i < l.blocks.length; i++) { h.push(renderBlock(l.blocks[i])); }

    if (l.refs && l.refs.length) {
      h.push('<div class="note note-tip"><h4>' + t('lesson_refs') + '</h4><ul>');
      for (i = 0; i < l.refs.length; i++) {
        var r = l.refs[i], src = SOURCES[r.r];
        h.push('<li>' + (src ? L(src.short) : esc(r.r)) + ' — ' + L(r.at) + '</li>');
      }
      h.push('</ul></div>');
    }
    var idx = LESSON_INDEX[l.id];
    if (idx < LESSONS.length - 1) {
      h.push('<div class="qactions" style="margin-top:26px">' +
        '<button type="button" class="btn ghost" data-act="lesson" data-id="' + LESSONS[idx + 1].id + '">' +
        L({ ko: '다음 단원 →', en: 'Next lesson →' }) + '</button></div>');
    }
    lessonCache[key] = h.join('');
    return lessonCache[key];
  }

  function renderLesson() {
    $('#lessonBody').innerHTML = lessonHTML(LESSON_BY_ID[store.lesson] || LESSONS[0]);
  }

  /** 내비게이션은 다시 만들지 않고 활성 항목 표시만 갱신한다 */
  function markLessonNav() {
    var btns = $('#lessonNav').getElementsByTagName('button'), i;
    for (i = 0; i < btns.length; i++) {
      setClass(btns[i], 'is-active', attr(btns[i], 'data-id') === store.lesson);
    }
  }

  function gotoLesson(id) {
    if (!LESSON_BY_ID[id] || (id === store.lesson && view === 'learn')) {
      if (view !== 'learn') { switchView('learn'); }
      return;
    }
    store.lesson = id; save();
    if (view !== 'learn') { switchView('learn'); }
    markLessonNav(); renderLesson();
    scrollTop();
  }

  /* ============================================================ 연습문제 */
  function setStats(setId) {
    var items = Q_BY_SET[setId] || [], done = 0, ok = 0, i, p;
    for (i = 0; i < items.length; i++) {
      p = store.progress[items[i].id];
      if (p) { done++; if (p.correct) { ok++; } }
    }
    return { total: items.length, done: done, correct: ok };
  }

  function renderSetPicker() {
    var h = ['<div class="tool-card" style="margin-bottom:20px"><h2>' + t('practice_intro_t') +
             '</h2><p>' + t('practice_intro_d') + '</p></div>', '<div class="set-picker">'], i, s, st, pct;
    for (i = 0; i < SETS.length; i++) {
      s = SETS[i]; st = setStats(s.id);
      pct = st.total ? Math.round(st.done / st.total * 100) : 0;
      h.push('<button type="button" class="set-card" data-act="set" data-id="' + s.id + '">' +
        '<div class="st"><span>' + L(s.title) + '</span>' +
        '<span class="badge' + (s.core ? ' core' : '') + '">' + (s.core ? '★ ' : '') + st.total + '</span></div>' +
        '<div class="sd">' + L(s.desc) + '</div>' +
        '<div class="bar"><span style="width:' + pct + '%"></span></div>' +
        '<div class="sd" style="margin-top:6px;font-family:var(--mono);font-size:.75rem">' +
        st.done + ' / ' + st.total + ' · ' + t('score_label') + ' ' + st.correct + '</div></button>');
    }
    h.push('</div>');
    $('#setPicker').innerHTML = h.join('');
    $('#setPicker').classList.remove('is-hidden');
    $('#quizArea').innerHTML = '';
  }

  function startSet(setId) {
    var items = Q_BY_SET[setId];
    if (!items || !items.length) { return; }
    quiz = { setId: setId, items: items, i: 0, picked: null, checked: false, correct: 0 };
    $('#setPicker').classList.add('is-hidden');
    renderQuestion();
    scrollTop();
  }

  var TYPE_TAG = { mc: 'single', multi: 'multi', order: 'ordering', num: 'numeric' };
  var HINT_KEY = { mc: 'hint_mc', multi: 'hint_multi', order: 'hint_order', num: 'hint_num' };

  function renderQuestion() {
    var q = quiz.items[quiz.i], set = SET_BY_ID[quiz.setId], h = [], i;

    h.push('<div class="quiz-head"><h2>' + L(set.title) + '</h2><span class="quiz-meta">' +
      t('q_of') + ' ' + (quiz.i + 1) + ' / ' + quiz.items.length + ' · ' +
      t('score_label') + ' ' + quiz.correct + '</span></div>');
    h.push('<div class="qprog"><span style="width:' + (quiz.i / quiz.items.length * 100) + '%"></span></div>');
    h.push('<div class="qtags"><span class="qtag d' + q.d + '">' + t('d' + q.d) + '</span>' +
      '<span class="qtag">' + esc(q.id) + '</span><span class="qtag">' + TYPE_TAG[q.type] + '</span></div>');

    if (q.spec) { h.push(Spectrum.figure(q.spec, '', '')); }
    h.push('<p class="qprompt">' + L(q.q) + '</p>');
    h.push('<p class="qhint">' + t(HINT_KEY[q.type]) + '</p>');

    if (q.type === 'mc' || q.type === 'multi') {
      h.push('<div class="opts" id="opts">');
      for (i = 0; i < q.o.length; i++) {
        h.push('<button type="button" class="opt" data-act="opt" data-i="' + i + '">' +
          '<span class="mk">' + letter(i) + '</span><span>' + L(q.o[i]) + '</span></button>');
      }
      h.push('</div>');
    } else if (q.type === 'order') {
      h.push('<div class="order-slot" id="slot"></div><div class="order-tray" id="tray">');
      for (i = 0; i < q.o.length; i++) {
        h.push('<button type="button" class="chip" data-act="chip" data-i="' + i + '">' + L(q.o[i]) + '</button>');
      }
      h.push('</div>');
    } else {
      h.push('<div class="numrow"><input type="text" inputmode="decimal" id="numIn" autocomplete="off" ' +
        'placeholder="0.00"><span class="unit">' + (q.unit || '') + '</span></div>');
    }

    h.push('<div id="explainBox"></div><div class="qactions">' +
      '<button type="button" class="btn" id="actBtn" data-act="check" disabled>' + t('check') + '</button>' +
      '<button type="button" class="btn plain" data-act="quit">' + t('back_sets') + '</button></div>');

    $('#quizArea').innerHTML = h.join('');
    quiz.picked = (q.type === 'multi' || q.type === 'order') ? [] : null;
    quiz.checked = false;
    if (q.type === 'order') { drawOrder(q); }
    refreshAction(q);
  }

  function drawOrder(q) {
    var slot = $('#slot'), h = [], i, tray, chips, picked = quiz.picked;
    if (!picked.length) {
      slot.innerHTML = '<span class="ph">' + t('order_placeholder') + '</span>';
    } else {
      for (i = 0; i < picked.length; i++) {
        h.push('<button type="button" class="chip picked" data-act="unchip" data-n="' + i + '">' +
          (i + 1) + '. ' + L(q.o[picked[i]]) + '</button>');
      }
      slot.innerHTML = h.join('');
    }
    tray = $('#tray');
    chips = tray ? tray.getElementsByTagName('button') : [];
    for (i = 0; i < chips.length; i++) {
      chips[i].disabled = quiz.checked || picked.indexOf(+attr(chips[i], 'data-i')) >= 0;
    }
  }

  function refreshAction(q) {
    var btn = $('#actBtn'), ready;
    if (!btn) { return; }
    if (quiz.checked) { btn.disabled = false; return; }
    if (q.type === 'mc') { ready = quiz.picked !== null; }
    else if (q.type === 'multi') { ready = quiz.picked.length > 0; }
    else if (q.type === 'order') { ready = quiz.picked.length === q.o.length; }
    else { ready = $('#numIn') && $('#numIn').value.replace(/\s/g, '') !== ''; }
    btn.disabled = !ready;
  }

  function isCorrect(q) {
    var i, p, a, val;
    if (q.type === 'mc') { return quiz.picked === q.a; }
    if (q.type === 'multi') {
      p = quiz.picked.slice().sort(); a = q.a.slice().sort();
      if (p.length !== a.length) { return false; }
      for (i = 0; i < p.length; i++) { if (p[i] !== a[i]) { return false; } }
      return true;
    }
    if (q.type === 'order') {
      for (i = 0; i < q.a.length; i++) { if (quiz.picked[i] !== q.a[i]) { return false; } }
      return true;
    }
    val = parseFloat(String($('#numIn').value).replace(NONNUM, ''));
    return !isNaN(val) && Math.abs(val - q.a) <= (q.tol != null ? q.tol : 0.1);
  }

  function answerText(q) {
    var i, out;
    if (q.type === 'mc') { return letter(q.a) + '. ' + L(q.o[q.a]); }
    if (q.type === 'multi') {
      out = [];
      for (i = 0; i < q.a.length; i++) { out.push(letter(q.a[i])); }
      return out.join(', ');
    }
    if (q.type === 'order') {
      out = [];
      for (i = 0; i < q.a.length; i++) { out.push(L(q.o[q.a[i]])); }
      return out.join(' &lt; ');
    }
    return q.a + (q.unit ? ' ' + q.unit : '');
  }

  function yourAnswerText(q) {
    var i, out = [];
    if (q.type === 'num') { return esc($('#numIn').value); }
    if (q.type === 'mc') { return quiz.picked !== null ? letter(quiz.picked) : '—'; }
    for (i = 0; i < quiz.picked.length; i++) {
      out.push(q.type === 'multi' ? letter(quiz.picked[i]) : L(q.o[quiz.picked[i]]));
    }
    return q.type === 'multi' ? out.sort().join(', ') : out.join(' &lt; ');
  }

  function grade(q) {
    var ok = isCorrect(q), prev = store.progress[q.id] || { attempts: 0, correct: false };
    var yours = yourAnswerText(q);   /* 입력을 비활성화하기 전에 읽는다 */
    quiz.checked = true;
    if (ok) { quiz.correct++; }
    store.progress[q.id] = { attempts: prev.attempts + 1, correct: prev.correct || ok, set: q.set };
    save();

    var i, nodes, el, idx, isAns, wasPicked;
    if (q.type === 'mc' || q.type === 'multi') {
      nodes = $('#opts').getElementsByTagName('button');
      for (i = 0; i < nodes.length; i++) {
        el = nodes[i]; idx = +attr(el, 'data-i');
        isAns = (q.type === 'mc') ? (idx === q.a) : (q.a.indexOf(idx) >= 0);
        wasPicked = (q.type === 'mc') ? (quiz.picked === idx) : (quiz.picked.indexOf(idx) >= 0);
        el.disabled = true;
        el.classList.remove('sel');
        if (isAns) { el.classList.add('correct'); }
        else if (wasPicked) { el.classList.add('wrong'); }
      }
    } else if (q.type === 'order') {
      drawOrder(q);
      nodes = $('#slot').getElementsByTagName('button');
      for (i = 0; i < nodes.length; i++) { nodes[i].disabled = true; }
    } else {
      $('#numIn').disabled = true;
    }

    $('#explainBox').innerHTML =
      '<div class="explain ' + (ok ? 'ok' : 'no') + '"><h4>' +
      (ok ? '✓ ' + t('correct') : '✗ ' + t('incorrect')) + '</h4>' +
      (ok ? '' : '<p style="font-size:.85rem"><strong>' + t('your_answer') + ':</strong> ' + yours +
        ' &nbsp;·&nbsp; <strong>' + t('right_answer') + ':</strong> ' + answerText(q) + '</p>') +
      (q.mol ? molFigure(q.mol, q.molCap ? L(q.molCap) : '', '') : '') +
      '<p>' + L(q.e) + '</p>' +
      '<div class="ref">' + t('src_label') + ': ' + esc(q.ref) + '</div></div>';

    var b = $('#actBtn');
    b.textContent = (quiz.i === quiz.items.length - 1) ? t('finish') : t('next');
    b.disabled = false;
  }

  function advance() {
    if (quiz.i === quiz.items.length - 1) { renderResult(); return; }
    quiz.i++;
    renderQuestion();
    scrollToEl($('#quizArea'));
  }

  function renderResult() {
    var n = quiz.items.length, c = quiz.correct, pct = Math.round(c / n * 100);
    var msg = pct >= 80 ? t('result_msg_hi') : pct >= 50 ? t('result_msg_mid') : t('result_msg_lo');
    var set = SET_BY_ID[quiz.setId];
    $('#quizArea').innerHTML =
      '<div class="result"><p class="lesson-kicker">' + t('result_title') + '</p>' +
      '<div class="score">' + c + ' / ' + n + '</div>' +
      '<p style="color:var(--ink-2)">' + pct + '% · ' + msg + '</p>' +
      '<div class="qactions" style="justify-content:center;margin-top:18px">' +
      '<button type="button" class="btn" data-act="again">' + t('retry_set') + '</button>' +
      '<button type="button" class="btn ghost" data-act="lesson" data-id="' + set.lesson + '">' + t('review_lesson') + '</button>' +
      '<button type="button" class="btn plain" data-act="quit">' + t('back_sets') + '</button></div></div>';
  }

  /* ============================================================ 계산기 */
  var INC = {
    'NO2':     { label: '–NO<sub>2</sub>', cls: { ko: '강한 EWG', en: 'Strong EWG' }, v: [0.95, 0.26, 0.38] },
    'COOH':    { label: '–COOH', cls: { ko: 'EWG', en: 'EWG' }, v: [0.85, 0.18, 0.27] },
    'COOCH3':  { label: '–COOCH<sub>3</sub>', cls: { ko: 'EWG', en: 'EWG' }, v: [0.71, 0.11, 0.21] },
    'COCH3':   { label: '–COCH<sub>3</sub>', cls: { ko: 'EWG', en: 'EWG' }, v: [0.62, 0.14, 0.21] },
    'CHO':     { label: '–CHO', cls: { ko: 'EWG', en: 'EWG' }, v: [0.56, 0.22, 0.29] },
    'CN':      { label: '–CN', cls: { ko: 'EWG', en: 'EWG' }, v: [0.36, 0.18, 0.28] },
    'Br':      { label: '–Br', cls: { ko: '−I / +M 상충', en: '−I vs +M' }, v: [0.22, -0.13, -0.03] },
    'Cl':      { label: '–Cl', cls: { ko: '−I / +M 상충', en: '−I vs +M' }, v: [0.02, -0.06, -0.04] },
    'H':       { label: '–H', cls: { ko: '기준', en: 'Reference' }, v: [0, 0, 0] },
    'NHCOCH3': { label: '–NHCOCH<sub>3</sub>', cls: { ko: '약한 EDG', en: 'Weak EDG' }, v: [0.12, -0.07, -0.28] },
    'CH3':     { label: '–CH<sub>3</sub>', cls: { ko: '약한 EDG', en: 'Weak EDG' }, v: [-0.17, -0.09, -0.18] },
    'CH2CH3':  { label: '–CH<sub>2</sub>CH<sub>3</sub>', cls: { ko: '약한 EDG', en: 'Weak EDG' }, v: [-0.15, -0.06, -0.18] },
    'OCH3':    { label: '–OCH<sub>3</sub>', cls: { ko: '강한 EDG', en: 'Strong EDG' }, v: [-0.48, -0.09, -0.44] },
    'OH':      { label: '–OH', cls: { ko: '강한 EDG', en: 'Strong EDG' }, v: [-0.56, -0.12, -0.45] },
    'NMe2':    { label: '–N(CH<sub>3</sub>)<sub>2</sub>', cls: { ko: '매우 강한 EDG', en: 'Very strong EDG' }, v: [-0.66, -0.18, -0.67] },
    'NH2':     { label: '–NH<sub>2</sub>', cls: { ko: '매우 강한 EDG', en: 'Very strong EDG' }, v: [-0.75, -0.25, -0.65] }
  };
  var INC_KEYS = [];
  (function () { var k; for (k in INC) { if (INC.hasOwnProperty(k)) { INC_KEYS.push(k); } } })();

  var BENZENE = 7.26;
  var calc = { a: 'NO2', b: 'OCH3', rel: 4 };
  var REL_NAME = ['o', 'm', 'p'];

  /** 고리 위치 i와 j의 관계: 0=ortho, 1=meta, 2=para */
  function relation(i, j) {
    var d = ((i - j) % 6 + 6) % 6;
    if (d === 1 || d === 5) { return 0; }
    if (d === 2 || d === 4) { return 1; }
    return 2;
  }

  function computeRing() {
    var subs = [{ pos: 1, g: calc.a }], groups = [], p, i, j, taken, d, parts, r, v, g;
    if (calc.b !== 'none') { subs.push({ pos: calc.rel, g: calc.b }); }

    for (p = 1; p <= 6; p++) {
      taken = false;
      for (i = 0; i < subs.length; i++) { if (subs[i].pos === p) { taken = true; break; } }
      if (taken) { continue; }

      d = BENZENE; parts = [];
      for (i = 0; i < subs.length; i++) {
        r = relation(p, subs[i].pos);
        v = INC[subs[i].g].v[r];
        d += v;
        parts.push(INC[subs[i].g].label + ' ' + REL_NAME[r] + ' ' + (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(2));
      }
      g = null;
      for (j = 0; j < groups.length; j++) { if (Math.abs(groups[j].delta - d) < 0.005) { g = groups[j]; break; } }
      if (g) { g.H++; } else { groups.push({ delta: d, H: 1, parts: parts }); }
    }
    groups.sort(function (x, y) { return y.delta - x.delta; });
    return groups;
  }

  function optionsHTML(sel, withNone) {
    var h = withNone ? ['<option value="none">' + t('calc_none') + '</option>'] : [], i, k;
    for (i = 0; i < INC_KEYS.length; i++) {
      k = INC_KEYS[i];
      h.push('<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' +
        INC[k].label.replace(/<[^>]+>/g, '') + '  (' + L(INC[k].cls) + ')</option>');
    }
    return h.join('');
  }

  function renderTools() {
    var h = ['<div class="tool-card"><h2>' + t('calc_title') + '</h2><p>' + t('calc_desc') + '</p>',
      '<div class="calc-grid">',
      '<div class="field"><label for="selA">' + t('calc_sub1') + '</label><select id="selA">' + optionsHTML(calc.a, false) + '</select></div>',
      '<div class="field"><label for="selB">' + t('calc_sub2') + '</label><select id="selB">' + optionsHTML(calc.b, true) + '</select></div>',
      '<div class="field"><label for="selR">' + t('calc_rel') + '</label><select id="selR">' +
        '<option value="2"' + (calc.rel === 2 ? ' selected' : '') + '>' + t('pos_ortho') + '</option>' +
        '<option value="3"' + (calc.rel === 3 ? ' selected' : '') + '>' + t('pos_meta') + '</option>' +
        '<option value="4"' + (calc.rel === 4 ? ' selected' : '') + '>' + t('pos_para') + '</option>' +
        '</select></div></div>',
      '<div id="calcOut"></div>',
      '<p class="tiny" style="color:var(--ink-2);margin-top:14px">' + t('calc_note') + '</p></div>'];

    h.push('<div class="tool-card"><h2>' + t('ref_table_title') + '</h2><p>' + t('ref_table_note') + '</p>' +
      '<div class="tbl-wrap"><table><thead><tr><th>' + t('col_group') + '</th><th>' + t('col_class') + '</th>' +
      '<th class="num">' + t('col_ortho') + '</th><th class="num">' + t('col_meta') + '</th><th class="num">' +
      t('col_para') + '</th></tr></thead><tbody>');
    var i, j, k, v, sgn;
    for (i = 0; i < INC_KEYS.length; i++) {
      k = INC_KEYS[i];
      h.push('<tr><td>' + INC[k].label + '</td><td>' + L(INC[k].cls) + '</td>');
      for (j = 0; j < 3; j++) {
        v = INC[k].v[j];
        sgn = v > 0 ? '+' : (v < 0 ? '−' : '');
        h.push('<td class="num ' + (v > 0 ? 'pos' : (v < 0 ? 'neg' : '')) + '">' +
          sgn + (v === 0 ? '0' : Math.abs(v).toFixed(2)) + '</td>');
      }
      h.push('</tr>');
    }
    h.push('</tbody><caption>' + srcText([['pretsch', 'aromatic substituent increments']]) +
      '</caption></table></div></div>');

    $('#toolsBody').innerHTML = h.join('');
    drawCalc();
  }

  function drawCalc() {
    var g = computeRing(), h = ['<div class="calc-out">'], i, lo = 99, hi = -99;
    for (i = 0; i < g.length; i++) {
      if (g[i].delta < lo) { lo = g[i].delta; }
      if (g[i].delta > hi) { hi = g[i].delta; }
      h.push('<div class="out-cell"><div class="lab">' + g[i].H + 'H</div>' +
        '<div class="val">' + g[i].delta.toFixed(2) + '</div>' +
        '<div class="sub">' + g[i].parts.join('<br>') + '</div></div>');
    }
    h.push('</div>');
    var peaks = [];
    for (i = 0; i < g.length; i++) { peaks.push({ ppm: g[i].delta, mult: g[i].H > 1 ? 'd' : 'm', H: g[i].H }); }
    h.push(Spectrum.figure(
      { peaks: peaks, min: Math.floor(lo - 0.7), max: Math.ceil(hi + 0.7), height: 244 },
      t('calc_predicted'), ''));
    $('#calcOut').innerHTML = h.join('');
  }

  /* ============================================================ 학습 현황 */
  function renderProgress() {
    var ids = [], k, total = QUESTIONS.length, ok = 0, done, rate, i, s, st, pct, acc, weak = [];
    for (k in store.progress) { if (store.progress.hasOwnProperty(k)) { ids.push(k); if (store.progress[k].correct) { ok++; } } }
    done = ids.length;
    rate = done ? Math.round(ok / done * 100) : 0;

    var h = ['<div class="tool-card"><h2>' + t('prog_title') + '</h2><div class="stat-grid">' +
      '<div class="stat"><div class="val">' + done + '</div><div class="lab">' + t('prog_attempted') + '</div></div>' +
      '<div class="stat"><div class="val">' + ok + '</div><div class="lab">' + t('prog_correct') + '</div></div>' +
      '<div class="stat"><div class="val">' + rate + '%</div><div class="lab">' + t('prog_rate') + '</div></div>' +
      '<div class="stat"><div class="val">' + total + '</div><div class="lab">' + t('prog_total') + '</div></div></div>'];

    if (!done) {
      h.push('<p style="color:var(--ink-2)">' + t('prog_empty') + '</p>');
    } else {
      h.push('<h3 style="font-size:1rem;margin:22px 0 10px">' + t('prog_by_set') + '</h3><div class="tbl-wrap"><table><tbody>');
      for (i = 0; i < SETS.length; i++) {
        s = SETS[i]; st = setStats(s.id);
        pct = st.total ? Math.round(st.done / st.total * 100) : 0;
        acc = st.done ? Math.round(st.correct / st.done * 100) : 0;
        if (st.done >= 3 && acc < 60) { weak.push(s); }
        h.push('<tr><td style="width:38%">' + (s.core ? '★ ' : '') + L(s.title) + '</td>' +
          '<td><div class="bar"><span style="width:' + pct + '%"></span></div></td>' +
          '<td class="num">' + st.done + '/' + st.total + '</td>' +
          '<td class="num">' + (st.done ? acc + '%' : '—') + '</td></tr>');
      }
      h.push('</tbody></table></div><h3 style="font-size:1rem;margin:22px 0 10px">' + t('prog_weak') + '</h3>');
      if (weak.length) {
        h.push('<ul>');
        for (i = 0; i < weak.length; i++) {
          h.push('<li><button type="button" class="linklike" data-act="lesson" data-id="' + weak[i].lesson + '">' +
            L(weak[i].title) + ' → ' + L(LESSON_BY_ID[weak[i].lesson].title) + '</button></li>');
        }
        h.push('</ul>');
      } else {
        h.push('<p style="color:var(--ink-2)">' + t('prog_weak_none') + '</p>');
      }
    }
    h.push('<div class="qactions" style="margin-top:20px"><button type="button" class="btn plain" data-act="reset">' +
      t('prog_reset') + '</button></div><p class="tiny" style="color:var(--ink-2);margin-top:10px">' +
      t('prog_storage') + '</p></div>');
    $('#progressBody').innerHTML = h.join('');
  }

  /* ============================================================ 참고문헌 */
  var SRC_ORDER = ['pavia', 'silverstein', 'pretsch', 'clayden', 'gottlieb', 'sdbs',
                   'keeler', 'claridge', 'nist'];

  function renderSources() {
    var h = ['<div class="tool-card"><h2>' + t('ref_title') + '</h2><p>' + t('ref_intro') + '</p><ul class="bib">'];
    var i, j, s, row, names;
    for (i = 0; i < SRC_ORDER.length; i++) {
      s = SOURCES[SRC_ORDER[i]];
      h.push('<li><div class="cite"><span class="key">' + esc(SRC_ORDER[i]) + '</span>' + s.full + '</div>' +
        '<div class="used"><strong>' + t('ref_used') + ':</strong> ' + L(s.use) + '</div></li>');
    }
    h.push('</ul></div>');

    h.push('<div class="tool-card"><h2>' + t('prov_title') + '</h2><p>' + t('prov_intro') + '</p>' +
      '<div class="tbl-wrap"><table><thead><tr><th>' + t('prov_what') + '</th><th>' + t('prov_where') +
      '</th><th>' + t('prov_ref') + '</th></tr></thead><tbody>');
    for (i = 0; i < PROVENANCE.length; i++) {
      row = PROVENANCE[i]; names = [];
      for (j = 0; j < row.refs.length; j++) {
        if (SOURCES[row.refs[j]]) { names.push(L(SOURCES[row.refs[j]].short)); }
      }
      h.push('<tr><td>' + L(row.what) + '</td><td>' + L(row.where) + '</td><td>' + names.join('<br>') + '</td></tr>');
    }
    h.push('</tbody></table></div></div>');

    h.push('<div class="tool-card"><h2>' + t('caveat_title') + '</h2><ul class="caveats">');
    for (i = 0; i < CAVEATS.length; i++) { h.push('<li>' + L(CAVEATS[i]) + '</li>'); }
    h.push('</ul></div>');

    h.push('<div class="tool-card"><h2>' + t('cite_title') + '</h2><p>' + t('cite_body') + '</p></div>');
    $('#sourcesBody').innerHTML = h.join('');
  }

  /* ============================================================ 셸 */
  var RENDERERS = { practice: null, tools: renderTools, progress: renderProgress, sources: renderSources };

  function switchView(v) {
    var sections = doc.getElementsByClassName('view'), i, tabs;
    view = v;
    for (i = 0; i < sections.length; i++) { sections[i].classList.add('is-hidden'); }
    $('#view-' + v).classList.remove('is-hidden');
    tabs = $('#tabbar').getElementsByTagName('button');
    for (i = 0; i < tabs.length; i++) { setClass(tabs[i], 'is-active', attr(tabs[i], 'data-view') === v); }

    if (v === 'practice') {
      if (quiz) { $('#setPicker').classList.add('is-hidden'); } else { renderSetPicker(); }
    } else if (RENDERERS[v]) { RENDERERS[v](); }
  }

  function applyLang() {
    I18N.setLang(store.lang);
    lessonCache = {};                       /* 언어가 바뀌면 캐시를 버린다 */
    doc.documentElement.lang = store.lang;

    var nodes = doc.querySelectorAll('[data-i18n]'), i, btns;
    for (i = 0; i < nodes.length; i++) { nodes[i].innerHTML = t(attr(nodes[i], 'data-i18n')); }
    btns = doc.querySelectorAll('.lang-btn');
    for (i = 0; i < btns.length; i++) { setClass(btns[i], 'is-active', attr(btns[i], 'data-lang') === store.lang); }

    renderLessonNav(); renderLesson();
    if (view === 'practice') { if (quiz) { renderQuestion(); } else { renderSetPicker(); } }
    else if (RENDERERS[view]) { RENDERERS[view](); }
  }

  function applyTheme() { doc.documentElement.setAttribute('data-theme', store.theme); }

  /* ---------------------------------------------- 이벤트 위임 (총 4개) */
  function onClick(ev) {
    var el = upAttr(ev.target || ev.srcElement, 'data-act');
    if (!el) { return; }
    var act = attr(el, 'data-act'), q = quiz ? quiz.items[quiz.i] : null, i;

    switch (act) {
      case 'lang':
        if (store.lang !== attr(el, 'data-lang')) { store.lang = attr(el, 'data-lang'); save(); applyLang(); }
        return;
      case 'theme':
        store.theme = (store.theme === 'dark') ? 'light' : 'dark'; save(); applyTheme(); return;
      case 'tab':
        switchView(attr(el, 'data-view')); return;
      case 'lesson':
        gotoLesson(attr(el, 'data-id')); return;
      case 'set':
        startSet(attr(el, 'data-id')); return;
      case 'quit':
        quiz = null; renderSetPicker(); return;
      case 'again':
        startSet(quiz.setId); return;
      case 'reset':
        if (global.confirm(t('prog_reset_ask'))) { store.progress = {}; save(); renderProgress(); }
        return;
      case 'check':
        if (!quiz) { return; }
        if (!quiz.checked) { grade(q); } else { advance(); }
        return;
      case 'opt':
        if (!quiz || quiz.checked) { return; }
        i = +attr(el, 'data-i');
        if (q.type === 'mc') {
          quiz.picked = i;
          var opts = $('#opts').getElementsByTagName('button'), n;
          for (n = 0; n < opts.length; n++) { setClass(opts[n], 'sel', +attr(opts[n], 'data-i') === i); }
        } else {
          var at = quiz.picked.indexOf(i);
          if (at >= 0) { quiz.picked.splice(at, 1); } else { quiz.picked.push(i); }
          setClass(el, 'sel', quiz.picked.indexOf(i) >= 0);
        }
        refreshAction(q); return;
      case 'chip':
        if (!quiz || quiz.checked) { return; }
        quiz.picked.push(+attr(el, 'data-i')); drawOrder(q); refreshAction(q); return;
      case 'unchip':
        if (!quiz || quiz.checked) { return; }
        quiz.picked.splice(+attr(el, 'data-n'), 1); drawOrder(q); refreshAction(q); return;
    }
  }

  function onChange(ev) {
    var el = ev.target || ev.srcElement;
    if (!el || !el.id) { return; }
    if (el.id === 'selA') { calc.a = el.value; drawCalc(); }
    else if (el.id === 'selB') { calc.b = el.value; drawCalc(); }
    else if (el.id === 'selR') { calc.rel = +el.value; drawCalc(); }
  }

  function onInput(ev) {
    var el = ev.target || ev.srcElement;
    if (el && el.id === 'numIn' && quiz) { refreshAction(quiz.items[quiz.i]); }
  }

  function onKeydown(ev) {
    var el = ev.target || ev.srcElement, btn;
    if (el && el.id === 'numIn' && (ev.key === 'Enter' || ev.keyCode === 13)) {
      btn = $('#actBtn');
      if (btn && !btn.disabled) { btn.click(); }
    }
  }

  function init() {
    applyTheme();
    doc.addEventListener('click', onClick, false);
    doc.addEventListener('change', onChange, false);
    doc.addEventListener('input', onInput, false);
    doc.addEventListener('keydown', onKeydown, false);
    applyLang();
    switchView('learn');
  }

  if (doc.readyState === 'loading') { doc.addEventListener('DOMContentLoaded', init, false); }
  else { init(); }
})(window);
