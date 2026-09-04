/* spectrum2d.js — 2차원 NMR 상관 지도 SVG 생성기
 * Schematic 2D NMR correlation map (teaching figure, not measured data).
 *
 * 의존성 없음. spectrum.js 와 같은 방식으로 문자열 SVG만 만들며, 스타일은
 * styles.css 의 .nmr-2d 규칙이 담당합니다.
 * No dependencies. Like spectrum.js it only builds SVG strings; the styling
 * lives in styles.css under .nmr-2d.
 *
 * 축 방향은 관례를 따릅니다. F2(가로)와 F1(세로) 모두 왼쪽·위쪽이 다운필드이며,
 * 그래서 동핵 실험의 대각선은 왼쪽 위에서 오른쪽 아래로 내려갑니다.
 * Axes follow the usual convention: δ increases to the left on F2 and upward on
 * F1, so the diagonal of a homonuclear experiment runs from top-left to
 * bottom-right.
 */
(function (global) {
  'use strict';

  var AMP_RE = /&/g, LT_RE = /</g, GT_RE = />/g;
  function esc(s) {
    return String(s).replace(AMP_RE, '&amp;').replace(LT_RE, '&lt;').replace(GT_RE, '&gt;');
  }
  function num(v) { return (Math.round(v * 10) / 10).toFixed(1); }

  /** 동핵 실험인가 — 대각선이 있는가 / homonuclear: does it have a diagonal? */
  function isHomo(kind) { return kind === 'cosy' || kind === 'noesy' || kind === 'tocsy'; }

  /** 눈금 간격을 축 범위에 맞춰 고른다 / pick a tick step for the span */
  function tickStep(span) {
    var raw = span / 6, pow = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), n = raw / pow;
    if (n <= 1) { return pow; }
    if (n <= 2) { return 2 * pow; }
    if (n <= 5) { return 5 * pow; }
    return 10 * pow;
  }
  function fmtTick(v, step) {
    if (step >= 1) { return String(Math.round(v)); }
    return v.toFixed(step >= 0.5 ? 1 : 2);
  }

  /** 교차 봉우리를 등고선처럼 세 겹의 타원으로 그린다 */
  function contour(cx, cy, r, cls) {
    var out = [], i, rr;
    for (i = 0; i < 3; i++) {
      rr = r * (1 - i * 0.3);
      out.push('<ellipse class="' + cls + '" cx="' + num(cx) + '" cy="' + num(cy) +
        '" rx="' + num(rr) + '" ry="' + num(rr * 0.82) + '"/>');
    }
    return out.join('');
  }

  /**
   * render(spec) -> SVG 문자열
   * spec = {
   *   kind:   'cosy' | 'noesy' | 'tocsy' | 'hsqc' | 'hmbc',
   *   f2:     { min, max, nucleus },      가로축 (보통 1H)
   *   f1:     { min, max, nucleus },      세로축 (1H 또는 13C)
   *   x:      [ { ppm, label } ],         위쪽 1차원 투영
   *   y:      [ { ppm, label } ],         왼쪽 1차원 투영
   *   peaks:  [ { f2, f1, label, weak } ] 교차 봉우리 (동핵이면 자동으로 대칭 복제)
   * }
   */
  function render(spec) {
    var kind = spec.kind || 'cosy', homo = isHomo(kind);
    var f2 = spec.f2 || {}, f1 = spec.f1 || {};
    var x2min = f2.min != null ? f2.min : 0, x2max = f2.max != null ? f2.max : 10;
    var y1min = f1.min != null ? f1.min : 0, y1max = f1.max != null ? f1.max : 10;
    var span2 = (x2max - x2min) || 1, span1 = (y1max - y1min) || 1;

    var W = 760, H = spec.height || 520;
    var padL = 92, padR = 30, padT = 78, padB = 58;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var projH = 46;                      /* 1차원 투영 높이 / height of the 1D projections */

    function X(ppm) { return padL + (x2max - ppm) / span2 * plotW; }
    function Y(ppm) { return padT + (y1max - ppm) / span1 * plotH; }

    var out = [], i, p, v, step;
    out.push('<svg class="nmr-2d" viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
      'xmlns="http://www.w3.org/2000/svg" aria-label="' +
      esc(spec.alt || (kind.toUpperCase() + ' correlation map')) + '">');

    /* --- 격자와 눈금 / grid and ticks --- */
    out.push('<rect class="box" x="' + padL + '" y="' + padT + '" width="' + plotW + '" height="' + plotH + '"/>');

    step = tickStep(span2);
    for (v = Math.ceil(x2min / step) * step; v <= x2max + 1e-9; v += step) {
      out.push('<line class="grid" x1="' + num(X(v)) + '" y1="' + padT + '" x2="' + num(X(v)) +
        '" y2="' + (padT + plotH) + '"/>');
      out.push('<text class="tk" x="' + num(X(v)) + '" y="' + (padT + plotH + 16) +
        '" text-anchor="middle">' + fmtTick(v, step) + '</text>');
    }
    step = tickStep(span1);
    for (v = Math.ceil(y1min / step) * step; v <= y1max + 1e-9; v += step) {
      out.push('<line class="grid" x1="' + padL + '" y1="' + num(Y(v)) + '" x2="' + (padL + plotW) +
        '" y2="' + num(Y(v)) + '"/>');
      out.push('<text class="tk" x="' + (padL - 8) + '" y="' + num(Y(v) + 4) +
        '" text-anchor="end">' + fmtTick(v, step) + '</text>');
    }

    /* 축 이름 / axis titles */
    out.push('<text class="axl" x="' + (padL + plotW) + '" y="' + (padT + plotH + 36) +
      '" text-anchor="end">F2 &#8212; δ ' + esc(f2.nucleus || '1H') + ' / ppm</text>');
    out.push('<text class="axl" x="8" y="' + (padT - 58) +
      '" text-anchor="start">F1 &#8212; δ ' + esc(f1.nucleus || '1H') + ' / ppm</text>');

    /* --- 1차원 투영 / 1D projections --- */
    /* 라벨이 서로 겹치면 위쪽은 한 줄 올리고, 왼쪽은 한 칸 더 왼쪽으로 물린다.
       Labels that would collide are lifted a row (top) or pushed out a column (left). */
    var xs = (spec.x || []).slice().sort(function (a, b) { return b.ppm - a.ppm; });
    var ys = (spec.y || []).slice().sort(function (a, b) { return b.ppm - a.ppm; });
    var placedX = [], placedY = [], lx, ly, w, row, j, clash;

    for (i = 0; i < xs.length; i++) {
      p = xs[i];
      lx = X(p.ppm);
      out.push('<line class="pj" x1="' + num(lx) + '" y1="' + (padT - 6) +
        '" x2="' + num(lx) + '" y2="' + (padT - projH) + '"/>');
      if (!p.label) { continue; }
      w = String(p.label).length * 6;
      row = 0;
      do {
        clash = false;
        for (j = 0; j < placedX.length; j++) {
          if (placedX[j].row === row && Math.abs(placedX[j].x - lx) < (placedX[j].w + w) / 2 + 4) {
            clash = true; break;
          }
        }
        if (clash) { row++; }
      } while (clash && row < 3);
      placedX.push({ x: lx, w: w, row: row });
      out.push('<text class="lb" x="' + num(lx) + '" y="' + (padT - projH - 6 - row * 13) +
        '" text-anchor="middle">' + esc(p.label) + '</text>');
    }

    /* 왼쪽 라벨은 봉우리가 촘촘하면 위아래로 비켜 놓고 가는 연결선을 긋는다.
       Left labels step aside vertically when peaks crowd, with a thin leader line. */
    var OFFS = [0, -13, 13, -26, 26, -39, 39], off, k;
    for (i = 0; i < ys.length; i++) {
      p = ys[i];
      ly = Y(p.ppm);
      out.push('<line class="pj" x1="' + (padL - 6) + '" y1="' + num(ly) +
        '" x2="' + (padL - projH) + '" y2="' + num(ly) + '"/>');
      if (!p.label) { continue; }
      off = 0;
      for (k = 0; k < OFFS.length; k++) {
        clash = false;
        for (j = 0; j < placedY.length; j++) {
          if (Math.abs(placedY[j] - (ly + OFFS[k])) < 12) { clash = true; break; }
        }
        if (!clash) { off = OFFS[k]; break; }
      }
      placedY.push(ly + off);
      if (off !== 0) {
        out.push('<line class="ldr" x1="' + (padL - projH) + '" y1="' + num(ly) +
          '" x2="' + (padL - projH - 7) + '" y2="' + num(ly + off) + '"/>');
      }
      out.push('<text class="lb" x="' + (padL - projH - 9) + '" y="' + num(ly + off + 4) +
        '" text-anchor="end">' + esc(p.label) + '</text>');
    }

    /* --- 대각선 / diagonal (homonuclear only) --- */
    if (homo) {
      var lo = Math.max(x2min, y1min), hi = Math.min(x2max, y1max);
      out.push('<line class="diag" x1="' + num(X(hi)) + '" y1="' + num(Y(hi)) +
        '" x2="' + num(X(lo)) + '" y2="' + num(Y(lo)) + '"/>');
      for (i = 0; i < xs.length; i++) {
        p = xs[i];
        if (p.ppm >= y1min && p.ppm <= y1max) {
          out.push(contour(X(p.ppm), Y(p.ppm), 9, 'dg'));
        }
      }
    }

    /* --- 교차 봉우리 / cross peaks --- */
    var peaks = (spec.peaks || []).slice(), seen = {}, key;
    for (i = 0; i < peaks.length; i++) { seen[num(peaks[i].f2) + '|' + num(peaks[i].f1)] = 1; }
    if (homo) {                                   /* 동핵 실험은 대각선 대칭이다 */
      for (i = 0; i < (spec.peaks || []).length; i++) {
        p = spec.peaks[i];
        key = num(p.f1) + '|' + num(p.f2);
        if (!seen[key]) {
          seen[key] = 1;
          peaks.push({ f2: p.f1, f1: p.f2, weak: p.weak, mirror: true });
        }
      }
    }
    for (i = 0; i < peaks.length; i++) {
      p = peaks[i];
      out.push(contour(X(p.f2), Y(p.f1), p.weak ? 8 : 11, p.weak ? 'xw' : 'xp'));
      if (p.guide) {
        out.push('<line class="gd" x1="' + num(X(p.f2)) + '" y1="' + num(Y(p.f1)) +
          '" x2="' + num(X(p.f2)) + '" y2="' + (padT - 6) + '"/>');
        out.push('<line class="gd" x1="' + num(X(p.f2)) + '" y1="' + num(Y(p.f1)) +
          '" x2="' + (padL - 6) + '" y2="' + num(Y(p.f1)) + '"/>');
      }
      if (p.label) {
        out.push('<text class="pl" x="' + num(X(p.f2) + 15) + '" y="' + num(Y(p.f1) - 11) +
          '" text-anchor="start">' + esc(p.label) + '</text>');
      }
    }

    out.push('</svg>');
    return out.join('');
  }

  /** figure(spec, caption, source) -> <figure> 마크업 (spectrum.js 와 동일한 규약) */
  function figure(spec, caption, source) {
    var cap = '';
    if (caption || source) {
      cap = '<figcaption>' + (caption || '') +
        (source ? '<span class="src">' + source + '</span>' : '') + '</figcaption>';
    }
    return '<figure class="spec spec2d"><div class="spec-scroll">' + render(spec) + '</div>' + cap + '</figure>';
  }

  global.Spectrum2D = { render: render, figure: figure, isHomo: isHomo };
})(window);
