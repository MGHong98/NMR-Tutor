import { chromium, BASE } from './pw.mjs';
const DETECT = () => {
  const out = { svgOverlap: [], clipped: [], hOverflow: false, offscreen: [] };
  const R = el => el.getBoundingClientRect();
  const area = r => Math.max(0,r.width)*Math.max(0,r.height);
  const inter = (a,b) => { const x=Math.min(a.right,b.right)-Math.max(a.left,b.left);
    const y=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top); return (x>1&&y>1)?x*y:0; };
  out.svgClip = []; out.tiny = [];
  document.querySelectorAll('svg.nmr-spec, svg.mol').forEach((svg,si)=>{
    const sr=R(svg);
    const ts=[...svg.querySelectorAll('text')].filter(t=>t.textContent.trim());
    // 렌더된 실제 글자 높이가 7px 미만이면 읽을 수 없다고 본다
    if(ts.length && svg.classList.contains('nmr-spec')){ const h=R(ts[0]).height; if(h>0 && h<7) out.tiny.push({svg:si, renderedTextPx:+h.toFixed(1)}); }
    ts.forEach(t=>{ const r=R(t);
      if(r.top < sr.top-0.5 || r.bottom > sr.bottom+0.5 || r.left < sr.left-0.5 || r.right > sr.right+0.5)
        out.svgClip.push({text:t.textContent.slice(0,28),
          dTop:+(r.top-sr.top).toFixed(0), dBottom:+(r.bottom-sr.bottom).toFixed(0),
          dLeft:+(r.left-sr.left).toFixed(0), dRight:+(r.right-sr.right).toFixed(0)}); });
    for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){
      const a=R(ts[i]),b=R(ts[j]),ov=inter(a,b);
      if(ov>4) out.svgOverlap.push({a:ts[i].textContent,b:ts[j].textContent,
        px:+ov.toFixed(0), frac:+(ov/Math.min(area(a),area(b)||1)).toFixed(2)});
    }});
  document.querySelectorAll('#main p,#main li,#main h2,#main h3,#main h4,#main td,#main th,.opt,.chip,.out-cell .val,.out-cell .sub,.badge,.qtag,.set-card .st,.stat .val,.bib .cite,.explain,.note,figcaption,caption').forEach(el=>{
    const cs=getComputedStyle(el);
    if(cs.overflowX==='auto'||cs.overflowX==='scroll')return;
    if(el.scrollWidth>el.clientWidth+2&&cs.overflow!=='visible')
      out.clipped.push({tag:el.tagName+'.'+el.className,text:el.textContent.trim().slice(0,45),sw:el.scrollWidth,cw:el.clientWidth});
  });
  out.hOverflow = document.documentElement.scrollWidth>document.documentElement.clientWidth+1;
  document.querySelectorAll('#main *').forEach(el=>{ const r=R(el);
    if(r.width>0&&(r.left<-2||r.right>document.documentElement.clientWidth+2)){
      if(!el.closest('.tbl-wrap,figure.spec,.order-tray'))
        out.offscreen.push({tag:el.tagName+'.'+(typeof el.className==='string'?el.className:''),l:+r.left.toFixed(0),r:+r.right.toFixed(0)});
    }});
  return out;
};
const problems=[]; let svgRenders=0;
let screens=0;
const rec=(tag,r)=>{ screens++; r.svgOverlap.forEach(o=>problems.push({where:tag,kind:'svg-overlap',...o}));
  (r.svgClip||[]).forEach(o=>problems.push({where:tag,kind:'svg-clip',...o}));
  (r.tiny||[]).forEach(o=>problems.push({where:tag,kind:'text-too-small',...o}));
  r.clipped.forEach(o=>problems.push({where:tag,kind:'clipped',...o}));
  r.offscreen.forEach(o=>problems.push({where:tag,kind:'offscreen',...o}));
  if(r.hOverflow) problems.push({where:tag,kind:'h-overflow'}); };

const b=await chromium.launch();
const SPEC_Q=['B4','C8','C11','F1','H2','H3','H4'];
for(const [w,h] of [[320,700],[375,812],[768,900],[1024,900],[1440,900]]){
  const p=await b.newPage({viewport:{width:w,height:h}});
  await p.goto(BASE + '/index.html'); await p.waitForTimeout(200);
  for(const lang of ['ko','en']){
    await p.locator(`.lang-btn[data-lang="${lang}"]`).click(); await p.waitForTimeout(80);
    await p.locator('.tab[data-view="learn"]').click();
    const ids=await p.locator('#lessonNav button').evaluateAll(ns=>ns.map(n=>n.getAttribute('data-id')));
    for(const id of ids){ await p.locator(`#lessonNav button[data-id="${id}"]`).click(); await p.waitForTimeout(60);
      svgRenders+=await p.locator('.view:not(.is-hidden) svg.nmr-spec, .view:not(.is-hidden) svg.mol').count();
      rec(`${w}/${lang}/lesson:${id}`, await p.evaluate(DETECT)); }
    await p.locator('.tab[data-view="tools"]').click(); await p.waitForTimeout(120);
    for(const [a,bb,rel] of [['Cl','none','4'],['NO2','OCH3','4'],['NH2','NO2','2'],['CH3','CH2CH3','3'],
                             ['NMe2','none','4'],['H','none','4'],['CHO','OH','2'],['Br','CH3','3'],['OH','NO2','3']]){
      await p.selectOption('#selA',a); await p.selectOption('#selB',bb); await p.selectOption('#selR',rel);
      await p.waitForTimeout(70); svgRenders+=await p.locator('.view:not(.is-hidden) svg.nmr-spec, .view:not(.is-hidden) svg.mol').count();
      rec(`${w}/${lang}/calc:${a}+${bb}@${rel}`, await p.evaluate(DETECT)); }
    for(const v of ['progress','sources']){ await p.locator(`.tab[data-view="${v}"]`).click(); await p.waitForTimeout(120);
      rec(`${w}/${lang}/${v}`, await p.evaluate(DETECT)); }
    // 새 패널: 기록 내보내기·불러오기, 무결성 확인
    await p.locator('.tab[data-view="progress"]').click(); await p.waitForTimeout(90);
    await p.locator('[data-act="io-export"]').click(); await p.waitForTimeout(90);
    rec(`${w}/${lang}/io-export`, await p.evaluate(DETECT));
    await p.locator('[data-act="io-import"]').click(); await p.waitForTimeout(90);
    rec(`${w}/${lang}/io-import`, await p.evaluate(DETECT));
    await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(90);
    await p.locator('[data-act="integ"]').click(); await p.waitForTimeout(260);
    rec(`${w}/${lang}/integrity`, await p.evaluate(DETECT));
  }
  console.log('  [phase1 누적]', w, svgRenders, '문제', problems.length);
  await p.close();
}
console.log('=== 단원+계산기 소계:', svgRenders);
// 문항 화면(스펙트럼 포함 + 각 유형)은 2개 뷰포트에서
for(const [w,h] of [[375,812],[1280,900]]){
  const p=await b.newPage({viewport:{width:w,height:h}});
  await p.goto(BASE + '/index.html'); await p.waitForTimeout(200);
  for(const lang of ['ko','en']){
    await p.locator(`.lang-btn[data-lang="${lang}"]`).click(); await p.waitForTimeout(80);
    await p.locator('.tab[data-view="practice"]').click(); await p.waitForTimeout(100);
    rec(`${w}/${lang}/set-picker`, await p.evaluate(DETECT));
    const sets=await p.locator('.set-card').evaluateAll(ns=>ns.map(n=>n.getAttribute('data-id')));
    for(const s of sets){
      await p.locator(`.set-card[data-id="${s}"]`).click(); await p.waitForTimeout(70);
      for(;;){
        if(!(await p.locator('.qprompt').count())) break;
        const qid=await p.locator('.qtag').nth(1).innerText();
        const type=(await p.locator('.qtag').nth(2).innerText()).toLowerCase();
        if(await p.locator('#opts .opt').count()) await p.locator('#opts .opt').first().click();
        else if(await p.locator('#tray .chip').count()){ const c=await p.locator('#tray .chip').count();
          for(let i=0;i<c;i++) await p.locator('#tray .chip:not([disabled])').first().click(); }
        else if(await p.locator('#numIn').count()) await p.locator('#numIn').fill('7');
        await p.locator('#actBtn').click(); await p.waitForTimeout(35);
        // 채점된 상태(해설 + 구조식 포함)를 검사한다
        svgRenders+=await p.locator('.view:not(.is-hidden) svg.nmr-spec, .view:not(.is-hidden) svg.mol').count();
        rec(`${w}/${lang}/${qid}(${type})`, await p.evaluate(DETECT));
        await p.locator('#actBtn').click(); await p.waitForTimeout(35);
        if(await p.locator('.result').count()) break;
      }
      await p.locator('[data-act="quit"]').click(); await p.waitForTimeout(60);
    }
  }
  console.log('  [phase2 누적]', w, svgRenders, '문제', problems.length);
  await p.close();
}
await b.close();
console.log('검사한 화면 수:', screens);
console.log('SVG 렌더 검사 횟수(스펙트럼+구조식):', svgRenders);
console.log('문제 총 건수:', problems.length);
const byKind={}; problems.forEach(p=>byKind[p.kind]=(byKind[p.kind]||0)+1);
console.log('유형별:', JSON.stringify(byKind));
const seen=new Set(); let n=0;
for(const p of problems){ const k=p.kind+'|'+(p.a||'')+(p.b||'')+(p.text||'')+(p.tag||'');
  if(seen.has(k))continue; seen.add(k); console.log('  -',JSON.stringify(p)); if(++n>35){console.log('  ...');break;} }
