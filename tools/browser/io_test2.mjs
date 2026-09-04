import { chromium, BASE } from './pw.mjs';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1180,height:1000}});
const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text());});
await p.goto(BASE + '/index.html'); await p.waitForTimeout(300);
await p.evaluate(()=>{ window.confirm=()=>true; });
await p.locator('.tab[data-view="progress"]').click(); await p.waitForTimeout(150);

const hostile = [
 ['proto key',        '{"app":"nmr-tutor","progress":{"__proto__":{"attempts":5,"correct":true},"A1":{"attempts":2,"correct":true}}}'],
 ['constructor key',  '{"app":"nmr-tutor","progress":{"constructor":{"attempts":5,"correct":true}}}'],
 ['toString key',     '{"app":"nmr-tutor","progress":{"toString":{"attempts":5,"correct":true}}}'],
 ['huge attempts',    '{"app":"nmr-tutor","progress":{"A2":{"attempts":1e308,"correct":true}}}'],
 ['NaN attempts',     '{"app":"nmr-tutor","progress":{"A3":{"attempts":"abc","correct":true}}}'],
 ['nested junk',      '{"app":"nmr-tutor","progress":{"A4":[1,2,3]}}'],
 ['html in id',       '{"app":"nmr-tutor","progress":{"<img src=x onerror=alert(1)>":{"attempts":1}}}'],
];
for (const [label, txt] of hostile) {
  await p.locator('[data-act="io-import"]').click(); await p.waitForTimeout(50);
  await p.locator('#ioIn').fill(txt);
  await p.locator('[data-act="io-merge"]').click(); await p.waitForTimeout(120);
  const msg = (await p.locator('#ioMsg').innerText()).replace(/\n/g,' ');
  console.log(label.padEnd(18), '→', msg.slice(0,60));
}
const st = await p.evaluate(()=>{
  const raw = JSON.parse(localStorage.getItem('nmr-tutor-v1'));
  const proto = Object.getPrototypeOf(raw.progress);
  return { keys: Object.keys(raw.progress), protoIsObject: proto === Object.prototype,
           objPolluted: ({}).attempts !== undefined, body: document.getElementById('progressBody').innerHTML.indexOf('onerror') };
});
console.log('저장된 키:', JSON.stringify(st.keys));
console.log('progress 의 프로토타입이 정상인가:', st.protoIsObject);
console.log('Object.prototype 오염 여부:', st.objPolluted ? '오염됨!' : '없음');
console.log('화면에 스크립트가 들어갔는가:', st.body >= 0 ? '들어감!' : '없음');
console.log('통계:', (await p.locator('.stat .val').allInnerTexts()).join(' | '));

await p.locator('.tab[data-view="sources"]').click(); await p.waitForTimeout(120);
const t0=Date.now();
await p.locator('[data-act="integ"]').click(); await p.waitForTimeout(600);
console.log('integrity:', (await p.locator('#integOut .hash').innerText()));
console.log('ERRORS:', errs.length?errs:'none');
await b.close();
