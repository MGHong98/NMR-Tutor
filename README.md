# NMR 분석 학습 · NMR Analysis Tutor

학부 수준 유기화학의 <sup>1</sup>H / <sup>13</sup>C NMR 해석을 위한 웹 기반 학습 프로그램입니다.
개념 설명을 읽고 곧바로 연습문제로 확인하는 구성이며, **EWG/EDG에 의한 업필드·다운필드 효과**를
집중적으로 다룹니다. 의존성이 없고 `index.html` 하나로 동작합니다.

A browser-based tutor for undergraduate <sup>1</sup>H / <sup>13</sup>C NMR interpretation. Each lesson is
followed by practice problems, with heavy emphasis on **upfield/downfield effects of EWG and EDG
substituents**. No dependencies; it runs from `index.html` alone.

> **읽을 언어를 고르십시오 · Pick a language**
> 아래 제목을 누르면 그 언어의 문서 전체가 펼쳐지고, 다시 누르면 접힙니다. 한국어가 기본으로 열려
> 있습니다. *Click a heading below to unfold the whole document in that language, click again to fold
> it. Korean is open by default.*
> 두 언어의 내용은 같습니다. `<details>`를 지원하지 않는 뷰어에서는 접힘 없이 둘 다 보입니다.
> *The two languages carry the same content; in a viewer without `<details>` support both simply show.*

무엇이 틀렸고 무엇을 고쳤는지의 기록은 [`REVIEW-LOG.md`](REVIEW-LOG.md)에 따로 있습니다.
*The record of what was wrong and what changed is kept separately in [`REVIEW-LOG.md`](REVIEW-LOG.md).*

---

<details open>
<summary><b>&nbsp;🇰🇷&nbsp; 한국어 — 전체 문서 펼치기 / 접기</b></summary>

<br>

국문에서는 전문 용어에 영문을 병기하며, 프로그램 안에서는 상단 토글로 언어를 바꿉니다.

## 실행 방법

빌드 과정이 없습니다. 순수 HTML/CSS/바닐라 자바스크립트이며 정적 파일로 바로 열립니다.

```bash
# 로컬 서버 (권장)
npx http-server -p 8080 .
# 또는
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080` 을 엽니다. `index.html`을 파일로 직접 열어도(`file://`) 모든
기능이 동작하지만, 로컬 서버 사용을 권장합니다.

**GitHub Pages로 배포하기**

저장소 `Settings → Pages → Source: Deploy from a branch`에서 브랜치와 `/ (root)`를 지정하면
`https://<사용자>.github.io/<저장소>/` 로 바로 접속됩니다. 진입점 파일 이름이 `index.html`이므로
빌드 설정은 필요 없습니다. 설치 과정이 없고 진도는 브라우저 `localStorage`에만 저장되므로,
실습실 공용 PC나 네트워크가 막힌 환경에서도 그대로 쓸 수 있습니다.

## 구성

### 개념 학습 (8단원 + 부록 3편)

| # | 단원 |
|---|------|
| 1 | NMR의 원리와 화학적 이동 |
| 2 | 화학적 이동 영역 지도 |
| 3 | 유도 효과 — 결합을 타고 오는 당김 |
| 4 | **EWG와 EDG — 방향족 고리의 업필드·다운필드** |
| 5 | 이방성 효과와 교환성 양성자 |
| 6 | 적분과 스핀-스핀 짝지음 |
| 7 | <sup>13</sup>C NMR과 치환기 효과 |
| 8 | 구조 결정 전략 |
| 부록 A | 분광기가 실제로 재는 것 |
| 부록 B | 실험대에서 — 시료부터 스펙트럼까지 |
| 부록 C | 2차원 NMR — 조각을 잇는 지도 |

**부록 세 편은 이론적 배경과 측정 실무**를 다룹니다. 본문 8단원이 “스펙트럼을 읽는 법”이라면,
부록 A는 그 스펙트럼이 **어떻게 만들어지는가**(제만 갈라짐, 볼츠만 인구 차, 펄스와 FID,
T<sub>1</sub>·T<sub>2</sub> 이완, 자석·락·심, 자기장을 올리면 무엇이 달라지는가)이고, 부록 B는
그 앞 단계인 **시료 준비와 측정 조건**(용매와 잔류 신호, 농도, 기준, 적분이 성립하는
조건, 이상 신호의 원인)이며, **부록 C**는 1차원으로 답이 나오지 않을 때 쓰는 **2차원 실험**
(COSY·TOCSY·HSQC·HMBC·NOESY)을 지도 세 장과 함께 다룹니다. 본문에서 결론만 적고 넘어간 서술 —
“<sup>13</sup>C는 오래 걸린다”, “<sup>13</sup>C 적분은 쓰지 않는다”, “600 MHz에서는 다중선이 풀린다” —
의 근거가 모두 여기에 있습니다.

각 단원에는 개념 설명, 데이터 표, 모식 스펙트럼(SVG), 그리고 **함정(pitfall) 콜아웃**이 들어 있습니다.
함정 콜아웃은 학생들이 실제로 자주 틀리는 지점만 골라 정리한 것입니다. 예를 들어,

- EDG인 –OCH<sub>3</sub>가 고리 양성자는 업필드로 보내면서 자기 자신의 메틸 양성자는 δ 3.80까지
  다운필드로 보내는 이유
- sp 탄소가 더 전기음성인데도 알카인 양성자가 알켄보다 업필드인 이유
- <sup>13</sup>C에서 아니솔의 *ipso* 탄소가 나이트로벤젠보다 더 다운필드인 이유
- 친전자성 방향족 치환의 배향성(o/p-director ↔ meta-director)과 화학적 이동 방향의 연결

### 연습문제 (9세트 · 119문항)

| 세트 | 문항 |
|------|------|
| A. 기초와 용어 | 10 |
| B. 유도 효과 | 11 |
| **C. EWG / EDG 방향족** ★ | 24 |
| **D. 헷갈리기 쉬운 개념** ★ | 15 |
| E. 이방성과 교환성 양성자 | 10 |
| F. 적분과 짝지음 | 12 |
| G. <sup>13</sup>C NMR | 10 |
| H. 종합 구조 결정 | 14 |
| I. 기기·측정·2차원 | 13 |

★ 표시는 EWG/EDG 효과를 집중적으로 다루는 핵심 세트로, 전체 119문항 중 39문항(33%)을 차지합니다.
마지막 **I 세트는 부록 A·B·C**를 근거로 하며, COSY·HSQC·HMBC 지도를 직접 읽는 문항이 들어 있습니다.

문제 유형은 네 가지입니다.

- `single` — 사지선다
- `multi` — 복수 정답
- `ordering` — 화학적 이동 순서 배열
- `numeric` — 증분표로 δ 계산 (허용 오차 포함)

모든 문항에 정답 여부와 무관하게 **정량적인 해설과 출처**가 붙습니다. 오답 선택지 역시 실제로 흔한
오해를 골라 배치했고, 해설에서 왜 틀렸는지를 함께 설명합니다. 119문항 중 **52문항의 해설에는 분자
구조식**이 함께 나와, δ 값이 구조의 어느 자리에 해당하는지를 눈으로 확인할 수 있습니다. I 세트의
두 문항은 **2차원 지도를 지문에 싣고** 그것을 읽어 구조를 정하게 합니다.

### 분자 구조식

구조식은 외부 라이브러리 없이 **직접 SVG로 그립니다**(`assets/js/structure.js`). 작도는 **ACS Style
Guide의 구조 작도 규약**을 비율로 옮겼습니다.

| 항목 | 적용 |
|---|---|
| 결합 길이 | 고리와 사슬에서 **동일**(L = 32 px) |
| 결합 사이 각도 | 언제나 **120°** (sp 탄소는 180°) |
| 고리에서 나가는 첫 결합 | **반지름 방향으로 곧게** |
| 이중결합 간격 | 결합 길이의 **18%**, 안쪽 선은 양끝을 13% 줄임 |
| 결합선 굵기 | 결합 길이의 약 1/23 (1.4 px) |
| 원자 라벨 | Helvetica / Arial 계열, 결합 끝과 글자 사이 여백 7 px |

**고리에 붙는 치환기는 반지름 방향으로 곧게 뻗습니다.** 육각형 꼭짓점의 외각 이등분선이 곧 반지름
방향이므로, 이렇게 그려야 치환기 결합이 두 고리 결합과 각각 120°를 이루는 표준 배치가 됩니다. 이후
결합은 그 방향에서 60°씩 번갈아 꺾이고, sp 탄소(알카인, 나이트릴)에서는 꺾지 않고 직선으로 잇습니다.

**골격선식 관행을 따릅니다.**

- **탄소 골격은 그립니다** — 알킬 사슬, 에스터, 케톤, 알데하이드, 카복실산. 메틸 가지는 글자가 아니라
  **결합선 하나**로 그립니다.
- **헤테로원자로 시작하는 관용 약어는 글자로 둡니다** — NO₂, NH₂, OH, OCH₃, Cl, Br, CN.

현재 41개의 치환기가 골격으로, 35개가 글자로 그려집니다. 이전 판은 `COOCH2CH3`, `CH2COOCH3` 같은
축약 라벨을 고리에 붙였는데, 읽기 어렵고 ACS 관행에도 맞지 않아 전부 실제 골격으로 바꿨습니다.

**고리에 붙는 사슬은 언제나 고리에서 바깥으로 뻗어 나갑니다.** 사슬 중간에 고리가 가지처럼 매달리는
형태는 쓰지 않습니다. 예를 들어 큐멘은 프로페인 사슬 가운데에 페닐을 붙이는 대신, 벤젠 고리에서
아이소프로필기가 뻗어 나가는 형태로 그립니다.

고리 번호는 **위치 1이 위쪽, 시계 방향으로 2~6**입니다. 따라서 1의 para는 4, meta는 3·5, ortho는
2·6이 되어 **증분표의 번호와 그대로 대응**합니다.

δ 주석은 세 가지 자리에 붙을 수 있고 서로 구별됩니다.

- **치환되지 않은 고리 자리** — 그 자리 양성자의 δ, 고리 바깥쪽으로
- **치환된 고리 자리** — 그 고리 탄소의 δ(<sup>13</sup>C의 ipso 값), 결합을 피해 옆으로
- **치환기 자신** — 그려진 사슬이면 해당 원자 옆, 글자 약어이면 글자 바깥쪽

그림 크기는 **그려진 내용의 경계 상자에서 계산**합니다. 고정 크기를 쓰지 않으므로 긴 치환기나 긴
이름이 그림 밖으로 잘리는 일이 구조적으로 없습니다.

화학식 문자열은 자동으로 조판됩니다. `NO2` → NO₂, `N(CH3)2` → N(CH₃)₂, `N^+` → N⁺. 아래첨자는
**바로 앞이 원소 기호나 닫는 괄호일 때만** 적용되므로 `8.22`나 `4-nitroanisole` 같은 값과 이름은
그대로 유지됩니다.

단원 본문에도 10개의 구조 그림이 들어가, 나이트로벤젠·아니솔·4-나이트로아니솔의 δ가 고리의 어느
자리에 붙는지, 에스터에서 산소 쪽과 카보닐 쪽이 어떻게 다른지를 구조 위에서 바로 확인할 수 있습니다.

### 2차원 상관 지도

부록 C의 COSY·HSQC·HMBC 지도도 **외부 라이브러리 없이 직접 SVG로 그립니다**
(`assets/js/spectrum2d.js`). 관례를 그대로 따라, F2(가로)와 F1(세로) 모두 왼쪽·위쪽이 다운필드이고
동핵 실험의 대각선은 왼쪽 위에서 오른쪽 아래로 내려갑니다.

| 요소 | 규칙 |
|---|---|
| 1차원 투영 | 위쪽에 F2, 왼쪽에 F1. 라벨이 겹치면 위쪽은 한 줄 올리고, 왼쪽은 가는 연결선을 그어 비켜 놓습니다 |
| 대각선 | 동핵 실험(COSY·NOESY·TOCSY)에만 그리고, 대각선 봉우리를 함께 찍습니다 |
| 대칭 | 동핵 지도는 (a, b)를 주면 (b, a)를 **자동으로** 그립니다 — 실제 지도가 대각선 대칭이기 때문입니다 |
| 교차 봉우리 | 등고선처럼 세 겹의 타원. 약한 상관(<sup>4</sup>J 등)은 점선으로 구분 |
| 안내선 | 강조할 봉우리에서 두 축으로 점선을 내려 1차원 위치를 읽게 합니다 |

좌표는 눈으로 찍은 것이 아니라 **1차원 값에서 그대로 가져옵니다**. `tools/twod.js`가 모든 교차
봉우리의 F2·F1이 그 지도의 1차원 투영 목록에 실제로 있는 값인지, 축 범위가 모든 봉우리를 담는지,
동핵/이핵 축 구성이 실험 종류와 맞는지, 그리고 에틸 벤조에이트의 δ가 8단원의 1차원 그림과
일치하는지를 검사합니다.

### 기록 내보내기·불러오기

학습 기록은 브라우저 `localStorage`에만 남습니다. **학습 현황** 탭의 `내보내기`는 기록을 JSON으로
꺼내 복사하거나 파일(`nmr-tutor-progress.json`)로 저장하게 하고, `불러오기`는 그 JSON을 다시 넣습니다.
실습실 공용 PC에서 풀고 개인 노트북으로 옮기는 용도입니다.

- **합치기(merge)** — 문항별로 **시도 횟수는 큰 쪽**, 정답은 **한 번이라도 맞혔으면 정답**. 같은 파일을
  여러 번 불러와도 결과가 변하지 않습니다(멱등).
- **덮어쓰기(replace)** — 현재 기록을 버리고 파일 내용만 남깁니다.
- 모르는 문항 번호, 형식이 어긋난 항목, 시도도 정답도 없는 항목은 **버리고 그 개수를 알려 줍니다**.
  세트 이름은 파일이 아니라 **문항 자신에게서** 가져오므로, 파일을 고쳐도 세트별 통계가 망가지지
  않습니다.

### 제작 정보와 무결성 확인

**출처** 탭 맨 아래에서, 이 사본의 콘텐츠 전체를 **SHA-256**으로 요약해 파일에 기록된 값과 대조할 수
있습니다. 변조를 *막는* 장치가 아니라 *드러내는* 장치입니다.

- **검사 범위** — 단원 본문, 문항과 해설, 세트 목록, 출처·소급 대장·주의사항, **화면에 나오는 모든 UI
  문구**, 그리고 데이터 파일 밖에 있는 화학 수치까지 — **치환기 증분표 16종, 기준값 δ 7.26,
  다중선 세기표, 작용기 정의** — 와 제작 정보. 빠지는 것은 **계산·렌더링 로직과 CSS·HTML**뿐입니다.
- **SHA-256을 직접 구현한 이유** — `crypto.subtle`은 보안 컨텍스트(https/localhost)에서만 동작하고
  `Promise`를 돌려줍니다. `file://`로 열어도 전부 동작한다는 이 프로그램의 조건과 맞지 않아, ES5 문법의
  동기 함수로 구현했습니다(`assets/js/integrity.js`).
- **제작 정보의 개수도 함께 검산합니다** — 해시와 무관하게, `BUILD`에 적힌 단원·부록·문항·출처 수가
  실제로 실린 것과 같은지 확인합니다.
- 콘텐츠를 고치면 해시가 달라집니다. 화면에 표시된 **현재 해시**를 `integrity.js`의 `BUILD_DIGEST`에
  옮겨 적으면 다시 `일치`가 됩니다.

## 검증

아래에 적은 검사는 **직접 다시 돌려 볼 수 있습니다**. `tools/`에 들어 있고 의존성이 없습니다.

```bash
node tools/check.js      # 열 가지 검사를 한 번에
node tools/digest.js     # 콘텐츠를 고친 뒤 무결성 해시 재계산
```

| 검사기 | 하는 일 |
|---|---|
| `audit.js` | 본문·해설에 적힌 사칙연산을 전부 다시 계산하고, 인용된 증분값을 정본 표와 대조 |
| `formula.js` | 구조식이 실제로 그리는 분자식을 **원자가로 역산**해 의도한 화합물과 대조 |
| `pattern.js` | 치환 위치(o/m/p)가 이름과 맞는지, 고리 자리 δ 주석이 증분 예측과 맞는지 |
| `qformula.js` | 문항이 밝힌 분자식 ↔ 해설 구조식 ↔ 지문의 적분 합계 |
| `physics.js` | 부록의 물리 수치를 CODATA 값에서 재계산, 모든 `refs`·`src`가 실재하는 출처를 가리키는지 |
| `twod.js` | 2차원 지도의 교차 봉우리 좌표·축 범위·축 구성, 1차원 값과의 일치 |
| `landmark.js` | 같은 화합물의 같은 자리가 두 곳에서 다른 δ로 적히지 않았는가 |
| `sha_test.js` | 직접 구현한 SHA-256을 node `crypto`와 521건 대조 |
| `i18n_check.js` | 모든 UI 문자열의 국문·영문 쌍, `app.js`가 참조하는 키의 존재 |
| `review_guard.js` | 적대적 검토에서 고친 항목이 코드에 그대로 남아 있는지 |

브라우저가 필요한 검사도 `tools/browser/`에 함께 두었습니다. Playwright가 있어야 동작하며,
없으면 그 사실을 알리고 종료할 뿐 앱과 `tools/check.js`에는 아무 영향이 없습니다.

```bash
npm i -D playwright && npx playwright install chromium
python3 -m http.server 8099          # 저장소 루트에서
node tools/browser/run.mjs           # 아홉 가지 브라우저 검사
```

| 검사기 | 하는 일 |
|---|---|
| `t4.mjs` | 모든 단원과 119문항을 국문·영문으로 전수 순회, 콘솔 오류 0건 확인 |
| `visual.mjs` | 5개 뷰포트 × 2개 언어의 레이아웃 탐지 — 겹침·잘림·가로 오버플로·판독 불가 |
| `t5.mjs` | `closest` 삭제, 옵션 객체 스크롤 예외, `toggle` 두 번째 인자 무시, `localStorage` 차단 |
| `t7.mjs` | `file://`로 열었을 때의 전체 동작과 외부 요청 0건 |
| `t8.mjs` | 저장·복사가 막힌 환경에서의 축약 경로 |
| `io_test.mjs` · `io_test2.mjs` | 기록 내보내기·불러오기, 적대적 입력 14종 |
| `integ_test.mjs` | 무결성 해시 일치와, 콘텐츠를 한 글자 바꿨을 때의 불일치 |
| `perf.mjs` | 렌더 성능과 전송 크기 |

여덟 번의 적대적 검토에서 찾아 고친 **82건**은 무엇이 틀렸고 무엇을 바꿨는지까지
[`REVIEW-LOG.md`](REVIEW-LOG.md)에 따로 적어 두었습니다. 증분표 전체를 Pretsch 외(2009)와 대조하고,
본문과 해설의 계산을 전부 재계산하는 데서 시작해, 문항 설계·구조식·부록의 물리 수치·2차원 지도의
좌표·기록 내보내기의 입력 처리까지 회차마다 다른 각도로 공격했습니다. 회차마다 새로 만든 검사기는
그대로 남아 위 목록에 들어 있으므로, 같은 종류의 결함은 다시 들어오면 검사에서 걸립니다.

### 검사 현황

`node tools/check.js` 한 번으로 나오는 현재 수치입니다. 하나라도 어긋나면 0이 아닌 값이 찍힙니다.

| 검사 | 건수 | 결과 |
|---|---|---|
| 본문·해설의 산술 재계산 | 90 | 불일치 0 |
| 인용된 증분 3연값 ↔ 정본 표 | 24 | 불일치 0 |
| 구조식의 분자식 원자가 역산 | 66 | 불일치 0 |
| 치환 위치 ↔ 이름 | 17 | 불일치 0 |
| 고리 δ 주석 ↔ 증분 예측 | 138 | 편차 0.35 ppm 초과 0 |
| 분자식 ↔ 구조식·적분 | 33 | 불일치 0 |
| 부록의 물리 수치와 출처 참조 | 142 | 불일치 0 |
| 2차원 지도의 좌표·축 | 209 | 불일치 0 |
| 같은 화합물의 δ 일관성 | 109 | 불일치 0 |
| SHA-256 ↔ node `crypto` | 521 | 불일치 0 |
| UI 문자열의 국문·영문 쌍 | 114 | 빠짐 0 |
| 리뷰 항목의 잔존 | 42 | 깨짐 0 |
| 레이아웃 탐지(브라우저) | 730 화면 | 문제 0 |

## 시각 검사

레이아웃은 눈으로 훑는 대신 **자동 탐지기**로 확인합니다. 페이지 안에서 실제 렌더된 상자 좌표를 읽어
다음 네 가지를 판정합니다.

1. 스펙트럼 SVG 안의 모든 텍스트 쌍에 대한 겹침(4 px² 초과)
2. 텍스트가 그림 경계 밖으로 잘리는지
3. 컨테이너보다 넓어 잘리는 텍스트, 문서 가로 오버플로, 뷰포트 밖으로 나간 요소
4. 축소로 글자가 7 px 미만이 되어 읽을 수 없는지

**320 / 375 / 768 / 1024 / 1440 px × 국문·영문**으로 모든 단원(부록 3편 포함), 계산기 조합 9종,
나머지 탭을 돌리고, 모든 문항은 **채점된 상태(해설과 구조식이 펼쳐진 화면)까지** 열어 검사합니다.
여기에 **기록 내보내기·불러오기 상자와 무결성 확인 패널**, 그리고 부록 C의 2차원 지도도 함께 엽니다.
한 번에 **730개 화면**을 검사하며, 그 안에서 화면에 실제로 보이는 스펙트럼·구조식·상관 지도
**608회 렌더**를 확인합니다. 무엇을 찾아냈는지는 [`REVIEW-LOG.md`](REVIEW-LOG.md)에 있습니다.

현재 상태: **730개 화면, 608회 렌더 전부에서 겹침 0, 잘림 0, 가로 오버플로 0, 판독 불가 0.**

## 파일 구조

```
index.html                  앱 셸, 뷰 컨테이너
LICENSE                     CC BY-NC 4.0 전문
REVIEW-LOG.md               여덟 번의 검토에서 고친 82건
assets/css/styles.css       라이트·다크 테마, 반응형 레이아웃
assets/js/i18n.js           UI 문자열 사전, 언어 전환
assets/js/spectrum.js       모식 스펙트럼 SVG 생성기
assets/js/spectrum2d.js     2차원 상관 지도 SVG 생성기
assets/js/structure.js      분자 구조식 SVG 생성기
assets/js/data-sources.js   참고문헌과 데이터 소급 대장
assets/js/data-lessons.js   단원 콘텐츠 8단원 + 부록 3편
assets/js/data-questions.js 문제 은행 (119문항)
assets/js/integrity.js      SHA-256, 제작 정보, 무결성 확인
assets/js/app.js            라우팅, 퀴즈 엔진, 계산기, 진도
tools/                      검사기 — node 만 필요
tools/browser/              브라우저 검사기 — Playwright 필요
```

콘텐츠와 로직이 분리되어 있어, 문항을 추가하려면 `data-questions.js`에 항목 하나를 더하면 됩니다.
세트·유형·난이도는 필드로만 지정하고 렌더링과 채점은 엔진이 알아서 합니다.

```js
Q.push({
  id: 'C25', set: 'aromatic', type: 'mc', d: 3,
  q: { ko: '…', en: '…' },
  o: [ { ko: '…', en: '…' }, … ],   // 보기
  a: 0,                             // 정답 인덱스
  e: { ko: '…', en: '…' },          // 해설
  mol: [{ kind: 'benzene', subs: { 1: 'NO2' }, ann: { 2: '8.22' } }],
  ref: 'Pretsch et al., 4th ed., 2009.'
});
```

단원도 같은 방식입니다. `data-lessons.js`에 블록(`p` `h` `ul` `ol` `formula` `note` `table` `spec`
`mol` `compare`)을 나열하면 되고, `badge` 필드를 주면 부록처럼 번호 대신 이름이 목차에 붙습니다.

**모든 텍스트는 `{ ko, en }` 쌍이어야 합니다.** 한쪽만 채우면 언어 전환에서 빈칸이 됩니다. 국문에는
전문 용어의 영문을 병기하고, 수치를 쓸 때는 근거 출처를 `src` 또는 `ref`에 함께 적습니다.

## 데이터에 관하여

인용된 화학적 이동은 교재의 대표값이며 용매·농도·온도에 따라 달라집니다. 치환기 증분은 근사치로,
실측값과 ±0.2 ppm 정도 차이가 날 수 있고 인접 치환기나 강한 EWG/EDG 조합에서는 오차가 더 커집니다.
스펙트럼 그림은 개념 설명을 위한 모식도이며 실측 데이터가 아닙니다. 다중선 간격은 눈에 보이도록
과장되어 있습니다.

### 출처

- Pavia, D. L.; Lampman, G. M.; Kriz, G. S.; Vyvyan, J. R. *Introduction to Spectroscopy*, 5th ed.;
  Cengage: Stamford, 2015. (3–6장, 8장, 부록의 상관표)
- Silverstein, R. M.; Webster, F. X.; Kiemle, D. J.; Bryce, D. L. *Spectrometric Identification of
  Organic Compounds*, 8th ed.; Wiley: Hoboken, 2014. (3–4장, 7장; 짝지음 상수는 부록 F)
- Pretsch, E.; Bühlmann, P.; Badertscher, M. *Structure Determination of Organic Compounds: Tables of
  Spectral Data*, 4th ed.; Springer: Berlin, 2009. (계산기와 4단원에 쓰인 방향족 치환기 증분)
- Clayden, J.; Greeves, N.; Warren, S. *Organic Chemistry*, 2nd ed.; Oxford University Press: Oxford,
  2012. (13, 18, 21, 31장)
- Gottlieb, H. E.; Kotlyar, V.; Nudelman, A. NMR Chemical Shifts of Common Laboratory Solvents as
  Trace Impurities. *J. Org. Chem.* **1997**, *62*, 7512–7515.
- SDBS: Spectral Database for Organic Compounds, National Institute of Advanced Industrial Science and
  Technology (AIST), Japan. (예제에 인용한 <sup>1</sup>H·<sup>13</sup>C 실측값)
- Keeler, J. *Understanding NMR Spectroscopy*, 2nd ed.; Wiley: Chichester, 2010. (부록 A — 제만 갈라짐,
  볼츠만 인구 차, 펄스와 FID, T<sub>1</sub>/T<sub>2</sub>)
- Claridge, T. D. W. *High-Resolution NMR Techniques in Organic Chemistry*, 3rd ed.; Elsevier:
  Amsterdam, 2016. (부록 B — 시료 준비, 측정 조건, 정량 적분, NOE, 2차원 개요)
- Tiesinga, E.; Mohr, P. J.; Newell, D. B.; Taylor, B. N. CODATA Recommended Values of the Fundamental
  Physical Constants: 2018. *Rev. Mod. Phys.* **2021**, *93*, 025010; NIST, *Atomic Weights and
  Isotopic Compositions*. (부록 A의 γ/2π, *h*, *k*, 동위원소 존재비)

프로그램의 `출처` 탭에는 위 아홉 문헌이 **어느 수치의 근거인지**까지 항목별로 적혀 있고, 단원 하단과
표·그림 아래, 문항 해설 끝에도 같은 표기가 붙습니다.

## 한계

교육용 학습 도구입니다. 실제 스펙트럼 해석에는 있지만 여기에는 없는 것들이 있습니다.

- **스펙트럼 그림은 모두 모식도입니다.** 실측 FID에서 그린 것이 아니며 다중선 간격은 과장되어
  있습니다. 실제 스펙트럼의 잡음, 기준선 굽음, 봉우리 겹침, 회전 부대 신호는 나오지 않습니다.
- **증분 모형은 근사입니다.** 가법 증분은 대략 ±0.2 ppm이고, 치환기가 서로 ortho이거나 강한 EWG와
  EDG가 함께 있으면 더 벗어납니다. 2차 스펙트럼, 동적 효과, 부등가 회전 이성질체는 다루지 않습니다.
- **부록은 개론입니다.** 부록 A·B는 왜 그런 수치가 나오는지를 잇기 위한 것이며, 기기 조작 매뉴얼도
  펄스 시퀀스 교재도 아닙니다. 실제 측정은 소속 기관의 절차를 따르십시오.
- **미지 시료 동정에 쓰는 도구가 아닙니다.** 여기의 값은 학습용 대표값이므로, 실제 보고서에 넣을
  숫자는 원 문헌이나 실측 스펙트럼에서 직접 확인해야 합니다.

## 브라우저 지원과 성능

**의존성 0개, 외부 요청 0건.** 빌드 도구, 프레임워크, CDN, 폰트, 트래킹이 전혀 없습니다.
`file://`로 열어도 완전히 동작하므로 네트워크 없이 USB로 배포해도 됩니다.

확인한 내용:

- **자바스크립트는 전부 ES5** — 9개 파일 모두 `acorn`으로 `ecmaVersion: 5` 파싱을 통과합니다.
  화살표 함수, `const`/`let`, 템플릿 리터럴, 전개 구문, `Promise`, `fetch`를 쓰지 않습니다.
  무결성 확인의 SHA-256도 `crypto.subtle`(보안 컨텍스트 전용, Promise 반환)이나 `TextEncoder`를
  쓰지 않고 동기 함수로 직접 구현했습니다.
- **CSS에서 `color-mix()`를 제거**했습니다. 남은 최신 기능은 CSS 커스텀 속성뿐이며(2017년경 이후
  모든 브라우저), 이마저 지원하지 않는 경우를 대비해 본문 배경·글자색에 리터럴 폴백을 두었습니다.
- **최신 전용 API는 전부 폴백 경로가 있습니다** — `Element.closest`/`matches`(속성 기반 조상 탐색으로
  대체), 옵션 객체를 받는 `scrollTo`/`scrollIntoView`, `classList.toggle`의 두 번째 인자,
  그리고 `localStorage` 접근이 예외를 던지는 환경(사파리 프라이빗 모드 등). 새로 추가한 두 기능도
  같은 규칙을 따릅니다. **파일로 저장**은 `Blob`·`URL.createObjectURL`·`<a download>`가 모두 있을 때만
  버튼이 나타나고(구형 Edge/IE는 `msSaveBlob`), **복사**는 `document.execCommand('copy')`가 막혀 있으면
  “직접 선택해 복사하십시오”로 바뀝니다. 어느 쪽이 없어도 JSON 상자 자체는 그대로 쓸 수 있습니다.
- **실제로 그 API들을 제거한 상태에서 전체 동작을 확인**했습니다. Chromium에 `closest` 삭제,
  옵션 객체 스크롤 예외 발생, `toggle` 두 번째 인자 무시, `localStorage` 접근 시 예외를 주입한 뒤
  단원 이동·언어 전환·채점·계산기·출처 탭이 모두 정상 동작했습니다.

전체 문항 회귀 검사: 8개 단원과 부록 3편, 119문항을 **국문·영문 양쪽으로 각각 순회**해 콘솔 오류
0건, 모든 채점·해설·출처 표시가 정상임을 확인했습니다. 레이아웃은 위의 **시각 검사** 절을 보십시오.

성능 (헤드리스 Chromium, 단원 전체를 연속으로 렌더한 기준. 아래 표의 ‘이전·이후’는 8개 단원이던
시점의 최적화 전후 비교입니다):

| | 이전 | 이후 |
|---|---|---|
| 첫 렌더 | 674 ms | **149 ms** |
| 캐시 후 | 579 ms | **83 ms** |
| 단원 전환 1회 | 약 72 ms | **약 10 ms** |
| 이벤트 리스너 | 렌더할 때마다 노드 수만큼 | **document에 고정 4개** |

주요 최적화:

- **SVG마다 심던 `<style>` 블록을 제거**하고 스타일시트의 `.nmr-spec` 규칙으로 옮겼습니다.
  그림 하나를 그릴 때마다 문서 전체의 스타일 재계산이 일어나던 것이 가장 큰 병목이었습니다.
- **이벤트 위임** — 화면을 다시 그릴 때마다 요소마다 리스너를 붙이던 방식을 `document` 한 곳의
  위임 처리로 바꿨습니다. 렌더 비용이 노드 수에 비례하지 않습니다.
- **색인 선계산** — 단원·세트·문항을 시작할 때 한 번만 색인해 두어, 세트별 통계가 매번 전체 문항을
  훑지 않습니다.
- **단원 HTML 캐시**와 **내비게이션 부분 갱신** — 언어를 바꿀 때만 캐시를 버립니다.
- **적분 라벨을 봉우리 라벨에 합치면서** 그림당 텍스트 노드가 줄어, 겹침 수정이 성능 개선으로도
  이어졌습니다(216 ms → 140 ms).

부록 3편을 더한 현재 상태는 **11개 단원 기준 냉시작 약 240 ms, 단원 전환 1회 약 13 ms**로,
단원 수가 늘어난 만큼만 늘고 전환 비용은 그대로입니다. 2차원 지도가 들어간 부록 C는 단원 하나가
21 KB로 가장 크지만, 캐시된 뒤의 전환은 다른 단원과 다르지 않습니다.

전송 크기: 총 557 KB, gzip 적용 시 **170 KB** (문항·단원 텍스트가 대부분).

## 라이선스 · 제작

- **라이선스: CC BY-NC 4.0** — 출처를 밝히면 자유롭게 복제·배포·개작할 수 있으나 상업적 이용은
  제외합니다. 개작한 경우 변경 사실을 표시해야 합니다. 전문은 [`LICENSE`](LICENSE)에 있습니다.
  (GitHub 저장소 페이지에 라이선스 배지는 뜨지 않습니다. GitHub가 인식하는 라이선스 목록에 비영리
  조항이 붙은 CC 라이선스가 없기 때문이며, 라이선스 자체의 효력과는 무관합니다.)
- **인용된 데이터는 이 저작물의 일부가 아닙니다.** 화학적 이동, 짝지음 상수, 치환기 증분, 물리상수는
  위 문헌의 실측·정리값이며 모두 출처를 밝혀 인용했습니다. 이 라이선스가 적용되는 것은 단원 본문,
  문항과 해설, 스펙트럼·구조식 생성기를 비롯한 코드입니다.
- **제작**: 홍민기 (Mingi Hong)
- **문의**: 이 저장소의 [Issues](https://github.com/MGHong98/Chemistry-edu/issues)

</details>

<details>
<summary><b>&nbsp;🇬🇧&nbsp; English — unfold / fold the whole document</b></summary>

<br>

Korean and English switch from the header toggle inside the program; the Korean text carries the
English term alongside each piece of terminology.

## Running it

No build step. Plain HTML, CSS and vanilla JavaScript served as static files.

```bash
# local server (recommended)
npx http-server -p 8080 .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`. Opening `index.html` straight from the filesystem (`file://`) also
works in full, but a local server is recommended.

**Publishing on GitHub Pages**

Under `Settings → Pages → Source: Deploy from a branch`, pick a branch and `/ (root)`; the site is then
served at `https://<user>.github.io/<repo>/`. The entry file is already named `index.html`, so nothing
needs building. There is no install step and progress lives only in the browser's `localStorage`, so it
works on a shared teaching-lab machine or one with no network at all.

## What is inside

### Lessons (8 plus 3 appendices)

| # | Lesson |
|---|--------|
| 1 | How NMR works and what δ means |
| 2 | The chemical-shift map |
| 3 | The inductive effect |
| 4 | **EWG vs EDG on aromatic rings** |
| 5 | Anisotropy and exchangeable protons |
| 6 | Integration and coupling |
| 7 | <sup>13</sup>C NMR and substituent effects |
| 8 | A workflow for structure determination |
| Appendix A | What the spectrometer actually measures |
| Appendix B | At the bench — from sample to spectrum |
| Appendix C | Two-dimensional NMR — the map that joins the fragments |

**The three appendices cover the theory and the practice.** If the eight lessons are about reading a
spectrum, Appendix A is about how that spectrum comes to exist (Zeeman splitting, the Boltzmann excess,
pulses and the FID, T<sub>1</sub> and T<sub>2</sub>, magnet, lock and shims, and what a stronger field
buys), Appendix B is the step before it (solvent and residual peaks, concentration, referencing, the
conditions under which integration holds, the causes of an odd-looking spectrum), and **Appendix C**
covers the **2D experiments** — COSY, TOCSY, HSQC, HMBC, NOESY — with three worked maps for when one
dimension does not settle the answer. The statements the lessons leave as conclusions — “<sup>13</sup>C
takes a long time”, “<sup>13</sup>C integrals are not used”, “multiplets resolve at 600 MHz” — are all
grounded here.

Every lesson mixes exposition, data tables, schematic SVG spectra, and **pitfall callouts** that target
the specific places students actually get stuck. For example:

- why an EDG such as –OCH<sub>3</sub> shifts the ring protons upfield while pushing its own methyl
  protons downfield to δ 3.80
- the alkyne anisotropy paradox — why an alkyne proton is upfield of an alkene one although sp carbon
  is the more electronegative
- the *ipso*-carbon trap — why anisole's *ipso* carbon is further downfield than nitrobenzene's in
  <sup>13</sup>C
- tying the directing effects of electrophilic aromatic substitution (o/p-director ↔ meta-director) to
  the direction of the shift

### Practice sets (9 sets · 119 questions)

| Set | Items |
|-----|-------|
| A. Fundamentals and vocabulary | 10 |
| B. Inductive effects | 11 |
| **C. EWG / EDG on aromatic rings** ★ | 24 |
| **D. The concepts people mix up** ★ | 15 |
| E. Anisotropy and exchangeable protons | 10 |
| F. Integration and coupling | 12 |
| G. <sup>13</sup>C NMR | 10 |
| H. Full structure problems | 14 |
| I. Instrument, measurement and 2D | 13 |

The starred sets are the core ones on EWG/EDG effects: 39 of the 119 items, 33%. The last set, **I**,
rests on Appendices A, B and C and includes items that read a COSY, HSQC or HMBC map directly.

Four question types:

- `single` — single choice
- `multi` — select all that apply
- `ordering` — arrange by chemical shift
- `numeric` — calculate δ from increments, with a tolerance

Every item shows a **quantitative explanation with a source**, right or wrong. Distractors are drawn
from misconceptions that actually occur, and the explanation says why each is wrong. **Fifty-two of the
119 explanations carry a molecular structure**, so you can see which position of the molecule each δ
belongs to, and two items in set I **put a 2D map in the question itself**.

### Molecular structures

Structures are **drawn as SVG in-house** with no external library (`assets/js/structure.js`), following
the structure-drawing conventions of the **ACS Style Guide**, transferred as ratios:

| Item | Applied |
|---|---|
| Bond length | **uniform** across rings and chains (L = 32 px) |
| Angle between bonds | always **120°** (180° at an sp carbon) |
| First bond off a ring | **straight out along the radius** |
| Double-bond spacing | **18%** of the bond length, inner line shortened 13% at each end |
| Bond width | about 1/23 of the bond length (1.4 px) |
| Atom labels | Helvetica / Arial, 7 px of clearance between bond end and glyph |

**A substituent leaves the ring straight along the radius.** The exterior bisector at a hexagon vertex
*is* that radius, so drawing it this way makes the substituent bond meet each ring bond at 120° — the
standard placement. Later bonds alternate 60° off it, and at an sp carbon (alkyne, nitrile) the chain
runs straight through instead of turning.

It follows skeletal convention:

- **Carbon skeletons are drawn** — alkyl chains, esters, ketones, aldehydes, acids — and a methyl branch
  is **a single bond line**, not a label.
- **Heteroatom abbreviations stay as labels** — NO₂, NH₂, OH, OCH₃, Cl, Br, CN.

Forty-one substituents now render as skeletons and thirty-five as labels. The earlier version hung
condensed labels such as `COOCH2CH3` and `CH2COOCH3` off the ring; those were hard to read and not ACS
practice, so they are all drawn out now.

**A chain on a ring always radiates outward from the ring**, never with the ring hanging off the middle
of a chain as a branch. Cumene, for instance, is drawn as a benzene ring with an isopropyl group
extending from it, not as a propane chain with a phenyl in the middle.

The ring is numbered with **position 1 at the top, clockwise to 6**, so para to 1 is 4, meta are 3 and 5
and ortho are 2 and 6 — **matching the increment table directly**.

Annotations attach at three distinguishable places:

- **an unsubstituted ring position** — the δ of that proton, placed outside the ring
- **a substituted ring position** — the δ of that ring carbon (the <sup>13</sup>C *ipso* value), placed
  to the side to clear the bond
- **the substituent itself** — beside the atom if it is drawn as a skeleton, outside the glyph if it is
  a label

The viewBox is **computed from the bounding box of what was actually drawn**, so a long substituent or a
long name can never overflow the figure.

Formula strings are typeset automatically — `NO2` → NO₂, `N(CH3)2` → N(CH₃)₂, `N^+` → N⁺ — with a digit
subscripted **only when it directly follows an element symbol or a closing bracket**, so values like
`8.22` and names like `4-nitroanisole` stay upright.

Ten structure figures also appear in the lessons, showing where on the ring each δ of nitrobenzene,
anisole and 4-nitroanisole belongs, and how the oxygen side of an ester differs from the carbonyl side.

### 2D correlation maps

The COSY, HSQC and HMBC maps of Appendix C are also **drawn as SVG in-house, with no external library**
(`assets/js/spectrum2d.js`), following the usual convention: δ increases to the left on F2 and upward on
F1, so a homonuclear diagonal runs from top-left to bottom-right.

| Element | Rule |
|---|---|
| 1D projections | F2 across the top, F1 down the left. Colliding labels are lifted a row on top, and stepped aside with a thin leader line on the left |
| Diagonal | drawn only for homonuclear experiments (COSY, NOESY, TOCSY), with the diagonal peaks marked |
| Symmetry | a homonuclear map given (a, b) draws (b, a) **automatically** — a real map is symmetric about the diagonal |
| Cross peaks | three nested ellipses, like contours; a weak correlation (<sup>4</sup>J and the like) is dashed |
| Guides | dotted drop lines from a highlighted peak to both axes, to read its 1D positions |

The coordinates are not eyeballed: they are **taken from the 1D values**, and `tools/twod.js` checks
that every cross peak sits on a line that exists in that map's own projections, that the axis window
contains everything, that the homonuclear/heteronuclear axis setup matches the experiment, and that the
ethyl benzoate shifts agree with the 1D figure in Lesson 8.

### Moving your progress

Progress lives only in the browser's `localStorage`. In the **Progress** tab, `Export` writes it out as
JSON to copy or save as `nmr-tutor-progress.json`, and `Import` reads it back — for carrying work from a
shared lab machine to your own laptop.

- **merge** — per question, the larger attempt count and the logical OR of correctness, so importing the
  same file twice changes nothing (idempotent).
- **replace** — discards the current record and keeps only what the file holds.
- Unknown question ids, malformed entries and entries with neither an attempt nor a correct answer are
  **dropped, and the count is reported**. The set name is taken from the question itself, not from the
  file, so editing a file cannot break the per-set statistics.

### Build information and integrity

At the foot of the **Sources** tab, the whole content of this copy can be summarised with **SHA-256** and
compared against the value recorded in the file. It does not *prevent* tampering; it makes it *visible*.

- **What is covered** — lessons, questions and explanations, the set list, sources, provenance and
  caveats, **every UI string**, and the chemical numbers living outside the data files — the 16
  increments, the δ 7.26 reference, the multiplet intensity table, the group definitions — plus the
  build metadata. Only the calculation and rendering logic, the CSS and the HTML are outside it.
- **Why SHA-256 is implemented in-house** — `crypto.subtle` needs a secure context (https/localhost) and
  returns a Promise, neither of which fits a page that must run in full from `file://`, so it is written
  as a synchronous ES5 function (`assets/js/integrity.js`).
- **The build counts are verified too** — independently of the hash, the lesson, appendix, question and
  source counts recorded in `BUILD` are checked against what is actually loaded.
- Editing content changes the hash; copy the **current hash** shown on screen into `BUILD_DIGEST` in
  `integrity.js` to make the check read `match` again.

## Verification

Every check described below **can be re-run**: the checkers live in `tools/` and have no dependencies.

```bash
node tools/check.js      # all ten checks
node tools/digest.js     # recompute the integrity hash after editing content
```

| Checker | What it does |
|---|---|
| `audit.js` | Recomputes every arithmetic step written in the lessons and explanations, and compares quoted increments against the canonical table |
| `formula.js` | **Back-calculates by valence** the molecular formula each structure actually draws, and compares it with the intended compound |
| `pattern.js` | Whether the substitution pattern (o/m/p) matches the name, and whether ring δ annotations match the increment prediction |
| `qformula.js` | The formula a question states ↔ the structure in its explanation ↔ the integral sum in the stem |
| `physics.js` | Recomputes the appendix physics from CODATA values, and checks that every `refs`/`src` points at a source that exists |
| `twod.js` | Cross-peak coordinates, axis windows and axis configuration of the 2D maps, and agreement with the 1D values |
| `landmark.js` | Whether the same position of the same compound is written with two different δ in two places |
| `sha_test.js` | The hand-written SHA-256 against node's `crypto`, over 521 cases |
| `i18n_check.js` | A Korean/English pair for every UI string, and that every key `app.js` references exists |
| `review_guard.js` | Whether the fixes made in the adversarial passes are still in the code |

The browser-driven checks live in `tools/browser/`. They need Playwright; without it they say so and
exit, leaving the app and `tools/check.js` untouched.

```bash
npm i -D playwright && npx playwright install chromium
python3 -m http.server 8099          # from the repository root
node tools/browser/run.mjs           # nine browser checks
```

| Checker | What it does |
|---|---|
| `t4.mjs` | Sweeps every lesson and all 119 questions in both languages, confirming zero console errors |
| `visual.mjs` | Layout detection over 5 viewports × 2 languages — overlap, clipping, horizontal overflow, illegible text |
| `t5.mjs` | `closest` deleted, options-object scrolling throwing, the second `toggle` argument ignored, `localStorage` blocked |
| `t7.mjs` | Full behaviour when opened over `file://`, and zero external requests |
| `t8.mjs` | The reduced paths when saving and copying are blocked |
| `io_test.mjs` · `io_test2.mjs` | Progress export and import, and 14 hostile payloads |
| `integ_test.mjs` | The integrity hash matching, and mismatching after a one-character content change |
| `perf.mjs` | Render performance and transfer size |

The **82 defects** found and fixed across eight adversarial passes are recorded — each with what was
wrong and what changed — in [`REVIEW-LOG.md`](REVIEW-LOG.md). They began with checking every increment
against Pretsch et al. (2009) and recomputing every worked calculation, and went on to attack question
design, the structure drawings, the physics in the appendices, the coordinates of the 2D maps and the
input handling of the progress import — a different angle each pass. Every checker written along the
way is still in the list above, so a defect of the same kind cannot come back unnoticed.

### Where the checks stand

The current figures, printed by a single `node tools/check.js`; anything that slips shows up as a
non-zero count.

| Check | Count | Result |
|---|---|---|
| Arithmetic recomputed | 90 | 0 mismatches |
| Increment triples vs the canonical table | 24 | 0 mismatches |
| Structures back-calculated | 66 | 0 mismatches |
| Substitution pattern vs name | 17 | 0 mismatches |
| Ring annotations vs increment prediction | 138 | none off by more than 0.35 ppm |
| Formula vs structure and integrals | 33 | 0 mismatches |
| Appendix physics and references | 142 | 0 mismatches |
| 2D coordinates and axes | 209 | 0 mismatches |
| One compound, one δ | 109 | 0 mismatches |
| SHA-256 vs node `crypto` | 521 | 0 mismatches |
| UI strings in both languages | 114 | 0 missing |
| Review fixes still in place | 42 | 0 broken |
| Layout detector (browser) | 730 screens | 0 problems |

## Visual checks

Layout is checked by an **automated detector** that reads real rendered box geometry inside the page,
rather than by eyeballing screenshots. It decides four things:

1. pairwise overlap of every text pair inside each spectrum (more than 4 px²)
2. labels clipped outside the figure box
3. clipped text wider than its container, horizontal overflow of the document, off-viewport elements
4. figure text shrunk below legibility (under 7 px)

Run across **320 / 375 / 768 / 1024 / 1440 px in both languages** over every lesson (all three
appendices included), nine calculator combinations and the remaining tabs, with every question opened
**through to its graded state**, explanation and structure on screen, plus the export/import box, the
integrity panel and the 2D maps of Appendix C — **730 screens** per pass, carrying **608 visible
renders**. What it found is recorded in [`REVIEW-LOG.md`](REVIEW-LOG.md).

Current state: **zero overlaps, zero clipping, zero horizontal overflow and zero illegible text across
all 730 screens and 608 renders.**

## File layout

```
index.html                  app shell and view containers
LICENSE                     the full CC BY-NC 4.0 text
REVIEW-LOG.md               the 82 defects fixed over eight passes
assets/css/styles.css       themes and responsive layout
assets/js/i18n.js           UI dictionary and language switching
assets/js/spectrum.js       schematic spectrum renderer
assets/js/spectrum2d.js     2D correlation map renderer
assets/js/structure.js      molecular structure renderer
assets/js/data-sources.js   bibliography and provenance register
assets/js/data-lessons.js   8 lessons and 3 appendices as content blocks
assets/js/data-questions.js the 119-item question bank
assets/js/integrity.js      SHA-256, build metadata, integrity
assets/js/app.js            routing, quiz engine, calculator, progress
tools/                      checkers, node only
tools/browser/              browser checkers, needs Playwright
```

Content and logic are separate: adding a question is one more entry in `data-questions.js`. Set, type
and difficulty are just fields; rendering and grading are handled by the engine.

```js
Q.push({
  id: 'C25', set: 'aromatic', type: 'mc', d: 3,
  q: { ko: '…', en: '…' },
  o: [ { ko: '…', en: '…' }, … ],   // options
  a: 0,                             // index of the answer
  e: { ko: '…', en: '…' },          // explanation
  mol: [{ kind: 'benzene', subs: { 1: 'NO2' }, ann: { 2: '8.22' } }],
  ref: 'Pretsch et al., 4th ed., 2009.'
});
```

Lessons work the same way: list blocks (`p`, `h`, `ul`, `ol`, `formula`, `note`, `table`, `spec`,
`mol`, `compare`) in `data-lessons.js`. A `badge` field puts a name in the table of contents instead of
a number, which is how the appendices are labelled.

**Every string must be a `{ ko, en }` pair** — filling in only one side leaves a blank after the
language toggle. Korean text carries the English term alongside, and any number should name its source
in `src` or `ref`.

## About the data

Quoted shifts are representative textbook values and vary with solvent, concentration and temperature.
Substituent increments are approximate — expect ±0.2 ppm deviations, larger for adjacent substituents
and strong EWG/EDG combinations. The spectra are schematic teaching figures, not measured data, and
multiplet spacings are exaggerated for legibility.

### Sources

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
- Keeler, J. *Understanding NMR Spectroscopy*, 2nd ed.; Wiley: Chichester, 2010. (Appendix A — Zeeman
  splitting, the Boltzmann population difference, pulses and the FID, T<sub>1</sub>/T<sub>2</sub>)
- Claridge, T. D. W. *High-Resolution NMR Techniques in Organic Chemistry*, 3rd ed.; Elsevier:
  Amsterdam, 2016. (Appendix B — sample preparation, acquisition conditions, quantitative integration,
  the NOE, and the 2D outline)
- Tiesinga, E.; Mohr, P. J.; Newell, D. B.; Taylor, B. N. CODATA Recommended Values of the Fundamental
  Physical Constants: 2018. *Rev. Mod. Phys.* **2021**, *93*, 025010; and NIST, *Atomic Weights and
  Isotopic Compositions*. (γ/2π, *h*, *k* and isotopic abundances in Appendix A)

The program's Sources tab lists all nine works together with **which numbers each one backs**, and the
same attribution appears under every lesson, table, figure and question explanation.

## Limitations

This is a teaching tool. Things that exist in real spectra but not here:

- **Every figure is schematic** — no real FIDs, exaggerated multiplet spacing, and none of the noise,
  baseline roll, peak overlap or spinning sidebands of a measured spectrum.
- **The additive-increment model is approximate** — good to about ±0.2 ppm, and worse for ortho pairs
  and push–pull rings. Second-order spectra, dynamic effects and rotamers are out of scope.
- **The appendices are an orientation**, not an instrument manual or a pulse-sequence text. Follow your
  own facility's procedures at the bench.
- **It is not an identification tool.** Numbers destined for a report should come from the primary
  literature or your own spectrum.

## Browser support and performance

**Zero dependencies, zero external requests.** No build tool, framework, CDN, web font or tracker.
It runs fully over `file://`, so it can be handed out on a USB stick with no network at all.

What was verified:

- **All JavaScript is ES5** — all nine files pass `acorn` with `ecmaVersion: 5`. No arrow functions,
  `const`/`let`, template literals, spread, `Promise` or `fetch`. The SHA-256 behind the integrity
  check is hand-written and synchronous rather than `crypto.subtle` (secure-context only, Promise-based)
  or `TextEncoder`.
- **`color-mix()` was removed from the CSS.** The only remaining modern feature is CSS custom
  properties (universal since around 2017), and even those have literal fallbacks for the body
  background and text colour.
- **Every modern-only API has a fallback path** — `Element.closest`/`matches` (replaced by an
  attribute-based ancestor walk), the options-object forms of `scrollTo`/`scrollIntoView`, the second
  argument of `classList.toggle`, and environments where touching `localStorage` throws (Safari
  private mode and similar). The two new features follow the same rule: **Save as file** appears only
  when `Blob`, `URL.createObjectURL` and `<a download>` are all present (with `msSaveBlob` for old
  Edge/IE), and **Copy** falls back to “select it yourself” when `document.execCommand('copy')` is
  blocked. Either way the JSON box itself still works.
- **The app was actually run with those APIs removed.** With `closest` deleted, options-object
  scrolling made to throw, the `toggle` force argument ignored and `localStorage` throwing on access,
  lesson navigation, the language toggle, grading, the calculator and the Sources tab all still worked.

Full regression: the 8 lessons, 3 appendices and 119 questions were **swept in each language
separately**, with zero console errors and correct grading, explanations and attributions throughout.
For layout, see **Visual checks** above.

Performance (headless Chromium, rendering every lesson back to back; 'Before' and 'After' in the table
compare the optimisation at a time when there were 8 lessons):

| | Before | After |
|---|---|---|
| Cold | 674 ms | **149 ms** |
| Warm | 579 ms | **83 ms** |
| Per switch | about 72 ms | **about 10 ms** |
| Listeners | one per node on every render | **4 fixed on document** |

What changed:

- **Removing the per-SVG `<style>` block** was the single biggest win: each one forced a document-wide
  style recalculation. The rules moved into `.nmr-spec` in the stylesheet.
- **Delegated event handling** replaced attaching a listener per element on every render, so render
  cost no longer scales with the number of nodes.
- **Indexes are built once at start-up** for lessons, sets and questions, so per-set statistics no
  longer sweep the whole bank each time.
- **Lesson HTML is cached and the nav is updated in place**; the cache is dropped only on a language
  change.
- **Folding integration into the peak label** cut the text-node count per figure, so the overlap fix
  also bought speed (216 ms → 140 ms).

With three appendices the current figures are **about 240 ms cold for all eleven units and about 13 ms
per lesson switch** — the total grew with the number of units while the per-switch cost did not move.
Appendix C, with its three maps, is the largest single lesson at 21 KB of HTML, yet switching to it once
cached costs no more than any other.

Transfer size: 557 KB in total, or **170 KB gzipped** — mostly the lesson and question text.

## License and credits

- **License: CC BY-NC 4.0** — copy, redistribute and adapt freely with attribution; no commercial use;
  state that you changed it if you did. Full text in [`LICENSE`](LICENSE). (GitHub shows no licence
  badge for it: no CC licence with a non-commercial clause is in GitHub's recognised list. That has no
  bearing on the licence itself.)
- **The quoted data are not part of this work** — shifts, coupling constants, increments and physical
  constants are other people's measurements, cited above. What the licence covers is the original
  material: the lesson text, the question bank and its explanations, the renderers and the rest of the
  code.
- **Author**: 홍민기 (Mingi Hong)
- **Contact**: the [Issues](https://github.com/MGHong98/Chemistry-edu/issues) page of this repository

</details>
