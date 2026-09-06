/* 부록 A·B의 물리 수치를 CODATA 값에서 다시 계산해 대조한다 */
const ROOT = require('path').join(__dirname, '..') + '/';
global.window = {};
require(ROOT + 'assets/js/data-lessons.js');
require(ROOT + 'assets/js/data-sources.js');

/* CODATA 2018 / NIST */
var G = { '1H': 42.577478, '2H': 6.535903, '13C': 10.7083974, '19F': 40.077583, '31P': 17.235123 };
var h = 6.62607015e-34, k = 1.380649e-23;
var ABUND = { '13C': 0.0107, '1H': 0.999885, '2H': 0.000115, '19F': 1.0, '31P': 1.0 };

var bad = [], n = 0;
function chk(label, got, want, tol) {
  n++;
  if (Math.abs(got - want) > tol) {
    bad.push(label + ': 본문 ' + want + ' vs 계산 ' + (+got.toFixed(6)));
  }
}

/* 본문에서 표 A-1을 읽어 온다 */
var lesson = window.LESSONS.filter(function (l) { return l.id === 'instrument'; })[0];
if (!lesson) { console.log('부록 A를 찾지 못했습니다'); process.exit(1); }
var tables = lesson.blocks.filter(function (b) { return b.type === 'table'; });
var t1 = tables[0];
var NAME = { '<sup>1</sup>H': '1H', '<sup>2</sup>H': '2H', '<sup>13</sup>C': '13C',
             '<sup>19</sup>F': '19F', '<sup>31</sup>P': '31P' };

t1.rows.forEach(function (r) {
  var nuc = NAME[r[0]], gamma = parseFloat(r[1]), nu = parseFloat(r[2]),
      ab = parseFloat(r[3]) / 100;
  chk('표 A-1 ' + nuc + ' γ/2π', G[nuc], gamma, 0.01);
  chk('표 A-1 ' + nuc + ' ν@9.4T', G[nuc] * 9.4, nu, 0.1);
  chk('표 A-1 ' + nuc + ' 존재비', ABUND[nuc], ab, 5e-5);
});

/* A.2 볼츠만 인구 차 (400 MHz, 298 K) */
chk('A.2 ΔN/N', h * 400.0e6 / (2 * k * 298), 3.2e-5, 0.05e-5);

/* A.3 상대 수용도 */
var ratio = G['1H'] / G['13C'];
chk('A.3 γ 비 (1H/13C)', ratio, 3.98, 0.01);
chk('A.3 γ³ 항', Math.pow(1 / ratio, 3), 1.6e-2, 0.05e-2);
chk('A.3 상대 수용도', Math.pow(1 / ratio, 3) * ABUND['13C'], 1.7e-4, 0.05e-4);
chk('A.3 “1/6000”', 1 / (Math.pow(1 / ratio, 3) * ABUND['13C']), 6000, 200);
chk('A.3 13C 두 개가 이웃할 확률', Math.pow(ABUND['13C'], 2), 1.1e-4, 0.05e-4);

/* A.5 이완 */
chk('A.5 5×T1 회복률', 1 - Math.exp(-5), 0.993, 0.0005);
chk('A.5 선폭 (T2*=1s)', 1 / Math.PI, 0.32, 0.005);
chk('A.5 최대 NOE (1 + γH/2γC)', 1 + ratio / 2, 2.99, 0.01);

/* A.1 / A.7 자기장 ↔ 주파수 */
chk('A.1 400 MHz의 B0', 400 / G['1H'], 9.4, 0.02);
chk('A.1 600 MHz의 B0', 600 / G['1H'], 14.1, 0.02);
chk('A.7 Δδ 0.04 @400MHz', 0.04 * 400, 16, 0.01);
chk('A.7 Δδ 0.04 @600MHz', 0.04 * 600, 24, 0.01);

/* A.4 적산 */
chk('A.4 S/N 2배에 필요한 스캔 배수', Math.pow(2, 2), 4, 0);
chk('A.4 S/N 4배에 필요한 스캔 배수', Math.pow(4, 2), 16, 0);
chk('A.4 디지털 분해능 (AT 2 s)', 1 / 2, 0.5, 0);

/* 본문에 등장하는 수치가 표와 어긋나지 않는지 (문자열 검사) */
function allText(l) {
  var out = [];
  l.blocks.forEach(function (b) {
    ['ko', 'en'].forEach(function (lang) {
      if (b[lang]) out.push(b[lang]);
      if (b.body && b.body[lang]) out.push(b.body[lang]);
      if (b.title && b.title[lang]) out.push(b.title[lang]);
      if (b.items) b.items.forEach(function (i) { if (i[lang]) out.push(i[lang]); });
    });
  });
  return out.join(' ');
}
var txt = allText(lesson);
var mustHave = ['400 MHz', '9.4 T', '14.1 T', '100.7 MHz', '3.2', '1.7', '5×T', '√n'];
mustHave.forEach(function (m) {
  n++;
  if (txt.indexOf(m) < 0) bad.push('본문에 없음: ' + m);
});

/* 새 출처가 등록되어 있는지, 부록의 refs가 실재하는지 */
['keeler', 'claridge', 'nist'].forEach(function (id) {
  n++;
  if (!window.SOURCES[id]) bad.push('SOURCES에 없음: ' + id);
});
window.LESSONS.forEach(function (l) {
  (l.refs || []).forEach(function (r) {
    n++;
    if (!window.SOURCES[r.r]) bad.push(l.id + '의 refs가 가리키는 출처 없음: ' + r.r);
  });
  l.blocks.forEach(function (b) {
    (b.src || []).forEach(function (sref) {
      var id = (typeof sref === 'string') ? sref : sref[0];
      n++;
      if (!window.SOURCES[id]) bad.push(l.id + '의 src가 가리키는 출처 없음: ' + id);
    });
  });
});

console.log('물리·출처 검사: ' + n + '건 | 불일치: ' + bad.length);
bad.forEach(function (b) { console.log('   ✗ ' + b); });
