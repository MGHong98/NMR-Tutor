/* integrity.js — 제작 정보와 무결성 확인 / build metadata and integrity check
 *
 * 이 파일은 변조를 *막지* 않습니다. 배포본이 원본과 같은지 *드러낼* 뿐입니다.
 * This file does not *prevent* tampering; it only makes it *visible*.
 *
 * SHA-256을 직접 구현한 이유: crypto.subtle 은 보안 컨텍스트(https/localhost)에서만
 * 동작하고 Promise 를 돌려주므로, file:// 로 열어도 되는 이 프로그램의 조건과 맞지
 * 않습니다. 여기 구현은 ES5 문법에 동기 함수이며 외부 의존성이 없습니다.
 * SHA-256 is implemented here rather than taken from crypto.subtle: that API needs a
 * secure context and returns a Promise, neither of which suits a page that must also
 * run from file://. This implementation is plain ES5, synchronous, dependency-free.
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------ SHA-256 */
  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }

  /** 64바이트 블록 하나를 처리한다 / compress one 64-byte block */
  function block(H, b, off, W) {
    var a = H[0], bb = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
    var i, t1, t2, s0, s1, ch, maj, x, y, p;
    for (i = 0; i < 16; i++) {
      p = off + i * 4;
      W[i] = ((b[p] << 24) | (b[p + 1] << 16) | (b[p + 2] << 8) | b[p + 3]) | 0;
    }
    for (i = 16; i < 64; i++) {
      x = W[i - 15]; y = W[i - 2];
      s0 = rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3);
      s1 = rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10);
      W[i] = (W[i - 16] + s0 + W[i - 7] + s1) | 0;
    }
    for (i = 0; i < 64; i++) {
      s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      ch = (e & f) ^ (~e & g);
      t1 = (h + s1 + ch + K[i] + W[i]) | 0;
      s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      maj = (a & bb) ^ (a & c) ^ (bb & c);
      t2 = (s0 + maj) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0;
      d = c; c = bb; bb = a; a = (t1 + t2) | 0;
    }
    H[0] = (H[0] + a) | 0; H[1] = (H[1] + bb) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
  }

  /** 문자열 → UTF-8 바이트 배열 / string to UTF-8 bytes */
  function utf8(s) {
    var out = [], i, c, c2, cp;
    for (i = 0; i < s.length; i++) {
      c = s.charCodeAt(i);
      if (c < 0x80) { out.push(c); continue; }
      if (c < 0x800) { out.push(0xc0 | (c >> 6), 0x80 | (c & 63)); continue; }
      if (c >= 0xd800 && c <= 0xdbff && i + 1 < s.length) {
        c2 = s.charCodeAt(i + 1);
        if (c2 >= 0xdc00 && c2 <= 0xdfff) {           /* 서로게이트 쌍 / surrogate pair */
          cp = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
          out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
          i++;
          continue;
        }
      }
      out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }

  function hex32(v) {
    var s = (v >>> 0).toString(16);
    while (s.length < 8) { s = '0' + s; }
    return s;
  }

  function sha256(str) {
    var b = utf8(str), len = b.length, W = new Array(64), i, j, hi, lo;
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
             0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var full = len - (len % 64);
    for (i = 0; i < full; i += 64) { block(H, b, i, W); }

    var tail = [];
    for (j = full; j < len; j++) { tail.push(b[j]); }
    tail.push(0x80);
    while (tail.length % 64 !== 56) { tail.push(0); }
    hi = Math.floor(len / 536870912);          /* (len × 8) 의 상위 32비트 */
    lo = (len * 8) >>> 0;                      /* 하위 32비트 (2^32 로 나눈 나머지) */
    tail.push((hi >>> 24) & 255, (hi >>> 16) & 255, (hi >>> 8) & 255, hi & 255,
              (lo >>> 24) & 255, (lo >>> 16) & 255, (lo >>> 8) & 255, lo & 255);
    for (i = 0; i < tail.length; i += 64) { block(H, tail, i, W); }

    var out = '';
    for (i = 0; i < 8; i++) { out += hex32(H[i]); }
    return out;
  }

  /* --------------------------------------------- 결정적 직렬화 / canonical form */
  /* JSON.stringify 는 객체 키 순서를 보장하지 않으므로 키를 정렬해 직접 만든다.
     Key order is not guaranteed by JSON.stringify, so the form is built with sorted keys. */
  function canonical(v) {
    var i, k, keys, parts, s;
    if (v === undefined || typeof v === 'function') { return 'null'; }   /* 총함수로 둔다 */
    if (v === null || typeof v !== 'object') {
      s = JSON.stringify(v);
      return (s === undefined) ? 'null' : s;
    }
    if (Object.prototype.toString.call(v) === '[object Array]') {
      parts = [];
      for (i = 0; i < v.length; i++) { parts.push(canonical(v[i])); }
      return '[' + parts.join(',') + ']';
    }
    keys = [];
    for (k in v) { if (Object.prototype.hasOwnProperty.call(v, k)) { keys.push(k); } }
    keys.sort();
    parts = [];
    for (i = 0; i < keys.length; i++) {
      parts.push(JSON.stringify(keys[i]) + ':' + canonical(v[keys[i]]));
    }
    return '{' + parts.join(',') + '}';
  }

  /* ------------------------------------------------------------ 제작 정보 */
  function deepFreeze(o) {
    var k;
    if (!Object.freeze) { return o; }
    Object.freeze(o);
    for (k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k) && o[k] && typeof o[k] === 'object') {
        deepFreeze(o[k]);
      }
    }
    return o;
  }

  var BUILD = deepFreeze({
    name: 'NMR Analysis Tutor',
    author: 'Mingi Hong',
    license: 'CC BY-NC 4.0',
    revision: '2026-09-04',
    lessons: 8,
    appendices: 3,
    questions: 119,
    sources: 9
  });

  /* 아래 값은 콘텐츠를 고칠 때마다 달라집니다. 출처 탭에 표시되는 '현재 해시'를
     그대로 옮겨 적으면 다시 '일치'가 됩니다.
     This constant changes whenever the content does; copy the “current hash” shown in
     the Sources tab back into it to make the check pass again. */
  var BUILD_DIGEST = 'fd0d9d795b3f1f06ea8a3d92944562a725d7daaff09b8e283254099267215a0e';

  var cache = null, extra = {};

  /** 데이터 파일 밖에 있는 표를 검사 대상에 넣는다 (예: 계산기의 증분표).
   *  Register a table that does not live in a data file — the calculator's
   *  increment table, for instance — so that it is covered by the digest too. */
  function register(name, value) {
    extra[name] = value;
    cache = null;               /* 이미 계산했더라도 다시 계산하게 둔다 */
    return true;
  }

  /** 프로그램의 모든 콘텐츠를 한 문자열로 정규화한다 */
  function payload() {
    return canonical({
      build: BUILD,
      lessons: global.LESSONS || [],
      sets: global.SETS || [],
      questions: global.QUESTIONS || [],
      sources: global.SOURCES || {},
      provenance: global.PROVENANCE || [],
      caveats: global.CAVEATS || [],
      /* 화학 수치를 담은 표는 데이터 파일 밖에 있어도 포함한다.
         공개 객체에서 직접 읽으므로 파일 로드 순서에 의존하지 않는다. */
      multiplets: (global.Spectrum && global.Spectrum.PATTERNS) || {},
      groups: (global.Structure && global.Structure.GROUPS) || {},
      /* 화면 문구에도 수치가 인용된다(계산기 설명의 δ 7.26 등)므로 함께 넣는다 */
      ui: (global.I18N && global.I18N.UI) || {},
      extra: extra
    });
  }

  /** 현재 해시를 계산한다. 한 번 계산하면 캐시한다. */
  function current() {
    if (cache === null) {
      var s = payload(), t0 = (global.Date && Date.now) ? Date.now() : 0;
      cache = { digest: sha256(s), chars: s.length, ms: ((global.Date && Date.now) ? Date.now() : 0) - t0 };
    }
    return cache;
  }

  /** 제작 정보의 개수가 실제 데이터와 맞는지 (해시와 독립적인 자체 검산) */
  function counts() {
    var lessons = global.LESSONS || [], i, main = 0, appx = 0, srcN = 0, k;
    for (i = 0; i < lessons.length; i++) { if (lessons[i].badge) { appx++; } else { main++; } }
    for (k in (global.SOURCES || {})) {
      if (Object.prototype.hasOwnProperty.call(global.SOURCES, k)) { srcN++; }
    }
    return {
      lessons: main, appendices: appx,
      questions: (global.QUESTIONS || []).length, sources: srcN,
      ok: main === BUILD.lessons && appx === BUILD.appendices &&
          (global.QUESTIONS || []).length === BUILD.questions && srcN === BUILD.sources
    };
  }

  global.Integrity = {
    sha256: sha256,
    canonical: canonical,
    payload: payload,
    BUILD: BUILD,
    expected: BUILD_DIGEST,
    register: register,
    current: current,
    counts: counts
  };
})(window);
