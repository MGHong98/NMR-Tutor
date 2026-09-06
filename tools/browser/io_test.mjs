import { chromium, BASE } from './pw.mjs';
import { SHOTS as S } from './pw.mjs';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1180,height:1200}});
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text());});
await p.goto(BASE + '/index.html'); await p.waitForTimeout(300);

// 문항 두 개를 풀어 기록을 만든다
await p.locator('.tab[data-view="practice"]').click(); await p.waitForTimeout(100);
await p.locator('.set-card[data-id="basics"]').click(); await p.waitForTimeout(100);
for (let i=0;i<2;i++){
  if(await p.locator('#opts .opt').count()) await p.locator('#opts .opt').first().click();
  else if(await p.locator('#numIn').count()) await p.locator('#numIn').fill('7');
  else if(await p.locator('#tray .chip').count()){const c=await p.locator('#tray .chip').count();
    for(let j=0;j<c;j++) await p.locator('#tray .chip:not([disabled])').first().click();}
  await p.locator('#actBtn').click(); await p.waitForTimeout(40);
  await p.locator('#actBtn').click(); await p.waitForTimeout(40);
}
await p.locator('[data-act="quit"]').click(); await p.waitForTimeout(60);

await p.locator('.tab[data-view="progress"]').click(); await p.waitForTimeout(150);
console.log('before:', (await p.locator('.stat .val').allInnerTexts()).join(' | '));
await p.locator('[data-act="io-export"]').click(); await p.waitForTimeout(100);
const json = await p.locator('#ioOut').inputValue();
console.log('export bytes:', json.length, '| head:', json.slice(0,90).replace(/\n/g,' '));
await p.locator('[data-act="io-copy"]').click(); await p.waitForTimeout(60);
console.log('copy msg:', await p.locator('#ioMsg').innerText());

// 기록을 지우고 다시 불러온다
await p.locator('[data-act="reset"]').click().catch(()=>{});
await p.waitForTimeout(60);
await p.evaluate(()=>{ window.__c = window.confirm; window.confirm=()=>true; });
await p.locator('[data-act="reset"]').click(); await p.waitForTimeout(120);
console.log('after reset:', (await p.locator('.stat .val').allInnerTexts()).join(' | '));

await p.locator('[data-act="io-import"]').click(); await p.waitForTimeout(80);
await p.locator('#ioIn').fill(json);
await p.locator('[data-act="io-merge"]').click(); await p.waitForTimeout(150);
console.log('after merge:', (await p.locator('.stat .val').allInnerTexts()).join(' | '), '|', await p.locator('#ioMsg').innerText());

// 같은 파일 다시 (멱등성 확인)
await p.locator('[data-act="io-import"]').click(); await p.waitForTimeout(80);
await p.locator('#ioIn').fill(json);
await p.locator('[data-act="io-merge"]').click(); await p.waitForTimeout(150);
console.log('after 2nd merge:', (await p.locator('.stat .val').allInnerTexts()).join(' | '));
const prog1 = await p.evaluate(()=>localStorage.getItem('nmr-tutor-v1'));

// 불량 입력들
const bads = ['not json', '{}', '[]', '{"app":"other","progress":{}}',
  '{"app":"nmr-tutor","v":9,"progress":{}}',
  '{"app":"nmr-tutor","progress":{"ZZ99":{"attempts":3,"correct":true}}}',
  '{"app":"nmr-tutor","progress":{"A1":{"attempts":-5,"correct":"yes","set":"__evil__"}}}'];
for (const badTxt of bads){
  await p.locator('[data-act="io-import"]').click(); await p.waitForTimeout(60);
  await p.locator('#ioIn').fill(badTxt);
  await p.locator('[data-act="io-merge"]').click(); await p.waitForTimeout(120);
  const msg = await p.locator('#ioMsg').innerText();
  console.log('  in:', badTxt.slice(0,50).padEnd(52), '→', msg.replace(/\n/g,' ').slice(0,70));
}
const prog2 = await p.evaluate(()=>localStorage.getItem('nmr-tutor-v1'));
console.log('저장 내용이 불량 입력으로 오염됐는가:', prog1===prog2 ? '아니오(A1 항목 제외)' : '확인 필요');
console.log('현재 저장값:', prog2.slice(0,240));

// 무결성
await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(150);
await p.locator('[data-act="integ"]').click(); await p.waitForTimeout(400);
console.log('integrity:', (await p.locator('#integOut').innerText()).replace(/\n/g,' | '));
await p.screenshot({path:S+'70-integrity.png'});
await p.locator('.tab[data-view="progress"]').click(); await p.waitForTimeout(120);
await p.locator('[data-act="io-export"]').click(); await p.waitForTimeout(80);
await p.screenshot({path:S+'71-io.png'});
console.log('ERRORS:', errs.length?errs:'none');
await b.close();
