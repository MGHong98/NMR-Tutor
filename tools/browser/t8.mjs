/* file:// 와 localStorage 차단 환경에서 새 기능이 어떻게 동작하는가 */
import { chromium, FILE_URL, BASE } from './pw.mjs';
const b=await chromium.launch();

// 1) file://
{
  const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto(FILE_URL); await p.waitForTimeout(300);
  await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(150);
  await p.locator('[data-act="integ"]').click(); await p.waitForTimeout(600);
  const txt=(await p.locator('#integOut').innerText()).replace(/\n+/g,' | ');
  console.log('file:// 무결성:', txt.slice(0,110));
  console.log('file:// crypto.subtle 사용 안 함:', await p.evaluate(()=>!!(window.crypto&&window.crypto.subtle)) ? '(있지만 안 씀)' : '(없음)');
  await p.locator('.tab[data-view="progress"]').click(); await p.waitForTimeout(120);
  await p.locator('[data-act="io-export"]').click(); await p.waitForTimeout(100);
  console.log('file:// 내보내기 상자:', (await p.locator('#ioOut').inputValue()).length, 'chars',
              '| 저장 버튼:', await p.locator('[data-act="io-download"]').count());
  console.log('file:// ERRORS:', errs.length?errs:'none');
  await p.close();
}
// 2) localStorage 차단 + execCommand 없음 + Blob 없음
{
  const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(()=>{
    Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});
    document.execCommand = undefined;
    delete window.Blob;
  });
  await p.goto(BASE + '/index.html'); await p.waitForTimeout(300);
  await p.locator('.tab[data-view="progress"]').click(); await p.waitForTimeout(150);
  await p.locator('[data-act="io-export"]').click(); await p.waitForTimeout(100);
  console.log('제한 환경 — 저장 버튼 표시:', await p.locator('[data-act="io-download"]').count(), '(0이면 정상)');
  await p.locator('[data-act="io-copy"]').click(); await p.waitForTimeout(80);
  console.log('제한 환경 — 복사:', (await p.locator('#ioMsg').innerText()).slice(0,60));
  await p.locator('[data-act="io-import"]').click(); await p.waitForTimeout(80);
  await p.locator('#ioIn').fill('{"app":"nmr-tutor","progress":{"A1":{"attempts":1,"correct":true}}}');
  await p.locator('[data-act="io-merge"]').click(); await p.waitForTimeout(150);
  console.log('제한 환경 — 불러오기:', (await p.locator('#ioMsg').innerText()).slice(0,60));
  console.log('제한 환경 — 통계:', (await p.locator('.stat .val').allInnerTexts()).join(' | '));
  await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(120);
  await p.locator('[data-act="integ"]').click(); await p.waitForTimeout(600);
  console.log('제한 환경 — 무결성:', (await p.locator('#integOut .hash').innerText()).slice(0,20)+'…');
  console.log('제한 환경 — ERRORS:', errs.length?errs:'none');
  await p.close();
}
await b.close();
