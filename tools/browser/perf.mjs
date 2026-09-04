import { chromium, BASE } from './pw.mjs';
const b=await chromium.launch(); const p=await b.newPage();
await p.goto(BASE + '/index.html'); await p.waitForTimeout(300);
const r = await p.evaluate(() => {
  const ids=[].slice.call(document.querySelectorAll('#lessonNav button')).map(n=>n.getAttribute('data-id'));
  const click=id=>document.querySelector('#lessonNav button[data-id="'+id+'"]').click();
  let t0=performance.now(); ids.forEach(click); const cold=performance.now()-t0;   // 1회차: 캐시 생성
  t0=performance.now(); for(let k=0;k<10;k++) ids.forEach(click); const warm=(performance.now()-t0)/10;
  return { lessons: ids.length, coldMs:+cold.toFixed(1), warmMs:+warm.toFixed(1),
           lastHtmlBytes: document.querySelector('#lessonBody').innerHTML.length,
           lastId: ids[ids.length-1] };
});
console.log('lesson render —', r.lessons, 'units | cold:', r.coldMs+'ms',
            '| warm avg per full pass:', r.warmMs+'ms',
            '| per switch:', (r.warmMs/r.lessons).toFixed(1)+'ms');
console.log('last lesson HTML (' + r.lastId + '):', r.lastHtmlBytes, 'chars');
// 전체 자산 크기
const sizes = await p.evaluate(()=>performance.getEntriesByType('resource')
  .filter(e=>/\.(js|css)$/.test(e.name)).map(e=>e.name.split('/').pop()+' '+e.decodedBodySize));
console.log(sizes.join('\n'));
await b.close();
