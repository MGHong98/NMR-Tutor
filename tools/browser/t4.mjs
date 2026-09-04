import { chromium, BASE } from './pw.mjs';
import { SHOTS as S } from './pw.mjs';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:1000}});
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text());});
await p.goto(BASE + '/index.html'); await p.waitForTimeout(400);

console.log('tabs:', (await p.locator('#tabbar .tab').allInnerTexts()).join(' | '));
// source lines present in lessons?
await p.locator('#lessonNav button[data-id="ewg-edg"]').click(); await p.waitForTimeout(250);
console.log('L4 caption sources:', await p.locator('#lessonBody .src').count());
console.log('L4 first table src:', await p.locator('#lessonBody caption .src').first().innerText());
console.log('L4 figure src:', await p.locator('#lessonBody figure.spec .src').first().innerText());
console.log('lesson refs box:', (await p.locator('#lessonBody .note-tip li').allInnerTexts()).length);
await p.screenshot({path:S+'30-lesson4-src.png'});

// sources tab
await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(300);
console.log('bibliography entries:', await p.locator('#sourcesBody .bib li').count());
console.log('provenance rows:', await p.locator('#sourcesBody tbody tr').count());
console.log('caveats:', await p.locator('#sourcesBody .caveats li').count());
await p.screenshot({path:S+'31-sources.png', fullPage:true});

// full sweep both languages
for (const lang of ['ko','en']) {
  await p.locator(`.lang-btn[data-lang="${lang}"]`).click(); await p.waitForTimeout(200);
  await p.locator('.tab[data-view="learn"]').click();
  const ids=await p.locator('#lessonNav button').evaluateAll(ns=>ns.map(n=>n.getAttribute('data-id')));
  for(const id of ids){ await p.locator(`#lessonNav button[data-id="${id}"]`).click(); await p.waitForTimeout(60);
    if(!(await p.locator('#lessonBody h2').innerText())) errs.push('empty lesson '+id); }
  await p.locator('.tab[data-view="practice"]').click(); await p.waitForTimeout(200);
  if(await p.locator('[data-act="quit"]').count()){ await p.locator('[data-act="quit"]').click(); await p.waitForTimeout(150);}
  const sets=await p.locator('.set-card').evaluateAll(ns=>ns.map(n=>n.getAttribute('data-id')));
  let n=0;
  for(const s of sets){
    await p.locator(`.set-card[data-id="${s}"]`).click(); await p.waitForTimeout(120);
    for(;;){
      if(!(await p.locator('.qprompt').count())) break;
      if(await p.locator('#opts .opt').count()) await p.locator('#opts .opt').first().click();
      else if(await p.locator('#tray .chip').count()){ const c=await p.locator('#tray .chip').count();
        for(let i=0;i<c;i++) await p.locator('#tray .chip:not([disabled])').first().click(); }
      else if(await p.locator('#numIn').count()) await p.locator('#numIn').fill('7');
      await p.locator('#actBtn').click(); await p.waitForTimeout(50);
      if(!(await p.locator('.explain').count())) errs.push('no explain '+s);
      if(!(await p.locator('.explain .ref').count())) errs.push('no source line '+s);
      n++;
      await p.locator('#actBtn').click(); await p.waitForTimeout(60);
      if(await p.locator('.result').count()) break;
    }
    await p.locator('[data-act="quit"]').click(); await p.waitForTimeout(100);
  }
  console.log(lang,'questions cycled:',n);
  await p.locator('.tab[data-view="progress"]').click(); await p.waitForTimeout(200);
  await p.locator('.tab[data-view="tools"]').click(); await p.waitForTimeout(200);
  await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(200);
}
// listener count sanity (delegation => constant)
const lc = await p.evaluate(()=> (window.getEventListeners? 'n/a':'n/a'));
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'NO JS ERRORS');
await b.close();
