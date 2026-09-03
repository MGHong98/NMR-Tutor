/* structure.js — 분자 구조식 SVG 생성기
 * Molecular structure renderer (inline SVG, no dependencies, ES5).
 *
 * 두 가지 골격만으로 이 프로그램에 필요한 구조를 모두 그립니다.
 *   benzene() — 육각형 고리. 위치 1이 위쪽, 시계 방향으로 2~6.
 *               1의 para는 4, meta는 3과 5, ortho는 2와 6이 되어
 *               치환기 증분표의 번호와 그대로 대응합니다.
 *   chain()   — 지그재그 사슬. 헤테로원자 라벨과 C=O 가지를 지원합니다.
 *
 * Two skeletons cover everything this tutor needs. In benzene() position 1 is
 * at the top and numbering runs clockwise, so para to 1 is 4, meta are 3 and 5
 * and ortho are 2 and 6 — matching the substituent increment table directly.
 */
(function (global) {
  'use strict';

  var AMP = /&/g, LT = /</g, GT = />/g;
  function esc(s) { return String(s).replace(AMP, '&amp;').replace(LT, '&lt;').replace(GT, '&gt;'); }

  var ATOMISH = /[A-Za-z)\]]/;

  /**
   * 화학식 문자열을 tspan으로 변환한다.
   *   숫자  -> 아래첨자. 단 <strong>바로 앞이 원소 기호나 닫는 괄호일 때만</strong>이다.
   *           "NO2" -> NO₂, "N(CH3)2" -> N(CH₃)₂ 이지만
   *           "8.22", "4-nitroanisole", "1,4-dimethylbenzene" 은 그대로 둔다.
   *   ^…   -> 위첨자   ("N^+" -> N⁺)
   * A digit becomes a subscript only when it directly follows an element symbol
   * or a closing bracket, so δ values and locants in names stay upright.
   */
  function chemText(s) {
    var segs = [], buf = '', mode = 'n', i = 0, c, k, out = '', cur = 0, want, dy, cls, prev;
    function flush() { if (buf !== '') { segs.push({ m: mode, v: buf }); buf = ''; } }
    for (i = 0; i < s.length;) {
      c = s.charAt(i);
      if (c === '^') {
        flush(); mode = 's'; i++;
        while (i < s.length && '+-−–0123456789'.indexOf(s.charAt(i)) >= 0) { buf += s.charAt(i); i++; }
        flush(); mode = 'n'; continue;
      }
      if (c >= '0' && c <= '9') {
        prev = i > 0 ? s.charAt(i - 1) : '';
        if (ATOMISH.test(prev)) {
          if (mode !== 'b') { flush(); mode = 'b'; }
        } else if (mode !== 'n') { flush(); mode = 'n'; }
        buf += c; i++; continue;
      }
      if (mode !== 'n') { flush(); mode = 'n'; }
      buf += c; i++;
    }
    flush();
    for (k = 0; k < segs.length; k++) {
      want = segs[k].m === 'b' ? 3.5 : (segs[k].m === 's' ? -4.5 : 0);
      dy = want - cur; cur = want;
      cls = (segs[k].m === 'n') ? '' : ' class="sb"';
      out += '<tspan' + cls + ' dy="' + dy + '">' + esc(segs[k].v) + '</tspan>';
    }
    return out;
  }

  /** 이름 문자열이 차지할 대략적인 폭(11px 산세리프 기준) + 여백 */
  function noteWidth(note) { return Math.round(String(note).length * 6.1) + 24; }

  /** 바깥 방향(dx, dy)에 맞는 text-anchor 와 세로 보정 */
  function place(ux, uy) {
    return {
      anchor: ux > 0.3 ? 'start' : (ux < -0.3 ? 'end' : 'middle'),
      dy: uy > 0.7 ? 12 : (uy < -0.7 ? -5 : 4)
    };
  }

  /**
   * benzene(spec) -> SVG 문자열
   * spec = {
   *   subs:  { 1:'NO2', 4:'OCH3' },     // 위치별 치환기
   *   ann:   { 2:'8.20', 3:'6.95' },    // 위치별 주석 (보통 δ 값)
   *   note:  '4-nitroanisole',          // 그림 아래 이름
   *   arom:  'kekule' | 'circle',       // 기본 kekule
   *   width, height, r
   * }
   */
  function benzene(spec) {
    var subs = spec.subs || {}, ann = spec.ann || {};
    var W = spec.width || 340, H = spec.height || (spec.note ? 226 : 206);
    /* 이름이 그림보다 넓으면 좌우로 삐져나가므로 폭을 맞춰 넓힌다 */
    if (spec.note) { W = Math.max(W, noteWidth(spec.note)); }
    var r = spec.r || 44, cx = W / 2, cy = (spec.note ? (H - 18) / 2 : H / 2);
    var out = [], i, a, vx = [], vy = [], j, k, ax, ay, bx, by, t, p, lab;

    out.push('<svg class="mol" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H +
      '" role="img" xmlns="http://www.w3.org/2000/svg" aria-label="' + esc(spec.alt || 'chemical structure') + '">');

    for (i = 1; i <= 6; i++) {
      a = (-90 + (i - 1) * 60) * Math.PI / 180;
      vx[i] = cx + r * Math.cos(a); vy[i] = cy + r * Math.sin(a);
    }
    /* 고리 결합 */
    for (i = 1; i <= 6; i++) {
      j = (i % 6) + 1;
      out.push('<line class="mb" x1="' + vx[i].toFixed(1) + '" y1="' + vy[i].toFixed(1) +
        '" x2="' + vx[j].toFixed(1) + '" y2="' + vy[j].toFixed(1) + '"/>');
    }
    if (spec.arom === 'circle') {
      out.push('<circle class="mb" cx="' + cx + '" cy="' + cy.toFixed(1) + '" r="' + (r * 0.58).toFixed(1) + '" fill="none"/>');
    } else {
      /* 케쿨레 구조: 1-2, 3-4, 5-6 결합에 안쪽 평행선 */
      for (k = 0; k < 3; k++) {
        i = 1 + k * 2; j = i + 1;
        ax = cx + (vx[i] - cx) * 0.86; ay = cy + (vy[i] - cy) * 0.86;
        bx = cx + (vx[j] - cx) * 0.86; by = cy + (vy[j] - cy) * 0.86;
        out.push('<line class="mb" x1="' + (ax + (bx - ax) * 0.13).toFixed(1) + '" y1="' + (ay + (by - ay) * 0.13).toFixed(1) +
          '" x2="' + (bx - (bx - ax) * 0.13).toFixed(1) + '" y2="' + (by - (by - ay) * 0.13).toFixed(1) + '"/>');
      }
    }
    /* 치환기와 주석 */
    for (i = 1; i <= 6; i++) {
      a = (-90 + (i - 1) * 60) * Math.PI / 180;
      var ux = Math.cos(a), uy = Math.sin(a);
      if (subs[i]) {
        out.push('<line class="mb" x1="' + vx[i].toFixed(1) + '" y1="' + vy[i].toFixed(1) +
          '" x2="' + (vx[i] + ux * 15).toFixed(1) + '" y2="' + (vy[i] + uy * 15).toFixed(1) + '"/>');
        p = place(ux, uy);
        lab = (typeof subs[i] === 'string') ? subs[i] : subs[i].t;
        out.push('<text class="mt" x="' + (vx[i] + ux * 21).toFixed(1) + '" y="' + (vy[i] + uy * 21).toFixed(1) +
          '" dy="' + p.dy + '" text-anchor="' + p.anchor + '">' + chemText(lab) + '</text>');
      }
      if (ann[i]) {
        p = place(ux, uy);
        t = subs[i] ? 44 : 13;   /* 치환기가 있으면 그 라벨 바깥쪽에 */
        out.push('<text class="ma" x="' + (vx[i] + ux * t).toFixed(1) + '" y="' + (vy[i] + uy * t).toFixed(1) +
          '" dy="' + p.dy + '" text-anchor="' + p.anchor + '">' + chemText(ann[i]) + '</text>');
      }
    }
    if (spec.note) {
      out.push('<text class="mn" x="' + cx + '" y="' + (H - 7) + '" text-anchor="middle">' + chemText(spec.note) + '</text>');
    }
    out.push('</svg>');
    return out.join('');
  }

  /**
   * chain(spec) -> SVG 문자열 (지그재그 골격)
   * spec = {
   *   nodes: [ {ann:'1.03'}, {ann:'1.81'}, {ann:'3.47'}, {label:'Cl'} ],
   *   note: '1-chloropropane'
   * }
   * node.label — 헤테로원자나 말단기 문자열 (없으면 탄소 꼭짓점)
   * node.dbl   — 'O' 등, 위쪽으로 이중결합을 그리고 그 원자를 표시
   * node.br    — 'OH' 등, 위쪽으로 단일결합 가지를 그림
   * node.br2   — 아래쪽 단일결합 가지 (사차 탄소용)
   * node.db    — 참이면 이 노드에서 다음 노드로 가는 결합이 이중결합
   * node.ann   — 그 자리의 δ 값
   */
  function chain(spec) {
    var nodes = spec.nodes || [], n = nodes.length;
    var bx = 30, dx = 30, dyv = 17;
    var W = spec.width || (bx * 2 + (n - 1) * dx);
    var H = spec.height || (spec.note ? 148 : 128);
    if (spec.note) { W = Math.max(W, noteWidth(spec.note)); }
    var yTop = 56, out = [], i, X = [], Y = [], up = [], k, sx, sy, ex, ey, sh;

    for (i = 0; i < n; i++) {
      up[i] = (i % 2 === 0);
      X[i] = bx + i * dx;
      Y[i] = yTop + (up[i] ? 0 : dyv);
    }
    out.push('<svg class="mol" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H +
      '" role="img" xmlns="http://www.w3.org/2000/svg" aria-label="' + esc(spec.alt || 'chemical structure') + '">');

    /* 결합: 라벨이 있는 꼭짓점 쪽은 조금 짧게 그려 글자와 겹치지 않게 한다.
       nodes[i].db 가 참이면 i→i+1 결합을 이중결합으로 그린다. */
    for (i = 0; i < n - 1; i++) {
      sx = X[i]; sy = Y[i]; ex = X[i + 1]; ey = Y[i + 1];
      var len = Math.sqrt((ex - sx) * (ex - sx) + (ey - sy) * (ey - sy)) || 1;
      var s0 = nodes[i].label ? 9 / len : 0, s1 = nodes[i + 1].label ? 9 / len : 0;
      var ax0 = sx + (ex - sx) * s0, ay0 = sy + (ey - sy) * s0;
      var ax1 = ex - (ex - sx) * s1, ay1 = ey - (ey - sy) * s1;
      out.push('<line class="mb" x1="' + ax0.toFixed(1) + '" y1="' + ay0.toFixed(1) +
        '" x2="' + ax1.toFixed(1) + '" y2="' + ay1.toFixed(1) + '"/>');
      if (nodes[i].db) {
        /* 결합에 수직인 방향으로 3 px 띄운 평행선 */
        var px = -(ey - sy) / len * 3.4, py = (ex - sx) / len * 3.4;
        out.push('<line class="mb" x1="' + (ax0 + px + (ax1 - ax0) * 0.15).toFixed(1) +
          '" y1="' + (ay0 + py + (ay1 - ay0) * 0.15).toFixed(1) +
          '" x2="' + (ax1 + px - (ax1 - ax0) * 0.15).toFixed(1) +
          '" y2="' + (ay1 + py - (ay1 - ay0) * 0.15).toFixed(1) + '"/>');
      }
    }
    for (i = 0; i < n; i++) {
      /* 아래쪽 단일결합 가지 — 사차 탄소처럼 가지가 둘 필요할 때 */
      if (nodes[i].br2) {
        out.push('<line class="mb" x1="' + X[i] + '" y1="' + (Y[i] + 5) + '" x2="' + X[i] + '" y2="' + (Y[i] + 19) + '"/>');
        out.push('<text class="mt" x="' + X[i] + '" y="' + (Y[i] + 31) + '" text-anchor="middle">' + chemText(nodes[i].br2) + '</text>');
      }
      /* 위쪽 단일결합 가지 (예: -OH, -Cl) */
      if (nodes[i].br) {
        out.push('<line class="mb" x1="' + X[i] + '" y1="' + (Y[i] - 5) + '" x2="' + X[i] + '" y2="' + (Y[i] - 19) + '"/>');
        out.push('<text class="mt" x="' + X[i] + '" y="' + (Y[i] - 23) + '" text-anchor="middle">' + chemText(nodes[i].br) + '</text>');
      }
      /* 위쪽 이중결합 (보통 C=O) */
      if (nodes[i].dbl) {
        sh = 20;
        out.push('<line class="mb" x1="' + (X[i] - 2.5) + '" y1="' + (Y[i] - 6) + '" x2="' + (X[i] - 2.5) + '" y2="' + (Y[i] - sh) + '"/>');
        out.push('<line class="mb" x1="' + (X[i] + 2.5) + '" y1="' + (Y[i] - 6) + '" x2="' + (X[i] + 2.5) + '" y2="' + (Y[i] - sh) + '"/>');
        out.push('<text class="mt" x="' + X[i] + '" y="' + (Y[i] - sh - 4) + '" text-anchor="middle">' + chemText(nodes[i].dbl) + '</text>');
      }
      if (nodes[i].label) {
        out.push('<text class="mt" x="' + X[i] + '" y="' + Y[i] + '" dy="4" text-anchor="middle">' + chemText(nodes[i].label) + '</text>');
      }
      if (nodes[i].ann) {
        /* 지그재그 바깥쪽에 배치한다. 이중결합이 위로 나간 자리는 아래쪽. */
        var below = !up[i] || nodes[i].dbl || nodes[i].br;
        /* 원자 라벨이 있는 자리는 글자가 이미 차 있으므로 한 칸 더 띄운다 */
        var off = nodes[i].label ? (below ? 27 : -21) : (below ? 20 : -13);
        out.push('<text class="ma" x="' + X[i] + '" y="' + (Y[i] + off) + '" text-anchor="middle">' +
          chemText(nodes[i].ann) + '</text>');
      }
    }
    if (spec.note) {
      out.push('<text class="mn" x="' + (W / 2) + '" y="' + (H - 7) + '" text-anchor="middle">' + chemText(spec.note) + '</text>');
    }
    out.push('</svg>');
    return out.join('');
  }

  /** figure(svgList, caption, source) -> <figure> 마크업 */
  function figure(list, caption, source) {
    var cap = '';
    if (caption || source) {
      cap = '<figcaption>' + (caption || '') +
        (source ? '<span class="src">' + source + '</span>' : '') + '</figcaption>';
    }
    return '<figure class="mol-fig"><div class="mol-row">' + list.join('') + '</div>' + cap + '</figure>';
  }

  global.Structure = { benzene: benzene, chain: chain, figure: figure, chemText: chemText };
})(window);
