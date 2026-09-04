/* check.js — 검사기를 한 번에 돌린다 / run every checker in one go
 *
 *   node tools/check.js
 *
 * 의존성이 없습니다. node 만 있으면 되고, 앱 자체는 이 폴더 없이도 동작합니다.
 * No dependencies: node alone is enough, and the app itself runs without this folder.
 *
 * 브라우저가 필요한 검사(레이아웃 겹침 탐지, 문항 전수 순회, file:// 실행,
 * 레거시 API 제거 환경)는 Playwright 가 있어야 하므로 여기 들어 있지 않습니다.
 * 자세한 내용은 README 의 '검증과 정정 내역'과 '시각 검사' 절을 보십시오.
 */
'use strict';

var cp = require('child_process');
var path = require('path');

var CHECKS = [
  ['audit.js',        '본문·해설의 산술과 인용된 증분값 / arithmetic and quoted increments'],
  ['formula.js',      '구조식을 원자가로 역산 / structures back-calculated by valence'],
  ['pattern.js',      '치환 위치와 δ 주석 / substitution patterns and δ annotations'],
  ['qformula.js',     '문항의 분자식 ↔ 해설 구조식 / stated formula vs drawn structure'],
  ['physics.js',      '부록의 물리 수치와 출처 참조 / appendix physics and source references'],
  ['twod.js',         '2차원 지도의 좌표와 축 구성 / 2D map coordinates and axes'],
  ['landmark.js',     '같은 화합물의 δ 가 두 곳에서 다르지 않은가 / one compound, one δ'],
  ['sha_test.js',     'SHA-256 자체 검증 / SHA-256 against node crypto'],
  ['i18n_check.js',   'UI 문자열의 국문·영문 쌍 / UI strings in both languages'],
  ['review_guard.js', '적대적 리뷰에서 고친 항목의 잔존 / review fixes still in place']
];

var failed = [];
CHECKS.forEach(function (c) {
  var name = c[0], desc = c[1];
  process.stdout.write('\n[1m▶ ' + name + '[0m  ' + desc + '\n');
  var r = cp.spawnSync(process.execPath, [path.join(__dirname, name)], { stdio: 'inherit' });
  if (r.status !== 0) { failed.push(name); }
});

process.stdout.write('\n' + '─'.repeat(60) + '\n');
if (failed.length) {
  process.stdout.write('실패한 검사 / failed: ' + failed.join(', ') + '\n');
  process.exit(1);
}
process.stdout.write('모든 검사를 통과했습니다 / all checks passed\n');
process.stdout.write('무결성 해시를 다시 계산하려면 / to recompute the digest: node tools/digest.js\n');
