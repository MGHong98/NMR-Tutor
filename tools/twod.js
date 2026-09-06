/* 2차원 지도의 자체 정합성 검사
 * Consistency of the 2D correlation maps:
 *   - 모든 교차 봉우리의 좌표가 1차원 투영 목록에 실제로 있는 값인가
 *   - 축 범위가 모든 봉우리와 투영을 담고 있는가
 *   - 동핵/이핵 실험의 축 구성이 실험 종류와 맞는가
 *   - 같은 화합물을 그린 1차원 그림과 δ 값이 어긋나지 않는가
 */
const ROOT = require('path').join(__dirname, '..') + '/';
global.window = {};
require(ROOT + 'assets/js/spectrum.js');
require(ROOT + 'assets/js/spectrum2d.js');
require(ROOT + 'assets/js/data-lessons.js');
require(ROOT + 'assets/js/data-questions.js');
const W = global.window;

const TOL = 0.02;
let n = 0, bad = [];
function fail(where, msg) { bad.push(where + ' — ' + msg); }
function near(a, list) { return list.some(p => Math.abs(p.ppm - a) <= TOL); }

/* 검사 대상 모으기 / collect every 2D spec in the program */
const maps = [];
W.LESSONS.forEach(l => (l.blocks || []).forEach((b, i) => {
  if (b.type === 'spec2d') { maps.push({ where: 'L:' + l.id + '#' + i, spec: b.spec }); }
}));
W.QUESTIONS.forEach(q => {
  if (q.spec2d) { maps.push({ where: 'Q:' + q.id + '/stem', spec: q.spec2d }); }
  if (q.mol2d) { maps.push({ where: 'Q:' + q.id + '/expl', spec: q.mol2d }); }
});

maps.forEach(({ where, spec }) => {
  const homo = W.Spectrum2D.isHomo(spec.kind);
  const xs = spec.x || [], ys = spec.y || [], peaks = spec.peaks || [];

  n++;
  if (!xs.length || !ys.length) { fail(where, '1차원 투영이 비어 있다'); }

  /* 축 구성 / axis configuration */
  n++;
  const n2 = (spec.f2 || {}).nucleus, n1 = (spec.f1 || {}).nucleus;
  if (homo && n2 !== n1) { fail(where, '동핵 실험인데 두 축의 핵이 다르다: ' + n2 + ' / ' + n1); }
  if (!homo && n2 === n1) { fail(where, '이핵 실험인데 두 축의 핵이 같다: ' + n2); }

  n++;
  if (homo) {
    const a = xs.map(p => p.ppm).sort().join(','), b = ys.map(p => p.ppm).sort().join(',');
    if (a !== b) { fail(where, '동핵 실험인데 두 축의 투영 목록이 다르다'); }
  }

  /* 축 범위가 모든 값을 담는가 / does the axis window contain everything? */
  xs.forEach(p => {
    n++;
    if (p.ppm < spec.f2.min || p.ppm > spec.f2.max) { fail(where, 'F2 축 밖의 투영: ' + p.ppm); }
  });
  ys.forEach(p => {
    n++;
    if (p.ppm < spec.f1.min || p.ppm > spec.f1.max) { fail(where, 'F1 축 밖의 투영: ' + p.ppm); }
  });

  /* 교차 봉우리의 좌표가 투영에 실제로 있는 값인가 / are cross peaks on real 1D lines? */
  peaks.forEach(p => {
    n++;
    if (!near(p.f2, xs)) { fail(where, 'F2 좌표 ' + p.f2 + ' 가 1차원 투영에 없다'); }
    n++;
    if (!near(p.f1, ys)) { fail(where, 'F1 좌표 ' + p.f1 + ' 가 1차원 투영에 없다'); }
    n++;
    if (homo && Math.abs(p.f2 - p.f1) <= TOL) { fail(where, '대각선 위의 교차 봉우리: ' + p.f2); }
  });

  /* 핵마다 있을 법한 범위 / plausible ranges per nucleus */
  const RANGE = { '1H': [-1, 14], '13C': [0, 230] };
  [[n2, xs], [n1, ys]].forEach(([nuc, list]) => {
    const r = RANGE[nuc];
    if (!r) { return; }
    list.forEach(p => {
      n++;
      if (p.ppm < r[0] || p.ppm > r[1]) { fail(where, nuc + ' 로서 있을 수 없는 δ: ' + p.ppm); }
    });
  });
});

/* 같은 화합물의 1차원 그림과 어긋나지 않는가 (에틸 벤조에이트) */
const ETHYL_BENZOATE_H = [8.04, 7.55, 7.43, 4.37, 1.39];
let oneD = null;
W.LESSONS.forEach(l => (l.blocks || []).forEach(b => {
  if (b.type === 'spec' && b.spec && /ethyl benzoate/i.test(JSON.stringify(b.src || ''))) {
    oneD = b.spec.peaks.map(p => p.ppm).sort((a, b2) => b2 - a);
  }
}));
n++;
if (!oneD) {
  fail('cross-check', '8단원의 에틸 벤조에이트 1차원 그림을 찾지 못했다');
} else if (oneD.join(',') !== ETHYL_BENZOATE_H.slice().sort((a, b) => b - a).join(',')) {
  fail('cross-check', '1차원 그림의 δ 목록이 2차원 지도와 다르다: ' + oneD.join(', '));
}
maps.forEach(({ where, spec }) => {
  if (!/1H/.test((spec.f2 || {}).nucleus)) { return; }
  const xs = (spec.x || []).map(p => p.ppm).sort((a, b) => b - a);
  if (xs.length !== ETHYL_BENZOATE_H.length) { return; }        /* 다른 화합물의 지도는 넘어간다 */
  n++;
  if (xs.join(',') !== ETHYL_BENZOATE_H.slice().sort((a, b) => b - a).join(',')) {
    fail(where, '에틸 벤조에이트의 1H 값과 다르다: ' + xs.join(', '));
  }
});

console.log('2차원 지도 검사: ' + maps.length + '장 | 검사 ' + n + '건 | 문제: ' + bad.length);
bad.forEach(b => console.log('   ✗ ' + b));
process.exit(bad.length ? 1 : 0);
