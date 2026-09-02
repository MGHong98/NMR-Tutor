/* app.js — 뷰 라우팅, 단원 렌더링, 퀴즈 엔진, 계산기, 학습 현황
 * View routing, lesson rendering, quiz engine, calculator, progress.
 */
(function () {
  'use strict';

  var t = I18N.t, L = I18N.L;
  var STORE_KEY = 'nmr-tutor-v1';

  /* ------------------------------------------------------------ state */
  var store = { lang: 'ko', theme: 'light', progress: {}, lesson: 'basics' };
  try {
    var saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    if (saved && typeof saved === 'object') {
      Object.keys(store).forEach(function (k) { if (saved[k] != null) { store[k] = saved[k]; } });
    }
  } catch (e) { /* localStorage 사용 불가 시 무시 */ }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* noop */ }
  }

  var view = 'learn';
  var quiz = null;   /* { setId, items, i, picked, checked, correct } */

  /* ------------------------------------------------------------ utils */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function shuffle(a) {
    var i, j, tmp;
    for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); tmp = a[i]; a[i] = a[j]; a[j] = tmp; }
    return a;
  }
  function letter(i) { return String.fromCharCode(65 + i); }

  /* ------------------------------------------------- lesson rendering */
  function cell(c) { return typeof c === 'string' ? c : L(c); }

  function renderBlock(b) {
    var h = [], i;
    switch (b.type) {
      case 'h':       return '<h3>' + L(b) + '</h3>';
      case 'p':       return '<p>' + L(b) + '</p>';
      case 'formula': return '<div class="formula">' + L(b) + '</div>';
      case 'ul':
      case 'ol':
        h.push('<' + b.type + '>');
        b.items.forEach(function (it) { h.push('<li>' + L(it) + '</li>'); });
        h.push('</' + b.type + '>');
        return h.join('');
      case 'note':
        return '<div class="note note-' + b.kind + '"><h4>' + L(b.title) + '</h4><p>' + L(b.body) + '</p></div>';
      case 'table':
        h.push('<div class="tbl-wrap"><table><thead><tr>');
        b.headers.forEach(function (x) { h.push('<th>' + cell(x) + '</th>'); });
        h.push('</tr></thead><tbody>');
        b.rows.forEach(function (r) {
          h.push('<tr>');
          r.forEach(function (c, ci) {
            var v = cell(c);
            var isNum = ci > 0 && /^[+−-]?[\d.]/.test(v);
            var cls = isNum ? ' class="num' + (v.charAt(0) === '+' ? ' pos' : (v.charAt(0) === '−' ? ' neg' : '')) + '"' : '';
            h.push('<td' + cls + '>' + v + '</td>');
          });
          h.push('</tr>');
        });
        h.push('</tbody>');
        if (b.caption) { h.push('<caption>' + L(b.caption) + '</caption>'); }
        h.push('</table></div>');
        return h.join('');
      case 'spec':
        return Spectrum.figure(b.spec, b.caption ? L(b.caption) : '');
      case 'compare':
        h.push('<div class="compare">');
        b.cards.forEach(function (c) {
          h.push('<div class="card"><h4>' + L(c.title) + '</h4>' +
            (c.big ? '<div class="big">' + c.big + '</div>' : '') +
            '<div>' + L(c.body) + '</div></div>');
        });
        h.push('</div>');
        return h.join('');
      default:
        return '';
    }
  }

  function renderLessonNav() {
    var nav = $('#lessonNav');
    nav.innerHTML = LESSONS.map(function (l, i) {
      return '<li><button type="button" data-lesson="' + l.id + '"' +
        (l.id === store.lesson ? ' class="is-active"' : '') + '>' +
        '<span class="num">' + (i + 1) + '</span><span>' + L(l.title) + '</span></button></li>';
    }).join('');
    $$('#lessonNav button').forEach(function (b) {
      b.addEventListener('click', function () {
        store.lesson = b.dataset.lesson; save();
        renderLessonNav(); renderLesson();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function renderLesson() {
    var l = LESSONS.filter(function (x) { return x.id === store.lesson; })[0] || LESSONS[0];
    var h = ['<p class="lesson-kicker">' + L(l.kicker) + '</p>',
             '<h2>' + L(l.title) + '</h2>',
             '<p class="lesson-lead">' + L(l.lead) + '</p>'];
    l.blocks.forEach(function (b) { h.push(renderBlock(b)); });
    if (l.refs && l.refs.length) {
      h.push('<div class="note note-tip"><h4>' + t('source_label') + '</h4><ul>' +
        l.refs.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>');
    }
    /* 다음 단원 이동 */
    var idx = LESSONS.indexOf(l);
    if (idx < LESSONS.length - 1) {
      h.push('<div class="qactions" style="margin-top:26px"><button type="button" class="btn ghost" id="nextLesson">' +
        L({ ko: '다음 단원 →', en: 'Next lesson →' }) + '</button></div>');
    }
    $('#lessonBody').innerHTML = h.join('');
    var nb = $('#nextLesson');
    if (nb) {
      nb.addEventListener('click', function () {
        store.lesson = LESSONS[idx + 1].id; save();
        renderLessonNav(); renderLesson();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* --------------------------------------------------------- practice */
  function setStats(setId) {
    var items = QUESTIONS.filter(function (q) { return q.set === setId; });
    var done = 0, ok = 0;
    items.forEach(function (q) {
      var p = store.progress[q.id];
      if (p) { done++; if (p.correct) { ok++; } }
    });
    return { total: items.length, done: done, correct: ok };
  }

  function renderSetPicker() {
    var h = ['<div class="tool-card" style="margin-bottom:20px"><h2>' + t('practice_intro_t') + '</h2><p>' +
             t('practice_intro_d') + '</p></div>'];
    h.push('<div class="set-picker">');
    SETS.forEach(function (s) {
      var st = setStats(s.id);
      var pct = st.total ? Math.round(st.done / st.total * 100) : 0;
      h.push('<button type="button" class="set-card" data-set="' + s.id + '">' +
        '<div class="st"><span>' + L(s.title) + '</span>' +
        '<span class="badge' + (s.core ? ' core' : '') + '">' + (s.core ? '★ ' : '') + st.total + '</span></div>' +
        '<div class="sd">' + L(s.desc) + '</div>' +
        '<div class="bar"><span style="width:' + pct + '%"></span></div>' +
        '<div class="sd" style="margin-top:6px;font-family:var(--mono);font-size:.75rem">' +
        st.done + ' / ' + st.total + ' · ' + t('score_label') + ' ' + st.correct + '</div>' +
        '</button>');
    });
    h.push('</div>');
    $('#setPicker').innerHTML = h.join('');
    $('#setPicker').classList.remove('is-hidden');
    $('#quizArea').innerHTML = '';
    $$('#setPicker .set-card').forEach(function (b) {
      b.addEventListener('click', function () { startSet(b.dataset.set); });
    });
  }

  function startSet(setId) {
    var items = QUESTIONS.filter(function (q) { return q.set === setId; });
    quiz = { setId: setId, items: items, i: 0, picked: null, checked: false, correct: 0 };
    $('#setPicker').classList.add('is-hidden');
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderQuestion() {
    var q = quiz.items[quiz.i];
    var set = SETS.filter(function (s) { return s.id === quiz.setId; })[0];
    var h = [];

    h.push('<div class="quiz-head"><h2>' + L(set.title) + '</h2>' +
      '<span class="quiz-meta">' + t('q_of') + ' ' + (quiz.i + 1) + ' / ' + quiz.items.length +
      ' · ' + t('score_label') + ' ' + quiz.correct + '</span></div>');
    h.push('<div class="qprog"><span style="width:' + (quiz.i / quiz.items.length * 100) + '%"></span></div>');

    h.push('<div class="qtags"><span class="qtag d' + q.d + '">' + t('d' + q.d) + '</span>' +
      '<span class="qtag">' + esc(q.id) + '</span>' +
      '<span class="qtag">' + ({ mc: 'single', multi: 'multi', order: 'ordering', num: 'numeric' }[q.type]) + '</span></div>');

    if (q.spec) { h.push(Spectrum.figure(q.spec, '')); }
    h.push('<p class="qprompt">' + L(q.q) + '</p>');
    h.push('<p class="qhint">' + t('hint_' + (q.type === 'multi' ? 'multi' : q.type === 'order' ? 'order' : q.type === 'num' ? 'num' : 'mc')) + '</p>');

    if (q.type === 'mc' || q.type === 'multi') {
      h.push('<div class="opts" id="opts">');
      q.o.forEach(function (o, i) {
        h.push('<button type="button" class="opt" data-i="' + i + '"><span class="mk">' + letter(i) + '</span><span>' + L(o) + '</span></button>');
      });
      h.push('</div>');
    } else if (q.type === 'order') {
      h.push('<div class="order-slot" id="slot"><span class="ph">' + t('order_placeholder') + '</span></div>');
      h.push('<div class="order-tray" id="tray">');
      q.o.forEach(function (o, i) {
        h.push('<button type="button" class="chip" data-i="' + i + '">' + L(o) + '</button>');
      });
      h.push('</div>');
    } else if (q.type === 'num') {
      h.push('<div class="numrow"><input type="text" inputmode="decimal" id="numIn" autocomplete="off" placeholder="0.00">' +
        '<span class="unit">' + (q.unit || '') + '</span></div>');
    }

    h.push('<div id="explainBox"></div>');
    h.push('<div class="qactions">' +
      '<button type="button" class="btn" id="actBtn" disabled>' + t('check') + '</button>' +
      '<button type="button" class="btn plain" id="quitBtn">' + t('back_sets') + '</button></div>');

    $('#quizArea').innerHTML = h.join('');
    quiz.picked = (q.type === 'multi' || q.type === 'order') ? [] : null;
    quiz.checked = false;
    bindQuestion(q);
  }

  function bindQuestion(q) {
    var actBtn = $('#actBtn');

    function refresh() {
      var ready;
      if (q.type === 'mc') { ready = quiz.picked !== null; }
      else if (q.type === 'multi') { ready = quiz.picked.length > 0; }
      else if (q.type === 'order') { ready = quiz.picked.length === q.o.length; }
      else { ready = $('#numIn').value.trim() !== ''; }
      actBtn.disabled = !ready;
    }

    if (q.type === 'mc' || q.type === 'multi') {
      $$('#opts .opt').forEach(function (b) {
        b.addEventListener('click', function () {
          if (quiz.checked) { return; }
          var i = +b.dataset.i;
          if (q.type === 'mc') {
            quiz.picked = i;
            $$('#opts .opt').forEach(function (x) { x.classList.toggle('sel', +x.dataset.i === i); });
          } else {
            var at = quiz.picked.indexOf(i);
            if (at >= 0) { quiz.picked.splice(at, 1); } else { quiz.picked.push(i); }
            b.classList.toggle('sel', quiz.picked.indexOf(i) >= 0);
          }
          refresh();
        });
      });
    } else if (q.type === 'order') {
      var drawOrder = function () {
        var slot = $('#slot');
        slot.innerHTML = quiz.picked.length
          ? quiz.picked.map(function (i, n) {
              return '<button type="button" class="chip picked" data-slot="' + n + '">' + (n + 1) + '. ' + L(q.o[i]) + '</button>';
            }).join('')
          : '<span class="ph">' + t('order_placeholder') + '</span>';
        $$('#tray .chip').forEach(function (c) { c.disabled = quiz.picked.indexOf(+c.dataset.i) >= 0; });
        $$('#slot .chip').forEach(function (c) {
          c.addEventListener('click', function () {
            if (quiz.checked) { return; }
            quiz.picked.splice(+c.dataset.slot, 1);
            drawOrder(); refresh();
          });
        });
      };
      $$('#tray .chip').forEach(function (b) {
        b.addEventListener('click', function () {
          if (quiz.checked) { return; }
          quiz.picked.push(+b.dataset.i);
          drawOrder(); refresh();
        });
      });
      drawOrder();
    } else {
      $('#numIn').addEventListener('input', refresh);
      $('#numIn').addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' && !actBtn.disabled) { actBtn.click(); }
      });
    }

    $('#quitBtn').addEventListener('click', function () { quiz = null; renderSetPicker(); });

    actBtn.addEventListener('click', function () {
      if (!quiz.checked) { grade(q); } else { advance(); }
    });
    refresh();
  }

  function isCorrect(q) {
    if (q.type === 'mc') { return quiz.picked === q.a; }
    if (q.type === 'multi') {
      var p = quiz.picked.slice().sort(), a = q.a.slice().sort();
      return p.length === a.length && p.every(function (v, i) { return v === a[i]; });
    }
    if (q.type === 'order') { return quiz.picked.every(function (v, i) { return v === q.a[i]; }); }
    var val = parseFloat(String($('#numIn').value).replace(/[^0-9.\-+]/g, ''));
    return !isNaN(val) && Math.abs(val - q.a) <= (q.tol != null ? q.tol : 0.1);
  }

  function answerText(q) {
    if (q.type === 'mc') { return letter(q.a) + '. ' + L(q.o[q.a]); }
    if (q.type === 'multi') { return q.a.map(function (i) { return letter(i); }).join(', '); }
    if (q.type === 'order') { return q.a.map(function (i) { return L(q.o[i]); }).join(' &lt; '); }
    return q.a + (q.unit ? ' ' + q.unit : '');
  }

  function grade(q) {
    var ok = isCorrect(q);
    quiz.checked = true;
    if (ok) { quiz.correct++; }

    var prev = store.progress[q.id] || { attempts: 0, correct: false };
    store.progress[q.id] = { attempts: prev.attempts + 1, correct: prev.correct || ok, set: q.set };
    save();

    if (q.type === 'mc' || q.type === 'multi') {
      $$('#opts .opt').forEach(function (b) {
        var i = +b.dataset.i;
        var isAns = (q.type === 'mc') ? (i === q.a) : (q.a.indexOf(i) >= 0);
        var wasPicked = (q.type === 'mc') ? (quiz.picked === i) : (quiz.picked.indexOf(i) >= 0);
        b.disabled = true;
        b.classList.remove('sel');
        if (isAns) { b.classList.add('correct'); }
        else if (wasPicked) { b.classList.add('wrong'); }
      });
    } else if (q.type === 'order') {
      $$('#tray .chip').forEach(function (c) { c.disabled = true; });
      $$('#slot .chip').forEach(function (c) { c.disabled = true; });
    } else {
      $('#numIn').disabled = true;
    }

    var yours = (q.type === 'num') ? esc($('#numIn').value) :
      (q.type === 'mc') ? (quiz.picked !== null ? letter(quiz.picked) : '—') :
      (q.type === 'multi') ? quiz.picked.map(letter).sort().join(', ') :
      quiz.picked.map(function (i) { return L(q.o[i]); }).join(' &lt; ');

    $('#explainBox').innerHTML =
      '<div class="explain ' + (ok ? 'ok' : 'no') + '">' +
      '<h4>' + (ok ? '✓ ' + t('correct') : '✗ ' + t('incorrect')) + '</h4>' +
      (ok ? '' : '<p style="font-size:.85rem"><strong>' + t('your_answer') + ':</strong> ' + yours +
        ' &nbsp;·&nbsp; <strong>' + t('right_answer') + ':</strong> ' + answerText(q) + '</p>') +
      '<p>' + L(q.e) + '</p>' +
      '<div class="ref">' + t('source_label') + ': ' + esc(q.ref) + '</div></div>';

    var b = $('#actBtn');
    b.textContent = (quiz.i === quiz.items.length - 1) ? t('finish') : t('next');
    b.disabled = false;
  }

  function advance() {
    if (quiz.i === quiz.items.length - 1) { renderResult(); return; }
    quiz.i++;
    renderQuestion();
    $('#quizArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderResult() {
    var n = quiz.items.length, c = quiz.correct;
    var pct = Math.round(c / n * 100);
    var msg = pct >= 80 ? t('result_msg_hi') : pct >= 50 ? t('result_msg_mid') : t('result_msg_lo');
    var set = SETS.filter(function (s) { return s.id === quiz.setId; })[0];
    $('#quizArea').innerHTML =
      '<div class="result"><p class="lesson-kicker">' + t('result_title') + '</p>' +
      '<div class="score">' + c + ' / ' + n + '</div>' +
      '<p style="color:var(--ink-2)">' + pct + '% · ' + msg + '</p>' +
      '<div class="qactions" style="justify-content:center;margin-top:18px">' +
      '<button type="button" class="btn" id="againBtn">' + t('retry_set') + '</button>' +
      '<button type="button" class="btn ghost" id="lessonBtn">' + t('review_lesson') + '</button>' +
      '<button type="button" class="btn plain" id="backBtn">' + t('back_sets') + '</button></div></div>';
    $('#againBtn').addEventListener('click', function () { startSet(quiz.setId); });
    $('#backBtn').addEventListener('click', function () { quiz = null; renderSetPicker(); });
    $('#lessonBtn').addEventListener('click', function () {
      store.lesson = set.lesson; save();
      switchView('learn'); renderLessonNav(); renderLesson();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------ tools */
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
  var BENZENE = 7.26;
  var calc = { a: 'NO2', b: 'OCH3', rel: 4 };

  function relation(i, j) {
    var d = ((i - j) % 6 + 6) % 6;
    if (d === 1 || d === 5) { return 0; }   /* ortho */
    if (d === 2 || d === 4) { return 1; }   /* meta  */
    return 2;                               /* para  */
  }

  function computeRing() {
    var subs = [{ pos: 1, g: calc.a }];
    if (calc.b !== 'none') { subs.push({ pos: calc.rel, g: calc.b }); }
    var out = [], p;
    for (p = 1; p <= 6; p++) {
      if (subs.some(function (s) { return s.pos === p; })) { continue; }
      var d = BENZENE, parts = [];
      subs.forEach(function (s) {
        var r = relation(p, s.pos);
        var v = INC[s.g].v[r];
        d += v;
        parts.push(INC[s.g].label + ' ' + ['o', 'm', 'p'][r] + ' ' + (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(2));
      });
      out.push({ pos: p, delta: d, parts: parts });
    }
    /* 같은 δ끼리 묶기 */
    var groups = [];
    out.forEach(function (o) {
      var g = groups.filter(function (x) { return Math.abs(x.delta - o.delta) < 0.005; })[0];
      if (g) { g.H++; } else { groups.push({ delta: o.delta, H: 1, parts: o.parts }); }
    });
    groups.sort(function (x, y) { return y.delta - x.delta; });
    return groups;
  }

  function renderTools() {
    var opts = function (sel, withNone) {
      return (withNone ? '<option value="none">' + t('calc_none') + '</option>' : '') +
        Object.keys(INC).map(function (k) {
          return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' +
            INC[k].label.replace(/<[^>]+>/g, '') + '  (' + L(INC[k].cls) + ')</option>';
        }).join('');
    };

    var h = ['<div class="tool-card"><h2>' + t('calc_title') + '</h2><p>' + t('calc_desc') + '</p>',
      '<div class="calc-grid">',
      '<div class="field"><label>' + t('calc_sub1') + '</label><select id="selA">' + opts(calc.a, false) + '</select></div>',
      '<div class="field"><label>' + t('calc_sub2') + '</label><select id="selB">' + opts(calc.b, true) + '</select></div>',
      '<div class="field"><label>' + t('calc_rel') + '</label><select id="selR">' +
        '<option value="2"' + (calc.rel === 2 ? ' selected' : '') + '>' + t('pos_ortho') + '</option>' +
        '<option value="3"' + (calc.rel === 3 ? ' selected' : '') + '>' + t('pos_meta') + '</option>' +
        '<option value="4"' + (calc.rel === 4 ? ' selected' : '') + '>' + t('pos_para') + '</option>' +
        '</select></div></div>',
      '<div id="calcOut"></div>',
      '<p class="tiny" style="color:var(--ink-2);margin-top:14px">' + t('calc_note') + '</p></div>'];

    /* 증분 참조표 */
    h.push('<div class="tool-card"><h2>' + t('ref_table_title') + '</h2><p>' + t('ref_table_note') + '</p>' +
      '<div class="tbl-wrap"><table><thead><tr><th>' + t('col_group') + '</th><th>' + t('col_class') + '</th>' +
      '<th class="num">' + t('col_ortho') + '</th><th class="num">' + t('col_meta') + '</th><th class="num">' + t('col_para') + '</th></tr></thead><tbody>' +
      Object.keys(INC).map(function (k) {
        return '<tr><td>' + INC[k].label + '</td><td>' + L(INC[k].cls) + '</td>' +
          INC[k].v.map(function (v) {
            var s = (v > 0 ? '+' : v < 0 ? '−' : '') + (v === 0 ? '0' : Math.abs(v).toFixed(2));
            return '<td class="num ' + (v > 0 ? 'pos' : v < 0 ? 'neg' : '') + '">' + s + '</td>';
          }).join('') + '</tr>';
      }).join('') +
      '</tbody><caption>Pretsch, B&uuml;hlmann &amp; Badertscher, <em>Structure Determination of Organic Compounds</em>, 4th ed., Springer, 2009.</caption></table></div></div>');

    $('#toolsBody').innerHTML = h.join('');
    $('#selA').addEventListener('change', function () { calc.a = this.value; drawCalc(); });
    $('#selB').addEventListener('change', function () { calc.b = this.value; drawCalc(); });
    $('#selR').addEventListener('change', function () { calc.rel = +this.value; drawCalc(); });
    drawCalc();
  }

  function drawCalc() {
    var g = computeRing();
    var h = ['<div class="calc-out">'];
    g.forEach(function (x) {
      h.push('<div class="out-cell"><div class="lab">' + x.H + 'H</div>' +
        '<div class="val">' + x.delta.toFixed(2) + '</div>' +
        '<div class="sub">' + x.parts.join('<br>') + '</div></div>');
    });
    h.push('</div>');
    var lo = Math.min.apply(null, g.map(function (x) { return x.delta; }));
    var hi = Math.max.apply(null, g.map(function (x) { return x.delta; }));
    h.push(Spectrum.figure({
      peaks: g.map(function (x) { return { ppm: x.delta, mult: x.H > 1 ? 'd' : 'm', H: x.H }; }),
      min: Math.floor(lo - 0.7), max: Math.ceil(hi + 0.7), height: 200
    }, t('calc_predicted')));
    $('#calcOut').innerHTML = h.join('');
  }

  /* --------------------------------------------------------- progress */
  function renderProgress() {
    var ids = Object.keys(store.progress);
    var total = QUESTIONS.length;
    var done = ids.length;
    var ok = ids.filter(function (k) { return store.progress[k].correct; }).length;
    var rate = done ? Math.round(ok / done * 100) : 0;

    var h = ['<div class="tool-card"><h2>' + t('prog_title') + '</h2>',
      '<div class="stat-grid">' +
      '<div class="stat"><div class="val">' + done + '</div><div class="lab">' + t('prog_attempted') + '</div></div>' +
      '<div class="stat"><div class="val">' + ok + '</div><div class="lab">' + t('prog_correct') + '</div></div>' +
      '<div class="stat"><div class="val">' + rate + '%</div><div class="lab">' + t('prog_rate') + '</div></div>' +
      '<div class="stat"><div class="val">' + total + '</div><div class="lab">' + t('prog_total') + '</div></div></div>'];

    if (!done) {
      h.push('<p style="color:var(--ink-2)">' + t('prog_empty') + '</p>');
    } else {
      h.push('<h3 style="font-size:1rem;margin:22px 0 10px">' + t('prog_by_set') + '</h3><div class="tbl-wrap"><table><tbody>');
      var weak = [];
      SETS.forEach(function (s) {
        var st = setStats(s.id);
        var pct = st.total ? Math.round(st.done / st.total * 100) : 0;
        var acc = st.done ? Math.round(st.correct / st.done * 100) : 0;
        if (st.done >= 3 && acc < 60) { weak.push(s); }
        h.push('<tr><td style="width:38%">' + (s.core ? '★ ' : '') + L(s.title) + '</td>' +
          '<td><div class="bar"><span style="width:' + pct + '%"></span></div></td>' +
          '<td class="num">' + st.done + '/' + st.total + '</td>' +
          '<td class="num">' + (st.done ? acc + '%' : '—') + '</td></tr>');
      });
      h.push('</tbody></table></div>');
      h.push('<h3 style="font-size:1rem;margin:22px 0 10px">' + t('prog_weak') + '</h3>');
      h.push(weak.length
        ? '<ul>' + weak.map(function (s) { return '<li>' + L(s.title) + ' → ' + L(LESSONS.filter(function (l) { return l.id === s.lesson; })[0].title) + '</li>'; }).join('') + '</ul>'
        : '<p style="color:var(--ink-2)">' + t('prog_weak_none') + '</p>');
    }
    h.push('<div class="qactions" style="margin-top:20px"><button type="button" class="btn plain" id="resetBtn">' + t('prog_reset') + '</button></div>');
    h.push('<p class="tiny" style="color:var(--ink-2);margin-top:10px">' + t('prog_storage') + '</p></div>');
    $('#progressBody').innerHTML = h.join('');
    $('#resetBtn').addEventListener('click', function () {
      if (window.confirm(t('prog_reset_ask'))) { store.progress = {}; save(); renderProgress(); }
    });
  }

  /* ------------------------------------------------------------ shell */
  function switchView(v) {
    view = v;
    $$('.view').forEach(function (s) { s.classList.add('is-hidden'); });
    $('#view-' + v).classList.remove('is-hidden');
    $$('#tabbar .tab').forEach(function (b) { b.classList.toggle('is-active', b.dataset.view === v); });
    if (v === 'practice' && !quiz) { renderSetPicker(); }
    if (v === 'tools') { renderTools(); }
    if (v === 'progress') { renderProgress(); }
  }

  function applyLang() {
    I18N.setLang(store.lang);
    document.documentElement.lang = store.lang;
    $$('[data-i18n]').forEach(function (n) { n.innerHTML = t(n.dataset.i18n); });
    $$('.lang-btn').forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === store.lang); });
    renderLessonNav(); renderLesson();
    if (view === 'practice') { if (quiz) { renderQuestion(); } else { renderSetPicker(); } }
    if (view === 'tools') { renderTools(); }
    if (view === 'progress') { renderProgress(); }
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', store.theme);
  }

  function init() {
    applyTheme();
    $$('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        if (store.lang === b.dataset.lang) { return; }
        store.lang = b.dataset.lang; save(); applyLang();
      });
    });
    $('#themeBtn').addEventListener('click', function () {
      store.theme = store.theme === 'dark' ? 'light' : 'dark'; save(); applyTheme();
    });
    $$('#tabbar .tab').forEach(function (b) {
      b.addEventListener('click', function () { switchView(b.dataset.view); });
    });
    applyLang();
    switchView('learn');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
