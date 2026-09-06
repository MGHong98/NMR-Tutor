# 검토 기록 · Review log

이 파일은 **무엇이 틀렸고 무엇을 바꿨는지**의 기록입니다. 프로그램이 무엇인지, 어떻게 쓰는지,
검사를 어떻게 돌리는지는 [`README.md`](README.md)에 있습니다.

This file records **what was wrong and what changed**. What the program is, how to use it and how to
run the checks are in [`README.md`](README.md).

여덟 번의 적대적 검토에서 **82건**을 찾아 고쳤습니다. 각 항목은 번호로 고정되어 있으며, 번호는
`tools/review_guard.js`의 잔존 검사가 참조합니다 — 고친 것이 나중에 조용히 되돌아가면 그 검사가
깨집니다.

Eight adversarial passes found and fixed **82 defects**. The numbers are stable, and
`tools/review_guard.js` refers to them: if a fix is quietly reverted, that checker breaks.

| 회차 · Pass | 대상 · What was attacked | 항목 · Items |
|---|---|---|
| 1차 | 증분표와 본문의 계산 전체 · every increment and worked calculation | 1–10 |
| 2차 | 문항 설계와 논증 · question design and argument | 11–16 |
| 3차 | 구조식 전수 검증과 새 문항 38개 · all structures, and 38 new questions | 17–26 |
| 4차 | 단원 본문 · the lesson text | 27–39 |
| 5차 | 부록 A·B와 물리 수치 · Appendices A and B, and the physics | 40–48 |
| 6차 | 무결성 확인과 기록 내보내기 (이론/코드로 나눠) · integrity and progress I/O, split into theory and code | 49–62 |
| 7차 | 부록 C와 2차원 지도 · Appendix C and the 2D maps | 63–72 |
| 8차 | 마무리 전 마지막 공격 · the last attack before wrapping up | 73–82 |

각 회차에서 새로 만든 검사기는 그대로 저장소에 남아 있습니다. 지금 상태는 `node tools/check.js`
한 번으로 확인할 수 있고, 수치는 README의 **검사 현황** 절에 있습니다.

Every checker written during a pass is still in the repository. `node tools/check.js` reports the
current state; the figures are in the **Where the checks stand** section of the README.

---

## 회차별 기록 · Pass by pass

### 1차 · Pass 1 — 증분표와 계산 전체 · every increment and calculation

**1차 검토.** 증분표 전체를 Pretsch 외(2009)와 대조하고, 단원과 해설에 나오는 계산을 모두 재계산했습니다.
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

### 2차 · Pass 2 — 문항 설계와 논증 · question design and argument

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

### 3차 · Pass 3 — 구조식 전수 검증 · every structure verified

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

### 4차 · Pass 4 — 단원 본문 · the lesson text

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

### 5차 · Pass 5 — 부록 A·B와 물리 수치 · Appendices A and B

**5차 검토 — 부록(이론적 배경)을 붙이고 같은 방식으로 공격.** 같은 작성자의 자매 저장소
[Isotope Bench](https://github.com/MGHong98/Isotope-Bench)의 규약을 이 저장소로 옮기면서
`LICENSE`(CC BY-NC 4.0)를 신설하고, README에 배포 절차·한계·확장 방법·라이선스와 제작 항목을
더했으며, 그쪽의 *브리핑·부록* 형식을 따라 **부록 A(분광기가 실제로 재는 것)** 와
**부록 B(실험대에서)** 를 새로 썼습니다. 참고문헌은 Keeler(2010), Claridge(2016),
CODATA 2018·NIST를 더해 6종에서 **9종**이 되었습니다.

**Fifth pass — the appendices, and the same attack on them.** Conventions were carried over from the
sister repository [Isotope Bench](https://github.com/MGHong98/Isotope-Bench) by the same author: a
`LICENSE` file (CC BY-NC 4.0) was added, the README gained deployment, limitations, extension and
credits sections, and — following that project's *briefing and appendix* format — two new appendices
were written, **A (what the spectrometer actually measures)** and **B (at the bench)**. The
bibliography grew from six works to **nine** with Keeler (2010), Claridge (2016) and CODATA 2018/NIST.

부록은 물리 수치가 대부분이라 화학 검사기로는 잡히지 않습니다. 그래서 **물리 검사기를 새로**
만들었습니다. 표 A-1의 γ/2π·공명 주파수·존재비를 CODATA 값에서 다시 계산하고, 볼츠만 인구 차,
상대 수용도, 5×T<sub>1</sub> 회복률, 선폭 1/(πT<sub>2</sub>*), 최대 NOE, 자기장↔주파수 환산,
스캔 배수와 디지털 분해능을 모두 재계산해 본문과 대조합니다. 여기에 모든 단원의 `refs`·`src`가
실재하는 출처를 가리키는지까지 함께 검사합니다 — **128건, 불일치 0**.

The appendices are mostly physics, which the chemistry auditors cannot see, so a **new physics
auditor** was written. It recomputes the γ/2π values, resonance frequencies and abundances of Table A-1
from CODATA, along with the Boltzmann excess, the relative receptivity, the 5×T<sub>1</sub> recovery,
the linewidth 1/(πT<sub>2</sub>*), the maximum NOE, the field-to-frequency conversions, the scan
arithmetic and the digital resolution, and checks them against the text. It also verifies that every
`refs` and `src` in every lesson points at a source that exists — **128 checks, zero mismatches**.

| # | 문제 | Issue |
|---|------|-------|
| 40 | **표 A-1의 <sup>1</sup>H 자연존재비가 99.98%.** NIST 값은 0.999885이므로 소수 둘째 자리로는 **99.99%**입니다. 새 물리 검사기가 잡은 유일한 수치 오류 | **Table A-1 gave the <sup>1</sup>H abundance as 99.98%**; NIST has 0.999885, which is **99.99%** to two decimals. The only numerical error the new auditor caught |
| 41 | **표 A-1에 <sup>2</sup>H를 넣어 놓고 A.1 첫 문장은 “I = 1/2인 핵”이라 서로 어긋남.** <sup>2</sup>H는 I = 1인 사중극자 핵이라 준위가 셋입니다 → <sup>2</sup>H는 관측 대상이 아니라 락 신호이며 사중극자 핵이라는 문단을 표 아래에 추가 | **Table A-1 listed <sup>2</sup>H while A.1 opens with “a nucleus with I = 1/2”.** <sup>2</sup>H is quadrupolar with I = 1 and three levels. A paragraph under the table now says it is the lock signal, not an observed nucleus, and that it is quadrupolar |
| 42 | **“용매는 시료보다 수천 배 많다”는 과장.** 실제로 0.6 mL 클로로폼은 7.5 mmol, 시료 10 mg(M = 200)은 0.05 mmol로 **150배 남짓**입니다 → 몰수를 직접 적고, 문제의 본질이 크기보다 수용기의 **동적 범위**임을 밝힘 | **“The solvent outnumbers the sample thousands to one” was an overstatement**: 0.6 mL of chloroform is 7.5 mmol against 0.05 mmol for 10 mg of M = 200 — about **150-fold**. The figures are now given, and the point restated as the receiver's **dynamic range** |
| 43 | **표 B-1의 캡션이 “(CDCl<sub>3</sub> 기준 δ)”.** 각 행은 <strong>그 용매에서</strong> 측정한 값이므로 캡션이 틀렸습니다 | **Table B-1 was captioned “(δ referenced to CDCl<sub>3</sub>)”** — but each row is a value measured <strong>in its own solvent</strong> |
| 44 | **A.7의 시험 노트가 “다중도의 규칙은 그대로”라고 적어, 같은 절의 “고자기장에서 2차 스펙트럼이 1차로 풀린다”와 충돌.** J는 Hz로 불변이지만 <em>겉모습</em>은 달라진다는 점을 분리해 서술 | **A.7's exam note said “the multiplicity rules are unchanged”, contradicting the same section's claim that second-order patterns resolve at high field.** J in Hz is invariant; the <em>appearance</em> is not, and the two are now separated |
| 45 | **B.4의 “d1 1–2초면 대부분 충분”이 표 A-2와 어긋남.** 표는 <sup>1</sup>H T<sub>1</sub>을 0.5–5초로 적고 있어 위쪽 자리는 5×T<sub>1</sub>에 못 미칩니다 → 범위를 정확히 적고, 실무에서 90°보다 작은 펄스 각으로 이 제약을 완화한다는 사실을 추가 | **B.4's “a d1 of one to two seconds is enough for most molecules” contradicted Table A-2**, which puts <sup>1</sup>H T<sub>1</sub> at 0.5–5 s — the upper end falls short of 5×T<sub>1</sub>. The range is now stated exactly, together with the flip angle below 90° that eases it in practice |
| 46 | **녹은 산소를 철 가루와 같은 선폭 원인으로 묶음.** 산소는 주로 T<sub>1</sub>을 줄이므로 일상적인 <sup>1</sup>H 선폭보다 이완 시간 측정과 NOE 실험에서 문제가 됩니다 | **Dissolved oxygen was grouped with iron filings as a linewidth cause.** It mainly shortens T<sub>1</sub>, so it matters for relaxation measurements and NOE work rather than for a routine <sup>1</sup>H linewidth |
| 47 | **“CW 기기는 주파수를 하나씩 훑었다.”** 자기장을 훑는 방식도 있었으므로 “주파수 또는 자기장”으로 정정 | **“CW instruments swept the frequency.”** Sweeping the field was equally common; corrected to “the frequency — or the field” |
| 48 | **B.3의 예시가 δ 7.26과 7.24.** 7.26은 CDCl<sub>3</sub> 잔류 신호값이라 “기준으로 쓰는 값”과 “문헌마다 갈리는 값”이 겹쳐 읽힙니다 → 7.28과 7.26의 예로 교체 | **B.3 illustrated the point with δ 7.26 against 7.24.** Since 7.26 <em>is</em> the CDCl<sub>3</sub> residual peak, the reference value and the disputed value read as the same number; the example is now 7.28 against 7.26 |

검사기 자체에서도 세 가지를 고쳤습니다. ① 산술 검사기가 **지수 표기**(`1.6×10⁻²`)를 사칙연산으로
오독했습니다 → 물리 검사기가 따로 검증하도록 넘겼습니다. ② 같은 검사기가 **아래첨자**(`Δν₁/₂`)를
분수로 읽었습니다 → 파싱 단계에서 구분되도록 고쳤습니다. ③ 시각 검사기의 렌더 집계가 **숨겨진 탭에
남아 있는 그림까지** 세고 있었습니다 → 화면에 보이는 것만 세도록 고쳤고, 그래서 아래 **시각 검사**
절의 수치가 1762에서 604로 바뀌었습니다(검사 범위는 그대로입니다). 화학 쪽 검사는 이때도 이후에도
모두 불일치 0입니다 — 현재 수치는 아래 **검사 현황** 절에 모아 두었습니다.

Three defects in the tooling were fixed as well. ① The arithmetic auditor misread **scientific
notation** (`1.6×10⁻²`) as arithmetic — that is now the physics auditor's job. ② The same auditor read
**subscripts** (`Δν₁/₂`) as fractions — they are kept distinct at the parsing stage now. ③ The visual
detector's render tally counted figures **still sitting in hidden tabs**; it now counts only what is on
screen, which is why the figure in **Visual checks** below moved from 1762 to 604 with no change in
coverage.

The chemistry checks — 90 expressions, 24 increment triples, 66 structures back-calculated, 17
substitution patterns, 138 ring annotations and 33 formula cross-checks — all still come back clean.

### 6차 · Pass 6 — 무결성 확인과 기록 내보내기 · integrity and progress I/O

**6차 검토 — 새 기능 두 개(무결성 확인·기록 내보내기)의 적대적 리뷰.** 이번에는 검토를
**이론적(주장과 의미)** 과 **코드적(구현)** 으로 나눠 진행했습니다.

**Sixth pass — adversarial review of the two new features.** This one was split into the
**theoretical** side (what the features claim and mean) and the **code** side (how they behave).

#### 이론적 · Theoretical

| # | 문제 | Issue |
|---|------|-------|
| 49 | **“콘텐츠 전체를 검사한다”가 거짓이었다.** 학습자가 가장 신뢰해야 할 표인 **치환기 증분 16종은 `app.js` 안**에 있어 해시 범위 밖이었습니다. 다중선 세기표(`spectrum.js`)와 작용기 정의(`structure.js`)도 마찬가지였습니다 → 세 표를 모두 검사 대상에 넣었습니다. 이제 **화학 수치를 담은 표는 전부 포함**되고 렌더링 로직만 빠집니다 | **“The whole content is covered” was false.** The **16 substituent increments live in `app.js`**, outside the digest — as did the multiplet intensity table and the functional-group definitions. All three are now inside it: **every table carrying a chemical number is covered**, only the rendering logic is not |
| 50 | **초록색 “일치”가 “화학이 검증됐다”로 읽힌다.** 해시가 보증하는 것은 *원본과 같다*는 사실뿐입니다 → 결과 문구에 “내용이 화학적으로 옳다는 보증은 아니며, 그 근거는 출처와 소급 대장”이라는 문장을 붙였습니다 | **A green “match” reads as “the chemistry has been verified”.** A hash only certifies that the copy is *identical to the original*; the result now says so, and points at the sources and provenance register for correctness |
| 51 | **합치기 규칙의 손실을 고르지 않았다.** 시도 횟수를 더하면 같은 파일을 두 번 불러올 때 부풀고, 큰 쪽을 취하면 두 기기의 시도 합이 과소평가됩니다 → **멱등성**을 택하고(큰 쪽) 그 규칙을 화면과 README에 명시했습니다 | **The merge rule traded one loss for another without saying so.** Summing attempts inflates on a double import; taking the maximum understates work done across two machines. **Idempotence** was chosen, and the rule is now stated in the UI and here |
| 52 | **오래된 기록을 최신 상태로 오해할 수 있다.** 반년 전 파일을 불러오면 “이미 푼 문항”으로 보입니다 → 파일의 `savedAt`을 불러오기 결과에 함께 표시합니다 | **An old export can pass for current progress.** The file's `savedAt` is now shown with the import result |
| 53 | **무결성 확인이 잠금장치로 오해될 수 있다.** 코드를 고칠 수 있는 사람은 기준 해시도 고칩니다 → 검사 범위 문구에 “잠금장치가 아니라 대조 장치”라고 못박았습니다 | **The integrity panel can be mistaken for a lock.** Anyone who can edit the code can edit the reference hash; the scope note now says plainly that this is a comparison, not a lock |

#### 코드적 · Code

| # | 문제 | Issue |
|---|------|-------|
| 54 | **프로토타입 오염.** 가져온 JSON의 키가 `__proto__`·`constructor`·`toString`이면 `Q_BY_ID[k]`가 **참으로 평가되어** “아는 문항”으로 통과하고, `out[k] = …` 대입이 객체의 프로토타입을 건드립니다 → `hasOwnProperty`로 조회하고 `__proto__`를 명시적으로 배제. 테스트로 프로토타입 정상·`Object.prototype` 무오염 확인 | **Prototype pollution.** An imported key of `__proto__`, `constructor` or `toString` reads **truthy** from `Q_BY_ID`, passing as a known question — and assigning `out[k]` then touches the prototype. Lookups now go through `hasOwnProperty` and `__proto__` is rejected outright; tests confirm the prototype and `Object.prototype` stay clean |
| 55 | **`esc()`는 따옴표를 escape하지 않는다.** 그런데 `placeholder="…"` 속성에 i18n 문자열을 끼워 넣고 있었습니다 → DOM 속성으로 설정 | **`esc()` does not escape quotes**, yet an i18n string was being interpolated into a `placeholder="…"` attribute. It is set as a DOM property now |
| 56 | **숫자 검사가 없었다.** 배열, `NaN`, 음수, `1e308`, 시도도 정답도 없는 빈 항목이 그대로 통계에 들어갔습니다 → 정수화·0~9999 클램프·배열 거부·빈 항목 폐기 | **No numeric validation.** Arrays, `NaN`, negatives, `1e308` and empty entries went straight into the statistics. Values are now floored, clamped to 0–9999, arrays rejected and informationless entries dropped |
| 57 | **세트 이름을 파일에서 읽으면 세트별 통계를 조작할 수 있다** → 세트는 파일이 아니라 **문항 자신**에게서 가져옵니다 | **Taking the set name from the file lets it forge the per-set statistics** → the set now comes from **the question itself** |
| 58 | **로드 순서 함정.** `spectrum.js`·`structure.js`는 `integrity.js`보다 먼저 로드되므로 거기서 부른 등록 함수는 **조용히 무시**됐습니다. 넣어 둔 `if (global.Integrity)` 가드가 그 실패를 감추고 있었습니다 → 등록 대신 공개 객체에서 직접 읽도록 바꿔 순서 의존을 없앴습니다 | **A load-order trap.** `spectrum.js` and `structure.js` load before `integrity.js`, so their registration calls were **silently skipped** — and the `if (global.Integrity)` guard hid the failure. The digest now reads those tables from their public objects instead, removing the ordering dependency |
| 59 | **320 px에서 제작 정보 표가 화면 밖으로 나갔다.** 이 프로젝트의 `table`에는 `min-width: 420px`이 걸려 있고 다른 표는 모두 `.tbl-wrap`(가로 스크롤) 안에 있는데, 새 표만 그렇지 않았습니다 → 시각 검사기가 136건으로 잡아냈고, 이 표는 줄바꿈이 가능하므로 `min-width`를 풀었습니다 | **The build-information table ran off screen at 320 px.** Every `table` here carries `min-width: 420px` and every other one sits inside a scrolling `.tbl-wrap`; this new one did not. The visual detector flagged 136 instances, and the table now wraps instead |
| 60 | `canonical()`이 `undefined`나 함수를 만나면 유효하지 않은 문자열을 만들 수 있었습니다 → 총함수로 고쳤습니다 | `canonical()` could emit an invalid string for `undefined` or a function; it is a total function now |
| 61 | 붙여 넣기 입력에 크기 제한이 없었습니다 → 2 MB 상한 | The paste box had no size limit; capped at 2 MB |
| 62 | `Integrity.current()`의 캐시가 등록 이후 낡을 수 있었습니다 → 등록이 캐시를 무효화합니다 | The `Integrity.current()` cache could go stale after a registration; registering now invalidates it |

**리뷰 항목 후속 수정.** 위 표를 다시 훑으면서, 리뷰 때 *지적만 하고 넘어간* 것과 그때 세운 기준으로
보면 여전히 부족한 것을 마저 고쳤습니다.

**Following the review through.** Going back over the table above, the things that had been *noted but
not fixed* — and the ones that still fell short of the standard the review itself set — were finished off.

| # | 문제 | Issue |
|---|------|-------|
| 63 | **49번의 기준을 스스로 지키지 못했다.** “화학 수치를 담은 표는 전부 포함”이라고 해 놓고, 계산기의 **기준값 `BENZENE = 7.26`** 은 여전히 `app.js` 안의 낱개 상수라 빠져 있었습니다 → 등록했습니다 | **The standard set in item 49 was not met by item 49.** “Every table with a chemical number” still left out the calculator's **`BENZENE = 7.26`**, a loose constant in `app.js`. It is registered now |
| 64 | **UI 문구 안에도 수치가 인용된다.** 계산기 설명의 “δ = 7.26 + Σ(증분)”, 증분표 설명의 “±0.2 ppm” 같은 값이 `i18n.js`에 있어 검사 밖이었습니다 → 화면 문구 사전 전체를 검사 대상에 넣었습니다. 이제 빠지는 것은 **로직과 CSS·HTML뿐**입니다 | **UI strings quote numbers too** — “δ = 7.26 + Σ(increments)” and “±0.2 ppm” live in `i18n.js`, outside the digest. The whole UI dictionary is now covered; **only logic, CSS and HTML** remain outside |
| 65 | **저장 실패를 조용히 삼켰다.** `save()`가 예외를 그냥 버려서, `localStorage`가 막힌 환경(사파리 프라이빗 모드, 용량 초과)에서도 불러오기가 “불러왔습니다”라고만 답했습니다 → 성공 여부를 돌려주고, 학습 현황과 불러오기 결과에 **“창을 닫으면 사라집니다”** 를 함께 표시합니다 | **A silent save failure.** `save()` swallowed the exception, so with `localStorage` blocked (Safari private mode, quota exceeded) an import still reported plain success. It returns a status now, and both the Progress panel and the import result say **the record will be lost when the tab closes** |

여기에 더해, 리뷰에서 고친 항목이 나중에 되돌아가지 않도록 **잔존 검사기**를 만들었습니다. 49~65번의
수정이 코드에 그대로 있는지(프로토타입 조회가 `hasOwnProperty`인지, 클램프가 살아 있는지, 세트를 문항에서
가져오는지, `min-width`가 풀려 있는지 …)를 **28건**으로 확인합니다.

A **regression guard** was added so that the fixes cannot quietly disappear: **28 assertions** check that
items 49–65 are still in the code — that lookups go through `hasOwnProperty`, that the clamps survive,
that the set still comes from the question, that the `min-width` is still released, and so on.

검사 · What was run:

- **SHA-256 자체 검증 521건** — 고전 벡터(빈 문자열, `abc`, 448비트 벡터, `a`×10⁶), 패딩 분기를 전부
  밟는 0–200바이트 길이 전수, 512/1024/65536 경계, 한글·그리스 문자·이모지(서로게이트 쌍), 무작위
  300건. 전부 node `crypto`와 일치했습니다. *All 521 agree with node's `crypto`.*
- **브라우저 ↔ node 교차 확인** — 같은 payload에서 같은 해시(`e93d4748…`)가 나오고, 문항 한 글자를
  바꾸자 즉시 불일치로 바뀌었습니다. *Same digest in both engines; changing one character in one
  question flips it to a mismatch.*
- **적대적 입력 14종** — 잘못된 JSON, 다른 앱의 파일, 미래 버전, 모르는 문항 번호, `__proto__`,
  `constructor`, `toString`, 배열 항목, `NaN`, `1e308`, HTML 삽입 시도 등. 저장소 오염 0건,
  화면 삽입 0건. *No storage corruption, no injected markup.*
- **제한 환경** — `file://`, `localStorage` 차단, `execCommand` 없음, `Blob` 없음. 무결성 확인은
  `file://`에서도 정상 계산되고(`crypto.subtle`을 쓰지 않는 이유), 저장 버튼은 사라지며, 복사는
  안내 문구로 바뀝니다. 콘솔 오류 0건. *Everything degrades to a message or a hidden button, no errors.*
- **i18n 키 전부 국문·영문 쌍 완비**, `app.js`가 참조하는 키가 모두 사전에 존재.
  *Every UI key has both languages, and every key `app.js` references exists.*

### 7차 · Pass 7 — 부록 C와 2차원 지도 · Appendix C and the 2D maps

**7차 검토 — 부록 C와 2차원 지도.** 새로 그린 지도와 새 문항 세트를 같은 방식으로 공격했습니다.

**Seventh pass — Appendix C and the 2D maps.** The new maps and the new question set were attacked the
same way.

| # | 문제 | Issue |
|---|------|-------|
| 66 | **2차원 지도의 좌표를 눈으로 찍으면 1차원 값과 어긋난다.** 지도 세 장과 문항 두 개가 같은 화합물(에틸 벤조에이트)을 쓰는데, 어느 하나만 고쳐도 조용히 갈라집니다 → `tools/twod.js`를 새로 만들어 **모든 교차 봉우리의 F2·F1이 그 지도의 1차원 투영에 실제로 있는 값인지**, 축 범위가 전부를 담는지, 동핵/이핵 축 구성이 실험 종류와 맞는지, 그리고 8단원의 1차원 그림과 δ가 같은지를 검사합니다(5장 209건) | **Eyeballed 2D coordinates drift from the 1D values.** Three maps and two questions use the same compound (ethyl benzoate), and editing any one of them would split them silently. The new `tools/twod.js` checks that **every cross peak's F2 and F1 exist in that map's own 1D projections**, that the axis window contains everything, that the homonuclear/heteronuclear setup matches the experiment, and that the shifts agree with the 1D figure in Lesson 8 — 209 checks over 5 maps |
| 67 | **동핵 지도의 대칭을 손으로 적으면 깨진다.** COSY는 (a, b)가 있으면 (b, a)도 있어야 하는데, 데이터에 한쪽만 적으면 실제 지도와 다른 그림이 됩니다 → 렌더러가 동핵 실험에서 **대칭 봉우리를 자동으로 그립니다**. 데이터에는 한 번만 적고, 대칭성은 코드가 보장합니다 | **Hand-listing the symmetry of a homonuclear map breaks it.** A COSY with (a, b) must have (b, a); listing one side only would draw something no spectrometer produces. The renderer now **mirrors cross peaks automatically** for homonuclear experiments: the data states each once and the code guarantees the symmetry |
| 68 | **투영 라벨이 겹쳤다.** <sup>13</sup>C 축의 128–133에 네 신호가 몰리면 라벨이 서로 위를 덮었습니다 → 위쪽은 한 줄씩 올리고, 왼쪽은 **가는 연결선을 그어 비켜 놓도록** 고쳤습니다 | **Projection labels collided** where four <sup>13</sup>C signals crowd into 128–133. Top labels now step up a row and left labels step aside with a thin leader line |
| 69 | **F1 축 이름이 그림 밖으로 잘렸다.** 왼쪽 여백 안쪽에 오른쪽 정렬로 놓아 viewBox를 벗어났습니다 → 왼쪽 위 모서리에 왼쪽 정렬로 옮겼습니다 | **The F1 axis title was clipped**, right-aligned inside the left margin and running off the viewBox; it now sits left-aligned in the top-left corner |
| 70 | **좁은 화면에서 부록 C가 문서를 가로로 밀어냈다(320 px).** 원인은 지도가 아니라 <strong>“COSY·TOCSY·HSQC·HMBC·NOESY의”처럼 끊어지지 않는 긴 나열</strong>이었습니다 → 시각 검사기가 잡아냈고, 본문 상자에 `overflow-wrap`을 주어 긴 나열이 줄바꿈되게 했습니다 | **At 320 px Appendix C pushed the document sideways.** The cause was not a map but an <strong>unbreakable run like “COSY·TOCSY·HSQC·HMBC·NOESY의”</strong>; the visual detector caught it, and the text boxes now wrap such runs with `overflow-wrap` |
| 71 | **I10의 오답 선택지를 분자식으로 소거할 수 있으면 문항이 죽는다** → 네 보기를 모두 C<sub>9</sub>H<sub>10</sub>O<sub>2</sub> 이성질체(에틸 벤조에이트·메틸 페닐아세테이트·벤질 아세테이트·페닐 프로파노에이트)로 맞추고, <strong>방향족 양성자–카보닐 상관의 결합 수</strong>만으로 갈리도록 설계했습니다 | **A distractor eliminable by molecular formula would kill I10**, so all four options are C<sub>9</sub>H<sub>10</sub>O<sub>2</sub> isomers — ethyl benzoate, methyl phenylacetate, benzyl acetate, phenyl propanoate — and the discrimination rests only on <strong>how many bonds separate the aromatic protons from the carbonyl</strong> |
| 72 | **I4의 오답이 “그럴듯하게 틀린” 것이어야 한다** → “자연존재비가 낮아서 <sup>13</sup>C 적분을 못 쓴다”를 넣었습니다. 존재비는 <strong>모든 탄소에 똑같이</strong> 적용되어 상대 적분을 왜곡하지 않으므로 감도 문제일 뿐이며, 해설에서 그 점을 짚습니다 | **I4's distractors must be wrong for a reason worth learning**, so one reads “the low natural abundance is why <sup>13</sup>C integrals fail”. Abundance applies <strong>equally to every carbon</strong> and costs only sensitivity, and the explanation says so |

### 8차 · Pass 8 — 마지막 공격 · the last attack

**8차 검토 — 마무리 전 마지막 공격.** 새 자료를 다시 읽고, 이 프로젝트가 반복해서 만들어 온
결함 유형을 겨냥한 검사기를 새로 만들었습니다.

**Eighth pass — the last attack before wrapping up.** The new material was re-read, and a checker was
built for the defect this project keeps producing.

| # | 문제 | Issue |
|---|------|-------|
| 73 | **C.1이 “사차 탄소와 카보닐은 짝지음을 만들지 않는다”고 단정.** 바로 세 절 뒤의 C.4가 그 <sup>2</sup>J·<sup>3</sup>J를 쓰는 실험(HMBC)을 설명하므로 자기모순입니다 → “직접 붙은 양성자가 없어 <strong>1차원만으로</strong> 이을 수 없다”로 고치고, 먼 거리 짝지음은 존재하며 그것을 쓰는 것이 HMBC임을 덧붙였습니다 | **C.1 asserted that quaternary carbons and carbonyls “make no coupling”**, three sections before C.4 explains the experiment that uses exactly their <sup>2</sup>J and <sup>3</sup>J. Restated as “no directly attached proton, so they cannot be connected <strong>from 1D alone</strong>”, with a note that long-range coupling does exist and HMBC is what exploits it |
| 74 | **<sup>1</sup>J<sub>CH</sub>를 “≈ 145 Hz” 하나로 단정.** sp<sup>3</sup>는 125–145, 방향족은 160, 알카인은 250 Hz까지 갑니다 → 범위를 밝히고, 실험이 중간값 하나에 맞춰 걸리므로 크게 벗어난 자리는 봉우리가 약해진다는 점을 추가 | **<sup>1</sup>J<sub>CH</sub> was given as a single “≈ 145 Hz”**, though it runs 125–145 on sp<sup>3</sup>, near 160 on aromatic carbon and up to 250 on an alkyne. The range is now stated, along with why sites far from the tuned value give weaker peaks |
| 75 | **벤질 아세테이트의 결합 수를 잘못 셌다.** 방향족 H에서 카보닐까지 H→C(ortho)→C(ipso)→CH<sub>2</sub>→O→C=O로 <strong>다섯 결합</strong>인데 메틸 페닐아세테이트와 묶어 “네 결합”이라 적었습니다 → 네 이성질체의 결합 수를 각각 세어 적었습니다(3 / 4 / 4 / 5) | **The bond count for benzyl acetate was wrong**: from the aromatic proton to the carbonyl is H→C(ortho)→C(ipso)→CH<sub>2</sub>→O→C=O, <strong>five bonds</strong>, but it had been lumped with methyl phenylacetate as “four”. Each isomer is now counted separately: 3 / 4 / 4 / 5 |
| 76 | **I10이 “HMBC가 결정한다”고만 말했다.** 실제로는 지문의 1차원 값(δ 4.37의 <em>사중선</em>)이 이미 한쪽을 가리킵니다 → 1차원이 좁히고 HMBC가 <strong>연결로 확정</strong>한다고 정확히 쓰고, 네 이성질체의 1차원 값을 함께 실었습니다 | **I10 claimed the HMBC decides it**, when the 1D datum in the stem — a <em>quartet</em> at δ 4.37 — already points one way. The explanation now says the 1D narrows it and the HMBC <strong>confirms it by connectivity</strong>, listing the 1D values of all four isomers |
| 77 | **NOE 영교차를 “500 MHz에서 분자량 1,000 부근”으로 단정하고, 주석 제목은 “<em>작은</em> 분자에서는 ROESY”라고 적어 서로 어긋났다.** 작은 분자는 NOE가 양수라 NOESY로 충분합니다 → 구간을 1,000–2,000으로 넓히고 조건(자기장·온도·점도)을 밝히고, 제목을 “중간 크기 분자”로 고쳤습니다 | **The NOE zero crossing was pinned at “about 1,000 at 500 MHz” while the note was titled “for <em>small</em> molecules, reach for ROESY”** — but small molecules have a positive NOE and NOESY serves them fine. The range is now 1,000–2,000 with its conditions, and the title says mid-sized |
| 78 | **숫자 입력 안내가 “(ppm 단위)”로 고정**되어 있어, 답이 Hz인 A3에서 틀린 안내가 됐습니다 → 단위는 입력란 옆에 표시되므로 안내문을 단위 중립으로 | **The numeric-entry hint was fixed to “in ppm”**, which is wrong for A3, whose answer is in Hz. The unit is shown beside the box, so the hint no longer names one |
| 79 | **I1이 A3와 같은 계산의 반복이었다**(둘 다 Δν = Δδ × MHz) → 표 A-1을 쓰는 문항으로 바꿨습니다. “<sup>1</sup>H가 400 MHz인 자석에서 <sup>13</sup>C는?” — 같은 기기가 핵마다 다른 주파수를 쓴다는 점을 묻습니다 | **I1 repeated A3's calculation** (both Δν = Δδ × MHz). It now uses Table A-1 instead: “in a magnet where <sup>1</sup>H is at 400 MHz, where is <sup>13</sup>C?” — one instrument, a different frequency per nucleus |
| 80 | **그림이 화면 낭독기에 아무것도 남기지 않았다.** `aria-label`은 “COSY 상관 지도” 정도만 전하고 봉우리 목록은 사라집니다 → 1차원과 2차원 렌더러 모두 `<desc>`에 봉우리 목록(δ, 적분, 다중도 / F2·F1 좌표)을 넣었습니다 | **The figures left nothing for a screen reader**: the `aria-label` said little more than “COSY correlation map”. Both renderers now emit a `<desc>` listing the peaks — δ, integral and multiplicity for 1D, the F2/F1 coordinates for 2D |
| 81 | **아세토페논의 ortho 양성자가 C12에서는 7.96, H6에서는 7.95.** 톨루엔 2.32/2.36과 같은 종류의 결함이며, 새 검사기가 잡았습니다 → 7.96으로 통일 | **Acetophenone's ortho proton was 7.96 in C12 and 7.95 in H6** — the same defect as the toluene 2.32/2.36, and the new checker caught it. Unified at 7.96 |
| 82 | **부록 C가 1-클로로프로페인의 α를 3.53으로 인용.** 3단원의 표와 그림은 3.47입니다 → 3.47로 통일 | **Appendix C quoted 1-chloropropane's α proton as 3.53**, where Lesson 3's table and figure say 3.47. Unified at 3.47 |

81·82번을 잡은 `tools/landmark.js`는 이 프로젝트가 <strong>세 번</strong> 만들어 낸 결함
유형(톨루엔 2.32/2.36, 아세토페논 7.95/7.96, 1-클로로프로페인 3.47/3.53)을 겨냥합니다. 같은
화합물의 그림 둘이 값 하나를 공유하면서 다른 값이 0.005–0.25 ppm 어긋나는 경우와, 본문에서 화합물
이름 <strong>바로 뒤</strong>(30자 이내, 사이에 다른 화합물 이름이 없을 때)에 정본과 어긋난 δ가
나오는 경우만 잡습니다. <strong>초안은 126건 중 125건이 오탐이었습니다</strong> — 한 문장에 여러
화합물이 나오고, 긴 이름 안에 짧은 이름이 들어 있기(“4-메틸아니솔” 안의 “아니솔”) 때문입니다.
인접 규칙과 이름 경계 규칙을 넣어 <strong>109건 검사에 오탐 0</strong>으로 만든 뒤에야 검사기로
쓸 수 있었습니다. 오탐이 많은 검사기는 아무도 돌리지 않으므로 없느니만 못합니다.

`tools/landmark.js`, which caught items 81 and 82, targets the defect this project has now produced
<strong>three times</strong> (toluene 2.32/2.36, acetophenone 7.95/7.96, 1-chloropropane 3.47/3.53). It
flags only two things: two figures of the same compound that share one value while another differs by
0.005–0.25 ppm, and a δ in the text that sits <strong>immediately after</strong> a compound name (within
30 characters, with no other compound named in between) yet disagrees with the canonical value. <strong>The
first draft was 125 false positives out of 126</strong> — sentences name several compounds, and short
names hide inside long ones (“anisole” within “4-nitroanisole”). Only after an adjacency rule and a
name-boundary rule brought it to <strong>109 checks with zero false positives</strong> was it worth
keeping: a checker that cries wolf is worse than none.

---

## 시각 검사가 찾아낸 것 · What the layout detector found

탐지기가 어떻게 동작하는지는 README의 **시각 검사** 절에 있습니다. 아래는 그 탐지기가 실제로
찾아내 고치게 만든 것들입니다.

How the detector works is described under **Visual checks** in the README. What follows is what it
actually found.


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

