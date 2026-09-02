/* spectrum.js — 모식적 1H NMR 스펙트럼 SVG 생성기
 * Schematic 1H NMR spectrum renderer (teaching figure, not measured data).
 * 다중선 간격은 눈에 보이도록 과장되어 있습니다 / multiplet spacing is exaggerated for legibility.
 */
(function (global) {
  'use strict';

  var MULT_LINES = { s: 1, d: 2, t: 3, q: 4, quint: 5, sext: 6, sept: 7, oct: 8, m: 1, br: 1 };

  function binomial(n) {
    var row = [1], i, j, next;
    for (i = 1; i < n; i++) {
      next = [1];
      for (j = 1; j < row.length; j++) { next.push(row[j - 1] + row[j]); }
      next.push(1);
      row = next;
    }
    return row;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /**
   * render(spec) -> SVG markup string
   * spec = {
   *   peaks: [{ ppm:Number, mult:'s'|'d'|…, H:Number, label:String, tall:Boolean }],
   *   min, max        // ppm window (default 0–10)
   *   nucleus         // '1H' (default) | '13C'
   *   showH           // show integration labels (default true)
   * }
   */
  function render(spec) {
    var peaks   = (spec.peaks || []).slice().sort(function (a, b) { return b.ppm - a.ppm; });
    var min     = spec.min != null ? spec.min : 0;
    var max     = spec.max != null ? spec.max : 10;
    var showH   = spec.showH !== false;
    var W = 800, H = spec.height || 250;
    var padL = 26, padR = 26, padT = 42, padB = 46;
    var plotW = W - padL - padR;
    var baseY = H - padB;
    var plotH = baseY - padT;

    var maxH = 1;
    peaks.forEach(function (p) { maxH = Math.max(maxH, p.H || 1); });

    function x(ppm) { return padL + (max - ppm) / (max - min) * plotW; }

    var out = [];
    out.push('<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" xmlns="http://www.w3.org/2000/svg">');
    out.push('<style>' +
      '.ax{stroke:currentColor;stroke-width:1;opacity:.55}' +
      '.pk{stroke:var(--accent,#2f6f5e);stroke-width:2;stroke-linecap:round}' +
      '.tk{font:11px ui-monospace,monospace;fill:currentColor;opacity:.6}' +
      '.pl{font:11px ui-monospace,monospace;fill:var(--accent,#2f6f5e)}' +
      '.il{font:10px ui-monospace,monospace;fill:currentColor;opacity:.75}' +
      '.lb{font:11px -apple-system,system-ui,sans-serif;fill:currentColor;opacity:.8}' +
      '.hump{fill:none;stroke:var(--accent,#2f6f5e);stroke-width:2}' +
      '</style>');

    /* axis + ticks */
    out.push('<line class="ax" x1="' + padL + '" y1="' + baseY + '" x2="' + (W - padR) + '" y2="' + baseY + '"/>');
    var step = (max - min) > 12 ? 20 : 1;
    var v;
    for (v = Math.ceil(min); v <= max; v += step) {
      var xv = x(v);
      out.push('<line class="ax" x1="' + xv.toFixed(1) + '" y1="' + baseY + '" x2="' + xv.toFixed(1) + '" y2="' + (baseY + 5) + '"/>');
      out.push('<text class="tk" x="' + xv.toFixed(1) + '" y="' + (baseY + 18) + '" text-anchor="middle">' + v + '</text>');
    }
    out.push('<text class="tk" x="' + (W - padR) + '" y="' + (baseY + 34) + '" text-anchor="end">δ / ppm  (' +
      esc(spec.nucleus || '1H') + ')</text>');
    out.push('<text class="tk" x="' + padL + '" y="' + (baseY + 34) + '" text-anchor="start">' +
      '← downfield / deshielded   •   upfield / shielded →</text>');

    /* 라벨 겹침 방지 / avoid colliding labels */
    var placed = [], hStagger = 0;

    /* peaks */
    peaks.forEach(function (p) {
      var n = MULT_LINES[p.mult] || 1;
      var cx = x(p.ppm);
      var hFrac = Math.min(1, Math.sqrt((p.H || 1) / maxH));
      var top = plotH * (p.tall ? 0.92 : 0.55 + 0.37 * hFrac);
      var gap = 4.2;                       /* exaggerated multiplet spacing */
      var i, coef, cmax, y0, lx;

      if (p.mult === 'm' || p.mult === 'br') {
        var wHalf = p.mult === 'br' ? 26 : 13;
        var hh = p.mult === 'br' ? top * 0.45 : top;
        out.push('<path class="hump" d="M' + (cx - wHalf) + ' ' + baseY +
          ' C' + (cx - wHalf * 0.4) + ' ' + baseY + ' ' + (cx - wHalf * 0.35) + ' ' + (baseY - hh) + ' ' + cx + ' ' + (baseY - hh) +
          ' C' + (cx + wHalf * 0.35) + ' ' + (baseY - hh) + ' ' + (cx + wHalf * 0.4) + ' ' + baseY + ' ' + (cx + wHalf) + ' ' + baseY + '"/>');
        y0 = baseY - hh;
      } else {
        coef = binomial(n);
        cmax = Math.max.apply(null, coef);
        y0 = baseY - top;
        for (i = 0; i < n; i++) {
          lx = cx + (i - (n - 1) / 2) * gap;
          var lh = top * (coef[i] / cmax);
          out.push('<line class="pk" x1="' + lx.toFixed(1) + '" y1="' + baseY + '" x2="' +
            lx.toFixed(1) + '" y2="' + (baseY - lh).toFixed(1) + '"/>');
        }
      }

      var labelY = y0 - 7, guard = 0;
      while (guard++ < 6 && placed.some(function (q) {
        return Math.abs(cx - q.x) < 70 && Math.abs(labelY - q.y) < 13;
      })) { labelY -= 15; }
      placed.push({ x: cx, y: labelY });
      out.push('<text class="pl" x="' + cx.toFixed(1) + '" y="' + labelY.toFixed(1) +
        '" text-anchor="middle">' + p.ppm.toFixed(2) + (p.mult && p.mult !== 's' ? ' ' + p.mult : ' s') + '</text>');
      if (showH && p.H) {
        out.push('<text class="il" x="' + cx.toFixed(1) + '" y="' + (baseY + 10 + hStagger) +
          '" text-anchor="middle">' + p.H + 'H</text>');
        hStagger = hStagger ? 0 : 12;
      }
      if (p.label) {
        out.push('<text class="lb" x="' + cx.toFixed(1) + '" y="' + (labelY - 14).toFixed(1) +
          '" text-anchor="middle">' + esc(p.label) + '</text>');
      }
    });

    out.push('</svg>');
    return out.join('');
  }

  /** figure(spec, captionHTML) -> <figure> markup */
  function figure(spec, caption) {
    return '<figure class="spec">' + render(spec) +
      (caption ? '<figcaption>' + caption + '</figcaption>' : '') + '</figure>';
  }

  global.Spectrum = { render: render, figure: figure };
})(window);
