/* structure.js — 분자 구조식 SVG 생성기 (ACS 작도 규약 기준)
 * Molecular structure renderer following ACS drawing conventions.
 * Inline SVG, no dependencies, ES5.
 *
 * ACS Style Guide / ACS Document 1996 의 작도 규약을 비율로 옮겼습니다.
 *   · 결합 길이를 고리와 사슬에서 동일하게 유지 (L)
 *   · 사슬 각도 120° (수평 기준 ±30°)
 *   · 이중결합 간격 = 결합 길이의 18%, 안쪽 선은 양끝을 조금 줄임
 *   · 결합선 굵기 = 결합 길이의 약 1/23
 *   · 원자 라벨은 Helvetica/Arial 계열, 결합 끝과 라벨 사이에 여백
 * Bond length is uniform across rings and chains, chains are drawn at the
 * 120° ACS angle, double-bond spacing is 18% of bond length, and atom labels
 * are set in a Helvetica/Arial stack with a margin between bond and glyph.
 *
 * 그림 크기는 그려진 내용의 경계 상자에서 계산합니다. 고정 크기를 쓰지 않으므로
 * 긴 치환기나 긴 이름이 그림 밖으로 잘리지 않습니다.
 * The viewBox is computed from the bounding box of what was actually drawn, so
 * long substituents and long names can never overflow the figure.
 */
(function (global) {
  'use strict';

  var L = 32;                 /* 결합 길이 / bond length */
  var SW = 1.4;               /* 결합선 굵기 / bond stroke width */
  var DB = L * 0.18;          /* 이중결합 간격 / double-bond spacing */
  var FS = 13;                /* 원자 라벨 크기 / atom label size */
  var AS = 11;                /* 주석 크기 / annotation size */
  var MARGIN = 7;             /* 결합 끝과 라벨 사이 여백 / bond-to-label margin */
  var RAD = Math.PI / 180;

  var AMP = /&/g, LT = /</g, GT = />/g, ATOMISH = /[A-Za-z)\]]/;
  function esc(s) { return String(s).replace(AMP, '&amp;').replace(LT, '&lt;').replace(GT, '&gt;'); }

  /* ------------------------------------------------- 화학식 조판 */
  /**
   * 숫자는 바로 앞이 원소 기호나 닫는 괄호일 때만 아래첨자로 내립니다.
   * "NO2" -> NO₂, "N(CH3)2" -> N(CH₃)₂ 이지만 "8.22" 와 "4-nitroanisole" 은 그대로.
   */
  function segments(s) {
    var segs = [], buf = '', mode = 'n', i = 0, c, prev;
    function flush() { if (buf !== '') { segs.push({ m: mode, v: buf }); buf = ''; } }
    for (i = 0; i < s.length;) {
      c = s.charAt(i);
      if (c === '^') {
        flush(); mode = 's'; i++;
        while (i < s.length && '+-−0123456789'.indexOf(s.charAt(i)) >= 0) { buf += s.charAt(i); i++; }
        flush(); mode = 'n'; continue;
      }
      if (c >= '0' && c <= '9') {
        prev = i > 0 ? s.charAt(i - 1) : '';
        if (ATOMISH.test(prev)) { if (mode !== 'b') { flush(); mode = 'b'; } }
        else if (mode !== 'n') { flush(); mode = 'n'; }
        buf += c; i++; continue;
      }
      if (mode !== 'n') { flush(); mode = 'n'; }
      buf += c; i++;
    }
    flush();
    return segs;
  }

  function chemText(s) {
    var segs = segments(s), out = '', cur = 0, k, want, dy;
    for (k = 0; k < segs.length; k++) {
      want = segs[k].m === 'b' ? 3.5 : (segs[k].m === 's' ? -4.5 : 0);
      dy = want - cur; cur = want;
      out += '<tspan' + (segs[k].m === 'n' ? '' : ' class="sb"') + ' dy="' + dy + '">' + esc(segs[k].v) + '</tspan>';
    }
    return out;
  }

  /** 조판된 문자열의 대략적인 폭 / approximate rendered width */
  function textWidth(s, fontPx) {
    var segs = segments(s), w = 0, k;
    for (k = 0; k < segs.length; k++) {
      w += segs[k].v.length * fontPx * (segs[k].m === 'n' ? 0.62 : 0.45);
    }
    return w;
  }

  /* ------------------------------------------------- 그리기 버퍼 */
  function Builder() {
    this.el = [];
    this.x0 = 1e9; this.y0 = 1e9; this.x1 = -1e9; this.y1 = -1e9;
  }
  Builder.prototype.grow = function (x, y) {
    if (x < this.x0) { this.x0 = x; } if (x > this.x1) { this.x1 = x; }
    if (y < this.y0) { this.y0 = y; } if (y > this.y1) { this.y1 = y; }
  };
  Builder.prototype.line = function (x1, y1, x2, y2) {
    this.el.push('<line class="mb" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) +
      '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>');
    this.grow(x1, y1); this.grow(x2, y2);
  };
  Builder.prototype.circle = function (cx, cy, r) {
    this.el.push('<circle class="mb" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="none"/>');
    this.grow(cx - r, cy - r); this.grow(cx + r, cy + r);
  };
  /** anchor: 'start' | 'middle' | 'end' — dy 는 이미 반영된 y 를 넘길 것 */
  Builder.prototype.text = function (x, y, str, cls, anchor, fontPx) {
    this.el.push('<text class="' + cls + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) +
      '" text-anchor="' + anchor + '">' + chemText(str) + '</text>');
    var w = textWidth(str, fontPx);
    var lx = anchor === 'start' ? x : (anchor === 'end' ? x - w : x - w / 2);
    this.grow(lx, y - fontPx * 0.82); this.grow(lx + w, y + fontPx * 0.32);
  };
  Builder.prototype.svg = function (spec, noteStr) {
    var pad = 8, W, H, out;
    if (noteStr) {
      /* 이름은 그림 폭 한가운데에 놓되, 폭이 모자라면 경계를 넓힌다 */
      var nw = textWidth(noteStr, AS);
      var cx = (this.x0 + this.x1) / 2;
      this.grow(cx - nw / 2, this.y1 + 4);
      this.grow(cx + nw / 2, this.y1 + 18);
    }
    W = Math.ceil(this.x1 - this.x0 + pad * 2);
    H = Math.ceil(this.y1 - this.y0 + pad * 2);
    out = ['<svg class="mol" width="' + W + '" height="' + H + '" viewBox="' +
      (this.x0 - pad).toFixed(1) + ' ' + (this.y0 - pad).toFixed(1) + ' ' + W + ' ' + H +
      '" role="img" xmlns="http://www.w3.org/2000/svg" aria-label="' + esc(spec.alt || 'chemical structure') + '">'];
    out.push(this.el.join(''));
    if (noteStr) {
      out.push('<text class="mn" x="' + ((this.x0 + this.x1) / 2).toFixed(1) + '" y="' +
        (this.y1 - 4).toFixed(1) + '" text-anchor="middle">' + chemText(noteStr) + '</text>');
    }
    out.push('</svg>');
    return out.join('');
  };

  /* ------------------------------------------------- 공통 도구 */
  function unit(a) { return { x: Math.cos(a), y: Math.sin(a) }; }
  function anchorFor(ux) { return ux > 0.3 ? 'start' : (ux < -0.3 ? 'end' : 'middle'); }
  /** 라벨 기준점: 방향 u 쪽으로 놓을 때의 기준선 y 보정 */
  function baseline(uy, fontPx) { return uy > 0.5 ? fontPx * 0.75 : (uy < -0.5 ? -fontPx * 0.28 : fontPx * 0.34); }

  /** 이중결합의 안쪽 평행선 (결합 방향에 수직으로 DB 만큼, 양끝 13% 줄임) */
  function doubleLine(b, x1, y1, x2, y2, side) {
    var dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var px = -dy / len * DB * side, py = dx / len * DB * side;
    b.line(x1 + px + dx * 0.13, y1 + py + dy * 0.13, x2 + px - dx * 0.13, y2 + py - dy * 0.13);
  }

  /* ------------------------------------------------- 사슬 그리기 */
  /**
   * 지그재그 사슬. ACS 규약대로 결합 길이 L, 결합 각도 ±30°.
   * origin 에서 시작하며 hasOrigin 이 참이면 origin 은 이미 존재하는 원자(고리 꼭짓점)라
   * 첫 결합이 origin 에서 nodes[0] 으로 그어진다.
   * node = { label, dbl, br, ann, db }
   *   label — 헤테로원자 문자열 (없으면 탄소 꼭짓점, 수소는 그리지 않음)
   *   dbl   — 이 자리에서 밖으로 나가는 이중결합의 원자 ('O')
   *   br    — 이 자리에서 밖으로 나가는 단일결합 가지
   *   db    — 참이면 이 노드에서 다음 노드로 가는 결합이 이중결합
   *   ann   — 이 자리의 δ 값
   */
  function drawChain(b, ox, oy, baseAngle, nodes, hasOrigin) {
    var n = nodes.length, P = [], D = [], k, a, u, prev, x, y;
    prev = { x: ox, y: oy };
    for (k = 0; k < n; k++) {
      a = baseAngle + ((k % 2 === 0) ? -30 : 30) * RAD;
      D[k] = a; u = unit(a);
      x = prev.x + (hasOrigin || k > 0 ? L : 0) * u.x;
      y = prev.y + (hasOrigin || k > 0 ? L : 0) * u.y;
      if (!hasOrigin && k === 0) { x = ox; y = oy; }
      P[k] = { x: x, y: y };
      prev = P[k];
    }

    /* 결합 */
    var startIdx = hasOrigin ? -1 : 0;
    for (k = startIdx; k < n - 1; k++) {
      var A = (k < 0) ? { x: ox, y: oy } : P[k];
      var B = P[k + 1];
      var trimA = (k >= 0 && nodes[k].label) ? MARGIN : 0;
      var trimB = nodes[k + 1].label ? MARGIN : 0;
      var dx = B.x - A.x, dy = B.y - A.y, len = Math.sqrt(dx * dx + dy * dy) || 1;
      var ax = A.x + dx / len * trimA, ay = A.y + dy / len * trimA;
      var bx2 = B.x - dx / len * trimB, by2 = B.y - dy / len * trimB;
      b.line(ax, ay, bx2, by2);
      if (k >= 0 && nodes[k].db) { doubleLine(b, ax, ay, bx2, by2, 1); }
    }

    /* 각 자리의 라벨·가지·주석 */
    for (k = 0; k < n; k++) {
      /* 바깥 방향(외부 이등분선): 인접 두 결합의 반대쪽 */
      var v1, v2, ex, ey, el;
      v1 = (k === 0)
        ? (hasOrigin ? { x: ox - P[0].x, y: oy - P[0].y } : { x: -Math.cos(D[0]), y: -Math.sin(D[0]) })
        : { x: P[k - 1].x - P[k].x, y: P[k - 1].y - P[k].y };
      v2 = (k === n - 1)
        ? { x: Math.cos(D[k]), y: Math.sin(D[k]) }
        : { x: P[k + 1].x - P[k].x, y: P[k + 1].y - P[k].y };
      var n1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y) || 1, n2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y) || 1;
      ex = -(v1.x / n1 + v2.x / n2); ey = -(v1.y / n1 + v2.y / n2);
      el = Math.sqrt(ex * ex + ey * ey);
      if (el < 0.05) { ex = -v1.y / n1; ey = v1.x / n1; el = 1; }
      ex /= el; ey /= el;

      var node = nodes[k], px = P[k].x, py = P[k].y, used = false, Lb = L;

      if (node.brC) {          /* 라벨 없는 탄소 가지 — 메틸은 선 하나로 */
        b.line(px, py, px + ex * Lb, py + ey * Lb);
        used = true;
      }
      if (node.brC2) {         /* 반대쪽 탄소 가지 (사차 탄소용) */
        b.line(px, py, px - ex * Lb, py - ey * Lb);
      }
      if (node.dbl) {
        var qx = px + ex * L, qy = py + ey * L;
        var tA = node.label ? MARGIN : 0;
        b.line(px + ex * tA, py + ey * tA, qx - ex * MARGIN, qy - ey * MARGIN);
        doubleLine(b, px + ex * tA, py + ey * tA, qx - ex * MARGIN, qy - ey * MARGIN, 1);
        b.text(qx, qy + baseline(ey, FS), node.dbl, 'mt', anchorFor(ex), FS);
        used = true;
      } else if (node.br && !node.brC) {
        var rx = px + ex * L, ry = py + ey * L;
        b.line(px, py, rx - ex * MARGIN, ry - ey * MARGIN);
        b.text(rx, ry + baseline(ey, FS), node.br, 'mt', anchorFor(ex), FS);
        used = true;
      }
      if (node.br2) {
        b.line(px - ex * 0, py - ey * 0, px - ex * (L - MARGIN), py - ey * (L - MARGIN));
        b.text(px - ex * L, py - ey * L + baseline(-ey, FS), node.br2, 'mt', anchorFor(-ex), FS);
      }
      if (node.label) {
        b.text(px, py + FS * 0.34, node.label, 'mt', 'middle', FS);
      }
      if (node.ann) {
        /* 가지가 이미 바깥을 쓰고 있으면 주석은 반대쪽에 둔다 */
        var sx = used ? -ex : ex, sy = used ? -ey : ey;
        var d = node.label ? 20 : 15;
        b.text(px + sx * d, py + sy * d + baseline(sy, AS), node.ann, 'ma', anchorFor(sx), AS);
      }
    }
    return P;
  }

  /* ------------------------------------------------- 치환기 사전 */
  /* 탄소 골격은 그리고, 헤테로원자로 시작하는 관용 약어는 글자로 둔다(ACS 관행). */
  var GROUPS = {
    'CH3':       [{}],
    'CH2CH3':    [{}, {}],
    'CH2CH2CH3': [{}, {}, {}],
    'iPr':       [{ brC: true }, {}],
    'CHO':       [{ dbl: 'O' }],
    'COCH3':     [{ dbl: 'O' }, {}],
    'COOH':      [{ dbl: 'O' }, { label: 'OH' }],
    'COOCH3':    [{ dbl: 'O' }, { label: 'O' }, {}],
    'COOCH2CH3': [{ dbl: 'O' }, { label: 'O' }, {}, {}],
    'OCOCH3':    [{ label: 'O' }, { dbl: 'O' }, {}],
    'CH2COOCH3': [{}, { dbl: 'O' }, { label: 'O' }, {}],
    'CH2OH':     [{}, { label: 'OH' }],
    'CH2CH2OH':  [{}, {}, { label: 'OH' }]
  };

  /* ------------------------------------------------- 벤젠 고리 */
  /**
   * benzene(spec)
   *   subs : { 1:'NO2' }               헤테로 약어는 글자로
   *          { 1:'COOCH2CH3' }         GROUPS 에 있으면 실제 골격으로 그림
   *          { 1:{ g:'CH2CH3', ann:['2.76','1.29'] } }  자리별 δ 주석까지
   *          { 1:{ t:'NO2' } }         무조건 글자로
   *   ann  : { 2:'8.20' }              그 <em>고리 자리</em>의 δ (치환된 자리면 ipso 값)
   *   arom : 'kekule'(기본) | 'circle'
   *   note : 이름
   */
  function benzene(spec) {
    var subs = spec.subs || {}, ann = spec.ann || {};
    var b = new Builder(), r = spec.r || L, cx = 0, cy = 0;
    var vx = [], vy = [], i, j, a, u, sub, chain, k;

    for (i = 1; i <= 6; i++) {
      a = (-90 + (i - 1) * 60) * RAD;
      vx[i] = cx + r * Math.cos(a); vy[i] = cy + r * Math.sin(a);
    }
    for (i = 1; i <= 6; i++) {
      j = (i % 6) + 1;
      b.line(vx[i], vy[i], vx[j], vy[j]);
    }
    if (spec.arom === 'circle') {
      b.circle(cx, cy, r * 0.6);
    } else {
      for (k = 0; k < 3; k++) {
        i = 1 + k * 2; j = i + 1;
        /* 안쪽으로 오도록 부호를 고른다 */
        var mx = (vx[i] + vx[j]) / 2, my = (vy[i] + vy[j]) / 2;
        var dx = vx[j] - vx[i], dy = vy[j] - vy[i], len = Math.sqrt(dx * dx + dy * dy) || 1;
        var side = ((-dy / len) * (cx - mx) + (dx / len) * (cy - my)) > 0 ? 1 : -1;
        doubleLine(b, vx[i], vy[i], vx[j], vy[j], side);
      }
    }

    for (i = 1; i <= 6; i++) {
      a = (-90 + (i - 1) * 60) * RAD; u = unit(a);
      sub = subs[i];
      chain = null;
      var forcedText = null, subAnn = null, textAnn = null;
      if (sub) {
        if (typeof sub === 'string') {
          if (GROUPS[sub]) { chain = GROUPS[sub]; } else { forcedText = sub; }
        } else if (sub.t) { forcedText = sub.t; textAnn = sub.ann || null; }
        else if (sub.g) {
          chain = GROUPS[sub.g] || null;
          if (!chain) { forcedText = sub.g; }
          subAnn = sub.ann || null;
        }
      }

      if (chain) {
        var nodes = [], m;
        for (m = 0; m < chain.length; m++) {
          var src = chain[m], cp = {}, key;
          for (key in src) { if (src.hasOwnProperty(key)) { cp[key] = src[key]; } }
          if (subAnn && subAnn[m]) { cp.ann = subAnn[m]; }
          nodes.push(cp);
        }
        drawChain(b, vx[i], vy[i], a, nodes, true);
      } else if (forcedText) {
        b.line(vx[i], vy[i], vx[i] + u.x * (L - MARGIN), vy[i] + u.y * (L - MARGIN));
        b.text(vx[i] + u.x * L, vy[i] + u.y * L + baseline(u.y, FS), forcedText, 'mt', anchorFor(u.x), FS);
        if (textAnn) {
          /* 글자 치환기 자신의 δ 는 그 글자 바깥쪽에 둔다 */
          var tw = textWidth(forcedText, FS), dOut = L + (Math.abs(u.x) > 0.3 ? tw + 8 : 15);
          b.text(vx[i] + u.x * dOut, vy[i] + u.y * dOut + baseline(u.y, AS), textAnn, 'ma', anchorFor(u.x), AS);
        }
      }

      if (ann[i]) {
        if (sub) {
          /* 치환된 자리의 주석(ipso 값)은 결합과 겹치지 않도록 옆으로 비켜 놓는다 */
          var sx = -u.y, sy = u.x;
          var px2 = vx[i] + sx * 23 + u.x * 7, py2 = vy[i] + sy * 23 + u.y * 7;
          b.text(px2, py2 + baseline(sy, AS), ann[i], 'ma', anchorFor(sx), AS);
        } else {
          b.text(vx[i] + u.x * 15, vy[i] + u.y * 15 + baseline(u.y, AS), ann[i], 'ma', anchorFor(u.x), AS);
        }
      }
    }
    return b.svg(spec, spec.note || '');
  }

  /* ------------------------------------------------- 단독 사슬 */
  function chain(spec) {
    var b = new Builder();
    drawChain(b, 0, 0, 0, spec.nodes || [], false);
    return b.svg(spec, spec.note || '');
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

  global.Structure = {
    benzene: benzene, chain: chain, figure: figure, chemText: chemText,
    GROUPS: GROUPS, metrics: { L: L, SW: SW, DB: DB, FS: FS }
  };
})(window);
