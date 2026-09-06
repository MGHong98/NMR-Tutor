/* run.mjs — 브라우저 검사기를 순서대로 돌린다 / run the browser checkers in order
 *
 *   python3 -m http.server 8099     (저장소 루트에서, 다른 터미널)
 *   node tools/browser/run.mjs
 *
 * NMR_BASE 로 주소를 바꿀 수 있습니다 / override the address with NMR_BASE.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE } from './pw.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const CHECKS = [
  ['t4.mjs',        '전체 순회 — 모든 단원·문항을 국문·영문으로 / full sweep of lessons and questions'],
  ['visual.mjs',    '레이아웃 탐지 — 겹침·잘림·오버플로 / layout detector'],
  ['t5.mjs',        '최신 API 를 제거한 환경 / with modern APIs stripped'],
  ['t7.mjs',        'file:// 로 열었을 때 / opened over file://'],
  ['t8.mjs',        'localStorage 차단·복사/저장 불가 환경 / blocked storage, no copy or download'],
  ['io_test.mjs',   '기록 내보내기·불러오기 / progress export and import'],
  ['io_test2.mjs',  '적대적 입력 / hostile import payloads'],
  ['integ_test.mjs','무결성 해시 / the integrity hash'],
  ['perf.mjs',      '렌더 성능과 전송 크기 / render performance and transfer size']
];

console.log('대상 주소 / target:', BASE, '\n');
const failed = [];
for (const [file, desc] of CHECKS) {
  console.log('\n[1m▶ ' + file + '[0m  ' + desc);
  const r = spawnSync(process.execPath, [path.join(HERE, file)], { stdio: 'inherit' });
  if (r.status !== 0) { failed.push(file); }
}

console.log('\n' + '─'.repeat(60));
if (failed.length) {
  console.log('실패 / failed: ' + failed.join(', '));
  process.exit(1);
}
console.log('브라우저 검사를 모두 통과했습니다 / all browser checks passed');
