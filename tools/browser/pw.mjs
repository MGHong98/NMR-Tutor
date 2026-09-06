/* pw.mjs — 브라우저 검사기가 공통으로 쓰는 것
 * Shared bits for the browser-driven checkers.
 *
 * 이 폴더의 검사기는 Playwright 가 있어야 동작합니다. 앱 자체에는 의존성이
 * 없으며, 이 폴더를 지워도 프로그램은 그대로 동작합니다.
 * The checkers here need Playwright. The app itself has no dependencies and
 * runs fine with this folder deleted.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   python3 -m http.server 8099          (다른 터미널에서 / in another terminal)
 *   node tools/browser/run.mjs
 */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const FILE_URL = 'file://' + path.join(ROOT, 'index.html');
export const BASE = process.env.NMR_BASE || 'http://127.0.0.1:8099';
export const SHOTS = path.join(ROOT, 'tools', 'browser', 'shots') + path.sep;

try { fs.mkdirSync(SHOTS, { recursive: true }); } catch (e) { /* noop */ }

/** Playwright 를 어디에 설치했든 찾아 쓴다 / find Playwright wherever it is installed */
async function load() {
  const candidates = [
    'playwright',
    'playwright-core',
    '/opt/node22/lib/node_modules/playwright/index.mjs',
    '/usr/lib/node_modules/playwright/index.mjs'
  ];
  for (const c of candidates) {
    try {
      if (c.startsWith('/')) {
        if (!fs.existsSync(c)) { continue; }
        return await import(c);
      }
      return require(c);
    } catch (e) { /* 다음 후보 / try the next one */ }
  }
  console.error(
    'Playwright 를 찾지 못했습니다. 이 폴더의 검사기만 건너뛰면 되고, 앱과 tools/check.js 는 영향이 없습니다.\n' +
    'Playwright was not found. Only the checkers in this folder are affected; the app and tools/check.js are not.\n' +
    '  npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const pw = await load();
export const chromium = pw.chromium;
