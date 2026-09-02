# NMR 분석 학습 · NMR Analysis Tutor

학부 수준 유기화학의 <sup>1</sup>H / <sup>13</sup>C NMR 해석을 위한 웹 기반 학습 프로그램입니다.
개념 설명을 읽고 곧바로 연습문제로 확인하는 구성이며, **EWG/EDG에 의한 업필드·다운필드 효과**를
집중적으로 다룹니다. 국문/영문을 상단 토글로 전환할 수 있고, 국문에서는 전문 용어에 영문을 병기합니다.

A browser-based tutor for undergraduate <sup>1</sup>H / <sup>13</sup>C NMR interpretation. Each lesson is
followed by practice problems, with heavy emphasis on **upfield/downfield effects of EWG and EDG
substituents**. Korean and English switch from the header toggle; the Korean text carries the English
term alongside each piece of terminology.

---

## 실행 방법 · Running it

빌드 과정이 없습니다. 순수 HTML/CSS/바닐라 자바스크립트이며 정적 파일로 바로 열립니다.

No build step. Plain HTML, CSS and vanilla JavaScript served as static files.

```bash
# 로컬 서버 (권장) / local server (recommended)
npx http-server -p 8080 .
# 또는 / or
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080` 을 엽니다. `index.html`을 파일로 직접 열어도 동작하지만,
로컬 서버 사용을 권장합니다. GitHub Pages에도 그대로 배포할 수 있습니다.

Then open `http://localhost:8080`. Opening `index.html` directly from the filesystem also works, but a
local server is recommended. The same tree deploys to GitHub Pages as-is.

---

## 구성 · What is inside

### 개념 학습 (8단원) · Lessons

| # | 단원 | Lesson |
|---|------|--------|
| 1 | NMR의 원리와 화학적 이동 | How NMR works and what δ means |
| 2 | 화학적 이동 영역 지도 | The chemical-shift map |
| 3 | 유도 효과 — 결합을 타고 오는 당김 | The inductive effect |
| 4 | **EWG와 EDG — 방향족 고리의 업필드·다운필드** | **EWG vs EDG on aromatic rings** |
| 5 | 이방성 효과와 교환성 양성자 | Anisotropy and exchangeable protons |
| 6 | 적분과 스핀-스핀 짝지음 | Integration and coupling |
| 7 | <sup>13</sup>C NMR과 치환기 효과 | <sup>13</sup>C NMR and substituent effects |
| 8 | 구조 결정 전략 | A workflow for structure determination |

각 단원에는 개념 설명, 데이터 표, 모식 스펙트럼(SVG), 그리고 **함정(pitfall) 콜아웃**이 들어 있습니다.
함정 콜아웃은 학생들이 실제로 자주 틀리는 지점만 골라 정리한 것입니다. 예를 들어,

Every lesson mixes exposition, data tables, schematic SVG spectra, and **pitfall callouts** that target
the specific places students actually get stuck. For example:

- EDG인 –OCH<sub>3</sub>가 고리 양성자는 업필드로 보내면서 자기 자신의 메틸 양성자는 δ 3.80까지
  다운필드로 보내는 이유 — *why an EDG shifts the ring upfield but its own methyl downfield*
- sp 탄소가 더 전기음성인데도 알카인 양성자가 알켄보다 업필드인 이유 — *the alkyne anisotropy paradox*
- <sup>13</sup>C에서 아니솔의 *ipso* 탄소가 나이트로벤젠보다 더 다운필드인 이유 — *the ipso-carbon trap*
- 친전자성 방향족 치환의 배향성(o/p-director ↔ meta-director)과 화학적 이동 방향의 연결
  — *tying EAS directing effects to shift direction*

### 연습문제 (8세트 · 68문항) · Practice sets

| 세트 | Set | 문항 |
|------|-----|------|
| A. 기초와 용어 | Fundamentals and vocabulary | 7 |
| B. 유도 효과 | Inductive effects | 7 |
| **C. EWG / EDG 방향족** ★ | **EWG / EDG on aromatic rings** ★ | 16 |
| **D. 헷갈리기 쉬운 개념** ★ | **The concepts people mix up** ★ | 10 |
| E. 이방성과 교환성 양성자 | Anisotropy and exchangeable protons | 6 |
| F. 적분과 짝지음 | Integration and coupling | 8 |
| G. <sup>13</sup>C NMR | <sup>13</sup>C NMR | 6 |
| H. 종합 구조 결정 | Full structure problems | 8 |

★ 표시는 EWG/EDG 효과를 집중적으로 다루는 핵심 세트로, 전체 68문항 중 26문항(38%)을 차지합니다.

문제 유형은 네 가지입니다 · Four question types:

- `single` — 사지선다 / single choice
- `multi` — 복수 정답 / select all that apply
- `ordering` — 화학적 이동 순서 배열 / arrange by chemical shift
- `numeric` — 증분표로 δ 계산 (허용 오차 포함) / calculate δ from increments, with a tolerance

모든 문항에 정답 여부와 무관하게 **정량적인 해설과 출처**가 붙습니다. 오답 선택지 역시 실제로 흔한
오해를 골라 배치했고, 해설에서 왜 틀렸는지를 함께 설명합니다.

Every item shows a **quantitative explanation with a source**, right or wrong. Distractors are drawn
from misconceptions that actually occur, and the explanation says why each is wrong.

### 치환기 계산기 · Shift calculator

단일치환·이치환 벤젠의 고리 양성자 δ를 가법 증분으로 계산합니다.

δ = 7.26 + Σ Δδ<sub>i</sub>

치환기 A(및 선택적으로 B와 그 상대 위치 ortho/meta/para)를 고르면 각 고리 위치의 δ, 계산 내역,
그리고 예측 스펙트럼 개형이 표시됩니다. 16개 치환기의 증분 참조표도 함께 제공합니다.

Pick substituent A (and optionally B with its ortho/meta/para relationship) and the tool reports the
shift at each ring position, the arithmetic behind it, and a schematic pattern. A reference table of
increments for 16 substituents is included.

### 학습 현황 · Progress

세트별 진도와 정답률을 `localStorage`에 저장하고, 정답률 60% 미만인 세트를 보완 대상으로 표시하며
해당 단원으로 연결합니다. 기록은 브라우저 안에만 남습니다.

Per-set progress and accuracy are kept in `localStorage`; sets below 60% accuracy are flagged with a
link to the matching lesson. Nothing leaves the browser.

---

## 파일 구조 · File layout

```
index.html                  앱 셸, 뷰 컨테이너 / app shell and view containers
assets/css/styles.css       라이트·다크 테마, 반응형 레이아웃 / themes and responsive layout
assets/js/i18n.js           UI 문자열 사전, 언어 전환 / UI dictionary and language switching
assets/js/spectrum.js       모식 스펙트럼 SVG 생성기 / schematic spectrum renderer
assets/js/data-lessons.js   단원 콘텐츠 (블록 구조) / lesson content as content blocks
assets/js/data-questions.js 문제 은행 (68문항) / the 68-item question bank
assets/js/app.js            라우팅, 퀴즈 엔진, 계산기, 진도 / routing, quiz engine, calculator, progress
```

콘텐츠와 로직이 분리되어 있어 문제를 추가하려면 `data-questions.js`의 `Q.push({...})` 하나만
더하면 됩니다. 모든 텍스트는 `{ ko, en }` 쌍으로 작성하고, 국문에는 용어의 영문을 병기합니다.

Content and logic are separate: adding a question means one more `Q.push({...})` in
`data-questions.js`. All text is written as `{ ko, en }` pairs, with the English term carried alongside
the Korean.

---

## 데이터에 관하여 · About the data

인용된 화학적 이동은 교재의 대표값이며 용매·농도·온도에 따라 달라집니다. 치환기 증분은 근사치로,
실측값과 ±0.2 ppm 정도 차이가 날 수 있고 인접 치환기나 강한 EWG/EDG 조합에서는 오차가 더 커집니다.
스펙트럼 그림은 개념 설명을 위한 모식도이며 실측 데이터가 아닙니다. 다중선 간격은 눈에 보이도록
과장되어 있습니다.

Quoted shifts are representative textbook values and vary with solvent, concentration and temperature.
Substituent increments are approximate — expect ±0.2 ppm deviations, larger for adjacent substituents
and strong EWG/EDG combinations. The spectra are schematic teaching figures, not measured data, and
multiplet spacings are exaggerated for legibility.

### 출처 · Sources

- Pavia, D. L.; Lampman, G. M.; Kriz, G. S.; Vyvyan, J. R. *Introduction to Spectroscopy*, 5th ed.;
  Cengage: Stamford, 2015. (Ch. 3–6, 8, and the correlation tables in the appendix)
- Silverstein, R. M.; Webster, F. X.; Kiemle, D. J.; Bryce, D. L. *Spectrometric Identification of
  Organic Compounds*, 8th ed.; Wiley: Hoboken, 2014. (Ch. 3–4, 7; Appendix F for coupling constants)
- Pretsch, E.; Bühlmann, P.; Badertscher, M. *Structure Determination of Organic Compounds: Tables of
  Spectral Data*, 4th ed.; Springer: Berlin, 2009. (aromatic substituent increments used in the
  calculator and in Lesson 4)
- Clayden, J.; Greeves, N.; Warren, S. *Organic Chemistry*, 2nd ed.; Oxford University Press: Oxford,
  2012. (Ch. 13, 18, 21, 31)
- Gottlieb, H. E.; Kotlyar, V.; Nudelman, A. NMR Chemical Shifts of Common Laboratory Solvents as
  Trace Impurities. *J. Org. Chem.* **1997**, *62*, 7512–7515.
- SDBS: Spectral Database for Organic Compounds, National Institute of Advanced Industrial Science and
  Technology (AIST), Japan. (experimental <sup>1</sup>H and <sup>13</sup>C values quoted in examples)

---

## 브라우저 지원 · Browser support

ES5 문법과 표준 DOM API만 사용하며, CSS는 `color-mix()`를 쓰므로 최신 브라우저(Chrome/Edge 111+,
Firefox 113+, Safari 16.2+)를 권장합니다. 외부 라이브러리 의존성은 없습니다.

ES5 syntax and standard DOM APIs only. The CSS uses `color-mix()`, so a recent browser is recommended
(Chrome/Edge 111+, Firefox 113+, Safari 16.2+). No external dependencies.
