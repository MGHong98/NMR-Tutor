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

### 연습문제 (8세트 · 106문항) · Practice sets

| 세트 | Set | 문항 |
|------|-----|------|
| A. 기초와 용어 | Fundamentals and vocabulary | 10 |
| B. 유도 효과 | Inductive effects | 11 |
| **C. EWG / EDG 방향족** ★ | **EWG / EDG on aromatic rings** ★ | 24 |
| **D. 헷갈리기 쉬운 개념** ★ | **The concepts people mix up** ★ | 15 |
| E. 이방성과 교환성 양성자 | Anisotropy and exchangeable protons | 10 |
| F. 적분과 짝지음 | Integration and coupling | 12 |
| G. <sup>13</sup>C NMR | <sup>13</sup>C NMR | 10 |
| H. 종합 구조 결정 | Full structure problems | 14 |

★ 표시는 EWG/EDG 효과를 집중적으로 다루는 핵심 세트로, 전체 106문항 중 39문항(37%)을 차지합니다.

문제 유형은 네 가지입니다 · Four question types:

- `single` — 사지선다 / single choice
- `multi` — 복수 정답 / select all that apply
- `ordering` — 화학적 이동 순서 배열 / arrange by chemical shift
- `numeric` — 증분표로 δ 계산 (허용 오차 포함) / calculate δ from increments, with a tolerance

모든 문항에 정답 여부와 무관하게 **정량적인 해설과 출처**가 붙습니다. 오답 선택지 역시 실제로 흔한
오해를 골라 배치했고, 해설에서 왜 틀렸는지를 함께 설명합니다. 106문항 중 **51문항의 해설에는 분자
구조식**이 함께 나와, δ 값이 구조의 어느 자리에 해당하는지를 눈으로 확인할 수 있습니다.

Every item shows a **quantitative explanation with a source**, right or wrong. Distractors are drawn
from misconceptions that actually occur, and the explanation says why each is wrong. **Fifty-one of the
106 explanations carry a molecular structure**, so you can see which position of the molecule each δ
belongs to.

### 분자 구조식 · Molecular structures

구조식은 외부 라이브러리 없이 **직접 SVG로 그립니다**(`assets/js/structure.js`). 작도는 **ACS Style
Guide의 구조 작도 규약**을 비율로 옮겼습니다.

Structures are **drawn as SVG in-house** with no external library (`assets/js/structure.js`), following
the structure-drawing conventions of the **ACS Style Guide**, transferred as ratios:

| 항목 · Item | 적용 · Applied |
|---|---|
| 결합 길이 · Bond length | 고리와 사슬에서 **동일**(L = 32 px) · uniform across rings and chains |
| 결합 사이 각도 · Angle between bonds | 언제나 **120°** (sp 탄소는 180°) |
| 고리에서 나가는 첫 결합 · First bond off a ring | **반지름 방향으로 곧게** · straight out along the radius |
| 이중결합 간격 · Double-bond spacing | 결합 길이의 **18%**, 안쪽 선은 양끝을 13% 줄임 |
| 결합선 굵기 · Bond width | 결합 길이의 약 1/23 (1.4 px) |
| 원자 라벨 · Atom labels | Helvetica / Arial 계열, 결합 끝과 글자 사이 여백 7 px |

**고리에 붙는 치환기는 반지름 방향으로 곧게 뻗습니다.** 육각형 꼭짓점의 외각 이등분선이 곧 반지름
방향이므로, 이렇게 그려야 치환기 결합이 두 고리 결합과 각각 120°를 이루는 표준 배치가 됩니다. 이후
결합은 그 방향에서 60°씩 번갈아 꺾이고, sp 탄소(알카인, 나이트릴)에서는 꺾지 않고 직선으로 잇습니다.

**A substituent leaves the ring straight along the radius.** The exterior bisector at a hexagon vertex
*is* that radius, so drawing it this way makes the substituent bond meet each ring bond at 120° — the
standard placement. Later bonds alternate 60° off it, and at an sp carbon (alkyne, nitrile) the chain
runs straight through instead of turning.

**골격선식 관행을 따릅니다** · It follows skeletal convention:

- **탄소 골격은 그립니다** — 알킬 사슬, 에스터, 케톤, 알데하이드, 카복실산. 메틸 가지는 글자가 아니라
  **결합선 하나**로 그립니다.
  *Carbon skeletons are drawn — alkyl chains, esters, ketones, aldehydes, acids — and a methyl branch is
  **a single bond line**, not a label.*
- **헤테로원자로 시작하는 관용 약어는 글자로 둡니다** — NO₂, NH₂, OH, OCH₃, Cl, Br, CN.
  *Heteroatom abbreviations stay as labels — NO₂, NH₂, OH, OCH₃, Cl, Br, CN.*

현재 41개의 치환기가 골격으로, 35개가 글자로 그려집니다. 이전 판은 `COOCH2CH3`, `CH2COOCH3` 같은
축약 라벨을 고리에 붙였는데, 읽기 어렵고 ACS 관행에도 맞지 않아 전부 실제 골격으로 바꿨습니다.

Forty-one substituents now render as skeletons and thirty-five as labels. The earlier version hung
condensed labels such as `COOCH2CH3` and `CH2COOCH3` off the ring; those were hard to read and not ACS
practice, so they are all drawn out now.

**고리에 붙는 사슬은 언제나 고리에서 바깥으로 뻗어 나갑니다.** 사슬 중간에 고리가 가지처럼 매달리는
형태는 쓰지 않습니다. 예를 들어 큐멘은 프로페인 사슬 가운데에 페닐을 붙이는 대신, 벤젠 고리에서
아이소프로필기가 뻗어 나가는 형태로 그립니다.

**A chain on a ring always radiates outward from the ring**, never with the ring hanging off the middle
of a chain as a branch. Cumene, for instance, is drawn as a benzene ring with an isopropyl group
extending from it, not as a propane chain with a phenyl in the middle.

고리 번호는 **위치 1이 위쪽, 시계 방향으로 2~6**입니다. 따라서 1의 para는 4, meta는 3·5, ortho는
2·6이 되어 **증분표의 번호와 그대로 대응**합니다.

The ring is numbered with **position 1 at the top, clockwise to 6**, so para to 1 is 4, meta are 3 and 5
and ortho are 2 and 6 — **matching the increment table directly**.

δ 주석은 세 가지 자리에 붙을 수 있고 서로 구별됩니다 · Annotations attach at three distinguishable places:

- **치환되지 않은 고리 자리** — 그 자리 양성자의 δ, 고리 바깥쪽으로
- **치환된 고리 자리** — 그 고리 탄소의 δ(<sup>13</sup>C의 ipso 값), 결합을 피해 옆으로
- **치환기 자신** — 그려진 사슬이면 해당 원자 옆, 글자 약어이면 글자 바깥쪽

그림 크기는 **그려진 내용의 경계 상자에서 계산**합니다. 고정 크기를 쓰지 않으므로 긴 치환기나 긴
이름이 그림 밖으로 잘리는 일이 구조적으로 없습니다.

The viewBox is **computed from the bounding box of what was actually drawn**, so a long substituent or a
long name can never overflow the figure.

화학식 문자열은 자동으로 조판됩니다. `NO2` → NO₂, `N(CH3)2` → N(CH₃)₂, `N^+` → N⁺. 아래첨자는
**바로 앞이 원소 기호나 닫는 괄호일 때만** 적용되므로 `8.22`나 `4-nitroanisole` 같은 값과 이름은
그대로 유지됩니다.

Formula strings are typeset automatically — `NO2` → NO₂, `N(CH3)2` → N(CH₃)₂, `N^+` → N⁺ — with a digit
subscripted **only when it directly follows an element symbol or a closing bracket**, so values like
`8.22` and names like `4-nitroanisole` stay upright.

단원 본문에도 10개의 구조 그림이 들어가, 나이트로벤젠·아니솔·4-나이트로아니솔의 δ가 고리의 어느
자리에 붙는지, 에스터에서 산소 쪽과 카보닐 쪽이 어떻게 다른지를 구조 위에서 바로 확인할 수 있습니다.

Ten structure figures also appear in the lessons, showing where on the ring each δ of nitrobenzene,
anisole and 4-nitroanisole belongs, and how the oxygen side of an ester differs from the carbonyl side.

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

**2차 검토 — 적대적 재검토 (adversarial review).** 1차 정정 뒤, 남은 주장을 일부러 무너뜨려 보는
방식으로 다시 읽었습니다. 산술은 전부 기계로 재계산했고(본문·해설의 62개 식), 인용된 증분값 37건을
정본 표와 대조했으며(불일치 0), 그다음 기계가 잡을 수 없는 논증과 문항 설계를 공격했습니다.

**Second pass — adversarial review.** After the first round of corrections, the remaining claims were
re-read with the intent of breaking them. All arithmetic was recomputed by machine (62 expressions in
the lessons and explanations) and all 37 quoted increment values were checked against the canonical
table (zero mismatches); what follows is what turned up in the arguments and the question design,
which no script can check.

| # | 문제 | Issue |
|---|------|-------|
| 11 | **H2의 오답 선택지가 깨끗하게 배제되지 않음.** o-자일렌도 <sup>1</sup>H에서 방향족 4H가 δ 7.10–7.14의 좁은 다중선으로 뭉치고 CH<sub>3</sub>가 δ 2.25라, 주어진 <sup>1</sup>H 데이터만으로는 p-자일렌과 구별되지 않았음 → <sup>13</sup>C 신호 개수(p-자일렌 3개, o-자일렌 4개)를 문제에 추가해 확정 | **H2's distractor was not cleanly excluded.** o-Xylene also bunches its aromatic protons into a narrow δ 7.10–7.14 multiplet with CH<sub>3</sub> at δ 2.25, so the <sup>1</sup>H data alone did not separate it from p-xylene. Added the <sup>13</sup>C signal count (three versus four), which decides it |
| 12 | **H3 해설이 사실과 다름.** "아니솔은 방향족이 5H가 아니다"라고 썼으나 아니솔도 방향족 양성자는 5개임. 실제 구별점은 개수가 아니라 위치와 퍼짐(δ 6.89–7.28 대 7.28–7.38) | **H3's explanation was factually wrong**: it claimed anisole does not have five aromatic protons. It does. The real discriminator is where they sit and how far they spread (δ 6.89–7.28 versus 7.28–7.38) |
| 13 | **D8의 과장.** 톨루엔 벤질 메틸의 다운필드 이동에서 "지배적인 요인은 고리 전류"라고 단정했으나, 알릴 메틸(프로펜 δ 1.71)과 비교하면 에테인 대비 +1.46 중 +0.85는 알릴 위치와 공유되고 고리 전류 몫은 +0.61로 절반 미만 | **D8 overclaimed.** It asserted the ring current is the dominant cause of the benzylic methyl shift. Compared with the allylic methyl of propene (δ 1.71), of the +1.46 relative to ethane, +0.85 is shared with the allylic case and only +0.61 is the ring current — well under half |
| 14 | **D9의 출처 없는 수치.** "유도 효과만으로는 δ 7 정도까지밖에 설명되지 않는다"는 어떤 문헌에도 근거가 없는 자체 추정치 → 제거하고, 근거 있는 비교(산소에 붙은 CH는 δ 4, 알켄 양성자는 δ 5.3)로 교체 | **D9 cited an invented number.** "Induction alone would only reach about δ 7" had no source; it was a self-generated estimate. Replaced with grounded comparisons (a CH on oxygen reaches only about δ 4; an alkene proton sits at δ 5.3) |
| 15 | **C15의 "언제나"와 "2–3배".** 표 4-2에서 ortho/para 비는 CN 1.3배부터 COOCH<sub>3</sub> 3.4배까지 걸쳐 있어 "2–3배"는 부정확 → 실제 범위를 밝히고 단정 표현을 완화 | **C15's "always" and "two to three times".** The ortho/para ratio in Table 4-2 runs from 1.3 (CN) to 3.4 (COOCH<sub>3</sub>), so "two to three times" was inaccurate. The real range is now stated and the wording softened |
| 16 | **C13의 불완전한 논증.** 두 이중선의 "간격"만으로 판정하도록 되어 있었으나, 강한 EDG 두 개도 간격은 좁음. 절대 위치를 함께 봐야 한다는 점을 보강 | **C13's argument was incomplete.** It judged only by the gap between the doublets, but two strong donors also give a narrow gap. Reading the absolute position as well is now part of the reasoning |

**3차 검토 — 구조식 전수 검증과 두 번째 적대적 리뷰.** 구조식이 실제로 무엇을 그리고 있는지를
사람 눈이 아니라 **원자가 계산으로 역산해** 검증하도록 바꿨습니다. 앞선 세 건(삼중결합 누락, 염소
누락, 프로펜)은 모두 이 검사로 잡혔을 오류였습니다.

**Third pass — exhaustive structure verification and a second adversarial review.** What each drawing
actually depicts is now **derived by valence arithmetic** rather than judged by eye. All three earlier
defects — the missing triple bond, the missing chlorines, the propene — would have been caught by it.

| 검사 · Check | 건수 · Count | 결과 |
|---|---|---|
| 그림의 분자식 ↔ 의도한 화합물 · Drawn formula vs intended compound | 65 | 불일치 0 |
| 치환 위치(o/m/p) ↔ 이름 · Substitution pattern vs name | 17 | 불일치 0 |
| 고리 자리 δ 주석 ↔ 증분 예측 · Ring annotations vs increment prediction | 136 | 편차 0.35 ppm 초과 0 |
| 치환기 자체 주석 ↔ 그 원자의 예상 범위 · Substituent annotations vs expected range | 27 | 이탈 0 |
| 문항이 밝힌 분자식 ↔ 해설 구조식 · Stated formula vs drawn structure | 18 | **1건 적발** |
| 문항이 밝힌 분자식 ↔ 지문의 적분 합계 · Stated formula vs integrals in the stem | 15 | **1건 적발**(같은 건) |

그다음 새로 추가한 38문항을 하나씩 공격해 열 건을 고쳤습니다.

Attacking the 38 newly added questions one by one then turned up ten more:

| # | 문제 | Issue |
|---|------|-------|
| 17 | **H14의 분자식이 틀렸다.** 지문은 C<sub>9</sub>H<sub>10</sub>O인데 적분 합계는 8H이고 결론인 4-메틸벤즈알데하이드는 C<sub>8</sub>H<sub>8</sub>O. 세 값이 서로 어긋났다 | **H14 stated the wrong formula**: C<sub>9</sub>H<sub>10</sub>O against integrals summing to 8H and an answer, 4-methylbenzaldehyde, that is C<sub>8</sub>H<sub>8</sub>O |
| 18 | **G8에 정답이 둘이었다.** 오답으로 둔 "용매 신호"도 DEPT에서 사라진다(<sup>2</sup>H는 자화를 넘겨주지 못한다). 해설은 반대로 "남아 있다"고 적고 있었다 | **G8 had two defensible answers**: the "solvent signal" distractor also vanishes in a DEPT, since <sup>2</sup>H cannot transfer magnetisation — and the explanation claimed the opposite |
| 19 | **C24가 증분 순서를 EAS 비활성화 순서와 같다고 단정.** 하메트 σ<sub>p</sub>로는 CN이 두 번째로 강한 전자끌개인데 ortho 증분은 가장 작다. 나이트릴에 대한 설명(π 겹침이 어긋난다)도 틀렸다 | **C24 equated the increment order with the EAS deactivation order.** By Hammett σ<sub>p</sub> the nitrile is the second strongest withdrawer yet has the smallest ortho increment; the rationalisation offered for it was also wrong |
| 20 | **C22의 정답이 0.02 ppm 차이에 걸려 있었다.** 아니솔 meta 7.28 대 벤젠 7.26은 용매·기준물질에 따른 재현 오차와 같은 크기다 | **C22 hinged on 0.02 ppm** — anisole meta 7.28 against benzene 7.26, a difference the size of the reproducibility across solvents and referencing |
| 21 | **G9이 아세토니트릴 메틸 탄소(δ 1.9)의 업필드 이유를 "질소가 가까워서"로 설명.** 실제로는 삼중결합의 차폐이며, 질소가 가까우면 오히려 다운필드여야 한다 | **G9 explained the upfield methyl carbon of acetonitrile as "the nitrogen is close"** — it is triple-bond shielding; proximity to nitrogen would deshield |
| 22 | D12가 벤질 기여를 "절반 남짓"이라 했으나 실제로는 +1.50 중 +1.28(약 85%) | D12 called the benzylic contribution "a bit over half"; it is +1.28 of +1.50, about 85% |
| 23 | B9이 메틸 벤조에이트 단계(0.24 ppm)를 순수 전자 효과로 돌림 | B9 attributed the methyl-benzoate step, only 0.24 ppm, to electronics alone |
| 24 | **H13의 오답 선택지 분자식이 달라** 계산 없이도 배제됐다(에틸 4-아미노벤조에이트 C<sub>9</sub>H<sub>11</sub>NO<sub>2</sub>) | **H13's distractor had a different formula** (ethyl 4-aminobenzoate, C<sub>9</sub>H<sub>11</sub>NO<sub>2</sub>) and fell out without any reasoning |
| 25 | A8이 톨루엔 신호를 "최소 2개"라 서술(실제 4종류) | A8 described toluene as "at least two signals"; it has four environments |
| 26 | B8 지문에 전각 숫자 오타(`2.２`) | B8 carried a full-width digit typo (`2.２`) |

17·18·19·20·24번은 **문항이 성립하지 않거나 정답이 둘이 되는** 결함이고, 21·22·23번은 근거의
과장이며, 25·26번은 서술과 표기의 결함입니다. 특히 19번은 증분표를 전자 효과의 눈금으로 오독한
것으로, 고쳐 쓰면서 "증분표는 전자 밀도가 아니라 그 자리의 자기적 환경을 잰다"는 점을 해설에
명시했습니다.

Items 17, 18, 19, 20 and 24 were defects that broke the question or gave it two answers; 21, 22 and 23
were overstated reasoning; 25 and 26 were defects in wording and typography. Item 19 in particular came
from misreading the increment table as a scale of electronic effect, and the rewritten explanation now
says plainly that it measures the magnetic environment at a position, not electron density.

허용오차도 함께 점검해, 정답과 오답을 갈라내지 못하던 두 문항을 좁혔습니다. B7은 ±0.4 → ±0.25(±0.4는
"거의 안 움직인다"는 정답과 "크게 움직인다"는 오답을 모두 통과시켰음), C16은 ±0.3 → ±0.25(허용 상한
6.99가 반대쪽 양성자 7.00과 0.01 차이였음).

Numeric tolerances were audited too, and two were tightened where they failed to separate right from
wrong: B7 from ±0.4 to ±0.25 (±0.4 accepted both "it barely moves" and "it moves a lot"), and C16 from
±0.3 to ±0.25 (its upper bound of 6.99 sat 0.01 away from the other ring proton at 7.00).

1·2·5·6번은 값의 불일치, 3·4·7·8번은 서술의 논리적 충돌, 9·10·14번은 출처와 문장의 결함,
11·16번은 문항 설계의 허점, 13·15번은 과장입니다.
증분값 자체와 나머지 계산(나이트로벤젠, 아니솔, 4-나이트로아니솔, 4-나이트로톨루엔,
p-나이트로아닐린, 4-메틸아니솔)은 모두 문헌값과 일치했습니다.

Items 1, 2, 5 and 6 were numerical inconsistencies; 3, 4, 7 and 8 were internal contradictions in the
argument; 9, 10 and 14 were defects in an attribution or a sentence; 11 and 16 were holes in question
design; 13 and 15 were overclaims. The increments themselves and every
other calculation — nitrobenzene, anisole, 4-nitroanisole, 4-nitrotoluene, p-nitroaniline,
4-methylanisole — matched the literature.

**4차 검토 — 단원 본문 적대적 리뷰.** 앞의 세 번은 문항 위주였으므로, 이번에는 **단원 본문**만을
대상으로 같은 방식을 적용했습니다. 먼저 기계로 훑었습니다. 본문과 문항에서 같은 화합물의 같은
자리에 인용된 δ를 전부 모아 서로 다른 값이 쓰인 곳을 찾았고(39번), 산술 검사기가 `A / 2 = 10 / 2 = 5`
같은 **연쇄 등식**을 따라가지 못해 H1을 오탐하던 문제도 이때 고쳤습니다. 그다음 여덟 단원을 문장
단위로 읽으며 단정 표현("언제나", "모든", "절반 이하")과 숫자 범위를 하나씩 반례로 공격했습니다.

**Fourth pass — adversarial review of the lesson text.** The first three passes concentrated on the
questions, so this one took the **lessons** alone through the same treatment. A machine sweep came
first: every δ quoted for the same position of the same compound, in lessons and questions alike, was
collected and compared for disagreement (item 39), and the arithmetic auditor — which could not follow
a **chained equality** such as `A / 2 = 10 / 2 = 5` and so flagged H1 falsely — was fixed at the same
time. The eight lessons were then read sentence by sentence, attacking every absolute ("always",
"every", "less than half") and every stated range with a counter-example.

| # | 문제 | Issue |
|---|------|-------|
| 27 | **4.2절 요약 ②의 "크기는 <em>언제나</em> ortho ≳ para ≫ meta".** 같은 페이지의 표 4-2가 반례를 둘 담고 있다. 염소는 ortho(+0.02)가 meta(−0.06)보다 작고, NHCOCH<sub>3</sub>는 para(−0.28)가 ortho(+0.12)보다 크다 → "대체로"로 낮추고 두 반례를 명시 | **§4.2's "magnitude is <em>always</em> ortho ≳ para ≫ meta".** Table 4-2 on the same page contains two counter-examples: chlorine is smaller at ortho (+0.02) than at meta (−0.06), and NHCOCH<sub>3</sub> is larger at para (−0.28) than at ortho (+0.12). Softened, with both counter-examples named |
| 28 | **4.4절 함정 1의 아닐린 유비가 느슨했다.** OCH<sub>3</sub>의 메틸은 유도 효과로 δ 3.80에 오지만, NH·OH 양성자의 δ는 유도보다 **교환·수소 결합·농도**가 지배한다. "같습니다"로 묶으면 정량 비교의 근거처럼 읽힌다 | **§4.4's aniline parallel was mechanistically loose.** The methyl of OCH<sub>3</sub> is deshielded by induction, but the δ of NH and OH protons is governed by **exchange, hydrogen bonding and concentration**. Saying they "behave the same" invited quantitative comparison |
| 29 | **4.4절 함정 2의 "치환기 효과는 ±0.7 ppm".** 바로 앞 단원에서 쓰는 NO<sub>2</sub>의 ortho 증분이 +0.95로 이미 그 값을 넘는다 → "대개 ±1 ppm 안쪽"으로 고치고 최대치를 함께 밝힘 | **§4.4's "substituent effects of roughly ±0.7 ppm".** The NO<sub>2</sub> ortho increment used in the preceding section is +0.95, already outside it. Restated as "usually within about ±1 ppm", with the largest case named |
| 30 | **4.5절 클로로벤젠 구조식의 주석이 실측처럼 제시됐으나 본문 범위와 충돌.** 그림은 para를 7.24로 적고 본문은 "δ 7.26–7.33"이라 했다 → 주석을 **증분표 계산값**(o 7.28 / m 7.20 / p 7.22)으로 통일하고 계산값임을 캡션에 밝힌 뒤, 실제 스펙트럼은 **δ 7.2–7.4의 겹친 다중선 하나**로 서술. 같은 그림을 쓰는 C6 문항도 함께 정정 | **§4.5's chlorobenzene annotations read as measured yet contradicted the text**: the figure put para at 7.24 while the paragraph said "δ 7.26–7.33". The annotations are now the **increment-table calculation** (o 7.28 / m 7.20 / p 7.22), labelled as calculated in the caption, and the real spectrum is described as **one overlapping multiplet at δ 7.2–7.4**. Question C6, which reuses the drawing, was corrected with it |
| 31 | **4.6절 팁이 두 겹선의 "간격"만으로 판정하게 했다.** 2차 검토에서 문항 C13에 대해 고친 것과 **같은 결함이 본문에 그대로 남아 있었다** → 절대 위치를 함께 보라는 조건을 추가 | **§4.6's rule of thumb judged only by the gap** between the two doublets — the **same defect fixed in question C13 in the second pass was still sitting in the lesson**. The absolute positions are now part of the rule |
| 32 | **6.4절 (2)의 "para-이치환 벤젠은 이중선 두 개".** 두 치환기가 <strong>같으면</strong> 네 양성자가 등가라 단일선 하나다(p-자일렌 δ 7.05). 1차 검토에서 7단원의 같은 오류를 고쳤는데 6단원에 남아 있었다 | **§6.4(2)'s "a para-disubstituted ring gives two doublets".** With **identical** substituents all four protons are equivalent and give one singlet (p-xylene, δ 7.05). The same error was fixed in Lesson 7 in the first pass but survived here |
| 33 | **7.1절 (2)의 "모든 탄소가 단일선으로 나온다".** 양성자 짝풀림은 <sup>2</sup>H를 풀지 않으므로 중수소화 용매의 탄소는 갈라진 채 남는다(CDCl<sub>3</sub> δ 77.2 삼중선). 이 사실은 G8 문항의 정답 근거이기도 해서 본문과 충돌했다 | **§7.1(2)'s "every carbon appears as a singlet".** Proton decoupling does not decouple <sup>2</sup>H, so the solvent carbon stays split (CDCl<sub>3</sub>, a triplet at δ 77.2) — the very fact question G8 turns on |
| 34 | **7.2절이 나이트로벤젠 C-ortho의 업필드를 "이웃 원자 효과"로 설명.** 아무것도 설명하지 않는 표현이다 → <sup>13</sup>C 이동이 π 전자 밀도만으로 정해지지 않고 치환기의 전기장·자기 이방성 기여가 바로 옆자리에서 가장 크다는 실제 이유로 교체 | **§7.2 explained nitrobenzene's upfield ortho carbon as "a neighbouring-atom effect"** — a phrase that explains nothing. Replaced with the actual reason: <sup>13</sup>C shifts are not set by π density alone, and the substituent's electric-field and anisotropy contributions are largest at the adjacent carbon |
| 35 | **3.3절 함정의 "카보닐 옆의 효과는 절반 이하".** 프로그램이 쓰는 값으로 검산하면 메테인(0.23) 대비 메탄올 CH<sub>3</sub>는 +3.17, 아세톤 CH<sub>3</sub>는 +1.94로 **약 3분의 2**다 → 수치를 밝혀 교체하고, "언제나 더 크게 이동한다"는 단정도 에스터로 한정 | **§3.3's "being α to a carbonyl is worth less than half".** Using the program's own values, methanol's methyl is +3.17 from methane (0.23) while acetone's is +1.94 — **about two thirds**. The numbers are now shown, and the "always moves further" claim is bounded to esters |
| 36 | **1.2절의 TMS "거의 모든 유기 화합물보다 강하게 차폐".** 5단원이 고리 전류의 차폐 영역에서 δ가 음수가 되는 경우를 다루므로, 그 예외를 가리키는 상호참조를 추가 | **§1.2's TMS "more shielded than almost any organic compound"** now points forward to Lesson 5, where protons inside a ring current take negative δ |
| 37 | **2단원 표의 범위가 프로그램 자신이 인용하는 값을 배제했다.** `CH<sub>3</sub>–O 3.3–4.0`은 다이메틸 에터 3.24를(B9 문항에서 인용), `CH<sub>3</sub>–C=O 2.1–2.6`은 에틸 아세테이트 2.05를(3단원·6단원에서 인용) 밖에 둔다 → 3.2–4.0, 2.0–2.6 | **The Lesson 2 table excluded values the program itself quotes.** `CH<sub>3</sub>–O 3.3–4.0` left out dimethyl ether at 3.24 (cited in B9) and `CH<sub>3</sub>–C=O 2.1–2.6` left out ethyl acetate at 2.05 (cited in Lessons 3 and 6). Widened to 3.2–4.0 and 2.0–2.6 |
| 38 | **8.1절 (3)의 진단 영역이 같은 이유로 좁았다.** "δ 9–10은 알데하이드"는 벤즈알데하이드 10.02를, "3.3–4.5"는 다시 3.24를 배제한다 → 2단원 표(9.5–10.1)와 맞추고 3.2–4.5로 | **§8.1(3)'s diagnostic regions were narrow for the same reason**: "δ 9–10 aldehyde" excludes benzaldehyde at 10.02 and "3.3–4.5" excludes 3.24 again. Aligned with the Lesson 2 table (9.5–10.1) and widened to 3.2–4.5 |
| 39 | **톨루엔 CH<sub>3</sub>가 D8 지문에서만 2.32, 나머지(D8 해설·D12·5단원 구조식)에서는 2.36.** 기계 스캔이 잡아낸 유일한 값 불일치 → 2.36으로 통일(SDBS) | **The toluene methyl was 2.32 in D8's stem but 2.36 everywhere else** (D8's own explanation, D12, the Lesson 5 structure) — the only numerical disagreement the machine sweep found. Unified at 2.36 (SDBS) |

30·32·33번은 본문끼리 또는 본문과 문항이 **서로 모순**된 경우이고, 27·29·35·37·38번은 단정과 범위가
프로그램 자신의 값에 의해 반증된 경우, 28·34번은 설명이 실제로는 아무것도 설명하지 않던 경우입니다.
31·32번에서 드러난 것은 **같은 결함을 문항에서만 고치고 본문에는 남겨 두었다**는 점이며, 이번 검토는
그런 비대칭을 찾는 데 특히 유효했습니다.

Items 30, 32 and 33 were outright **contradictions** between one part of the text and another; 27, 29,
35, 37 and 38 were absolutes and ranges refuted by the program's own numbers; 28 and 34 were
explanations that explained nothing. What items 31 and 32 exposed is that **a defect had been fixed in
the question and left standing in the lesson** — an asymmetry this pass was particularly good at
finding.

---

## 시각 검사 · Visual checks

레이아웃은 눈으로 훑는 대신 **자동 탐지기**로 확인합니다. 페이지 안에서 실제 렌더된 상자 좌표를 읽어
다음 네 가지를 판정합니다.

Layout is checked by an **automated detector** that reads real rendered box geometry inside the page,
rather than by eyeballing screenshots. It decides four things:

1. 스펙트럼 SVG 안의 모든 텍스트 쌍에 대한 겹침(4 px² 초과) — *pairwise overlap of every text pair inside each spectrum*
2. 텍스트가 그림 경계 밖으로 잘리는지 — *labels clipped outside the figure box*
3. 컨테이너보다 넓어 잘리는 텍스트, 문서 가로 오버플로, 뷰포트 밖으로 나간 요소 — *clipped text, horizontal overflow, off-viewport elements*
4. 축소로 글자가 7 px 미만이 되어 읽을 수 없는지 — *figure text shrunk below legibility*

**320 / 375 / 768 / 1024 / 1440 px × 국문·영문**으로 모든 단원, 계산기 조합 9종, 나머지 탭을 돌리고,
모든 문항은 **채점된 상태(해설과 구조식이 펼쳐진 화면)까지** 열어 검사합니다. 한 번에 스펙트럼과
구조식을 합쳐 **1762회 렌더**를 확인합니다. 이 검사로 찾아 고친 것은 다음과 같습니다.

Run across **320 / 375 / 768 / 1024 / 1440 px in both languages** over every lesson, nine calculator
combinations and the remaining tabs, and every question is opened **through to its graded state**, with
the explanation and its structure on screen — **1762 spectrum and structure renders** per pass. What it
found and what changed:

- **축 눈금 숫자와 적분 라벨이 겹침 (44건).** 적분 라벨이 축 바로 아래(baseY + 10)에, 눈금 숫자가
  그 8 px 아래(baseY + 18)에 있어 가로로 가까우면 부딪혔습니다. 적분을 축 아래에서 빼고 봉우리
  라벨에 합쳐 `8.22 (2H, d)` 형태로 바꿨습니다 — 겹침이 구조적으로 사라지고, 표기도 실제 peak list와
  같아집니다.
  *Integration labels sat 8 px above the tick numbers and collided with them. Folding the integration
  into the peak label as `8.22 (2H, d)` removes the collision by construction and matches real peak-list
  notation.*
- **봉우리 이름 라벨이 충돌 회피 대상에서 빠져 있었음.** `ortho` 같은 이름 줄이 배치 목록에 등록되지
  않아 옆 봉우리의 ppm 라벨이 그 위에 앉았습니다. 주석 두 줄을 한 덩어리로 취급하고, 라벨 폭을 글꼴
  기준으로 추정해 판정하도록 고쳤습니다.
  *The name row was not registered in the placement list, so a neighbour's ppm label could land on it.
  Both rows are now treated as one block, with widths estimated from the font metrics.*
- **라벨이 그림 위쪽으로 1 px 잘림 (8건).** 위 여백을 넓히고, 한 칸 더 올리면 잘리는 경우에는 올리기를
  멈추도록 했습니다. 잘림보다 약간의 겹침이 낫기 때문입니다.
  *Top padding was increased, and lifting now stops when another step would clip — a slight overlap
  beats a truncated label.*
- **320 px에서 그림이 통째로 축소돼 글자를 읽을 수 없었음.** 겹치지는 않았지만 실질적인 결함이라,
  표와 동일하게 최소 폭 600 px를 두고 가로 스크롤하도록 바꿨습니다. 설명글은 스크롤 밖에 둡니다.
  *At 320 px the whole figure scaled down until the text was illegible. It now keeps a 600 px minimum
  width and scrolls horizontally, like the tables; the caption stays outside the scroller.*

ACS 규약으로 다시 그리면서 **작도 기하 자체의 오류**도 하나 나왔습니다. 고리에서 나가는 첫 결합이
반지름 방향이 아니라 30° 틀어져 있어, 메틸이든 에스터든 모든 치환기가 비스듬히 매달려 있었습니다.
또 말단 원자의 가지 방향을 계산할 때 "다음 결합이 갔을 방향" 대신 자기 결합 방향을 써서, 이등분선이
0 이 되고 가지가 결합에 <strong>수직</strong>으로 붙고 있었습니다(알데하이드의 C=O 등). 둘 다 고쳤습니다.

Redrawing to ACS conventions also surfaced **errors in the drawing geometry itself**. The first bond off
a ring was 30° off the radius, so every substituent — methyl or ester alike — hung at a slant. And when
computing a branch direction at a terminal atom the code reused that atom own bond direction instead of
the direction the *next* bond would take, which made the bisector degenerate and pinned branches at
**90°** to the chain (the C=O of an aldehyde, for instance). Both are fixed.

그리고 구조식 사양을 하나씩 눈으로 훑는 과정에서 **화학적으로 틀린 그림 세 개**를 더 찾았습니다.
자동 검사기는 겹침과 잘림만 보므로 이런 것은 잡지 못합니다.

Reading through the structure specifications by hand then turned up **three chemically wrong drawings**.
The automated detector only looks at overlap and clipping, so it cannot catch this class at all.

| 그림 | 문제 | Issue |
|---|---|---|
| 1-펜타인 | **삼중결합이 없었고** 탄소도 4개뿐이었음(1-뷰타인). 인용 δ도 대략값이었음 | Drawn with **no triple bond** and only four carbons, i.e. 1-butyne; the quoted shifts were approximate |
| 1,1,2-트라이클로로에테인 | **염소가 하나도 그려지지 않아** 에테인이 되어 있었음 | **No chlorines were drawn at all** — it was ethane |
| 스타이렌 비닐기 | 탄소 3개 사슬(프로펜)로 그려져 있었음. 실제로는 고리에 붙은 CH=CH<sub>2</sub> | Drawn as a three-carbon chain (propene) instead of a CH=CH<sub>2</sub> on the ring |

삼중결합과 sp 직선 구간, 그리고 양쪽에 가지가 붙는 탄소를 그릴 수 있도록 렌더러를 확장해 셋 다
바로잡았습니다. 1-펜타인의 δ도 실측값(0.98 / 1.53 / 2.18 / 1.93)으로 교체했습니다.

The renderer gained triple bonds, straight-through sp segments and two-sided branches, and all three were
redrawn. The 1-pentyne shifts were replaced with the measured values (0.98 / 1.53 / 2.18 / 1.93).

구조식을 도입하면서 같은 검사로 세 가지를 더 잡았습니다. **화합물 이름이 그림보다 길어 좌우로
삐져나가던 것**(이름 길이에 맞춰 그림 폭을 넓힘), **원자 라벨과 δ 주석이 겹치던 것**(라벨이 있는
자리는 주석을 한 칸 더 띄움), 그리고 **tert-뷰틸 알코올이 메틸 두 개만 그려져 2-프로판올이 되어
있던 것**(아래쪽 가지 지원을 추가해 세 번째 메틸을 그림). 마지막 것은 레이아웃이 아니라 **화학적으로
틀린 그림**이었습니다.

Introducing structures turned up three more through the same check: **compound names spilling past the
edges of a figure** (the figure now widens to fit the name), **atom labels colliding with δ
annotations** (annotations move a step further out where a label is present), and **tert-butyl alcohol
drawn with only two methyls, making it 2-propanol** (a downward-branch option was added to draw the
third). That last one was not a layout bug but a **chemically wrong drawing**.

현재 상태: **1762회 렌더 전부에서 겹침 0, 잘림 0, 가로 오버플로 0, 판독 불가 0.**

Current state: **zero overlaps, zero clipping, zero horizontal overflow and zero illegible text across
all 1762 renders.**

---

## 파일 구조 · File layout

```
index.html                  앱 셸, 뷰 컨테이너 / app shell and view containers
assets/css/styles.css       라이트·다크 테마, 반응형 레이아웃 / themes and responsive layout
assets/js/i18n.js           UI 문자열 사전, 언어 전환 / UI dictionary and language switching
assets/js/spectrum.js       모식 스펙트럼 SVG 생성기 / schematic spectrum renderer
assets/js/structure.js      분자 구조식 SVG 생성기 / molecular structure renderer
assets/js/data-sources.js   참고문헌과 데이터 소급 대장 / bibliography and provenance register
assets/js/data-lessons.js   단원 콘텐츠 (블록 구조) / lesson content as content blocks
assets/js/data-questions.js 문제 은행 (106문항) / the 106-item question bank
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

- **자바스크립트는 전부 ES5** — 7개 파일 모두 `acorn`으로 `ecmaVersion: 5` 파싱을 통과합니다.
  화살표 함수, `const`/`let`, 템플릿 리터럴, 전개 구문, `Promise`, `fetch`를 쓰지 않습니다.
- **CSS에서 `color-mix()`를 제거**했습니다. 남은 최신 기능은 CSS 커스텀 속성뿐이며(2017년경 이후
  모든 브라우저), 이마저 지원하지 않는 경우를 대비해 본문 배경·글자색에 리터럴 폴백을 두었습니다.
- **최신 전용 API는 전부 폴백 경로가 있습니다** — `Element.closest`/`matches`(속성 기반 조상 탐색으로
  대체), 옵션 객체를 받는 `scrollTo`/`scrollIntoView`, `classList.toggle`의 두 번째 인자,
  그리고 `localStorage` 접근이 예외를 던지는 환경(사파리 프라이빗 모드 등).
- **실제로 그 API들을 제거한 상태에서 전체 동작을 확인**했습니다. Chromium에 `closest` 삭제,
  옵션 객체 스크롤 예외 발생, `toggle` 두 번째 인자 무시, `localStorage` 접근 시 예외를 주입한 뒤
  단원 이동·언어 전환·채점·계산기·출처 탭이 모두 정상 동작했습니다.

- **All JavaScript is ES5** — all seven files pass `acorn` with `ecmaVersion: 5`. No arrow functions,
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

전체 문항 회귀 검사 · Full regression: 8개 단원과 106문항을 **국문·영문 양쪽으로 각각 순회**해
콘솔 오류 0건, 모든 채점·해설·출처 표시가 정상임을 확인했습니다. 레이아웃은 위의 **시각 검사** 절을
보십시오.

성능 · Performance (헤드리스 Chromium, 8개 단원 연속 렌더 기준):

| | 이전 · Before | 이후 · After |
|---|---|---|
| 첫 렌더 · Cold | 674 ms | **149 ms** |
| 캐시 후 · Warm | 579 ms | **83 ms** |
| 단원 전환 1회 · Per switch | 약 72 ms | **약 10 ms** |
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
- **적분 라벨을 봉우리 라벨에 합치면서** 그림당 텍스트 노드가 줄어, 겹침 수정이 성능 개선으로도
  이어졌습니다(216 ms → 140 ms). *Folding integration into the peak label cut the node count per
  figure, so the overlap fix also bought speed.*

전송 크기 · Transfer size: 총 412 KB, gzip 적용 시 **118 KB** (문항·단원 텍스트가 대부분).

Total 412 KB, or **118 KB gzipped** — mostly the lesson and question text.
