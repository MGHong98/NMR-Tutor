/* 문항 지문이 밝힌 분자식 ↔ 그 문항 해설 구조식이 실제로 그리는 분자식 */
var F = require('./formula_lib.js');
var Q = F.QUESTIONS;
var probs = [], n = 0;
var RE = /\bC(\d{1,2})H(\d{1,2})((?:[A-Z][a-z]?\d{0,2})*)\b/g;

function strip(s){ return String(s).replace(/<sub>/g,'').replace(/<\/sub>/g,'').replace(/<[^>]+>/g,''); }

Q.forEach(function(q){
  var txt = strip(q.q.ko), m, stated = [];
  RE.lastIndex = 0;
  while ((m = RE.exec(txt))) { stated.push(m[0]); }
  if (!stated.length || !q.mol || !q.mol.length) { return; }
  var drawn = q.mol.map(function(x){ return F.fmt(F.molFormula(x)); });
  n++;
  var hit = stated.some(function(s){ return drawn.indexOf(F.norm(s)) >= 0; });
  if (!hit) {
    probs.push('  ✗ ' + q.id + '  지문 분자식 ' + stated.join(' / ') + '  ↔  그림 ' + drawn.join(' / '));
  }
});
console.log('분자식이 명시된 문항 중 구조식이 있는 것: ' + n + '건');
console.log(probs.length ? probs.join('\n') : '  모두 일치');
