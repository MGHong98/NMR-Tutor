/* 적대적 검증: 본문에 적힌 산술을 전부 다시 계산하고, 인용된 증분값을 표와 대조한다 */
const ROOT = require('path').join(__dirname, '..') + '/';
global.window = {};
require(ROOT + 'assets/js/data-lessons.js');
require(ROOT + 'assets/js/data-questions.js');

const TABLE = {  // Pretsch 표 (프로그램의 정본)
  'NO2':[0.95,0.26,0.38], 'COOH':[0.85,0.18,0.27], 'COOCH3':[0.71,0.11,0.21],
  'COCH3':[0.62,0.14,0.21], 'CHO':[0.56,0.22,0.29], 'CN':[0.36,0.18,0.28],
  'Br':[0.22,-0.13,-0.03], 'Cl':[0.02,-0.06,-0.04], 'H':[0,0,0],
  'NHCOCH3':[0.12,-0.07,-0.28], 'CH3':[-0.17,-0.09,-0.18], 'CH2CH3':[-0.15,-0.06,-0.18],
  'OCH3':[-0.48,-0.09,-0.44], 'OH':[-0.56,-0.12,-0.45], 'NMe2':[-0.66,-0.18,-0.67],
  'NH2':[-0.75,-0.25,-0.65]
};

// ---- 텍스트 수집 -----------------------------------------------------------
const texts = [];
function push(where, v){ if(!v) return;
  if(typeof v==='string'){ texts.push({where, s:v}); return; }
  if(v.ko) texts.push({where:where+'/ko', s:v.ko});
  if(v.en) texts.push({where:where+'/en', s:v.en});
}
window.LESSONS.forEach(l=>{
  push('L:'+l.id+'/lead', l.lead);
  l.blocks.forEach((b,i)=>{
    const w='L:'+l.id+'#'+i+':'+b.type;
    if(b.type==='p'||b.type==='h'||b.type==='formula') push(w,b);
    if(b.type==='note'){ push(w+':title',b.title); push(w+':body',b.body); }
    if(b.type==='ul'||b.type==='ol') b.items.forEach((it,j)=>push(w+':li'+j,it));
    if(b.type==='table'){ push(w+':cap',b.caption);
      b.rows.forEach((r,j)=>r.forEach((c,k)=>push(w+':r'+j+'c'+k,c))); }
    if(b.type==='spec') push(w+':cap',b.caption);
    if(b.type==='compare') b.cards.forEach((c,j)=>{push(w+':card'+j,c.title); push(w+':card'+j+'body',c.body);
      if(c.big) texts.push({where:w+':card'+j+'big', s:c.big});});
  });
});
window.QUESTIONS.forEach(q=>{
  push('Q:'+q.id+'/q', q.q); push('Q:'+q.id+'/e', q.e);
  if(q.o) q.o.forEach((o,i)=>push('Q:'+q.id+'/o'+i, o));
});

const strip = s => s.replace(/<sub>/g,'_{').replace(/<\/sub>/g,'}').replace(/<sup>/g,'^').replace(/<\/sup>/g,'')
                    .replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,' ').replace(/&#\d+;/g,' ');

// ---- 1) 산술 재계산 --------------------------------------------------------
function evalExpr(e){
  // 안전한 사칙연산 파서 (숫자, + - * / 괄호만 허용)
  if(!/^[\d\s.+\-*/()]+$/.test(e)) return null;
  try { return Function('"use strict";return (' + e + ')')(); } catch(x){ return null; }
}
const ARITH = /((?:\(?\s*)?[-−]?\d+(?:\.\d+)?(?:\s*[+\-−×÷*/]\s*\(?\s*[-−]?\d+(?:\.\d+)?\s*\)?)+)\s*=\s*(?:[-−]?\d+(?:\.\d+)?(?:\s*[+\-−×÷*/]\s*[-−]?\d+(?:\.\d+)?)+\s*=\s*)*([-−]?\d+(?:\.\d+)?)/g;
const arithBad = [], arithOk = [];
texts.forEach(({where,s})=>{
  // 10^n 꼴은 이 파서가 다루지 못하므로 가린다 (physics.js 가 따로 검증한다)
  const t = strip(s).replace(/\d+(?:\.\d+)?\s*×\s*10\^\s*[−-]?\d+/g, '@');
  let m;
  ARITH.lastIndex = 0;
  while((m = ARITH.exec(t))){
    if(/\^\s*$/.test(t.slice(0, m.index))) continue;   // 지수 자리의 숫자로 시작하는 매치는 건너뛴다
    const raw = m[1], expect = parseFloat(m[2].replace('−','-'));
    const norm = raw.replace(/−/g,'-').replace(/×/g,'*').replace(/÷/g,'/');
    // 괄호 균형 맞추기
    const open=(norm.match(/\(/g)||[]).length, close=(norm.match(/\)/g)||[]).length;
    const expr = open>close ? norm+')'.repeat(open-close) : (close>open ? '('.repeat(close-open)+norm : norm);
    const got = evalExpr(expr);
    if(got===null) continue;
    if(Math.abs(got-expect) > 0.005) arithBad.push({where, expr:raw+' = '+m[2], computed:+got.toFixed(4)});
    else arithOk.push(where);
  }
});
console.log('=== 1) 산술 검증 ===');
console.log('  검사한 식:', arithOk.length + arithBad.length, '| 불일치:', arithBad.length);
arithBad.forEach(b=>console.log('   ✗', b.where, '→', b.expr, '(실제', b.computed+')'));

// ---- 2) 인용된 증분 3연값이 표에 있는지 -----------------------------------
const TRIP = /(?:ortho|o)\s*([+\-−]\d+\.\d+)\s*,\s*(?:meta|m)\s*([+\-−]\d+\.\d+)\s*,\s*(?:para|p)\s*([+\-−]\d+\.\d+)/g;
const tripBad = []; let tripN = 0;
texts.forEach(({where,s})=>{
  const t = strip(s); let m; TRIP.lastIndex = 0;
  while((m = TRIP.exec(t))){
    tripN++;
    const v = [m[1],m[2],m[3]].map(x=>parseFloat(x.replace('−','-')));
    const hit = Object.keys(TABLE).some(k=>TABLE[k].every((x,i)=>Math.abs(x-v[i])<0.005));
    if(!hit) tripBad.push({where, quoted:v.join(', ')});
  }
});
console.log('=== 2) 인용된 증분 3연값 ↔ 정본 표 ===');
console.log('  검사한 3연값:', tripN, '| 표에 없는 값:', tripBad.length);
tripBad.forEach(b=>console.log('   ✗', b.where, '→', b.quoted));

// ---- 3) 개별 증분 인용 (예: "o +0.95") 이 표의 어느 값과도 안 맞는 경우 ----
const SINGLE = /\b(?:ortho|meta|para)\s*([+\-−]\d+\.\d+)/g;
const allVals = new Set(); Object.keys(TABLE).forEach(k=>TABLE[k].forEach(v=>allVals.add(v.toFixed(2))));
const singleBad = []; let singleN=0;
texts.forEach(({where,s})=>{
  const t=strip(s); let m; SINGLE.lastIndex=0;
  while((m=SINGLE.exec(t))){ singleN++;
    const v=parseFloat(m[1].replace('−','-'));
    if(!allVals.has(v.toFixed(2)) && !allVals.has((-v).toFixed(2))) singleBad.push({where, quoted:m[0]});
  }
});
console.log('=== 3) 개별 증분 인용 ===');
console.log('  검사:', singleN, '| 표에 없는 값:', singleBad.length);
singleBad.forEach(b=>console.log('   ✗', b.where, '→', b.quoted));

// ---- 4) order 문항: 해설에 적힌 수치 순서가 정답 순서와 맞는가 ------------
console.log('=== 4) 순서 배열 문항의 해설 수치 단조성 ===');
window.QUESTIONS.filter(q=>q.type==='order').forEach(q=>{
  const t = strip(q.e.ko);
  const nums = (t.match(/\d+\.\d{2}/g)||[]).map(Number);
  const head = nums.slice(0, q.a.length);
  const inc = head.every((v,i)=>i===0||v>=head[i-1]);
  console.log(' ', q.id, '해설 앞부분 수치:', head.join(' < '), inc ? '→ 증가 순 ✓' : '→ ⚠ 증가 순 아님');
});
