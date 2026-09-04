/* 구조식 사양이 "실제로 그리는" 분자식을 원자가 계산으로 역산해, 의도한 화합물과 대조한다. */
const ROOT = require('path').join(__dirname, '..') + '/';
global.window = {};
require(ROOT + 'assets/js/structure.js');
require(ROOT + 'assets/js/data-lessons.js');
require(ROOT + 'assets/js/data-questions.js');
var GROUPS = window.Structure.GROUPS;

/* ---- 화학식 문자열 파서: "N(CH3)2" -> {C:2,H:6,N:1} ---- */
function parseFormula(str) {
  var i = 0;
  function group() {
    var acc = {};
    while (i < str.length) {
      var c = str.charAt(i);
      if (c === '(') { i++; var inner = group(); i++; /* ')' */
        var mult = 1, d = '';
        while (i < str.length && str.charAt(i) >= '0' && str.charAt(i) <= '9') { d += str.charAt(i); i++; }
        if (d) { mult = parseInt(d, 10); }
        for (var k in inner) { acc[k] = (acc[k] || 0) + inner[k] * mult; }
        continue;
      }
      if (c === ')') { return acc; }
      if (c >= 'A' && c <= 'Z') {
        var el = c; i++;
        if (i < str.length && str.charAt(i) >= 'a' && str.charAt(i) <= 'z') { el += str.charAt(i); i++; }
        var n = '';
        while (i < str.length && str.charAt(i) >= '0' && str.charAt(i) <= '9') { n += str.charAt(i); i++; }
        acc[el] = (acc[el] || 0) + (n ? parseInt(n, 10) : 1);
        continue;
      }
      i++;   /* 그 밖의 문자(^, +, -)는 무시 */
    }
    return acc;
  }
  return group();
}
function add(a, b, m) { m = m || 1; for (var k in b) { a[k] = (a[k] || 0) + b[k] * m; } return a; }
function fmt(f) {
  var order = ['C', 'H'], keys = Object.keys(f).filter(function (k) { return f[k] > 0; });
  keys.sort(); var out = '';
  ['C', 'H'].forEach(function (e) { if (f[e]) { out += e + (f[e] > 1 ? f[e] : ''); } });
  keys.forEach(function (e) { if (e !== 'C' && e !== 'H') { out += e + (f[e] > 1 ? f[e] : ''); } });
  return out || '-';
}

/* ---- 사슬의 분자식 ---- */
function chainFormula(nodes, hasOrigin) {
  var f = {}, n = nodes.length, k;
  function order(a, b) { return nodes[a].db ? 2 : (nodes[b].tb ? 3 : 1); }
  for (k = 0; k < n; k++) {
    var nd = nodes[k], bonds = 0;
    bonds += (k === 0) ? (hasOrigin ? 1 : 0) : order(k - 1, k);
    bonds += (k === n - 1) ? 0 : order(k, k + 1);
    if (nd.dbl) { bonds += 2; add(f, parseFormula(nd.dbl)); }
    if (nd.br)  { bonds += 1; add(f, parseFormula(nd.br)); }
    if (nd.br2) { bonds += 1; add(f, parseFormula(nd.br2)); }
    if (nd.brC) { bonds += 1; add(f, { C: 1, H: 3 }); }
    if (nd.brC2){ bonds += 1; add(f, { C: 1, H: 3 }); }
    if (nd.label) { add(f, parseFormula(nd.label)); }
    else { add(f, { C: 1, H: Math.max(0, 4 - bonds) }); }
  }
  return f;
}

/* ---- 그림 전체의 분자식 ---- */
function molFormula(m) {
  if (m.kind === 'chain') { return chainFormula(m.nodes || [], false); }
  var f = { C: 6 }, subs = m.subs || {}, free = 0, k;
  for (k = 1; k <= 6; k++) {
    var v = subs[k];
    if (!v) { free++; continue; }
    var name = (typeof v === 'string') ? v : (v.g || v.t);
    if (typeof v !== 'string' && v.t) { add(f, parseFormula(v.t)); }
    else if (GROUPS[name]) { add(f, chainFormula(GROUPS[name], true)); }
    else { add(f, parseFormula(name)); }
  }
  add(f, { H: free });
  return f;
}

/* ---- 의도한 화합물의 분자식 (이름 -> 화학식) ---- */
var EXPECT = {
  'propanal': 'C3H6O', '1-chloropropane': 'C3H7Cl', '1-nitropropane': 'C3H7NO2',
  'ethyl acetate': 'C4H8O2', 'nitrobenzene': 'C6H5NO2', 'anisole': 'C7H8O', 'benzene': 'C6H6',
  'chlorobenzene': 'C6H5Cl', '4-nitroanisole': 'C7H7NO3', '1-pentyne': 'C5H8', 'toluene': 'C7H8',
  'ethyl benzoate': 'C9H10O2', 'methyl phenylacetate': 'C9H10O2', 'methyl propanoate': 'C4H8O2',
  '1-bromopropane': 'C3H7Br', '4-nitrotoluene': 'C7H7NO2', '4-methoxybenzaldehyde': 'C8H8O2',
  'acetophenone': 'C8H8O', '4-methylanisole': 'C8H10O', '4-nitroaniline': 'C6H6N2O2',
  'propene': 'C3H6', '1,1,2-trichloroethane': 'C2H3Cl3', 'p-xylene': 'C8H10', 'o-xylene': 'C8H10',
  'benzyl alcohol': 'C7H8O', 'methyl benzoate': 'C8H8O2', 'phenyl acetate': 'C8H8O2',
  '3-nitrotoluene': 'C7H7NO2', '2-propanol': 'C3H8O', 'methanol': 'CH4O',
  'tert-butyl alcohol': 'C4H10O', 'benzaldehyde': 'C7H6O', 'benzoic acid': 'C7H6O2',
  '4-chloronitrobenzene': 'C6H4ClNO2', '4-aminoacetophenone': 'C8H9NO', 'styrene': 'C8H8',
  'propanoic acid': 'C3H6O2', 'methyl formate': 'C2H4O2', 'acetic acid': 'C2H4O2',
  'cumene': 'C9H12', '4-nitroethylbenzene': 'C8H9NO2', '4-methylbenzaldehyde': 'C8H8O',
  'p-cresol': 'C7H8O'
};
/* note 문자열에서 화합물 이름만 뽑아낸다 */
function nameOf(note) {
  if (!note) { return null; }
  var s = String(note).toLowerCase();
  s = s.replace(/^[a-z]\s*[:=]\s*/, '');           /* "A: ", "X = " */
  s = s.replace(/\s*\(.*$/, '');                    /* "(13C)" 등 */
  s = s.replace(/\s*:\s.*$/, '');                   /* ": 3 signals" 등 */
  s = s.replace(/\s+(13c|1h)$/, '').trim();
  return s;
}

var rows = [], bad = 0, unknown = [];
function check(m, where) {
  var nm = nameOf(m.note);
  var got = fmt(molFormula(m));
  var exp = nm && EXPECT[nm];
  if (!exp) { unknown.push((m.note || '(이름 없음)') + '  ← ' + where); return; }
  var ok = (got === exp);
  if (!ok) { bad++; }
  rows.push({ ok: ok, note: m.note, got: got, exp: exp, where: where });
}
var seen = {};
window.LESSONS.forEach(function (l) {
  l.blocks.forEach(function (b, i) { if (b.type === 'mol') { (b.mols || []).forEach(function (m) {
    var key = (m.note || '') + JSON.stringify(m); if (seen[key]) { return; } seen[key] = 1;
    check(m, 'L:' + l.id + '#' + i); }); } });
});
window.QUESTIONS.forEach(function (q) {
  (q.mol || []).forEach(function (m) {
    var key = (m.note || '') + JSON.stringify(m); if (seen[key]) { return; } seen[key] = 1;
    check(m, 'Q:' + q.id); });
});

console.log('=== 그림이 실제로 그리는 분자식 ↔ 의도한 화합물 ===');
rows.forEach(function (r) {
  console.log((r.ok ? '  OK   ' : '  ✗ 불일치 ') + (r.note + '').padEnd(38) +
    ' 그림=' + r.got.padEnd(11) + ' 기대=' + r.exp.padEnd(11) + (r.ok ? '' : '   ' + r.where));
});
console.log('검사한 구조: ' + rows.length + ' | 불일치: ' + bad);
if (unknown.length) { console.log('기대 화학식을 등록하지 않은 그림:'); unknown.forEach(function (u) { console.log('   ' + u); }); }
