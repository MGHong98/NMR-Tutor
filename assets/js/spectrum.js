/* spectrum.js — 모식적 NMR 스펙트럼 SVG 생성기
 * Schematic NMR spectrum renderer (teaching figure, not measured data).
 *
 * 의존성 없음. ES5 문법과 문자열 기반 SVG만 사용하므로 SVG를 지원하는
 * 모든 브라우저에서 동작합니다.
 * No dependencies. ES5 syntax and string-built SVG only, so it works in
 * any browser with SVG support.
 *
 * 다중선 간격은 눈에 보이도록 과장되어 있습니다.
 * Multiplet spacing is exaggerated for legibility.
 */
(function (global) {
  'use strict';

  /* 갈라짐 패턴의 상대 세기(파스칼 삼각형). 미리 계산해 두어 매 호출마다
     이항계수를 다시 구하지 않습니다.
     Relative line intensities, precomputed so no binomial is recalculated. */
  var PATTERNS = {
    s:     [1],
    d:     [1, 1],
    t:     [1, 2, 1],
    q:     [1, 3, 3, 1],
    quint: [1, 4, 6, 4, 1],
    sext:  [1, 5, 10, 10, 5, 1],
    sept:  [1, 6, 15, 20, 15, 6, 1],
    oct:   [1, 7, 21, 35, 35, 21, 7, 1],
    dd:    [1, 1, 1, 1],
    dt:    [1, 2, 1, 1, 2, 1]
  };

  var AMP_RE = /&/g, LT_RE = /</g, GT_RE = />/g;

  function esc(s) {
    return String(s).replace(AMP_RE, '&amp;').replace(LT_RE, '&lt;').replace(GT_RE, '&gt;');
  }

  /** 주석 두 줄(ppm 줄 y, 이름 줄 y-13)이 기존 주석 상자와 겹치는지 검사 */
  function hits(placed, cx, y, wPl, wLb) {
    var i, b;
    for (i = 0; i < placed.length; i++) {
      b = placed[i];
      if (Math.abs(cx - b.x) < (wPl + b.w) / 2 && Math.abs(y - b.y) < 12.5) { return true; }
      if (wLb && Math.abs(cx - b.x) < (wLb + b.w) / 2 && Math.abs((y - 13) - b.y) < 12.5) { return true; }
    }
    return false;
  }

  /**
   * render(spec) -> SVG 마크업 문자열 / SVG markup string
   * spec = {
   *   peaks: [{ ppm:Number, mult:String, H:Number, label:String, tall:Boolean }],
   *   min, max,        // ppm 창 (기본 0-10) / ppm window (default 0-10)
   *   nucleus,         // '1H' (기본) | '13C'
   *   showH,           // 적분 표시 (기본 true) / show integration labels
   *   height           // px (기본 250)
   * }
   * mult이 PATTERNS에 없으면 다중선 덩어리(m)로, 'br'이면 넓고 낮은 봉우리로
   * 그립니다. 알 수 없는 값이 조용히 단일선으로 바뀌지 않습니다.
   * An unknown mult is drawn as a multiplet hump, never silently as a singlet.
   */
  function render(spec) {
    var peaks = (spec.peaks || []).slice().sort(function (a, b) { return b.ppm - a.ppm; });
    var min   = spec.min != null ? spec.min : 0;
    var max   = spec.max != null ? spec.max : 10;
    var span  = (max - min) || 1;
    var showH = spec.showH !== false;

    var W = 800, H = spec.height || 274;
    var padL = 26, padR = 26, padT = 66, padB = 50;
    var plotW = W - padL - padR;
    var baseY = H - padB;
    var plotH = baseY - padT;

    var maxH = 1, i;
    for (i = 0; i < peaks.length; i++) { if (peaks[i].H > maxH) { maxH = peaks[i].H; } }

    function x(ppm) { return padL + (max - ppm) / span * plotW; }

    var out = [];
    /* 스타일은 styles.css의 .nmr-spec 규칙이 담당합니다. SVG마다 <style>을
       심으면 그림을 그릴 때마다 문서 전체의 스타일 재계산이 일어납니다.
       Styling lives in styles.css under .nmr-spec: an inline <style> per SVG
       would force a document-wide style recalculation on every render. */
    out.push('<svg class="nmr-spec" viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
      'xmlns="http://www.w3.org/2000/svg" aria-label="' + esc(spec.alt || 'Schematic NMR spectrum') + '">');

    /* 그림을 볼 수 없는 경우 봉우리 목록이 읽히도록 / read out for screen readers */
    var desc = [];
    for (i = 0; i < peaks.length; i++) {
      desc.push('δ ' + peaks[i].ppm + (peaks[i].H ? ', ' + peaks[i].H + 'H' : '') +
        (peaks[i].mult ? ', ' + peaks[i].mult : '') + (peaks[i].label ? ' (' + peaks[i].label + ')' : ''));
    }
    out.push('<desc>' + esc(desc.join('; ')) + '</desc>');

    /* 축과 눈금 / axis and ticks */
    out.push('<line class="ax" x1="' + padL + '" y1="' + baseY + '" x2="' + (W - padR) + '" y2="' + baseY + '"/>');
    var step = span > 12 ? 20 : 1;
    var v, xv;
    for (v = Math.ceil(min); v <= max; v += step) {
      xv = x(v);
      out.push('<line class="ax" x1="' + xv.toFixed(1) + '" y1="' + baseY + '" x2="' + xv.toFixed(1) + '" y2="' + (baseY + 5) + '"/>');
      out.push('<text class="tk" x="' + xv.toFixed(1) + '" y="' + (baseY + 18) + '" text-anchor="middle">' + v + '</text>');
    }
    out.push('<text class="tk" x="' + (W - padR) + '" y="' + (baseY + 36) + '" text-anchor="end">δ / ppm  (' +
      esc(spec.nucleus || '1H') + ')</text>');
    out.push('<text class="tk" x="' + padL + '" y="' + (baseY + 36) + '" text-anchor="start">' +
      '&#8592; downfield / deshielded   &#8226;   upfield / shielded &#8594;</text>');

    /* 봉우리 / peaks */
    var placed = [];

    for (i = 0; i < peaks.length; i++) {
      var p = peaks[i];
      var coef = PATTERNS[p.mult];
      var cx = x(p.ppm);
      var hFrac = Math.min(1, Math.sqrt((p.H || 1) / maxH));
      var top = plotH * (p.tall ? 0.92 : 0.55 + 0.37 * hFrac);
      var y0, n, j, lx, lh, cmax;

      if (!coef || p.mult === 'br') {
        /* 알 수 없는 다중도 또는 넓은 봉우리 / unknown multiplicity or broad */
        var wHalf = (p.mult === 'br') ? 26 : 13;
        var hh = (p.mult === 'br') ? top * 0.45 : top;
        out.push('<path class="hump" d="M' + (cx - wHalf) + ' ' + baseY +
          ' C' + (cx - wHalf * 0.4) + ' ' + baseY + ' ' + (cx - wHalf * 0.35) + ' ' + (baseY - hh) + ' ' + cx + ' ' + (baseY - hh) +
          ' C' + (cx + wHalf * 0.35) + ' ' + (baseY - hh) + ' ' + (cx + wHalf * 0.4) + ' ' + baseY + ' ' + (cx + wHalf) + ' ' + baseY + '"/>');
        y0 = baseY - hh;
      } else {
        n = coef.length;
        cmax = 0;
        for (j = 0; j < n; j++) { if (coef[j] > cmax) { cmax = coef[j]; } }
        y0 = baseY - top;
        for (j = 0; j < n; j++) {
          lx = cx + (j - (n - 1) / 2) * 4.2;   /* 과장된 다중선 간격 */
          lh = top * (coef[j] / cmax);
          out.push('<line class="pk" x1="' + lx.toFixed(1) + '" y1="' + baseY + '" x2="' +
            lx.toFixed(1) + '" y2="' + (baseY - lh).toFixed(1) + '"/>');
        }
      }

      /* 적분은 별도 줄이 아니라 봉우리 라벨에 합친다. 축 아래에 따로 두면
         눈금 숫자와 겹치기 쉽고, 합쳐 두면 실제 peak list 표기와도 같아진다.
         Integration is folded into the peak label rather than sitting below the
         axis, where it collided with the tick numbers — and the combined form
         reads like a real peak list. */
      var txt = p.ppm.toFixed(2) + ' (' +
        ((showH && p.H) ? p.H + 'H, ' : '') + (p.mult || 's') + ')';
      var lbTxt = p.label ? esc(p.label) : '';

      /* 라벨 겹침 회피. 한 봉우리의 주석은 ppm 줄과 이름 줄 두 칸을 쓰므로
         두 칸 모두 기존 주석과 부딪히지 않는 높이를 찾는다. 폭은 글꼴 크기로
         추정한다(등폭 11px ≈ 6.8px/자, 산세리프 11px ≈ 6.4px/자).
         Both rows of a peak's annotation stack are tested for collision, and the
         box widths are estimated from the font metrics. */
      var wPl = txt.length * 6.8 + 6;
      var wLb = lbTxt ? lbTxt.length * 6.4 + 6 : 0;
      var labelY = y0 - 7, guard = 0;

      /* 위로 더 올리면 그림 밖으로 잘리는 경우에는 올리기를 멈춘다.
         잘림보다는 약간의 겹침이 낫다.
         Stop lifting when another step would clip the top of the figure —
         a slight overlap is preferable to a truncated label. */
      while (guard++ < 5 && labelY - 14 >= 26 && hits(placed, cx, labelY, wPl, wLb)) { labelY -= 14; }

      placed.push({ x: cx, y: labelY, w: wPl });
      if (wLb) { placed.push({ x: cx, y: labelY - 13, w: wLb }); }

      out.push('<text class="pl" x="' + cx.toFixed(1) + '" y="' + labelY.toFixed(1) +
        '" text-anchor="middle">' + txt + '</text>');
      if (wLb) {
        out.push('<text class="lb" x="' + cx.toFixed(1) + '" y="' + (labelY - 13).toFixed(1) +
          '" text-anchor="middle">' + lbTxt + '</text>');
      }
    }

    out.push('</svg>');
    return out.join('');
  }

  /** figure(spec, caption, source) -> <figure> 마크업
   *  SVG는 가로 스크롤 상자에 넣는다. 좁은 화면에서 통째로 축소하면 눈금과
   *  라벨이 읽을 수 없을 만큼 작아지므로, 표와 마찬가지로 최소 폭을 두고
   *  넘치는 만큼 스크롤한다. 설명글은 스크롤 밖에 둔다.
   *  The SVG sits in a horizontal scroller: shrinking the whole figure to a
   *  narrow screen makes the ticks and labels unreadable, so — as with the
   *  tables — it keeps a minimum width and scrolls. The caption stays outside. */
  function figure(spec, caption, source) {
    var cap = '';
    if (caption || source) {
      cap = '<figcaption>' + (caption || '') +
        (source ? '<span class="src">' + source + '</span>' : '') + '</figcaption>';
    }
    return '<figure class="spec"><div class="spec-scroll">' + render(spec) + '</div>' + cap + '</figure>';
  }

  global.Spectrum = { render: render, figure: figure, PATTERNS: PATTERNS };
})(window);
