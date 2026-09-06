/* 직접 구현한 SHA-256 을 node crypto 와 대조한다 */
const ROOT = require('path').join(__dirname, '..') + '/';
const crypto = require('crypto');
global.window = {};
require(ROOT + 'assets/js/integrity.js');
const I = window.Integrity;

let n = 0, bad = 0;
function chk(s, label) {
  n++;
  const want = crypto.createHash('sha256').update(Buffer.from(s, 'utf8')).digest('hex');
  const got = I.sha256(s);
  if (got !== want) { bad++; console.log('   ✗', label || JSON.stringify(s).slice(0, 40), '\n     got ', got, '\n     want', want); }
}

/* 고전 벡터 */
chk('', 'empty');
chk('abc', 'abc');
chk('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq', 'NIST 448-bit');
chk('a'.repeat(1000000), 'a x 1e6');

/* 경계 길이: 패딩 분기를 전부 밟는다 (55/56/57/63/64/65 …) */
for (let len = 0; len <= 200; len++) chk('x'.repeat(len), 'len ' + len);
for (const len of [511, 512, 513, 1023, 1024, 1025, 4096, 65535, 65536]) chk('y'.repeat(len), 'len ' + len);

/* 유니코드: 한글, 결합 문자, 이모지(서로게이트 쌍), 혼합 */
chk('한글 화학적 이동 δ 7.26', 'korean');
chk('δ ν γ ħ π ≈ × ⁻ ¹³C ¹H', 'greek/super');
chk('🧪⚗️🔬 emoji', 'emoji (surrogate pairs)');
chk('é combining', 'combining');
for (let i = 0; i < 300; i++) {
  let s = '';
  const L = Math.floor(Math.random() * 300);
  for (let j = 0; j < L; j++) {
    const r = Math.random();
    if (r < 0.4) s += String.fromCharCode(32 + Math.floor(Math.random() * 95));
    else if (r < 0.7) s += String.fromCharCode(0xac00 + Math.floor(Math.random() * 1000));
    else if (r < 0.9) s += String.fromCharCode(0x80 + Math.floor(Math.random() * 0x700));
    else s += String.fromCodePoint(0x1f300 + Math.floor(Math.random() * 500));
  }
  chk(s, 'random ' + i);
}

/* 실제 콘텐츠 전체 */
require(ROOT + 'assets/js/data-lessons.js');
require(ROOT + 'assets/js/data-questions.js');
require(ROOT + 'assets/js/data-sources.js');
const p = I.payload();
chk(p, 'full payload (' + p.length + ' chars)');
const t0 = Date.now(); const d = I.sha256(p); const ms = Date.now() - t0;
console.log('payload chars:', p.length, '| digest:', d, '| ' + ms + 'ms');

/* 정규화가 키 순서에 무관한지 */
const a = { b: 1, a: [3, { z: 1, y: 2 }], c: 'x' };
const b = { c: 'x', a: [3, { y: 2, z: 1 }], b: 1 };
n++; if (I.canonical(a) !== I.canonical(b)) { bad++; console.log('   ✗ canonical key order'); }
const c1 = { a: 1 }, c2 = { a: '1' };
n++; if (I.canonical(c1) === I.canonical(c2)) { bad++; console.log('   ✗ canonical type collision (1 vs "1")'); }

console.log('SHA-256 검사:', n, '건 | 불일치:', bad);
