import { chromium, BASE } from './pw.mjs';
import { SHOTS as S } from './pw.mjs';
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1280,height:1000}});
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text());});

// 페이지 스크립트보다 먼저 최신 API를 제거해 구형 브라우저를 흉내낸다
await p.addInitScript(() => {
  delete Element.prototype.closest;
  // Element.prototype.matches 는 Playwright 선택자 엔진이 쓰므로 지우지 않는다.
  // 앱 소스에 matches 참조가 0건임은 정적 검사로 따로 확인한다.
  // scrollTo/scrollIntoView 의 옵션 객체 형태를 지원하지 않는 브라우저
  const rawScroll = window.scrollTo.bind(window);
  window.scrollTo = function (a, b) {
    if (typeof a === 'object') { throw new TypeError('options form unsupported'); }
    return rawScroll(a, b);
  };
  Element.prototype.scrollIntoView = function (a) {
    if (typeof a === 'object') { throw new TypeError('options form unsupported'); }
  };
  // classList.toggle 의 두 번째 인자를 무시하는 구형 구현
  const rawToggle = DOMTokenList.prototype.toggle;
  DOMTokenList.prototype.toggle = function (c) { return rawToggle.call(this, c); };
  // localStorage 차단 (사파리 프라이빗 모드 등)
  Object.defineProperty(window, 'localStorage', {
    get() { throw new Error('SecurityError: localStorage is disabled'); }
  });
  // Object.assign / Array.from 미지원 환경
  // (Array/String.prototype.includes 는 Playwright 자체 주입 스크립트가 쓰므로 남겨둔다)
  delete Object.assign; delete Array.from;
});

await p.goto(BASE + '/index.html'); await p.waitForTimeout(400);
console.log('lesson rendered:', await p.locator('#lessonBody h2').innerText());
await p.locator('#lessonNav button[data-id="ewg-edg"]').click(); await p.waitForTimeout(200);
console.log('nav click works:', await p.locator('#lessonBody h2').innerText());
await p.locator('.lang-btn[data-lang="en"]').click(); await p.waitForTimeout(200);
console.log('lang toggle works:', await p.locator('#lessonBody h2').innerText());
await p.locator('.tab[data-view="practice"]').click(); await p.waitForTimeout(200);
await p.locator('.set-card[data-id="aromatic"]').click(); await p.waitForTimeout(200);
// ordering question
const c = await p.locator('#tray .chip').count();
for(let i=0;i<c;i++) await p.locator('#tray .chip:not([disabled])').first().click();
await p.locator('#actBtn').click(); await p.waitForTimeout(150);
console.log('grade works:', await p.locator('.explain h4').innerText());
await p.locator('#actBtn').click(); await p.waitForTimeout(150);
await p.locator('#numIn').fill('6.82');
await p.locator('#actBtn').click(); await p.waitForTimeout(150);
console.log('numeric works:', await p.locator('.explain h4').innerText());
await p.locator('[data-act="quit"]').click(); await p.waitForTimeout(150);
await p.locator('.tab[data-view="tools"]').click(); await p.waitForTimeout(250);
await p.selectOption('#selA','NH2'); await p.waitForTimeout(200);
console.log('calculator works:', (await p.locator('.out-cell .val').allInnerTexts()).join(' | '));
await p.locator('.tab[data-view="progress"]').click(); await p.waitForTimeout(200);
console.log('progress (no localStorage):', (await p.locator('.stat .val').allInnerTexts()).join(' | '));
await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(200);
console.log('sources tab:', await p.locator('#sourcesBody .bib li').count(), 'entries');
await p.screenshot({path:S+'40-legacy-mode.png'});
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'NO JS ERRORS IN LEGACY MODE');
await b.close();
