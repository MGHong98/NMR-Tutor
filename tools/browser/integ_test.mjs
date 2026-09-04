import { chromium, BASE } from './pw.mjs';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1180,height:1000}});
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto(BASE + '/index.html'); await p.waitForTimeout(300);
await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(150);
const t0=Date.now();
await p.locator('[data-act="integ"]').click(); await p.waitForTimeout(500);
console.log('결과:', (await p.locator('#integOut').innerText()).replace(/\n+/g,' | '));
console.log('브라우저 계산 시간(ms):', await p.evaluate(()=>window.Integrity.current().ms),
            '| payload chars:', await p.evaluate(()=>window.Integrity.current().chars));
// 콘텐츠를 한 글자 바꾸면 불일치가 되는가
await p.evaluate(()=>{ window.QUESTIONS[0].q.ko += '.'; window.Integrity.register('tamper-test', 1); });
await p.locator('.tab[data-view="learn"]').click(); await p.waitForTimeout(80);
await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(120);
await p.locator('[data-act="integ"]').click(); await p.waitForTimeout(500);
console.log('변조 후:', (await p.locator('#integOut').innerText()).replace(/\n+/g,' | ').slice(0,150));
console.log('ERRORS:', errs.length?errs:'none');
await b.close();
