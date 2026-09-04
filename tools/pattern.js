/* (1) 치환 위치가 이름과 맞는가  (2) 고리 자리의 δ 주석이 증분 예측과 맞는가 */
const ROOT = require('path').join(__dirname, '..') + '/';
global.window = {};
require(ROOT + 'assets/js/structure.js');
require(ROOT + 'assets/js/data-lessons.js');
require(ROOT + 'assets/js/data-questions.js');

var INC = {
  'NO2':[0.95,0.26,0.38], 'COOH':[0.85,0.18,0.27], 'COOCH3':[0.71,0.11,0.21],
  'COOCH2CH3':[0.71,0.11,0.21], 'COCH3':[0.62,0.14,0.21], 'CHO':[0.56,0.22,0.29],
  'CN':[0.36,0.18,0.28], 'Br':[0.22,-0.13,-0.03], 'Cl':[0.02,-0.06,-0.04],
  'NHCOCH3':[0.12,-0.07,-0.28], 'CH3':[-0.17,-0.09,-0.18], 'CH2CH3':[-0.15,-0.06,-0.18],
  'iPr':[-0.13,-0.08,-0.18], 'OCH3':[-0.48,-0.09,-0.44], 'OH':[-0.56,-0.12,-0.45],
  'NMe2':[-0.66,-0.18,-0.67], 'NH2':[-0.75,-0.25,-0.65],
  /* 표 밖의 근사치 (교차 검사용) */
  'CH2OH':[-0.07,-0.07,-0.07], 'CH2COOCH3':[-0.05,-0.05,-0.05],
  'OCOCH3':[-0.25,0.03,-0.13], 'CHCH2':[0.06,-0.03,-0.10]
};
function rel(i, j) { var d = ((i - j) % 6 + 6) % 6; return (d===1||d===5)?0:((d===2||d===4)?1:2); }
var RELNAME = ['ortho','meta','para'];

function subName(v){ return (typeof v==='string')?v:(v.g||v.t); }

/* 이름에서 기대되는 치환 관계 */
function expectedRel(note){
  var s=String(note||'').toLowerCase();
  if (/(^|[^a-z])o-|1,2-|(^|\W)2-(nitro|methyl|methoxy|chloro|amino)/.test(s)) return 'ortho';
  if (/(^|[^a-z])m-|1,3-|(^|\W)3-(nitro|methyl|methoxy|chloro|amino)/.test(s)) return 'meta';
  if (/(^|[^a-z])p-|1,4-|(^|\W)4-(nitro|methyl|methoxy|chloro|amino|hydroxy)/.test(s)) return 'para';
  return null;
}

var problems = [], nPat = 0, nAnn = 0, seen = {};
function check(m, where){
  if (m.kind === 'chain') return;
  var subs = m.subs || {}, ann = m.ann || {}, pos = [], k;
  for (k = 1; k <= 6; k++) if (subs[k]) pos.push(k);

  /* --- (1) 치환 관계 --- */
  var want = expectedRel(m.note);
  if (want && pos.length === 2) {
    nPat++;
    var got = RELNAME[rel(pos[0], pos[1])];
    if (got !== want) problems.push({kind:'치환위치', note:m.note, where:where, msg:'이름은 '+want+' 인데 그림은 '+got});
  }

  /* --- (2) 고리 자리 δ 주석 ↔ 증분 예측 --- */
  var isC13 = false;
  for (k in ann) { if (parseFloat(ann[k]) > 50) isC13 = true; }
  if (isC13) return;
  for (k = 1; k <= 6; k++) {
    if (subs[k] || !ann[k]) continue;
    var v = parseFloat(ann[k]); if (isNaN(v)) continue;
    var pred = 7.26, ok = true, p;
    for (p = 0; p < pos.length; p++) {
      var nm = subName(subs[pos[p]]);
      if (!INC[nm]) { ok = false; break; }
      pred += INC[nm][rel(k, pos[p])];
    }
    if (!ok) continue;
    nAnn++;
    if (Math.abs(pred - v) > 0.35) {
      problems.push({kind:'δ 주석', note:m.note, where:where,
        msg:'위치 '+k+': 표기 '+v.toFixed(2)+' vs 증분 예측 '+pred.toFixed(2)+' (차 '+(v-pred).toFixed(2)+')'});
    }
  }
}
window.LESSONS.forEach(function(l){ l.blocks.forEach(function(b,i){ if(b.type==='mol')
  (b.mols||[]).forEach(function(m){ var key=JSON.stringify(m); if(seen[key])return; seen[key]=1; check(m,'L:'+l.id+'#'+i); }); }); });
window.QUESTIONS.forEach(function(q){ (q.mol||[]).forEach(function(m){
  var key=JSON.stringify(m); if(seen[key])return; seen[key]=1; check(m,'Q:'+q.id); }); });

console.log('치환 관계 검사: ' + nPat + '건 | δ 주석 교차 검사: ' + nAnn + '건');
if (!problems.length) console.log('모두 통과');
else problems.forEach(function(p){ console.log('  ✗ ['+p.kind+'] '+p.note+'  ('+p.where+')\n      '+p.msg); });
