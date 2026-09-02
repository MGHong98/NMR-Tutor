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

### 출처 · Sources

출처를 세 층위로 표시합니다 · Attribution is shown at three levels:

1. **표·그림 단위** — 모든 데이터 표와 스펙트럼 그림 아래에 그 수치가 어느 문헌의 어느 장·표에서
   왔는지 한 줄로 붙습니다. 예: `출처: SDBS (AIST) — nitrobenzene · Pretsch 외 (2009)`
2. **단원 단위** — 각 단원 끝에 그 단원이 근거로 삼은 문헌과 해당 부분이 정리됩니다.
3. **문항 단위** — 모든 문제 해설 끝에 장·표 번호까지 포함한 출처가 붙습니다.

`출처` 탭에는 전체 서지사항(ISBN/DOI 포함), **데이터 소급 대장**(어떤 종류의 수치가 어느 문헌에서
왔는지 정리한 표), 수치를 읽을 때의 주의사항, 그리고 인용 안내가 있습니다.

1. **Per table and figure** — every data table and spectrum carries a one-line attribution naming the
   work and the chapter or table the numbers come from.
2. **Per lesson** — each lesson closes with the works it is built on and which parts of them.
3. **Per question** — every explanation ends with a source, down to the chapter or table number.

The `Sources` tab holds the full bibliography with ISBNs and DOIs, a **provenance register** mapping
each kind of datum to the work it came from, caveats on reading the numbers, and citation guidance.

---

## 검증과 정정 내역 · Verification and corrections

증분표 전체를 Pretsch 외(2009)와 대조하고, 단원과 해설에 나오는 계산을 모두 재계산했습니다.
그 과정에서 발견해 고친 문제는 다음과 같습니다.

The full increment table was checked against Pretsch et al. (2009) and every worked calculation in the
lessons and explanations was recomputed. The following problems were found and fixed:

| # | 문제 | Issue |
|---|------|-------|
| 1 | 프로판알 그림에서 CHO를 사중선으로 표기. 실제로는 이웃 CH<sub>2</sub>와 J = 1.4 Hz로 짝지은 **삼중선**. 또한 CH<sub>2</sub>에 쓴 `qd`가 렌더러에 없는 값이라 조용히 단일선으로 그려지고 있었음 | The propanal figure showed CHO as a quartet; it is a **triplet** (J = 1.4 Hz to the CH<sub>2</sub>). The `qd` used for the CH<sub>2</sub> was also unknown to the renderer and was silently drawn as a singlet |
| 2 | 알카인 δ 범위가 표(2.0–3.0)와 문항(1-헥사인 1.9)에서 불일치 | The alkyne δ range disagreed between the table (2.0–3.0) and a question (1-hexyne at 1.9) |
| 3 | 표 3-2의 프로페인 비교 행이 α/β/γ 열에 잘못 대응 | The propane reference row in Table 3-2 was mismapped onto the α/β/γ columns |
| 4 | 표 4-1이 −F, −Cl을 '유도 효과의 예'로 들어, 4.5절의 '할로젠은 −I와 +M이 상충한다'는 서술과 충돌 | Table 4-1 listed −F and −Cl as examples of induction, contradicting section 4.5 on halogens balancing −I against +M |
| 5 | 클로로벤젠 실측 범위가 단원(7.26–7.32)과 문항(7.24–7.30)에서 불일치 | The measured range for chlorobenzene differed between the lesson and a question |
| 6 | Cl 전기음성도를 3.0으로 쓴 곳이 있었으나 표 3-1은 Pavia 기준 3.1 | One explanation gave chlorine electronegativity as 3.0 while Table 3-1 uses Pavia's 3.1 |
| 7 | 7단원의 'para-이치환 고리는 신호 4개'가 두 치환기가 같은 경우(p-자일렌, 고리 신호 2개)와 충돌 | “A para-disubstituted ring gives four signals” clashed with the identical-substituent case (p-xylene, two ring signals) |
| 8 | 4.2절 요약의 'meta 값은 절댓값 0.1–0.3 안쪽'이라는 표현이 하한이 있는 것처럼 읽힘 | The summary phrased the meta increment as a range with a floor rather than a bound |
| 9 | D1 문항이 메탄올 δ 3.40의 출처로 Gottlieb(용매 잔류 신호표)를 지목했으나 그 표에 없는 값 | Question D1 attributed methanol at δ 3.40 to Gottlieb, whose table does not contain it |
| 10 | H1 해설의 예시가 미완('N-메틸-4-…')으로 끝남 | The H1 explanation trailed off with an unfinished example |

1·2·5·6번은 값의 불일치, 3·4·7·8번은 서술의 논리적 충돌, 9·10번은 출처와 문장의 결함입니다.
증분값 자체와 나머지 계산(나이트로벤젠, 아니솔, 4-나이트로아니솔, 4-나이트로톨루엔,
p-나이트로아닐린, 4-메틸아니솔)은 모두 문헌값과 일치했습니다.

Items 1, 2, 5 and 6 were numerical inconsistencies; 3, 4, 7 and 8 were internal contradictions in the
argument; 9 and 10 were defects in an attribution and a sentence. The increments themselves and every
other calculation — nitrobenzene, anisole, 4-nitroanisole, 4-nitrotoluene, p-nitroaniline,
4-methylanisole — matched the literature.

---

## 파일 구조 · File layout

```
index.html                  앱 셸, 뷰 컨테이너 / app shell and view containers
assets/css/styles.css       라이트·다크 테마, 반응형 레이아웃 / themes and responsive layout
assets/js/i18n.js           UI 문자열 사전, 언어 전환 / UI dictionary and language switching
assets/js/spectrum.js       모식 스펙트럼 SVG 생성기 / schematic spectrum renderer
assets/js/data-sources.js   참고문헌과 데이터 소급 대장 / bibliography and provenance register
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

## 브라우저 지원과 성능 · Browser support and performance

**의존성 0개, 외부 요청 0건.** 빌드 도구, 프레임워크, CDN, 폰트, 트래킹이 전혀 없습니다.
`file://`로 열어도 완전히 동작하므로 네트워크 없이 USB로 배포해도 됩니다.

**Zero dependencies, zero external requests.** No build tool, framework, CDN, web font or tracker.
It runs fully over `file://`, so it can be handed out on a USB stick with no network at all.

확인한 내용 · What was verified:

- **자바스크립트는 전부 ES5** — 6개 파일 모두 `acorn`으로 `ecmaVersion: 5` 파싱을 통과합니다.
  화살표 함수, `const`/`let`, 템플릿 리터럴, 전개 구문, `Promise`, `fetch`를 쓰지 않습니다.
- **CSS에서 `color-mix()`를 제거**했습니다. 남은 최신 기능은 CSS 커스텀 속성뿐이며(2017년경 이후
  모든 브라우저), 이마저 지원하지 않는 경우를 대비해 본문 배경·글자색에 리터럴 폴백을 두었습니다.
- **최신 전용 API는 전부 폴백 경로가 있습니다** — `Element.closest`/`matches`(속성 기반 조상 탐색으로
  대체), 옵션 객체를 받는 `scrollTo`/`scrollIntoView`, `classList.toggle`의 두 번째 인자,
  그리고 `localStorage` 접근이 예외를 던지는 환경(사파리 프라이빗 모드 등).
- **실제로 그 API들을 제거한 상태에서 전체 동작을 확인**했습니다. Chromium에 `closest` 삭제,
  옵션 객체 스크롤 예외 발생, `toggle` 두 번째 인자 무시, `localStorage` 접근 시 예외를 주입한 뒤
  단원 이동·언어 전환·채점·계산기·출처 탭이 모두 정상 동작했습니다.

- **All JavaScript is ES5** — all six files pass `acorn` with `ecmaVersion: 5`. No arrow functions,
  `const`/`let`, template literals, spread, `Promise` or `fetch`.
- **`color-mix()` was removed from the CSS.** The only remaining modern feature is CSS custom
  properties (universal since around 2017), and even those have literal fallbacks for the body
  background and text colour.
- **Every modern-only API has a fallback path** — `Element.closest`/`matches` (replaced by an
  attribute-based ancestor walk), the options-object forms of `scrollTo`/`scrollIntoView`, the second
  argument of `classList.toggle`, and environments where touching `localStorage` throws (Safari
  private mode and similar).
- **The app was actually run with those APIs removed.** With `closest` deleted, options-object
  scrolling made to throw, the `toggle` force argument ignored and `localStorage` throwing on access,
  lesson navigation, the language toggle, grading, the calculator and the Sources tab all still worked.

전체 문항 회귀 검사 · Full regression: 8개 단원과 68문항을 **국문·영문 양쪽으로 각각 순회**해
콘솔 오류 0건, 모든 채점·해설·출처 표시 정상, 390 px 폭에서 가로 스크롤 없음을 확인했습니다.

성능 · Performance (헤드리스 Chromium, 8개 단원 연속 렌더 기준):

| | 이전 · Before | 이후 · After |
|---|---|---|
| 첫 렌더 · Cold | 674 ms | **216 ms** |
| 캐시 후 · Warm | 579 ms | **137 ms** |
| 단원 전환 1회 · Per switch | 약 72 ms | **약 17 ms** |
| 이벤트 리스너 · Listeners | 렌더할 때마다 노드 수만큼 | **document에 고정 4개** |

주요 최적화 · What changed:

- **SVG마다 심던 `<style>` 블록을 제거**하고 스타일시트의 `.nmr-spec` 규칙으로 옮겼습니다.
  그림 하나를 그릴 때마다 문서 전체의 스타일 재계산이 일어나던 것이 가장 큰 병목이었습니다.
  *Removing the per-SVG `<style>` block was the single biggest win: each one forced a document-wide
  style recalculation.*
- **이벤트 위임** — 화면을 다시 그릴 때마다 요소마다 리스너를 붙이던 방식을 `document` 한 곳의
  위임 처리로 바꿨습니다. 렌더 비용이 노드 수에 비례하지 않습니다.
  *Delegated event handling: render cost no longer scales with the number of nodes.*
- **색인 선계산** — 단원·세트·문항을 시작할 때 한 번만 색인해 두어, 세트별 통계가 매번 전체 문항을
  훑지 않습니다. *Indexes are built once at start-up.*
- **단원 HTML 캐시**와 **내비게이션 부분 갱신** — 언어를 바꿀 때만 캐시를 버립니다.
  *Lesson HTML is cached and the nav is updated in place; the cache is dropped only on a language change.*

전송 크기 · Transfer size: 총 281 KB, gzip 적용 시 **85 KB** (문항·단원 텍스트가 대부분).

Total 281 KB, or **85 KB gzipped** — mostly the lesson and question text.
