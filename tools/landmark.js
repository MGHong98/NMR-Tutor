/* 같은 화합물의 같은 자리를 두 곳에서 다르게 적지 않았는가
 * Does one compound get two slightly different δ for the same position?
 *
 * 이 프로그램에서 반복해 나온 결함이 바로 이 종류였다 — 톨루엔 CH3 를 한 곳에서는
 * 2.32, 다른 곳에서는 2.36 으로 적는 식. 눈으로는 잘 안 보이고 다른 검사기는 못 잡는다.
 * This is the defect this project keeps producing: toluene's CH3 written 2.32 in one
 * place and 2.36 in another. The eye misses it and no other checker looks for it.
 *
 * 오탐을 없애기 위해 두 가지 규칙만 쓴다.
 *   (1) 데이터 ↔ 데이터: 같은 이름의 그림 둘이 <값 하나를 공유하면서> 다른 값 하나가
 *       0.005–0.25 ppm 어긋날 때만 문제 삼는다. 자리 수가 다른 것은 문제가 아니다.
 *   (2) 본문 ↔ 데이터: 숫자 <바로 앞>(40자 이내)에 그 화합물 이름이 있고, 그 사이에
 *       다른 화합물 이름이 끼어 있지 않을 때만 그 화합물의 값으로 본다.
 * 한 문장에 여러 화합물이 나오는 일이 흔하므로, 이 인접 규칙이 없으면 검사기가
 * 쓸모없어진다(초안은 126건 중 125건이 오탐이었다).
 */
const ROOT = require('path').join(__dirname, '..') + '/';
global.window = {};
require(ROOT + 'assets/js/data-lessons.js');
require(ROOT + 'assets/js/data-questions.js');
const W = global.window;

const NEAR_LO = 0.005, NEAR_HI = 0.25, WINDOW = 30;
let n = 0;
const bad = [];

/* 이 프로그램이 반복 인용하는 화합물의 δ (SDBS / Gottlieb / 교재 대표값) */
const CANON = {
  '1-클로로프로페인|1-chloropropane': [3.47, 1.81, 1.03],
  '1-나이트로프로페인|1-nitropropane': [4.38, 2.07, 1.03],
  '톨루엔|toluene': [7.25, 7.17, 2.36],
  '에틸 아세테이트|ethyl acetate': [4.12, 2.05, 1.26],
  '에틸 벤조에이트|ethyl benzoate': [8.04, 7.55, 7.43, 4.37, 1.39],
  '아니솔|anisole': [7.28, 6.94, 6.89, 3.80],
  '나이트로벤젠|nitrobenzene': [8.22, 7.68, 7.52]
};
/* 값을 가로챌 수 있는 다른 화합물·기준 이름 — 인접 판정에만 쓴다 */
const OTHERS = ['벤젠', 'benzene', '아세톤', 'acetone', '메탄올', 'methanol', '자일렌', 'xylene',
  '벤즈알데하이드', 'benzaldehyde', '아세토페논', 'acetophenone', '페놀', 'phenol', '아닐린', 'aniline',
  '벤질', 'benzyl', '스타이렌', 'styrene', '프로페인', 'propane', '에테인', 'ethane', '클로로벤젠',
  'chlorobenzene', '메틸 프로파노에이트', 'methyl propanoate', '나이트로아니솔', 'nitroanisole',
  '나이트로톨루엔', 'nitrotoluene', 'TMS', 'CDCl', 'DMSO', '사이클로헥세인', 'cyclohexane'];

/* ---------- (1) 데이터 ↔ 데이터 ---------- */
const byName = {};
const nameOf = m => (typeof m.note === 'string' ? m.note : (m.note && m.note.en) || null);
function collect(m) {
  const vals = [];
  for (const k in (m.ann || {})) { if (m.ann[k]) { vals.push(parseFloat(m.ann[k])); } }
  for (const k in (m.subs || {})) {
    const sv = m.subs[k];
    if (sv && sv.ann) { [].concat(sv.ann).forEach(a => { if (a) { vals.push(parseFloat(a)); } }); }
  }
  (m.nodes || []).forEach(nd => { if (nd.ann) { vals.push(parseFloat(nd.ann)); } });
  return vals.filter(v => !isNaN(v));
}
function addMol(m, where) {
  const nm = nameOf(m);
  if (!nm) { return; }
  const vals = collect(m);
  if (vals.length) { (byName[nm] = byName[nm] || []).push({ where, vals }); }
}
W.LESSONS.forEach(l => (l.blocks || []).forEach((b, i) => {
  if (b.type === 'mol') { (b.mols || []).forEach(m => addMol(m, 'L:' + l.id + '#' + i)); }
}));
W.QUESTIONS.forEach(q => (q.mol || []).forEach(m => addMol(m, 'Q:' + q.id)));

Object.keys(byName).forEach(nm => {
  const uses = byName[nm];
  for (let i = 0; i < uses.length; i++) {
    for (let j = i + 1; j < uses.length; j++) {
      n++;
      const A = uses[i].vals, B = uses[j].vals;
      const shared = A.some(a => B.some(b => Math.abs(a - b) < NEAR_LO));
      if (!shared) { continue; }               /* 아예 다른 자리를 그린 그림끼리는 비교하지 않는다 */
      const seen = {};
      A.forEach(a => B.forEach(b => {
        const d = Math.abs(a - b), key = a + '|' + b;
        if (seen[key]) { return; }
        if (d > NEAR_LO && d <= NEAR_HI &&
            !A.some(x => Math.abs(x - b) < NEAR_LO) && !B.some(x => Math.abs(x - a) < NEAR_LO)) {
          seen[key] = 1;
          bad.push('“' + nm + '” — ' + uses[i].where + ' 는 ' + a + ', ' + uses[j].where + ' 는 ' + b);
        }
      }));
    }
  }
});

/* ---------- (2) 본문 ↔ 데이터 ---------- */
const strip = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
const texts = [];
function push(where, v) {
  if (!v) { return; }
  if (typeof v === 'string') { texts.push({ where, s: v }); return; }
  ['ko', 'en'].forEach(l => { if (v[l]) { texts.push({ where: where + '/' + l, s: v[l] }); } });
}
W.LESSONS.forEach(l => (l.blocks || []).forEach((b, i) => {
  const w = 'L:' + l.id + '#' + i;
  if (b.ko || b.en) { push(w, b); }
  if (b.body) { push(w + ':body', b.body); }
  if (b.caption) { push(w + ':cap', b.caption); }
  (b.items || []).forEach((it, j) => push(w + ':li' + j, it));
}));
W.QUESTIONS.forEach(q => { push('Q:' + q.id + '/q', q.q); push('Q:' + q.id + '/e', q.e); });

/* 문자열에서 화합물 이름이 나타나는 위치를 모두 모은다 */
function mentions(t) {
  const out = [];
  const WORDY = /[0-9A-Za-z\uac00-\ud7a3-]/;   /* 글자·숫자·한글·하이픈 */
  Object.keys(CANON).forEach(key => {
    key.split('|').forEach(nm => {
      let at = -1;
      const hay = nm === nm.toLowerCase() ? t.toLowerCase() : t;
      while ((at = hay.indexOf(nm, at + 1)) >= 0) {
        /* 앞 글자가 이어져 있으면 더 긴 이름의 일부다: "4-메틸아니솔" 안의 "아니솔" */
        if (at > 0 && WORDY.test(t.charAt(at - 1))) { continue; }
        out.push({ at, end: at + nm.length, key });
      }
    });
  });
  OTHERS.forEach(nm => {
    let at = -1;
    const hay = nm === nm.toLowerCase() ? t.toLowerCase() : t;
    while ((at = hay.indexOf(nm, at + 1)) >= 0) { out.push({ at, end: at + nm.length, key: null }); }
  });
  /* 다른 이름 안에 들어 있는 이름은 버린다 — "4-나이트로아니솔" 안의 "아니솔",
     "1-클로로프로페인" 안의 "프로페인" 이 그 화합물의 언급으로 잡히면 안 된다.
     Drop a mention contained inside a longer one: the "anisole" inside
     "4-nitroanisole", or the "propane" inside "1-chloropropane". */
  return out
    .filter(m => !out.some(o => o !== m && o.at <= m.at && o.end >= m.end && (o.end - o.at) > (m.end - m.at)))
    .sort((a, b) => a.at - b.at);
}

texts.forEach(({ where, s }) => {
  const t = strip(s);
  const ms = mentions(t);
  if (!ms.length) { return; }
  const re = /\b\d\.\d{2}\b/g;
  let m;
  while ((m = re.exec(t))) {
    /* 숫자 바로 앞의 화합물 언급을 찾는다 */
    let last = null;
    for (const mention of ms) { if (mention.end <= m.index) { last = mention; } }
    if (!last || !last.key) { continue; }             /* 앞이 다른 화합물이면 넘어간다 */
    if (m.index - last.end > WINDOW) { continue; }    /* 너무 멀면 그 화합물의 값으로 보지 않는다 */
    const v = parseFloat(m[0]), canon = CANON[last.key];
    n++;
    if (canon.some(c => Math.abs(c - v) < NEAR_LO)) { continue; }
    const close = canon.filter(c => Math.abs(c - v) > NEAR_LO && Math.abs(c - v) <= NEAR_HI);
    if (close.length) {
      bad.push(where + ' — “' + last.key.split('|')[0] + '” 바로 뒤에 ' + v +
        ' 가 있는데 이 프로그램의 값은 ' + close.join(' / ') + ' 이다');
    }
  }
});

console.log('랜드마크 δ 일관성 검사: ' + n + '건 | 불일치: ' + bad.length);
bad.forEach(b => console.log('   ✗ ' + b));
process.exit(bad.length ? 1 : 0);
