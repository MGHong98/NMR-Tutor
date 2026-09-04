/* 브라우저와 같은 payload 를 node 에서 재현해 해시를 계산한다 (엔진 간 일치 확인 + 값 산출) */
const ROOT = require('path').join(__dirname, '..') + '/';
const fs = require('fs');
const R = ROOT + 'assets/js/';
global.window = {};
require(R + 'integrity.js');
require(R + 'spectrum.js');
require(R + 'structure.js');
require(R + 'data-sources.js');
require(R + 'data-lessons.js');
require(R + 'data-questions.js');

/* app.js 는 DOM 을 건드리므로 증분표만 잘라 온다 */
const app = fs.readFileSync(R + 'app.js', 'utf8');
const start = app.indexOf('  var INC = {');
const end = app.indexOf('\n  };', start);
if (start < 0 || end < 0) { console.log('INC 블록을 찾지 못했습니다'); process.exit(1); }
const INC = eval('(' + app.slice(start + '  var INC = '.length, end + 4).replace(/;\s*$/, '') + ')');
window.Integrity.register('increments', INC);
const bm = app.match(/var BENZENE = ([\d.]+);/);
if (!bm) { console.log('BENZENE 을 찾지 못했습니다'); process.exit(1); }
window.Integrity.register('benzene', parseFloat(bm[1]));
require(R + 'i18n.js');

const p = window.Integrity.payload();
const d = window.Integrity.current();
const crypto = require('crypto');
const ref = crypto.createHash('sha256').update(Buffer.from(p, 'utf8')).digest('hex');
console.log('payload chars :', p.length);
console.log('increments    :', Object.keys(INC).length, '종');
console.log('multiplets    :', Object.keys(window.Spectrum.PATTERNS).length, '종');
console.log('groups        :', Object.keys(window.Structure.GROUPS).length, '종');
console.log('digest (자체) :', d.digest);
console.log('digest (node) :', ref, d.digest === ref ? '✓ 일치' : '✗ 불일치');
