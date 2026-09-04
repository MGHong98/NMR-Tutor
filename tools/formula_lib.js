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


function norm(s){ return fmt(parseFormula(s)); }
module.exports = { parseFormula:parseFormula, fmt:fmt, norm:norm, molFormula:molFormula,
                   chainFormula:chainFormula, QUESTIONS: window.QUESTIONS, LESSONS: window.LESSONS };
