/* 모든 UI 키가 ko/en 쌍을 갖추었는지 */
const ROOT = require('path').join(__dirname, '..') + '/';
global.window = {};
require(ROOT + 'assets/js/i18n.js');
const I = window.I18N;
const src = require('fs').readFileSync(ROOT + 'assets/js/i18n.js','utf8');
const keys = [...src.matchAll(/^\s{4}([a-z_0-9]+):\s*\{?/gm)].map(m=>m[1]);
let bad = 0, n = 0;
for (const k of new Set(keys)) {
  I.setLang('ko'); const ko = I.t(k);
  I.setLang('en'); const en = I.t(k);
  n++;
  if (!ko || !en || ko === k || en === k) { bad++; console.log('   ✗ 빠짐:', k, JSON.stringify([ko,en]).slice(0,60)); }
  else if (ko === en && !/^[0-9A-Za-z .%()\/–—-]+$/.test(ko)) { console.log('   ? 같음:', k); }
}
console.log('i18n 키 검사:', n, '건 | 문제:', bad);
/* app.js 가 부르는 t('...') 키가 모두 존재하는지 */
const app = require('fs').readFileSync(ROOT + 'assets/js/app.js','utf8');
const used = new Set([...app.matchAll(/\bt\('([a-z_0-9]+)'\)/g)].map(m=>m[1]));
let miss = 0;
I.setLang('ko');
for (const k of used) { if (I.t(k) === k) { miss++; console.log('   ✗ app.js 가 쓰지만 사전에 없음:', k); } }
console.log('app.js 가 쓰는 키:', used.size, '| 없는 키:', miss);
