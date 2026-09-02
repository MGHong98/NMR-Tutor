/* data-questions.js — 연습문제 은행 / Practice problem bank
 * 문제 객체 / question object:
 *   id, set, type('mc'|'multi'|'order'|'num'), d(1..3),
 *   q{ko,en}   문제, o[] 보기, a 정답(index | index[] | number),
 *   e{ko,en}  해설, ref 출처, spec 선택적 스펙트럼, tol 수치 허용오차
 */
(function (global) {
  'use strict';

  var SETS = [
    { id: 'basics', lesson: 'basics', core: false,
      title: { ko: 'A. 기초와 용어', en: 'A. Fundamentals and vocabulary' },
      desc: { ko: 'δ 눈금, 업필드/다운필드, TMS, 기기 주파수의 의미를 확인합니다.', en: 'The δ scale, upfield/downfield, TMS, and what spectrometer frequency changes.' } },
    { id: 'inductive', lesson: 'inductive', core: false,
      title: { ko: 'B. 유도 효과', en: 'B. Inductive effects' },
      desc: { ko: '전기음성도·누적·거리의 세 규칙으로 지방족 δ를 예측합니다.', en: 'Predict aliphatic shifts from electronegativity, accumulation and distance.' } },
    { id: 'aromatic', lesson: 'ewg-edg', core: true,
      title: { ko: 'C. EWG / EDG 방향족', en: 'C. EWG / EDG on aromatic rings' },
      desc: { ko: '증분표를 이용한 정량적 예측과 ortho·meta·para 배정. 이 프로그램의 중심 세트입니다.', en: 'Quantitative prediction with the increment table, plus ortho/meta/para assignment. The centrepiece set.' } },
    { id: 'confusions', lesson: 'ewg-edg', core: true,
      title: { ko: 'D. 헷갈리기 쉬운 개념', en: 'D. The concepts people mix up' },
      desc: { ko: '“EDG인데 왜 다운필드?” 같은 함정만 모았습니다. 오답 선택지도 모두 실제로 자주 나오는 오해입니다.', en: 'Nothing but traps such as “it is an EDG, so why downfield?”. Every distractor is a misconception that shows up in real exams.' } },
    { id: 'anisotropy', lesson: 'anisotropy', core: false,
      title: { ko: 'E. 이방성과 교환성 양성자', en: 'E. Anisotropy and exchangeable protons' },
      desc: { ko: '고리 전류, 알카인의 역설, OH/NH의 거동을 다룹니다.', en: 'Ring currents, the alkyne paradox, and how OH/NH behave.' } },
    { id: 'coupling', lesson: 'coupling', core: false,
      title: { ko: 'F. 적분과 짝지음', en: 'F. Integration and coupling' },
      desc: { ko: 'n+1 규칙, J 값, 그리고 치환기 효과가 다중도에 미치는 영향(또는 미치지 않는 영향).', en: 'The n+1 rule, J values, and what substituents do (or do not do) to multiplicity.' } },
    { id: 'carbon13', lesson: 'carbon13', core: false,
      title: { ko: 'G. <sup>13</sup>C NMR', en: 'G. <sup>13</sup>C NMR' },
      desc: { ko: '신호 개수 세기, DEPT, 그리고 ipso 탄소의 함정.', en: 'Counting signals, DEPT, and the ipso-carbon trap.' } },
    { id: 'structure', lesson: 'strategy', core: false,
      title: { ko: 'H. 종합 구조 결정', en: 'H. Full structure problems' },
      desc: { ko: '분자식과 스펙트럼 데이터만 보고 구조를 결정합니다.', en: 'Deduce a structure from a molecular formula and spectral data alone.' } }
  ];

  var Q = [];

  /* ============================================================ SET A */
  Q.push({
    id: 'A1', set: 'basics', type: 'mc', d: 1,
    q: { ko: '어떤 양성자의 신호가 “다운필드로 이동했다(shifted downfield)”고 할 때, 옳게 짝지어진 설명은?',
         en: 'A proton signal is described as having “shifted downfield”. Which description is correct?' },
    o: [
      { ko: 'δ 값이 커지고, 차폐가 약해졌으며, 주변 전자 밀도가 낮아졌다', en: 'δ increases, shielding decreases, and the surrounding electron density is lower' },
      { ko: 'δ 값이 커지고, 차폐가 강해졌으며, 주변 전자 밀도가 높아졌다', en: 'δ increases, shielding increases, and the surrounding electron density is higher' },
      { ko: 'δ 값이 작아지고, 차폐가 약해졌으며, 전자 밀도가 낮아졌다', en: 'δ decreases, shielding decreases, and the electron density is lower' },
      { ko: 'δ 값이 작아지고, 스펙트럼의 왼쪽으로 이동했다', en: 'δ decreases and the peak moves to the left of the spectrum' }
    ], a: 0,
    e: { ko: '다운필드 = 스펙트럼 왼쪽 = δ 증가 = 비차폐(deshielded) = 전자 밀도 감소. 이 사슬은 통째로 외워 두는 것이 좋습니다. δ가 커지는데 “low field”라고 부르는 것은 자기장을 훑던 옛 CW 장비의 어원일 뿐이며, 문제를 풀 때는 전자 밀도만 따지면 됩니다.',
         en: 'Downfield = left side = larger δ = deshielded = lower electron density. Memorise the whole chain. The word “low field” for a larger δ is only inherited from old field-sweeping CW instruments; when solving problems, reason from electron density alone.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 3.3.'
  });
  Q.push({
    id: 'A2', set: 'basics', type: 'mc', d: 1,
    q: { ko: 'TMS(tetramethylsilane)를 기준물질로 쓰는 이유로 <strong>옳지 않은</strong> 것은?',
         en: 'Which statement is <strong>not</strong> a reason for using TMS as the reference?' },
    o: [
      { ko: '12개의 양성자가 모두 등가여서 강한 단일선 하나만 낸다', en: 'Its 12 protons are equivalent, giving one strong singlet' },
      { ko: '규소가 전자를 밀어 주어 대부분의 유기 화합물보다 강하게 차폐되어 있다', en: 'Silicon donates electron density, so it is more shielded than almost any organic compound' },
      { ko: '끓는점이 낮아 시료에서 쉽게 제거된다', en: 'It boils low and is easily removed from the sample' },
      { ko: '전자 밀도가 낮아 스펙트럼의 가장 왼쪽에 나타난다', en: 'Its low electron density puts it at the far left of the spectrum' }
    ], a: 3,
    e: { ko: 'TMS는 <strong>가장 오른쪽(δ 0)</strong>에 나타납니다. 규소(전기음성도 1.8)가 탄소(2.5)보다 작아 메틸기 쪽으로 전자를 밀어 주므로 매우 강하게 차폐되기 때문입니다. 나머지 셋은 모두 TMS를 선택한 실제 이유입니다.',
         en: 'TMS appears at the <strong>far right</strong> (δ 0). Silicon (electronegativity 1.8) is less electronegative than carbon (2.5), so it pushes density onto the methyls and they are very strongly shielded. The other three are genuine reasons for choosing TMS.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 3.4.'
  });
  Q.push({
    id: 'A3', set: 'basics', type: 'num', d: 2, tol: 5, unit: 'Hz',
    q: { ko: '400 MHz 분광기에서 δ 2.30인 신호와 δ 1.20인 신호는 몇 Hz 떨어져 있습니까?',
         en: 'On a 400 MHz spectrometer, how many Hz separate a signal at δ 2.30 from one at δ 1.20?' },
    a: 440,
    e: { ko: 'Δν(Hz) = Δδ × 기기 주파수(MHz) = (2.30 − 1.20) × 400 = <strong>440 Hz</strong>. ppm은 기기 주파수로 나눈 값이므로, 실제 Hz로 되돌리려면 다시 곱해 줍니다.',
         en: 'Δν(Hz) = Δδ × spectrometer frequency (MHz) = (2.30 − 1.20) × 400 = <strong>440 Hz</strong>. Since ppm is obtained by dividing by the spectrometer frequency, you multiply back to recover the real separation in Hz.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 3.5.'
  });
  Q.push({
    id: 'A4', set: 'basics', type: 'mc', d: 2,
    q: { ko: '같은 시료를 400 MHz 대신 600 MHz 기기로 측정했습니다. 옳은 것은?',
         en: 'The same sample is re-run on a 600 MHz instrument instead of a 400 MHz one. Which is correct?' },
    o: [
      { ko: 'δ 값은 그대로이고, J(Hz)도 그대로이며, 두 신호 사이의 Hz 간격은 1.5배가 된다', en: 'δ stays the same, J (Hz) stays the same, and the separation between two signals in Hz becomes 1.5 times larger' },
      { ko: 'δ 값이 1.5배가 되고, J(Hz)도 1.5배가 된다', en: 'δ becomes 1.5 times larger, and so does J (Hz)' },
      { ko: 'δ 값은 그대로이고, J(Hz)가 1.5배가 된다', en: 'δ stays the same but J (Hz) becomes 1.5 times larger' },
      { ko: 'δ 값이 1.5배가 되고, J(Hz)는 그대로이다', en: 'δ becomes 1.5 times larger while J (Hz) stays the same' }
    ], a: 0,
    e: { ko: 'δ는 기기 주파수로 나눈 값이므로 기기와 무관하게 일정합니다. J는 두 핵 사이의 결합을 통한 상호작용이므로 외부 자기장과 무관하며 Hz 단위로 불변입니다. 반면 두 신호의 δ 차이를 Hz로 환산하면 기기 주파수에 비례하므로 600/400 = 1.5배가 됩니다. <strong>고자기장 기기에서 겹친 봉우리가 분리되는 이유</strong>가 바로 이것입니다(J는 그대로인데 간격만 벌어지므로).',
         en: 'δ is divided by the spectrometer frequency, so it is instrument-independent. J is a through-bond interaction between two nuclei, independent of the external field, and is unchanged in Hz. The δ difference converted to Hz, however, scales with the spectrometer frequency, so it grows by 600/400 = 1.5. <strong>That is exactly why overlapping peaks resolve at higher field</strong>: J is fixed while the separation widens.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 5.2; Clayden et al., Organic Chemistry, 2nd ed., Ch. 13.'
  });
  Q.push({
    id: 'A5', set: 'basics', type: 'order', d: 1,
    q: { ko: '다음 양성자를 δ가 <strong>작은 것부터 큰 것 순서</strong>(업필드 → 다운필드)로 배열하세요.',
         en: 'Arrange these protons from <strong>smallest to largest δ</strong> (upfield → downfield).' },
    o: [
      { ko: 'TMS의 CH<sub>3</sub>', en: 'CH<sub>3</sub> of TMS' },
      { ko: '에테인의 CH<sub>3</sub>', en: 'CH<sub>3</sub> of ethane' },
      { ko: '클로로메테인의 CH<sub>3</sub>', en: 'CH<sub>3</sub> of chloromethane' },
      { ko: '벤젠의 Ar–H', en: 'Ar–H of benzene' },
      { ko: '아세트알데하이드의 CHO', en: 'CHO of acetaldehyde' }
    ], a: [0, 1, 2, 3, 4],
    e: { ko: 'TMS 0.00 < 에테인 0.86 < 클로로메테인 3.05 < 벤젠 7.26 < 아세트알데하이드 9.80. 앞의 세 개는 유도 효과, 벤젠은 고리 전류, 알데하이드는 이방성과 카보닐의 전자 당김이 합쳐진 결과입니다.',
         en: 'TMS 0.00 < ethane 0.86 < chloromethane 3.05 < benzene 7.26 < acetaldehyde 9.80. The first three are set by induction, benzene by the ring current, and the aldehyde by anisotropy combined with the electron withdrawal of the carbonyl.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Appendix (correlation tables).'
  });
  Q.push({
    id: 'A6', set: 'basics', type: 'mc', d: 2,
    q: { ko: 'CDCl<sub>3</sub>에서 측정한 스펙트럼에 δ 7.26의 작은 단일선이 항상 나타납니다. 가장 적절한 해석은?',
         en: 'A small singlet at δ 7.26 turns up in every spectrum run in CDCl<sub>3</sub>. What is the best interpretation?' },
    o: [
      { ko: '완전히 중수소화되지 않은 CHCl<sub>3</sub> 잔류 신호이며, 시료의 방향족 양성자로 세면 안 된다', en: 'It is the residual CHCl<sub>3</sub> of the incompletely deuterated solvent, and must not be counted as an aromatic proton of the sample' },
      { ko: '시료에 벤젠 고리가 있다는 증거이다', en: 'It proves that the sample contains a benzene ring' },
      { ko: 'TMS의 짝지음에서 오는 위성 신호이다', en: 'It is a satellite arising from coupling in TMS' },
      { ko: '물이 섞여 들어간 신호이다', en: 'It is water contamination' }
    ], a: 0,
    e: { ko: 'CDCl<sub>3</sub>에 미량 남아 있는 CHCl<sub>3</sub>의 신호이며 δ 7.26(s)입니다. 우연히 벤젠과 같은 값이라 방향족 양성자로 착각하기 쉽습니다(원인은 서로 다릅니다. CHCl<sub>3</sub>는 염소 3개의 유도 효과, 벤젠은 고리 전류). CDCl<sub>3</sub> 중의 물은 δ 1.56에 나타납니다.',
         en: 'It is the trace CHCl<sub>3</sub> remaining in the CDCl<sub>3</sub>, at δ 7.26 (s). It coincides numerically with benzene and is easily mistaken for an aromatic proton, although the causes differ (induction from three chlorines versus a ring current). Water in CDCl<sub>3</sub> appears at δ 1.56 instead.' },
    ref: 'Gottlieb, Kotlyar & Nudelman, J. Org. Chem. 1997, 62, 7512.'
  });
  Q.push({
    id: 'A7', set: 'basics', type: 'multi', d: 2,
    q: { ko: '<sup>1</sup>H NMR 스펙트럼 하나에서 직접 읽어낼 수 있는 정보를 모두 고르세요.',
         en: 'Select everything that can be read directly from a single <sup>1</sup>H NMR spectrum.' },
    o: [
      { ko: '화학적으로 서로 다른 양성자 환경의 개수', en: 'The number of chemically distinct proton environments' },
      { ko: '각 환경에 속한 양성자의 상대적 개수', en: 'The relative number of protons in each environment' },
      { ko: '이웃 탄소에 붙은 양성자의 개수', en: 'The number of protons on the neighbouring carbon' },
      { ko: '분자의 절대 입체배치(R/S)', en: 'The absolute configuration (R/S) of the molecule' }
    ], a: [0, 1, 2],
    e: { ko: '신호 개수 → 환경 수, 적분 → 상대 개수, 다중도 → 이웃 양성자 수를 줍니다. 절대 입체배치는 일반적인 NMR로는 결정할 수 없습니다(키랄 유도 시약이나 X선 회절 등 별도의 방법이 필요합니다). 부분입체이성질체(diastereomer)는 신호가 달라 구별할 수 있지만, 거울상이성질체(enantiomer)는 통상적인 조건에서 동일한 스펙트럼을 냅니다.',
         en: 'Signal count gives the number of environments, integration the relative counts, and multiplicity the number of neighbouring protons. Absolute configuration cannot be obtained from an ordinary NMR spectrum; it needs a chiral derivatising agent, X-ray diffraction or similar. Diastereomers do give different spectra, but enantiomers give identical ones under ordinary conditions.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 3.1; Silverstein et al., 8th ed., Ch. 3.'
  });

  /* ============================================================ SET B */
  Q.push({
    id: 'B1', set: 'inductive', type: 'order', d: 1,
    q: { ko: 'CH<sub>3</sub>–X 화합물의 메틸 양성자를 δ가 <strong>작은 것부터</strong> 배열하세요.',
         en: 'Order the methyl protons of these CH<sub>3</sub>–X compounds from <strong>smallest δ</strong> upward.' },
    o: [{ ko: 'CH<sub>3</sub>I', en: 'CH<sub>3</sub>I' }, { ko: 'CH<sub>3</sub>Br', en: 'CH<sub>3</sub>Br' },
        { ko: 'CH<sub>3</sub>Cl', en: 'CH<sub>3</sub>Cl' }, { ko: 'CH<sub>3</sub>F', en: 'CH<sub>3</sub>F' }],
    a: [0, 1, 2, 3],
    e: { ko: 'I 2.16 < Br 2.68 < Cl 3.05 < F 4.26. 할로젠의 전기음성도 순서(I &lt; Br &lt; Cl &lt; F)와 정확히 일치합니다. 전기음성도가 클수록 σ 결합을 따라 전자를 강하게 당겨 양성자를 비차폐시킵니다.',
         en: 'I 2.16 < Br 2.68 < Cl 3.05 < F 4.26 — exactly the order of halogen electronegativity (I &lt; Br &lt; Cl &lt; F). The more electronegative the halogen, the harder it pulls density along the σ bond and the more the proton is deshielded.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Table 3.4.'
  });
  Q.push({
    id: 'B2', set: 'inductive', type: 'mc', d: 1,
    q: { ko: 'CH<sub>3</sub>Cl은 δ 3.05입니다. CH<sub>2</sub>Cl<sub>2</sub>의 양성자는 대략 어디에 나타나겠습니까?',
         en: 'CH<sub>3</sub>Cl appears at δ 3.05. Roughly where do the protons of CH<sub>2</sub>Cl<sub>2</sub> appear?' },
    o: [{ ko: 'δ 1.5 부근 (업필드로 이동)', en: 'near δ 1.5 (moved upfield)' },
        { ko: 'δ 3.0 부근 (거의 변화 없음)', en: 'near δ 3.0 (essentially unchanged)' },
        { ko: 'δ 5.3 부근 (다운필드로 이동)', en: 'near δ 5.3 (moved downfield)' },
        { ko: 'δ 9.0 부근 (알데하이드 영역)', en: 'near δ 9.0 (aldehyde region)' }],
    a: 2,
    e: { ko: '실측값은 δ 5.30입니다. 전기음성 치환기의 효과는 누적됩니다(CH<sub>3</sub>Cl 3.05 → CH<sub>2</sub>Cl<sub>2</sub> 5.30 → CHCl<sub>3</sub> 7.26). 다만 완전한 등차수열은 아니고 증가 폭이 조금씩 줄어듭니다.',
         en: 'The measured value is δ 5.30. Electronegative substituents accumulate: CH<sub>3</sub>Cl 3.05 → CH<sub>2</sub>Cl<sub>2</sub> 5.30 → CHCl<sub>3</sub> 7.26. The increments are not perfectly equal — each additional chlorine adds slightly less.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 3.9.'
  });
  Q.push({
    id: 'B3', set: 'inductive', type: 'mc', d: 2,
    q: { ko: '1-나이트로프로페인(CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>NO<sub>2</sub>)의 세 신호는 δ 4.38, 2.07, 1.03입니다. δ 1.03의 귀속으로 옳은 것은?',
         en: '1-Nitropropane (CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>NO<sub>2</sub>) gives δ 4.38, 2.07 and 1.03. What is the correct assignment of the δ 1.03 signal?' },
    o: [
      { ko: 'γ 위치의 CH<sub>3</sub>. NO<sub>2</sub>에서 3결합 떨어져 있어 유도 효과가 거의 소멸했다', en: 'The γ-CH<sub>3</sub>: three bonds from NO<sub>2</sub>, so the inductive effect has essentially died out' },
      { ko: 'α 위치의 CH<sub>2</sub>. NO<sub>2</sub>가 EWG이므로 오히려 차폐된다', en: 'The α-CH<sub>2</sub>: because NO<sub>2</sub> is an EWG it is shielded instead' },
      { ko: 'β 위치의 CH<sub>2</sub>', en: 'The β-CH<sub>2</sub>' },
      { ko: 'NO<sub>2</sub>와의 짝지음으로 생긴 부수적 신호', en: 'A side peak from coupling to NO<sub>2</sub>' }
    ], a: 0,
    e: { ko: 'δ 4.38 = α-CH<sub>2</sub>(NO<sub>2</sub>에 직결), δ 2.07 = β-CH<sub>2</sub>, δ 1.03 = γ-CH<sub>3</sub>입니다. 참고로 프로페인의 CH<sub>3</sub>는 δ 0.90이므로, 강력한 EWG인 NO<sub>2</sub>가 붙어 있어도 3결합 떨어진 메틸은 <strong>0.13 ppm</strong>밖에 움직이지 않습니다. 유도 효과는 결합 하나당 대략 1/3 이하로 감쇠합니다.',
         en: 'δ 4.38 is the α-CH<sub>2</sub> bonded to NO<sub>2</sub>, δ 2.07 the β-CH<sub>2</sub>, and δ 1.03 the γ-CH<sub>3</sub>. For comparison, the methyl of propane is δ 0.90: even with a nitro group in the molecule, a methyl three bonds away moves by only <strong>0.13 ppm</strong>. Induction decays by roughly a factor of three per bond.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 3.8; SDBS (AIST).'
  });
  Q.push({
    id: 'B4', set: 'inductive', type: 'mc', d: 2,
    spec: { peaks: [{ ppm: 4.12, mult: 'q', H: 2 }, { ppm: 2.05, mult: 's', H: 3 }, { ppm: 1.26, mult: 't', H: 3 }], min: 0, max: 6 },
    q: { ko: '위 스펙트럼은 에틸 아세테이트(CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>)입니다. δ 4.12 사중선의 귀속은?',
         en: 'The spectrum above is ethyl acetate (CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>). What is the δ 4.12 quartet?' },
    o: [
      { ko: '산소에 결합한 –O–CH<sub>2</sub>–', en: 'The –O–CH<sub>2</sub>– attached to oxygen' },
      { ko: '카보닐에 결합한 CH<sub>3</sub>–C=O', en: 'The CH<sub>3</sub>–C=O attached to the carbonyl' },
      { ko: '사슬 말단의 CH<sub>3</sub>', en: 'The terminal CH<sub>3</sub>' },
      { ko: '두 CH<sub>3</sub>가 겹쳐서 나온 신호', en: 'Two overlapping CH<sub>3</sub> signals' }
    ], a: 0,
    e: { ko: '사중선이라는 것 자체가 이웃에 3H(메틸)가 있음을 뜻하므로 CH<sub>2</sub>입니다. 그리고 δ 4.12라는 값은 <strong>산소에 직접 결합</strong>했음을 가리킵니다. 카보닐 옆의 CH<sub>3</sub>는 이웃 양성자가 없어 δ 2.05 단일선으로, 말단 CH<sub>3</sub>는 δ 1.26 삼중선으로 나옵니다. C=O가 강한 EWG처럼 보여도, 산소에 직접 붙은 쪽이 언제나 더 크게 밀립니다.',
         en: 'Being a quartet already tells you it has three neighbours (a methyl), so it is the CH<sub>2</sub>. The value δ 4.12 then says it is bonded <strong>directly to oxygen</strong>. The methyl on the carbonyl has no neighbours and appears as the δ 2.05 singlet; the terminal methyl is the δ 1.26 triplet. However strong an EWG C=O looks, the group bonded straight to oxygen always moves further.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 3; SDBS (AIST).'
  });
  Q.push({
    id: 'B5', set: 'inductive', type: 'mc', d: 3,
    q: { ko: 'C<sub>4</sub>H<sub>8</sub>O<sub>2</sub>인 두 이성질체가 있습니다. 화합물 X는 δ 3.67 (3H, s), 2.32 (2H, q), 1.14 (3H, t)를 보입니다. X는 무엇입니까?',
         en: 'Two isomers share the formula C<sub>4</sub>H<sub>8</sub>O<sub>2</sub>. Compound X shows δ 3.67 (3H, s), 2.32 (2H, q), 1.14 (3H, t). What is X?' },
    o: [
      { ko: '메틸 프로파노에이트 CH<sub>3</sub>CH<sub>2</sub>COOCH<sub>3</sub>', en: 'Methyl propanoate, CH<sub>3</sub>CH<sub>2</sub>COOCH<sub>3</sub>' },
      { ko: '에틸 아세테이트 CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>', en: 'Ethyl acetate, CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>' },
      { ko: '뷰탄산 CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>COOH', en: 'Butanoic acid, CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>COOH' },
      { ko: '1,4-다이옥세인', en: '1,4-Dioxane' }
    ], a: 0,
    e: { ko: '결정적 단서는 <strong>사중선의 위치</strong>입니다. δ 2.32는 카보닐 옆(α 위치)의 CH<sub>2</sub>이지 산소에 붙은 CH<sub>2</sub>(δ 4.1 부근)가 아닙니다. 즉 에틸기가 아실 쪽에 있고, 산소 쪽에는 단일선인 OCH<sub>3</sub>(δ 3.67)가 있으므로 메틸 프로파노에이트입니다. 에틸 아세테이트라면 4.12 (q), 2.05 (s), 1.26 (t)가 나옵니다. 뷰탄산은 δ 11 부근에 COOH 신호가 있어야 하고, 1,4-다이옥세인은 단일선 하나(δ 3.70)뿐입니다.',
         en: 'The decisive clue is <strong>where the quartet sits</strong>. δ 2.32 is a CH<sub>2</sub> α to a carbonyl, not one on oxygen (which would be near δ 4.1). So the ethyl group is on the acyl side and the oxygen carries a singlet OCH<sub>3</sub> at δ 3.67: methyl propanoate. Ethyl acetate would give 4.12 (q), 2.05 (s), 1.26 (t). Butanoic acid would need a COOH near δ 11, and 1,4-dioxane gives a single singlet at δ 3.70.' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 8; SDBS (AIST).'
  });
  Q.push({
    id: 'B6', set: 'inductive', type: 'multi', d: 2,
    q: { ko: '유도 효과(inductive effect)에 대한 설명 중 옳은 것을 모두 고르세요.',
         en: 'Select every correct statement about the inductive effect.' },
    o: [
      { ko: 'σ 결합을 통해 전달되며, 결합을 하나 건널 때마다 급격히 약해진다', en: 'It travels through σ bonds and weakens sharply with each bond crossed' },
      { ko: '치환기의 전기음성도가 클수록 이웃 양성자를 더 다운필드로 민다', en: 'The more electronegative the substituent, the further downfield it pushes neighbouring protons' },
      { ko: '같은 치환기가 여러 개 붙으면 효과가 대략 누적된다', en: 'Multiple copies of the same substituent give roughly additive effects' },
      { ko: 'ortho와 para 위치에만 선택적으로 작용한다', en: 'It acts selectively at the ortho and para positions only' }
    ], a: [0, 1, 2],
    e: { ko: '④는 <strong>공명 효과(resonance)</strong>의 성질입니다. 유도 효과는 위치 선택성이 없고 단지 가까울수록 클 뿐입니다. 이 둘을 구분하는 것이 방향족 문제 풀이의 출발점입니다.',
         en: 'Option 4 describes the <strong>resonance</strong> effect. Induction has no positional selectivity — it is simply larger when closer. Separating these two is the starting point for every aromatic problem.' },
    ref: 'Clayden, Greeves & Warren, Organic Chemistry, 2nd ed., Ch. 21; Pavia et al., 5th ed., Ch. 3.'
  });
  Q.push({
    id: 'B7', set: 'inductive', type: 'num', d: 3, tol: 0.4, unit: 'ppm',
    q: { ko: '프로페인의 CH<sub>3</sub>는 δ 0.90입니다. 1-브로모프로페인(CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>Br)의 말단 CH<sub>3</sub>는 대략 δ 몇에 나타나겠습니까?',
         en: 'The methyl of propane is δ 0.90. Roughly where does the terminal CH<sub>3</sub> of 1-bromopropane (CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>Br) appear?' },
    a: 1.03,
    e: { ko: '실측값은 δ 1.03입니다(α-CH<sub>2</sub> 3.40, β-CH<sub>2</sub> 1.87). 브로민이 3결합 떨어져 있어 효과가 0.1 ppm 남짓밖에 남지 않습니다. “EWG가 있으니 크게 다운필드일 것”이라고 답하면 오답입니다. <strong>거리를 먼저 세는 습관</strong>을 들이세요.',
         en: 'The measured value is δ 1.03 (with α-CH<sub>2</sub> at 3.40 and β-CH<sub>2</sub> at 1.87). Three bonds away, the bromine leaves barely 0.1 ppm of effect. Answering “there is an EWG, so it must be far downfield” is the mistake here. <strong>Count the bonds first.</strong>' },
    ref: 'Pavia et al., Introduction to Spectroscopy, 5th ed., Ch. 3.8; SDBS (AIST).'
  });

  /* ============================================================ SET C */
  Q.push({
    id: 'C1', set: 'aromatic', type: 'order', d: 1,
    q: { ko: '나이트로벤젠의 고리 양성자를 δ가 <strong>작은 것부터</strong> 배열하세요.',
         en: 'Order the ring protons of nitrobenzene from <strong>smallest δ</strong> upward.' },
    o: [{ ko: 'meta 위치 (2H)', en: 'meta (2H)' }, { ko: 'para 위치 (1H)', en: 'para (1H)' }, { ko: 'ortho 위치 (2H)', en: 'ortho (2H)' }],
    a: [0, 1, 2],
    e: { ko: 'meta 7.52 &lt; para 7.68 &lt; ortho 8.22 입니다. 증분표로 계산하면 7.26 + 0.26 = 7.52, 7.26 + 0.38 = 7.64, 7.26 + 0.95 = 8.21로 실측과 잘 맞습니다. NO<sub>2</sub>는 공명으로 ortho·para에서 π 전자를 빼가고 유도로 전체를 조금씩 밀기 때문에, 순서는 언제나 <strong>ortho &gt; para &gt; meta</strong>입니다.',
         en: 'meta 7.52 &lt; para 7.68 &lt; ortho 8.22. The increments give 7.26 + 0.26 = 7.52, 7.26 + 0.38 = 7.64 and 7.26 + 0.95 = 8.21, in good agreement. NO<sub>2</sub> removes π density from the ortho and para positions by resonance while pushing the whole ring slightly by induction, so the order is always <strong>ortho &gt; para &gt; meta</strong>.' },
    ref: 'Pretsch et al., Structure Determination of Organic Compounds, 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'C2', set: 'aromatic', type: 'num', d: 2, tol: 0.25, unit: 'ppm',
    q: { ko: '증분표(ortho −0.48, meta −0.09, para −0.44)를 이용해 아니솔(anisole, C<sub>6</sub>H<sub>5</sub>OCH<sub>3</sub>)의 <strong>para</strong> 양성자 δ를 계산하세요. 벤젠의 기준값은 7.26입니다.',
         en: 'Using the increments (ortho −0.48, meta −0.09, para −0.44), calculate δ for the <strong>para</strong> proton of anisole. Benzene reference is 7.26.' },
    a: 6.82,
    e: { ko: 'δ = 7.26 + (−0.44) = <strong>6.82</strong> (실측 6.94). OCH<sub>3</sub>의 산소는 비공유 전자쌍을 고리 π 계로 밀어 넣고, 그 전자 밀도는 공명 구조상 ortho와 para에만 쌓입니다. 따라서 두 위치가 크게 차폐되어 업필드로 갑니다. meta는 −0.09에 불과해 사실상 벤젠 값 그대로입니다.',
         en: 'δ = 7.26 + (−0.44) = <strong>6.82</strong> (measured 6.94). The oxygen of OCH<sub>3</sub> donates a lone pair into the ring π system, and the resonance structures place that density only at the ortho and para carbons. Those two positions are therefore strongly shielded and move upfield, while meta at −0.09 stays essentially at the benzene value.' },
    ref: 'Pretsch et al., 4th ed., 2009 (increment tables); SDBS (AIST).'
  });
  Q.push({
    id: 'C3', set: 'aromatic', type: 'mc', d: 2,
    q: { ko: '벤젠 고리에 어떤 치환기가 붙었더니 <strong>ortho와 para 양성자는 뚜렷하게 업필드</strong>로 갔고 <strong>meta 양성자는 거의 변하지 않았습니다</strong>. 이 치환기로 가장 알맞은 것은?',
         en: 'A substituent on benzene moves the <strong>ortho and para protons clearly upfield</strong> while the <strong>meta proton barely changes</strong>. Which substituent fits best?' },
    o: [{ ko: '–NH<sub>2</sub>', en: '–NH<sub>2</sub>' }, { ko: '–NO<sub>2</sub>', en: '–NO<sub>2</sub>' },
        { ko: '–CHO', en: '–CHO' }, { ko: '–C≡N', en: '–C≡N' }],
    a: 0,
    e: { ko: '업필드(차폐) = 고리에 전자를 주는 EDG입니다. 보기 중 EDG는 –NH<sub>2</sub>뿐이며, 실제로 아닐린의 증분은 ortho −0.75, meta −0.25, para −0.65로 보기 중 가장 강한 공여기입니다. 나머지 셋은 모두 EWG여서 ortho·para를 다운필드로 보냅니다. <strong>ortho·para에만 크게 작용하고 meta는 그대로</strong>라는 패턴 자체가 공명 효과의 지문입니다.',
         en: 'Upfield means shielding, which means an EDG donating into the ring. The only EDG listed is –NH<sub>2</sub>, whose increments (ortho −0.75, meta −0.25, para −0.65) make it the strongest donor here. The other three are EWGs and push ortho and para downfield. The pattern <strong>large at ortho and para, nothing at meta</strong> is the fingerprint of a resonance effect.' },
    ref: 'Pretsch et al., 4th ed., 2009; Clayden et al., Organic Chemistry, 2nd ed., Ch. 21.'
  });
  Q.push({
    id: 'C4', set: 'aromatic', type: 'mc', d: 2,
    q: { ko: '치환기의 공명 효과가 <strong>meta 위치에 거의 영향을 주지 않는</strong> 근본적인 이유는?',
         en: 'What is the fundamental reason a substituent resonance effect <strong>hardly touches the meta position</strong>?' },
    o: [
      { ko: '공명 구조를 그려 보면 형식 전하가 ipso·ortho·para 탄소에만 나타나고 meta에는 나타나지 않기 때문', en: 'When you draw the resonance structures, formal charge appears only at the ipso, ortho and para carbons, never at meta' },
      { ko: 'meta 위치가 치환기에서 물리적으로 가장 멀기 때문', en: 'Because the meta position is physically the farthest from the substituent' },
      { ko: 'meta 양성자는 이웃 양성자와 짝지음을 하지 않기 때문', en: 'Because the meta proton does not couple to its neighbours' },
      { ko: '고리 전류가 meta 위치에서만 상쇄되기 때문', en: 'Because the ring current cancels only at the meta position' }
    ], a: 0,
    e: { ko: '물리적 거리로 따지면 para가 meta보다 더 멉니다. 그런데도 para가 크게 영향을 받는 것은 <strong>공액(conjugation)의 문제</strong>이지 거리의 문제가 아니기 때문입니다. π 전자를 밀거나 당기는 공명 구조를 그려 보면 전하가 1(ipso), 2(ortho), 4(para) 위치에만 놓입니다. 반면 위치와 무관하게 작용하는 유도 효과 때문에 meta도 0은 아니고 작은 값(NO<sub>2</sub>의 경우 +0.26)을 갖습니다.',
         en: 'By distance, para is farther than meta — yet para is strongly affected. That is because this is about <strong>conjugation</strong>, not distance: the resonance structures place charge only at positions 1 (ipso), 2 (ortho) and 4 (para). The meta increment is not exactly zero, because induction acts regardless of position; for NO<sub>2</sub> it is a small +0.26.' },
    ref: 'Clayden, Greeves & Warren, Organic Chemistry, 2nd ed., Ch. 21; Pavia et al., 5th ed., Ch. 3.13.'
  });
  Q.push({
    id: 'C5', set: 'aromatic', type: 'order', d: 2,
    q: { ko: '다음 화합물의 <strong>고리 양성자 평균 δ</strong>를 작은 것부터 배열하세요.',
         en: 'Order these compounds by the <strong>average δ of their ring protons</strong>, smallest first.' },
    o: [{ ko: '아닐린 (aniline)', en: 'Aniline' }, { ko: '아니솔 (anisole)', en: 'Anisole' },
        { ko: '벤젠 (benzene)', en: 'Benzene' }, { ko: '벤즈알데하이드 (benzaldehyde)', en: 'Benzaldehyde' },
        { ko: '나이트로벤젠 (nitrobenzene)', en: 'Nitrobenzene' }],
    a: [0, 1, 2, 3, 4],
    e: { ko: '평균값은 대략 아닐린 6.8 &lt; 아니솔 7.0 &lt; 벤젠 7.26 &lt; 벤즈알데하이드 7.6 &lt; 나이트로벤젠 7.8 입니다. 이는 곧 <strong>EDG 세기 순서(NH<sub>2</sub> &gt; OCH<sub>3</sub>)와 EWG 세기 순서(NO<sub>2</sub> &gt; CHO)</strong>를 그대로 반영합니다. 벤젠이 정확히 가운데 기준점(7.26)에 있다는 것을 축으로 삼아 좌우로 배치하면 외우기 쉽습니다.',
         en: 'The averages run roughly aniline 6.8 &lt; anisole 7.0 &lt; benzene 7.26 &lt; benzaldehyde 7.6 &lt; nitrobenzene 7.8. This simply mirrors the <strong>donor strength order (NH<sub>2</sub> &gt; OCH<sub>3</sub>) and the withdrawer strength order (NO<sub>2</sub> &gt; CHO)</strong>. Anchor everything on benzene at 7.26 in the middle and spread the rest either side.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'C6', set: 'aromatic', type: 'mc', d: 3,
    q: { ko: '클로로벤젠의 고리 양성자는 δ 7.26–7.32로 벤젠(7.26)과 거의 차이가 없습니다. 가장 적절한 설명은?',
         en: 'The ring protons of chlorobenzene appear at δ 7.26–7.32, almost identical to benzene (7.26). What is the best explanation?' },
    o: [
      { ko: 'Cl의 강한 −I(유도 당김)와 비공유 전자쌍에 의한 +M(공명 밀어줌)이 ortho·para에서 거의 상쇄되기 때문', en: 'The strong −I of Cl and the +M donation from its lone pair almost cancel at the ortho and para positions' },
      { ko: 'Cl은 전기음성도가 작아 고리에 아무 영향을 주지 않기 때문', en: 'Chlorine is not electronegative enough to affect the ring at all' },
      { ko: 'Cl이 고리 전류를 차단하기 때문', en: 'Chlorine blocks the ring current' },
      { ko: 'C–Cl 결합의 자유 회전 때문에 효과가 평균화되기 때문', en: 'Free rotation of the C–Cl bond averages the effect away' }
    ], a: 0,
    e: { ko: 'Cl은 전기음성도 3.1(Pavia 표 기준)로 유도 당김이 강하지만, 동시에 3p 비공유 전자쌍을 고리 π 계로 밀어 넣습니다(+M). 실제 증분은 ortho +0.02, meta −0.06, para −0.04로 세 위치 모두 0 근처입니다. 이 상충 관계는 친전자성 방향족 치환에서 <strong>할로젠이 ortho/para 배향성이면서 동시에 비활성화기</strong>인 것과 같은 원인입니다. 참고로 브로민은 ortho +0.22로 유도 쪽이 조금 더 우세합니다.',
         en: 'Chlorine (electronegativity 3.1 on the scale used in Table 3-1) withdraws strongly through σ, but simultaneously donates a 3p lone pair into the ring π system (+M). The measured increments are ortho +0.02, meta −0.06, para −0.04 — all near zero. This tug-of-war is the same one that makes <strong>halogens ortho/para directing yet deactivating</strong> in electrophilic aromatic substitution. Bromine tilts slightly towards induction, with an ortho increment of +0.22.' },
    ref: 'Pretsch et al., 4th ed., 2009; Clayden et al., 2nd ed., Ch. 21.'
  });
  Q.push({
    id: 'C7', set: 'aromatic', type: 'num', d: 3, tol: 0.3, unit: 'ppm',
    q: { ko: '4-나이트로톨루엔에서 <strong>NO<sub>2</sub>에 ortho인 양성자</strong>의 δ를 계산하세요. 증분: NO<sub>2</sub>(o +0.95, m +0.26, p +0.38), CH<sub>3</sub>(o −0.17, m −0.09, p −0.18).',
         en: 'Calculate δ for the proton <strong>ortho to NO<sub>2</sub></strong> in 4-nitrotoluene. Increments: NO<sub>2</sub> (o +0.95, m +0.26, p +0.38), CH<sub>3</sub> (o −0.17, m −0.09, p −0.18).' },
    a: 8.12,
    e: { ko: '그 양성자는 NO<sub>2</sub>에 대해 ortho이면서 CH<sub>3</sub>에 대해서는 meta입니다. δ = 7.26 + 0.95 + (−0.09) = <strong>8.12</strong> (실측 8.10). 반대쪽 양성자(CH<sub>3</sub>에 ortho, NO<sub>2</sub>에 meta)는 7.26 − 0.17 + 0.26 = 7.35 (실측 7.32)입니다. <strong>이치환체에서는 각 양성자마다 두 치환기의 관계를 따로 따져야 한다</strong>는 점이 핵심입니다.',
         en: 'That proton is ortho to NO<sub>2</sub> and meta to CH<sub>3</sub>: δ = 7.26 + 0.95 + (−0.09) = <strong>8.12</strong> (measured 8.10). The other proton (ortho to CH<sub>3</sub>, meta to NO<sub>2</sub>) comes out at 7.26 − 0.17 + 0.26 = 7.35 (measured 7.32). The key point is that <strong>in a disubstituted ring you must work out each proton relationship to each substituent separately</strong>.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'C8', set: 'aromatic', type: 'mc', d: 2,
    spec: { peaks: [{ ppm: 8.20, mult: 'd', H: 2 }, { ppm: 6.95, mult: 'd', H: 2 }, { ppm: 3.90, mult: 's', H: 3 }], min: 3, max: 9 },
    q: { ko: '분자식 C<sub>7</sub>H<sub>7</sub>NO<sub>3</sub>인 화합물의 스펙트럼입니다: δ 8.20 (2H, d, J = 9 Hz), 6.95 (2H, d, J = 9 Hz), 3.90 (3H, s). 구조는?',
         en: 'A compound of formula C<sub>7</sub>H<sub>7</sub>NO<sub>3</sub> gives δ 8.20 (2H, d, J = 9 Hz), 6.95 (2H, d, J = 9 Hz), 3.90 (3H, s). What is it?' },
    o: [
      { ko: '4-나이트로아니솔 (4-nitroanisole)', en: '4-Nitroanisole' },
      { ko: '2-나이트로아니솔 (2-nitroanisole)', en: '2-Nitroanisole' },
      { ko: '3-나이트로아니솔 (3-nitroanisole)', en: '3-Nitroanisole' },
      { ko: '4-나이트로톨루엔 (4-nitrotoluene)', en: '4-Nitrotoluene' }
    ], a: 0,
    e: { ko: '① <strong>2H 이중선 두 개가 대칭으로</strong> 나오고 J ≈ 9 Hz(ortho 짝지음)인 것은 para-이치환의 전형적인 AA′BB′ 패턴입니다. ortho나 meta 이성질체라면 네 개의 서로 다른 양성자가 복잡한 패턴을 만듭니다. ② δ 3.90의 3H 단일선은 OCH<sub>3</sub>입니다(4-나이트로톨루엔의 ArCH<sub>3</sub>라면 δ 2.4 부근이고, 분자식에도 산소가 하나 부족합니다). ③ 계산: NO<sub>2</sub>에 ortho인 H = 7.26 + 0.95 − 0.09 = 8.12, OCH<sub>3</sub>에 ortho인 H = 7.26 − 0.48 + 0.26 = 7.04. 실측 8.20 / 6.95와 잘 맞습니다. 강한 EWG와 강한 EDG가 마주 보아 두 신호의 간격이 1.25 ppm까지 벌어졌습니다.',
         en: '① <strong>Two symmetric 2H doublets</strong> with J ≈ 9 Hz (ortho coupling) is the classic AA′BB′ pattern of a para-disubstituted ring; an ortho or meta isomer would give four distinct protons in a messy pattern. ② The 3H singlet at δ 3.90 is OCH<sub>3</sub> — an ArCH<sub>3</sub> as in 4-nitrotoluene would be near δ 2.4, and that formula is also short one oxygen. ③ Calculation: H ortho to NO<sub>2</sub> = 7.26 + 0.95 − 0.09 = 8.12; H ortho to OCH<sub>3</sub> = 7.26 − 0.48 + 0.26 = 7.04, matching the observed 8.20 / 6.95. A strong EWG facing a strong EDG has opened the gap to 1.25 ppm.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'C9', set: 'aromatic', type: 'multi', d: 1,
    q: { ko: '벤젠 고리에 붙었을 때 고리 양성자를 <strong>다운필드</strong>로 보내는 치환기(EWG)를 모두 고르세요.',
         en: 'Select every substituent that moves ring protons <strong>downfield</strong> (i.e. every EWG).' },
    o: [{ ko: '–NO<sub>2</sub>', en: '–NO<sub>2</sub>' }, { ko: '–OCH<sub>3</sub>', en: '–OCH<sub>3</sub>' },
        { ko: '–C≡N', en: '–C≡N' }, { ko: '–COOH', en: '–COOH' }, { ko: '–N(CH<sub>3</sub>)<sub>2</sub>', en: '–N(CH<sub>3</sub>)<sub>2</sub>' }],
    a: [0, 2, 3],
    e: { ko: 'EWG: –NO<sub>2</sub>(o +0.95), –CN(o +0.36), –COOH(o +0.85). EDG: –OCH<sub>3</sub>(o −0.48), –N(CH<sub>3</sub>)<sub>2</sub>(o −0.66, p −0.67). 산소나 질소가 붙어 있다고 무조건 EWG인 것이 아닙니다. <strong>비공유 전자쌍을 고리에 내줄 수 있으면 EDG</strong>이고, π 결합으로 전자를 받아갈 수 있으면(C=O, N=O, C≡N) EWG입니다.',
         en: 'EWGs: –NO<sub>2</sub> (o +0.95), –CN (o +0.36), –COOH (o +0.85). EDGs: –OCH<sub>3</sub> (o −0.48) and –N(CH<sub>3</sub>)<sub>2</sub> (o −0.66, p −0.67). Containing oxygen or nitrogen does not make a group withdrawing. <strong>If it can hand a lone pair to the ring it is a donor</strong>; if it can accept density into a π bond (C=O, N=O, C≡N) it is a withdrawer.' },
    ref: 'Pretsch et al., 4th ed., 2009.'
  });
  Q.push({
    id: 'C10', set: 'aromatic', type: 'mc', d: 2,
    q: { ko: '친전자성 방향족 치환(EAS)에서 <strong>ortho/para 배향성이면서 활성화기</strong>인 치환기가 있습니다. 이 치환기가 <sup>1</sup>H NMR에서 고리 양성자에 미치는 영향은?',
         en: 'A substituent is <strong>ortho/para directing and activating</strong> in electrophilic aromatic substitution. What does it do to the ring protons in the <sup>1</sup>H NMR?' },
    o: [
      { ko: 'ortho·para 양성자를 업필드로 보낸다', en: 'It moves the ortho and para protons upfield' },
      { ko: 'ortho·para 양성자를 다운필드로 보낸다', en: 'It moves the ortho and para protons downfield' },
      { ko: 'meta 양성자만 크게 업필드로 보낸다', en: 'It moves only the meta proton strongly upfield' },
      { ko: '배향성과 화학적 이동 사이에는 아무 관계가 없다', en: 'Directing effects and chemical shift are unrelated' }
    ], a: 0,
    e: { ko: '두 현상은 <strong>같은 전자 밀도 논리</strong>를 공유합니다. 활성화기는 고리를 전자 풍부하게 만들어 친전자체의 공격을 쉽게 하고, 같은 전자 밀도가 양성자를 차폐하여 업필드로 보냅니다. 그리고 그 밀도가 쌓이는 자리가 곧 ortho·para이므로 배향성 위치와 화학적 이동이 크게 변하는 위치가 일치합니다.<br>정리: <strong>활성화기(EDG) = ortho/para 배향 = ortho·para 업필드</strong> / <strong>비활성화기(EWG) = meta 배향 = ortho·para 다운필드</strong>. 예외는 할로젠으로, ortho/para 배향이면서 비활성화기이고 NMR에서도 이동이 거의 없습니다.',
         en: 'The two phenomena share <strong>the same electron-density logic</strong>. An activating group makes the ring electron-rich, which speeds up electrophilic attack and, by the same density, shields the protons and moves them upfield. And the positions where that density accumulates are exactly ortho and para, so the directing positions coincide with the positions whose shifts change most.<br>Summary: <strong>activating (EDG) = ortho/para directing = ortho and para upfield</strong>; <strong>deactivating (EWG) = meta directing = ortho and para downfield</strong>. Halogens are the exception: ortho/para directing yet deactivating, and barely shifted in the NMR.' },
    ref: 'Clayden, Greeves & Warren, Organic Chemistry, 2nd ed., Ch. 21; Pavia et al., 5th ed., Ch. 3.13.'
  });
  Q.push({
    id: 'C11', set: 'aromatic', type: 'mc', d: 3,
    spec: { peaks: [{ ppm: 9.88, mult: 's', H: 1 }, { ppm: 7.84, mult: 'd', H: 2 }, { ppm: 7.00, mult: 'd', H: 2 }, { ppm: 3.89, mult: 's', H: 3 }], min: 3, max: 10.5 },
    q: { ko: 'C<sub>8</sub>H<sub>8</sub>O<sub>2</sub>: δ 9.88 (1H, s), 7.84 (2H, d), 7.00 (2H, d), 3.89 (3H, s). 이 화합물은?',
         en: 'C<sub>8</sub>H<sub>8</sub>O<sub>2</sub>: δ 9.88 (1H, s), 7.84 (2H, d), 7.00 (2H, d), 3.89 (3H, s). Identify the compound.' },
    o: [
      { ko: '4-메톡시벤즈알데하이드 (4-methoxybenzaldehyde)', en: '4-Methoxybenzaldehyde' },
      { ko: '메틸 벤조에이트 (methyl benzoate)', en: 'Methyl benzoate' },
      { ko: '4-메틸벤조산 (4-methylbenzoic acid)', en: '4-Methylbenzoic acid' },
      { ko: '페닐 아세테이트 (phenyl acetate)', en: 'Phenyl acetate' }
    ], a: 0,
    e: { ko: 'δ 9.88 단일선은 알데하이드 양성자입니다(카복실산이라면 δ 10–13의 넓은 신호, 에스터라면 그 자리에 아무것도 없어야 합니다). 2H 이중선 두 개는 para-이치환을 뜻하고, δ 3.89 3H 단일선은 OCH<sub>3</sub>입니다.<br>검증: CHO에 ortho인 H = 7.26 + 0.56 − 0.09 = 7.73 (실측 7.84), OCH<sub>3</sub>에 ortho인 H = 7.26 − 0.48 + 0.22 = 7.00 (실측 7.00). 한쪽은 EWG로 밀리고 다른 쪽은 EDG로 당겨져 0.84 ppm 벌어졌습니다. 메틸 벤조에이트라면 방향족이 5H(일치환)로 나옵니다.',
         en: 'The δ 9.88 singlet is an aldehyde proton (a carboxylic acid would give a broad δ 10–13 signal, and an ester nothing there at all). Two 2H doublets mean para substitution, and the 3H singlet at δ 3.89 is OCH<sub>3</sub>.<br>Check: H ortho to CHO = 7.26 + 0.56 − 0.09 = 7.73 (obs. 7.84); H ortho to OCH<sub>3</sub> = 7.26 − 0.48 + 0.22 = 7.00 (obs. 7.00). One side is pushed by the EWG and the other pulled by the EDG, opening a 0.84 ppm gap. Methyl benzoate would show 5 aromatic protons instead.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'C12', set: 'aromatic', type: 'mc', d: 2,
    q: { ko: '아세토페논(C<sub>6</sub>H<sub>5</sub>COCH<sub>3</sub>)과 아니솔(C<sub>6</sub>H<sub>5</sub>OCH<sub>3</sub>)을 비교할 때 옳은 것은?',
         en: 'Comparing acetophenone (C<sub>6</sub>H<sub>5</sub>COCH<sub>3</sub>) with anisole (C<sub>6</sub>H<sub>5</sub>OCH<sub>3</sub>), which statement is correct?' },
    o: [
      { ko: '아세토페논의 고리 양성자가 더 다운필드이고, 두 화합물의 메틸 양성자는 아니솔 쪽이 더 다운필드이다', en: 'The ring protons of acetophenone are further downfield, while the methyl protons of anisole are further downfield' },
      { ko: '고리 양성자와 메틸 양성자 모두 아세토페논 쪽이 더 다운필드이다', en: 'Both the ring protons and the methyl protons of acetophenone are further downfield' },
      { ko: '고리 양성자와 메틸 양성자 모두 아니솔 쪽이 더 다운필드이다', en: 'Both the ring protons and the methyl protons of anisole are further downfield' },
      { ko: '두 화합물의 고리 양성자는 거의 같은 위치에 나온다', en: 'The ring protons of the two compounds appear at essentially the same position' }
    ], a: 0,
    e: { ko: '<strong>고리</strong>: 아세토페논의 –COCH<sub>3</sub>는 EWG(o +0.62)이므로 ortho H가 δ 7.9 부근, 아니솔은 EDG(o −0.48)이므로 δ 6.9 부근입니다. <strong>메틸</strong>: 아세토페논의 CH<sub>3</sub>는 카보닐 <em>탄소</em>에 붙어 δ 2.60, 아니솔의 CH<sub>3</sub>는 <em>산소</em>에 직접 붙어 δ 3.80입니다. 즉 고리와 메틸의 순서가 서로 뒤집힙니다. 이것이 “EWG/EDG 논의는 고리에 대한 것이고, 치환기 자체 양성자는 자기가 무엇에 붙어 있는지로 판단한다”는 원칙의 가장 깔끔한 예입니다.',
         en: '<strong>Ring</strong>: the –COCH<sub>3</sub> of acetophenone is an EWG (o +0.62), putting its ortho protons near δ 7.9, while anisole is a donor (o −0.48) with ortho protons near δ 6.9. <strong>Methyl</strong>: the methyl of acetophenone is on a carbonyl <em>carbon</em> at δ 2.60, whereas the methyl of anisole is bonded straight to <em>oxygen</em> at δ 3.80. The two orderings are reversed. This is the cleanest illustration of the rule that EWG/EDG talk concerns the ring, while a substituent own protons are judged by what they are attached to.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'C13', set: 'aromatic', type: 'mc', d: 3,
    q: { ko: 'para-이치환 벤젠 두 개를 측정했더니 A는 δ 8.15와 6.68에 이중선이, B는 δ 7.24와 7.18에 이중선이 나왔습니다. 가장 타당한 해석은?',
         en: 'Two para-disubstituted benzenes are measured. A gives doublets at δ 8.15 and 6.68; B gives doublets at δ 7.24 and 7.18. What is the most reasonable interpretation?' },
    o: [
      { ko: 'A는 강한 EWG와 강한 EDG가 마주 보고 있고, B는 두 치환기의 전자적 성질이 비슷하거나 둘 다 약하다', en: 'A has a strong EWG facing a strong EDG; in B the two substituents are similar in character, or both weak' },
      { ko: 'A는 두 치환기가 모두 EWG이고, B는 모두 EDG이다', en: 'A has two EWGs and B has two EDGs' },
      { ko: 'A는 para 치환이 아니라 ortho 치환이다', en: 'A is ortho-substituted rather than para' },
      { ko: 'B는 치환기가 없는 벤젠이다', en: 'B is unsubstituted benzene' }
    ], a: 0,
    e: { ko: '두 이중선의 간격이 크다는 것은 한쪽 양성자 짝은 크게 밀리고 다른 짝은 크게 당겨졌다는 뜻입니다(A: 1.47 ppm 차이 → 예컨대 NO<sub>2</sub>와 NH<sub>2</sub>). 간격이 작으면 두 치환기가 같은 방향으로 비슷하게 작용했거나 둘 다 약한 경우입니다(B: 0.06 ppm). 두 치환기가 모두 EWG면 <em>둘 다</em> 다운필드로 가므로 간격이 아니라 위치가 함께 올라갑니다. 벤젠 자체는 6H 단일선 하나이므로 이중선 두 개가 나올 수 없습니다.',
         en: 'A large gap between the doublets means one pair of protons was pushed hard and the other pulled hard (A: 1.47 ppm, consistent with something like NO<sub>2</sub> facing NH<sub>2</sub>). A small gap means the two substituents act similarly, or both weakly (B: 0.06 ppm). Two EWGs would send <em>both</em> pairs downfield — the whole pattern moves left rather than spreading apart. Benzene itself is one 6H singlet and cannot give two doublets.' },
    ref: 'Pretsch et al., 4th ed., 2009; Pavia et al., 5th ed., Ch. 5.'
  });
  Q.push({
    id: 'C14', set: 'aromatic', type: 'mc', d: 2,
    q: { ko: '나이트로벤젠에서 <strong>meta</strong> 양성자조차 벤젠(7.26)보다 약간 다운필드인 δ 7.52에 나타납니다. 그 이유는?',
         en: 'Even the <strong>meta</strong> proton of nitrobenzene is slightly downfield of benzene, at δ 7.52 versus 7.26. Why?' },
    o: [
      { ko: '공명은 meta에 작용하지 않지만, 위치를 가리지 않는 유도 효과가 남아 있기 때문', en: 'Resonance does not reach meta, but the position-independent inductive effect still does' },
      { ko: 'meta 위치에서 고리 전류가 강해지기 때문', en: 'The ring current is stronger at the meta position' },
      { ko: 'meta 양성자가 ortho 양성자와 짝지음을 하기 때문', en: 'Because the meta proton couples to the ortho proton' },
      { ko: '실험 오차이며 실제로는 7.26이다', en: 'It is experimental error; the real value is 7.26' }
    ], a: 0,
    e: { ko: 'NO<sub>2</sub>는 질소가 형식 양전하를 갖는 매우 강한 −I 그룹이기도 합니다. 유도 효과는 위치 선택성이 없으므로 고리 전체를 조금씩 다운필드로 밀고, meta에는 그 성분만 남아 +0.26이 됩니다. 반면 공명 성분이 더해지는 ortho(+0.95)와 para(+0.38)는 훨씬 크게 이동합니다. <strong>meta 증분의 크기 자체가 그 치환기의 유도 효과 세기를 재는 눈금</strong>이라고 볼 수 있습니다. 짝지음은 신호를 갈라지게 할 뿐 중심 위치를 옮기지 않습니다.',
         en: 'NO<sub>2</sub> is also a very strong −I group, with formal positive charge on nitrogen. Induction has no positional preference, so it nudges the whole ring downfield; at meta only that component survives, giving +0.26. At ortho (+0.95) and para (+0.38) the resonance component adds on top. In effect, <strong>the size of the meta increment is a gauge of a substituent inductive strength</strong>. Coupling splits a signal but never moves its centre.' },
    ref: 'Pretsch et al., 4th ed., 2009; Clayden et al., 2nd ed., Ch. 21.'
  });
  Q.push({
    id: 'C15', set: 'aromatic', type: 'mc', d: 3,
    q: { ko: 'EWG가 붙은 벤젠에서 언제나 <strong>ortho 양성자가 para 양성자보다 더 다운필드</strong>인 이유로 가장 적절한 것은?',
         en: 'In an EWG-substituted benzene the <strong>ortho proton is always further downfield than the para</strong>. What best explains this?' },
    o: [
      { ko: 'ortho는 공명 효과와 유도 효과를 모두 크게 받지만, para는 사실상 공명 효과만 받기 때문', en: 'The ortho position feels both the resonance and (being close) the inductive effect, while para feels essentially only the resonance effect' },
      { ko: 'ortho 양성자가 2개이고 para 양성자가 1개이기 때문', en: 'Because there are two ortho protons and only one para proton' },
      { ko: 'ortho 양성자만 치환기와 짝지음을 하기 때문', en: 'Because only the ortho proton couples to the substituent' },
      { ko: 'para 위치에서는 고리 전류가 상쇄되기 때문', en: 'Because the ring current cancels at the para position' }
    ], a: 0,
    e: { ko: '공명에 의한 π 전자 밀도 감소는 ortho와 para에 비슷하게 작용합니다. 여기에 거리에 의존하는 유도 효과가 ortho에만 의미 있게 더해지고, 치환기의 자기 이방성(예: C=O, N=O의 비차폐 영역)도 가까운 ortho에 더 크게 작용합니다. 그래서 대부분의 EWG에서 ortho 증분이 para의 2–3배가 됩니다(NO<sub>2</sub>: 0.95 대 0.38). 적분값의 크기는 화학적 이동과 무관합니다.',
         en: 'The resonance-driven loss of π density is similar at ortho and para. On top of that, the distance-dependent inductive effect adds meaningfully only at ortho, and the substituent own magnetic anisotropy (the deshielding region of C=O or N=O) also reaches the nearer position more strongly. Hence for most EWGs the ortho increment is two to three times the para one (NO<sub>2</sub>: 0.95 versus 0.38). Integral size has nothing to do with chemical shift.' },
    ref: 'Pretsch et al., 4th ed., 2009; Silverstein et al., 8th ed., Ch. 3.'
  });
  Q.push({
    id: 'C16', set: 'aromatic', type: 'num', d: 3, tol: 0.3, unit: 'ppm',
    q: { ko: '4-메틸아니솔(4-methylanisole)에서 <strong>OCH<sub>3</sub>에 ortho인 고리 양성자</strong>의 δ를 계산하세요. 증분: OCH<sub>3</sub>(o −0.48, m −0.09, p −0.44), CH<sub>3</sub>(o −0.17, m −0.09, p −0.18).',
         en: 'Calculate δ for the <strong>ring proton ortho to OCH<sub>3</sub></strong> in 4-methylanisole. Increments: OCH<sub>3</sub> (o −0.48, m −0.09, p −0.44), CH<sub>3</sub> (o −0.17, m −0.09, p −0.18).' },
    a: 6.69,
    e: { ko: '그 양성자는 OCH<sub>3</sub>에 ortho, CH<sub>3</sub>에 meta입니다. δ = 7.26 − 0.48 − 0.09 = <strong>6.69</strong> (실측 6.80). 다른 쪽 양성자(CH<sub>3</sub>에 ortho, OCH<sub>3</sub>에 meta)는 7.26 − 0.17 − 0.09 = 7.00 (실측 7.07)입니다. 두 치환기가 <strong>모두 EDG</strong>이므로 두 신호가 서로 반대 방향으로 벌어지지 않고 함께 업필드로 옮겨 가며, 간격도 0.3 ppm 정도로 좁습니다. C13 문항의 “간격” 논리와 함께 보세요.',
         en: 'That proton is ortho to OCH<sub>3</sub> and meta to CH<sub>3</sub>: δ = 7.26 − 0.48 − 0.09 = <strong>6.69</strong> (measured 6.80). The other proton (ortho to CH<sub>3</sub>, meta to OCH<sub>3</sub>) gives 7.26 − 0.17 − 0.09 = 7.00 (measured 7.07). Since <strong>both substituents are donors</strong>, the two signals do not spread apart in opposite directions; they move upfield together and stay only about 0.3 ppm apart. Read this alongside the gap argument in question C13.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });

  /* ============================================================ SET D */
  Q.push({
    id: 'D1', set: 'confusions', type: 'mc', d: 2,
    q: { ko: '아니솔에서 고리 양성자는 δ 6.9 부근으로 벤젠보다 업필드인데, 같은 분자의 OCH<sub>3</sub> 양성자는 δ 3.80으로 메탄올의 CH<sub>3</sub>(3.40)보다도 다운필드입니다. 이를 어떻게 설명해야 합니까?',
         en: 'In anisole the ring protons sit near δ 6.9, upfield of benzene, yet the OCH<sub>3</sub> protons of the same molecule are at δ 3.80 — even downfield of the methyl of methanol (3.40). How should this be explained?' },
    o: [
      { ko: '모순이 아니다. 고리는 산소가 <em>내준</em> π 전자로 차폐되고, 메틸 양성자는 자기가 <em>붙어 있는</em> 산소의 유도 효과로 비차폐된다', en: 'There is no contradiction: the ring is shielded by the π density the oxygen <em>donates</em>, while the methyl protons are deshielded by induction from the oxygen they are <em>attached to</em>' },
      { ko: '실험 오차이며 OCH<sub>3</sub>는 실제로 δ 1 부근이어야 한다', en: 'It is experimental error; OCH<sub>3</sub> should really be near δ 1' },
      { ko: 'OCH<sub>3</sub>가 EWG로 작용했기 때문이다', en: 'It happens because OCH<sub>3</sub> is acting as an EWG here' },
      { ko: '고리 전류가 메틸 양성자를 차폐하기 때문이다', en: 'The ring current shields the methyl protons' }
    ], a: 0,
    e: { ko: 'EWG/EDG라는 분류는 <strong>고리에 대해</strong> 무엇을 하는지를 말합니다. 치환기 자신에 속한 양성자는 그 논의와 별개로, <strong>자기가 어떤 원자에 결합해 있는지</strong>로 판단해야 합니다. OCH<sub>3</sub>의 메틸은 전기음성도가 큰 산소에 직결되어 있으므로 당연히 다운필드입니다(참고: 다이메틸 에터 3.24, 메탄올 3.40, 아니솔 3.80 — 아니솔이 조금 더 높은 것은 고리와의 공액 및 고리 전류의 영향입니다. 세 값 모두 Pavia 상관표 기준). 같은 구조의 함정이 <sup>13</sup>C의 ipso 탄소에서도 반복됩니다.',
         en: 'The EWG/EDG label describes what a group does <strong>to the ring</strong>. Protons belonging to the substituent itself are judged separately, by <strong>what atom they are bonded to</strong>. The methyl of OCH<sub>3</sub> hangs off an electronegative oxygen, so of course it is downfield (compare dimethyl ether 3.24, methanol 3.40, anisole 3.80, all on the Pavia correlation table — the extra shift in anisole comes from conjugation with the ring and its ring current). The same trap recurs at the ipso carbon in <sup>13</sup>C.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.6-3.9 and Appendix 1 (correlation chart); SDBS (AIST), anisole.'
  });
  Q.push({
    id: 'D2', set: 'confusions', type: 'mc', d: 2,
    q: { ko: 'sp 탄소는 sp<sup>2</sup>보다 전기음성도가 큽니다. 그런데도 말단 알카인의 ≡C–H(δ 1.8–3.0)가 알켄의 =C–H(δ 5.3)보다 훨씬 업필드인 이유는?',
         en: 'An sp carbon is more electronegative than an sp<sup>2</sup> carbon, yet the ≡C–H of a terminal alkyne (δ 1.8–3.0) is far upfield of an alkene =C–H (δ 5.3). Why?' },
    o: [
      { ko: '삼중결합의 원통형 π 전자 순환이 만드는 차폐 원뿔 축 위에 C–H가 놓여 있어, 이방성 차폐가 유도 효과를 압도하기 때문', en: 'The C–H lies along the axis of the shielding cone produced by the cylindrical π circulation of the triple bond, and that anisotropic shielding overwhelms the inductive effect' },
      { ko: '알카인 양성자는 산성이어서 빠르게 교환되기 때문', en: 'The alkyne proton is acidic and exchanges rapidly' },
      { ko: 'sp 탄소가 사실은 전기음성도가 더 작기 때문', en: 'The sp carbon is actually the less electronegative one' },
      { ko: '알카인은 짝지음을 하지 않기 때문', en: 'Alkynes do not undergo coupling' }
    ], a: 0,
    e: { ko: '유도 효과만 보면 알카인 양성자가 더 다운필드여야 하지만, 실제로는 3 ppm 이상 업필드입니다. 삼중결합의 π 전자는 결합축을 둘러싸고 원통형으로 순환하며, 결합축 방향(즉 ≡C–H가 놓인 방향)으로 B<sub>0</sub>를 <em>상쇄</em>하는 자기장을 만듭니다. 알켄에서는 반대로 양성자가 비차폐 영역에 놓입니다. <strong>이방성이 전기음성도 논리를 뒤집는 대표 사례</strong>이며, 알카인 양성자는 확실히 산성이지만(pK<sub>a</sub> ≈ 25) 그 산성도가 화학적 이동을 설명하지는 않습니다.',
         en: 'On induction alone the alkyne proton should be further downfield; in fact it is more than 3 ppm upfield. The π electrons of a triple bond circulate cylindrically about the bond axis and generate a field that <em>opposes</em> B<sub>0</sub> along that axis — exactly where the ≡C–H sits. In an alkene the proton lies in the deshielding region instead. This is <strong>the standard case of anisotropy overturning electronegativity</strong>. The alkyne proton is indeed acidic (pK<sub>a</sub> ≈ 25), but its acidity is not what sets the shift.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.12; Clayden et al., 2nd ed., Ch. 13.'
  });
  Q.push({
    id: 'D3', set: 'confusions', type: 'mc', d: 3,
    q: { ko: '<sup>13</sup>C NMR에서 아니솔의 ipso 탄소는 δ 159.9, 나이트로벤젠의 ipso 탄소는 δ 148.3입니다. EDG인 아니솔 쪽이 더 다운필드인 이유는?',
         en: 'In <sup>13</sup>C NMR the ipso carbon of anisole is δ 159.9 while that of nitrobenzene is δ 148.3. Why is the donor-substituted one further downfield?' },
    o: [
      { ko: 'ipso 탄소는 산소에 직접 결합해 있어 유도 효과가 지배적이며, 공명에 의한 전자 밀도는 ortho·para 탄소로 전달되기 때문', en: 'The ipso carbon is bonded directly to oxygen, so induction dominates there; the resonance-donated density is delivered to the ortho and para carbons instead' },
      { ko: 'OCH<sub>3</sub>가 <sup>13</sup>C에서는 EWG로 작용하기 때문', en: 'OCH<sub>3</sub> acts as an EWG in <sup>13</sup>C spectra' },
      { ko: '<sup>13</sup>C에서는 차폐와 비차폐의 방향이 <sup>1</sup>H와 반대이기 때문', en: 'Shielding and deshielding run in the opposite direction in <sup>13</sup>C' },
      { ko: '아니솔의 ipso 탄소가 사차 탄소이기 때문', en: 'Because the ipso carbon of anisole is quaternary' }
    ], a: 0,
    e: { ko: '아니솔의 ortho(114.1)와 para(120.7) 탄소는 벤젠(128.5)보다 크게 <strong>업필드</strong>로, <sup>1</sup>H와 완전히 같은 논리를 따릅니다. 오직 ipso만 예외처럼 보이는데, 이는 그 탄소가 산소에 직결되어 있어 유도 효과가 압도하기 때문입니다. 정리하면 <strong>직접 결합한 원자의 전기음성도 → ipso를 지배 / 공명으로 전달된 전자 밀도 → ortho·para를 지배</strong>입니다. 차폐의 방향(δ가 클수록 비차폐)은 <sup>1</sup>H와 <sup>13</sup>C가 동일합니다.',
         en: 'The ortho (114.1) and para (120.7) carbons of anisole are far <strong>upfield</strong> of benzene (128.5), following exactly the same logic as <sup>1</sup>H. Only the ipso carbon looks anomalous, because it is bonded straight to oxygen and induction dominates there. In short: <strong>the electronegativity of the directly bonded atom controls ipso; resonance-delivered density controls ortho and para</strong>. The direction of shielding (larger δ = more deshielded) is identical for <sup>1</sup>H and <sup>13</sup>C.' },
    ref: 'Pretsch et al., 4th ed., 2009 (13C substituent tables); Pavia et al., 5th ed., Ch. 4.'
  });
  Q.push({
    id: 'D4', set: 'confusions', type: 'mc', d: 2,
    q: { ko: '1-클로로프로페인은 δ 3.47 (t), 1.81 (sext), 1.03 (t)이고 1-나이트로프로페인은 δ 4.38 (t), 2.07 (sext), 1.03 (t)입니다. NO<sub>2</sub>가 Cl보다 강한 EWG라는 사실이 스펙트럼에 어떻게 나타났습니까?',
         en: '1-Chloropropane gives δ 3.47 (t), 1.81 (sext), 1.03 (t); 1-nitropropane gives δ 4.38 (t), 2.07 (sext), 1.03 (t). How does the greater withdrawing power of NO<sub>2</sub> show up?' },
    o: [
      { ko: '다중도와 J는 그대로이고 α·β 신호의 δ만 커졌다', en: 'The multiplicities and J values are unchanged; only the δ of the α and β signals increased' },
      { ko: '다중선의 갈라짐 개수가 늘어났다', en: 'The number of lines in each multiplet increased' },
      { ko: 'J 값이 커졌다', en: 'The J values increased' },
      { ko: '적분비가 달라졌다', en: 'The integration ratios changed' }
    ], a: 0,
    e: { ko: '치환기의 전자 효과는 <strong>신호의 위치(δ)</strong>만 바꿉니다. 다중도는 이웃 양성자 수(n+1 규칙)로 결정되고, J는 결합을 통한 상호작용으로 두 화합물 모두 약 7 Hz입니다. 적분비도 3:2:2로 동일합니다. “EWG가 강할수록 갈라짐이 커진다”는 매우 흔한 오해입니다. 또한 γ-CH<sub>3</sub>가 두 화합물에서 똑같이 δ 1.03이라는 점은 유도 효과의 거리 감쇠를 다시 보여 줍니다.',
         en: 'Electronic effects of a substituent change only <strong>where the signal sits</strong>. Multiplicity is set by the number of neighbours (the n+1 rule), and J is a through-bond interaction, about 7 Hz in both compounds. The integration ratio is 3:2:2 in both. “A stronger EWG splits the signal more” is a very common misconception. Note too that the γ-CH<sub>3</sub> is δ 1.03 in both, another demonstration that induction dies off with distance.' },
    ref: 'Pavia et al., 5th ed., Ch. 5; SDBS (AIST).'
  });
  Q.push({
    id: 'D5', set: 'confusions', type: 'multi', d: 3,
    q: { ko: '다음 서술 중 <strong>옳은 것</strong>을 모두 고르세요.',
         en: 'Select every <strong>correct</strong> statement.' },
    o: [
      { ko: 'EDG가 붙은 벤젠에서 meta 양성자는 ortho·para 양성자보다 훨씬 적게 이동한다', en: 'On an EDG-substituted benzene the meta proton shifts far less than the ortho and para protons' },
      { ko: '아니솔의 ortho 양성자(δ 6.89)는 벤젠보다는 업필드지만 알켄 양성자(δ 5.3)보다는 다운필드이다', en: 'The ortho proton of anisole (δ 6.89) is upfield of benzene but still downfield of an alkene proton (δ 5.3)' },
      { ko: '차폐가 강해지면 δ가 커진다', en: 'Stronger shielding means a larger δ' },
      { ko: '벤조산의 고리 양성자는 벤젠보다 전반적으로 다운필드이다', en: 'The ring protons of benzoic acid are overall downfield of benzene' }
    ], a: [0, 1, 3],
    e: { ko: '③이 틀렸습니다. 차폐가 강해지면 δ는 <strong>작아집니다</strong>(업필드). ①은 공명 효과가 ortho·para에만 작용하기 때문이고, ②는 치환기 효과(±0.7 ppm 수준)가 고리 전류라는 큰 바탕 위에 얹히기 때문이며, ④는 –COOH가 EWG(o +0.85, m +0.18, p +0.27)이기 때문입니다.',
         en: 'Statement 3 is wrong: stronger shielding makes δ <strong>smaller</strong> (upfield). Statement 1 holds because resonance acts only at ortho and para; statement 2 because substituent effects of about ±0.7 ppm ride on top of a large ring-current baseline; statement 4 because –COOH is an EWG (o +0.85, m +0.18, p +0.27).' },
    ref: 'Pretsch et al., 4th ed., 2009; Pavia et al., 5th ed., Ch. 3.'
  });
  Q.push({
    id: 'D6', set: 'confusions', type: 'mc', d: 1,
    q: { ko: '“업필드(upfield)”에 해당하지 <strong>않는</strong> 표현은?',
         en: 'Which phrase does <strong>not</strong> belong with “upfield”?' },
    o: [
      { ko: '스펙트럼의 오른쪽', en: 'The right-hand side of the spectrum' },
      { ko: 'δ 값이 작음', en: 'Smaller δ' },
      { ko: '차폐가 강함', en: 'More strongly shielded' },
      { ko: '전자 밀도가 낮음', en: 'Lower electron density' }
    ], a: 3,
    e: { ko: '업필드는 <strong>전자 밀도가 높은</strong> 쪽입니다. 전자가 많아 차폐가 강하고, 그래서 δ가 작으며, 스펙트럼 오른쪽에 나타납니다. 전자 밀도가 낮은 것은 다운필드입니다.',
         en: 'Upfield is the <strong>electron-rich</strong> side: plenty of electrons means strong shielding, hence a small δ and a position on the right of the spectrum. Low electron density belongs with downfield.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.3.'
  });
  Q.push({
    id: 'D7', set: 'confusions', type: 'mc', d: 2,
    q: { ko: '“p-나이트로아닐린에서 NH<sub>2</sub>가 EDG이므로 <em>모든</em> 고리 양성자가 벤젠보다 업필드일 것이다.” 이 추론의 문제점은?',
         en: '“In p-nitroaniline, NH<sub>2</sub> is an EDG, so <em>every</em> ring proton must be upfield of benzene.” What is wrong with this reasoning?' },
    o: [
      { ko: '각 양성자마다 두 치환기와의 관계가 다르므로 증분을 모두 더해야 한다. NO<sub>2</sub>에 ortho인 양성자는 오히려 크게 다운필드이다', en: 'Each proton has a different relationship to each substituent, so all the increments must be added. The protons ortho to NO<sub>2</sub> end up strongly downfield instead' },
      { ko: 'NH<sub>2</sub>는 사실 EWG이다', en: 'NH<sub>2</sub> is actually an EWG' },
      { ko: 'p-나이트로아닐린은 방향족이 아니다', en: 'p-Nitroaniline is not aromatic' },
      { ko: 'NH<sub>2</sub>의 효과가 NO<sub>2</sub>보다 항상 크다', en: 'The effect of NH<sub>2</sub> is always larger than that of NO<sub>2</sub>' }
    ], a: 0,
    e: { ko: 'p-나이트로아닐린의 계산: NO<sub>2</sub>에 ortho이고 NH<sub>2</sub>에 meta인 양성자는 7.26 + 0.95 − 0.25 = 7.96 (실측 8.06), NH<sub>2</sub>에 ortho이고 NO<sub>2</sub>에 meta인 양성자는 7.26 − 0.75 + 0.26 = 6.77 (실측 6.60). 즉 한쪽은 벤젠보다 다운필드, 다른 쪽은 업필드입니다. <strong>이치환체에서는 “이 분자에 EDG가 있다”가 아니라 “이 양성자에서 볼 때 각 치환기가 무엇인가”를 따져야 합니다.</strong>',
         en: 'Working it out: the proton ortho to NO<sub>2</sub> and meta to NH<sub>2</sub> gives 7.26 + 0.95 − 0.25 = 7.96 (obs. 8.06), while the proton ortho to NH<sub>2</sub> and meta to NO<sub>2</sub> gives 7.26 − 0.75 + 0.26 = 6.77 (obs. 6.60). One set is downfield of benzene and the other upfield. <strong>In a disubstituted ring the question is never “does this molecule contain an EDG” but “what is each substituent relative to this particular proton”.</strong>' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'D8', set: 'confusions', type: 'mc', d: 2,
    q: { ko: '톨루엔의 CH<sub>3</sub>는 δ 2.32로, 에테인의 CH<sub>3</sub>(δ 0.86)보다 뚜렷하게 다운필드입니다. 주된 이유는?',
         en: 'The methyl of toluene is at δ 2.32, clearly downfield of the methyl of ethane (δ 0.86). What is the main reason?' },
    o: [
      { ko: '벤젠 고리의 고리 전류(이방성)가 메틸 양성자를 비차폐시키기 때문', en: 'The ring current (anisotropy) of the benzene ring deshields the methyl protons' },
      { ko: 'CH<sub>3</sub>가 EDG여서 스스로 다운필드로 가기 때문', en: 'Because CH<sub>3</sub> is an EDG it moves itself downfield' },
      { ko: '고리가 메틸에서 전자를 강하게 끌어당기는 EWG이기 때문', en: 'The ring is an EWG that pulls electron density hard out of the methyl' },
      { ko: '메틸 양성자가 고리 양성자와 짝지음하기 때문', en: 'The methyl protons couple to the ring protons' }
    ], a: 0,
    e: { ko: '벤젠 고리에 결합한 sp<sup>2</sup> 탄소의 유도 효과도 조금 있지만, 지배적인 요인은 <strong>고리 전류에 의한 이방성 비차폐</strong>입니다. 메틸기는 고리 평면 바깥쪽 가장자리, 즉 비차폐 영역에 놓입니다. 참고로 –CH<sub>3</sub>는 고리에 대해 약한 EDG이지만(o −0.17), 그 사실은 <em>고리 양성자</em>가 업필드로 간다는 뜻일 뿐 메틸 자신의 위치와는 무관합니다. 벤질 위치(Ar–CH<sub>2</sub>–, Ar–CH<sub>3</sub>)가 δ 2.3 부근이라는 것은 외워 둘 만한 값입니다.',
         en: 'The sp<sup>2</sup> carbon does contribute a little induction, but the dominant factor is <strong>anisotropic deshielding by the ring current</strong>: the methyl sits at the outer edge of the ring plane, in the deshielding region. Note that –CH<sub>3</sub> is a weak donor towards the ring (o −0.17), but that only means the <em>ring protons</em> move upfield; it says nothing about where the methyl itself lands. Benzylic positions (Ar–CH<sub>2</sub>–, Ar–CH<sub>3</sub>) near δ 2.3 are worth memorising.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.12; SDBS (AIST).'
  });
  Q.push({
    id: 'D9', set: 'confusions', type: 'mc', d: 3,
    q: { ko: '아세트알데하이드의 CHO는 δ 9.80입니다. “CHO가 EWG이므로 다운필드”라는 설명만으로 충분하지 <strong>않은</strong> 이유는?',
         en: 'The CHO of acetaldehyde is at δ 9.80. Why is “CHO is an EWG, hence downfield” <strong>not</strong> a sufficient explanation?' },
    o: [
      { ko: '카보닐의 유도 효과만으로는 δ 7 정도까지밖에 설명되지 않고, C=O π 결합의 자기 이방성이 나머지를 담당하기 때문', en: 'Carbonyl induction alone would account for only about δ 7; the magnetic anisotropy of the C=O π bond supplies the rest' },
      { ko: 'CHO는 사실 EDG이기 때문', en: 'CHO is really an EDG' },
      { ko: '알데하이드 양성자가 교환성이기 때문', en: 'The aldehyde proton is exchangeable' },
      { ko: 'δ 9.80은 실제로는 용매 신호이기 때문', en: 'δ 9.80 is actually a solvent signal' }
    ], a: 0,
    e: { ko: '알데하이드 양성자는 카보닐 탄소에 직접 결합해 유도적으로 비차폐되지만, 그것만으로는 δ 9.8이라는 극단적인 값이 나오지 않습니다. C=O의 π 전자 순환이 만드는 비차폐 원뿔 안에 그 양성자가 놓여 있어 추가로 2 ppm 이상 밀립니다(비교: 산소에 붙은 CH도 δ 4 부근까지만 갑니다). 알데하이드 양성자는 교환성이 아니어서 D<sub>2</sub>O를 넣어도 사라지지 않고, 이웃 CH<sub>2</sub>와 작은 J(1–3 Hz)로 짝지음합니다.',
         en: 'The aldehyde proton is inductively deshielded by the carbonyl carbon it is bonded to, but that alone does not reach anything like δ 9.8. It also lies inside the deshielding cone of the circulating C=O π electrons, which adds a further 2 ppm or more. (For comparison, a CH bonded to oxygen only reaches about δ 4.) The aldehyde proton is not exchangeable — it survives a D<sub>2</sub>O shake — and couples weakly (J = 1–3 Hz) to an adjacent CH<sub>2</sub>.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.12; Silverstein et al., 8th ed., Ch. 3.'
  });
  Q.push({
    id: 'D10', set: 'confusions', type: 'mc', d: 3,
    q: { ko: '어떤 일치환 벤젠의 방향족 영역이 δ 7.26–7.33에 좁게 몰려 거의 하나의 덩어리처럼 보입니다. 치환기로 가능성이 가장 높은 것은?',
         en: 'A monosubstituted benzene shows its aromatic region bunched narrowly between δ 7.26 and 7.33, looking almost like one lump. Which substituent is most likely?' },
    o: [
      { ko: '–Cl', en: '–Cl' }, { ko: '–NO<sub>2</sub>', en: '–NO<sub>2</sub>' },
      { ko: '–NH<sub>2</sub>', en: '–NH<sub>2</sub>' }, { ko: '–CHO', en: '–CHO' }
    ], a: 0,
    e: { ko: '증분이 모든 위치에서 0에 가까운 치환기여야 세 종류의 양성자가 벤젠 값 근처에 겹쳐 보입니다. Cl은 o +0.02, m −0.06, p −0.04로 정확히 그런 경우입니다(−I와 +M의 상쇄). NO<sub>2</sub>와 CHO는 ortho를 크게 밀어 δ 8 부근에 뚜렷한 2H 신호를 만들고, NH<sub>2</sub>는 ortho·para를 δ 6.6–6.8까지 끌어와 넓게 벌립니다. <strong>“봉우리가 벌어진 정도”가 치환기의 세기를 읽는 단서</strong>가 됩니다.',
         en: 'You need a substituent whose increments are near zero at every position, so all three kinds of proton pile up near the benzene value. Chlorine is exactly that: o +0.02, m −0.06, p −0.04, the cancellation of −I against +M. NO<sub>2</sub> and CHO push their ortho protons out to a distinct 2H signal near δ 8, and NH<sub>2</sub> drags ortho and para down to δ 6.6–6.8, spreading the region wide. <strong>How far the peaks spread is itself a readout of substituent strength.</strong>' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });

  /* ============================================================ SET E */
  Q.push({
    id: 'E1', set: 'anisotropy', type: 'mc', d: 1,
    q: { ko: '벤젠의 양성자가 알켄 양성자(δ 5.3)보다 2 ppm이나 다운필드인 δ 7.26에 나타나는 주된 이유는?',
         en: 'Why do benzene protons appear at δ 7.26, some 2 ppm downfield of an alkene proton at δ 5.3?' },
    o: [
      { ko: '고리 전류가 만드는 유도 자기장이 고리 바깥쪽에서 B<sub>0</sub>와 같은 방향이 되어 비차폐시키기 때문', en: 'The ring current generates a field that adds to B<sub>0</sub> outside the ring, deshielding the protons there' },
      { ko: '방향족 탄소의 전기음성도가 알켄 탄소보다 크기 때문', en: 'Aromatic carbons are more electronegative than alkene carbons' },
      { ko: '방향족 양성자가 서로 짝지음하기 때문', en: 'Aromatic protons couple to one another' },
      { ko: '벤젠이 극성 용매이기 때문', en: 'Benzene is a polar solvent' }
    ], a: 0,
    e: { ko: '탄소는 둘 다 sp<sup>2</sup>이므로 전기음성도로는 차이를 설명할 수 없습니다. 비편재화된 6개의 π 전자가 고리를 따라 순환하며 만드는 자기장이 고리 <em>바깥쪽</em>(양성자 위치)에서 B<sub>0</sub>를 보강해 비차폐시킵니다. 같은 자기장이 고리 <em>위쪽</em>에서는 B<sub>0</sub>를 상쇄하므로, 그 자리에 놓인 양성자는 강하게 차폐됩니다.',
         en: 'Both carbons are sp<sup>2</sup>, so electronegativity cannot account for the difference. The six delocalised π electrons circulate around the ring and produce a field that reinforces B<sub>0</sub> <em>outside</em> the ring, where the protons are, deshielding them. The same field opposes B<sub>0</sub> <em>above</em> the ring, so a proton held there is strongly shielded.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.12; Clayden et al., 2nd ed., Ch. 13.'
  });
  Q.push({
    id: 'E2', set: 'anisotropy', type: 'mc', d: 3,
    q: { ko: '[18]annulene의 고리 <em>안쪽</em> 양성자는 δ ≈ −3 (TMS보다 오른쪽)에 나타납니다. 이것이 보여 주는 사실은?',
         en: 'The <em>inner</em> protons of [18]annulene appear at δ ≈ −3, to the right of TMS. What does that demonstrate?' },
    o: [
      { ko: '고리 전류의 유도 자기장이 고리 안쪽/위쪽에서는 B<sub>0</sub>를 상쇄하여 강한 차폐를 일으킨다는 것', en: 'The induced field of the ring current opposes B<sub>0</sub> inside and above the ring, producing strong shielding there' },
      { ko: '음수의 δ는 측정 오류라는 것', en: 'That negative δ values are measurement errors' },
      { ko: '그 양성자에는 전자가 전혀 없다는 것', en: 'That those protons have no electrons at all' },
      { ko: '[18]annulene이 방향족이 아니라는 것', en: 'That [18]annulene is not aromatic' }
    ], a: 0,
    e: { ko: '같은 분자의 <em>바깥쪽</em> 양성자는 δ ≈ 9로 오히려 벤젠보다도 다운필드입니다. 하나의 고리 전류가 위치에 따라 정반대 방향으로 작용한다는 것을 한 스펙트럼 안에서 보여 주는 고전적 증거이며, 동시에 [18]annulene이 방향족(4n+2, n=4)임을 뒷받침합니다. δ는 TMS 기준의 상대값이므로 음수가 나올 수 있습니다.',
         en: 'The <em>outer</em> protons of the same molecule sit at δ ≈ 9, even downfield of benzene. One spectrum thus shows a single ring current acting in opposite directions depending on position — and it is also evidence that [18]annulene is aromatic (4n+2 with n = 4). Since δ is measured relative to TMS, negative values are perfectly legitimate.' },
    ref: 'Clayden, Greeves & Warren, Organic Chemistry, 2nd ed., Ch. 13; Silverstein et al., 8th ed., Ch. 3.'
  });
  Q.push({
    id: 'E3', set: 'anisotropy', type: 'mc', d: 1,
    q: { ko: '시료에 D<sub>2</sub>O를 몇 방울 넣고 다시 측정했더니 δ 2.4의 넓은 1H 신호가 사라졌습니다. 이 신호는?',
         en: 'After adding a few drops of D<sub>2</sub>O and re-running, a broad 1H signal at δ 2.4 disappears. What was it?' },
    o: [
      { ko: 'OH 또는 NH 같은 교환성 양성자', en: 'An exchangeable proton such as OH or NH' },
      { ko: '벤질 위치의 CH<sub>2</sub>', en: 'A benzylic CH<sub>2</sub>' },
      { ko: '알데하이드 양성자', en: 'An aldehyde proton' },
      { ko: '용매 잔류 신호', en: 'A residual solvent peak' }
    ], a: 0,
    e: { ko: 'D<sub>2</sub>O 흔들기(D<sub>2</sub>O shake)에서 사라지는 신호는 D와 빠르게 교환되는 양성자, 즉 O–H, N–H, S–H입니다(생성된 HOD는 δ 4.7 부근에 새로 나타납니다). 탄소에 결합한 C–H는 교환되지 않습니다. 알코올의 OH는 δ 0.5–5.5 어디에나 나타날 수 있으므로 위치만으로는 판정할 수 없고, 이 실험이 결정적인 근거가 됩니다.',
         en: 'What vanishes in a D<sub>2</sub>O shake is a proton that exchanges rapidly with deuterium: O–H, N–H or S–H. (The HOD formed shows up as a new peak near δ 4.7.) Protons bonded to carbon do not exchange. Since an alcohol OH can appear anywhere from δ 0.5 to 5.5, position alone cannot settle it — this experiment can.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.15; Silverstein et al., 8th ed., Ch. 3.'
  });
  Q.push({
    id: 'E4', set: 'anisotropy', type: 'mc', d: 2,
    q: { ko: '살리실알데하이드(2-hydroxybenzaldehyde)의 OH는 δ 11.0 부근에, 페놀의 OH는 δ 5 부근(농도 의존)에 나타납니다. 차이의 원인은?',
         en: 'The OH of salicylaldehyde (2-hydroxybenzaldehyde) appears near δ 11.0, whereas that of phenol appears near δ 5 (concentration dependent). What causes the difference?' },
    o: [
      { ko: '살리실알데하이드는 분자내 수소 결합으로 OH가 카보닐 산소에 고정되어 강하게 비차폐되기 때문', en: 'Intramolecular hydrogen bonding locks the OH of salicylaldehyde onto the carbonyl oxygen, deshielding it strongly' },
      { ko: '살리실알데하이드의 OH가 더 강한 EDG이기 때문', en: 'The OH of salicylaldehyde is a stronger EDG' },
      { ko: '페놀의 OH가 교환성이 아니기 때문', en: 'The OH of phenol is not exchangeable' },
      { ko: '살리실알데하이드가 방향족이 아니기 때문', en: 'Salicylaldehyde is not aromatic' }
    ], a: 0,
    e: { ko: '수소 결합에 참여한 양성자는 전자 밀도를 잃어 크게 다운필드로 갑니다. 살리실알데하이드는 6원환 형태의 <strong>분자내 수소 결합</strong>이 안정하게 유지되므로 희석해도 δ가 거의 변하지 않는 반면, 페놀은 <strong>분자간 수소 결합</strong>이라 농도를 낮추면 업필드로 이동합니다. 더 극단적인 예로 아세틸아세톤 엔올형의 OH는 δ ≈ 15.5입니다. <strong>희석 실험에서 δ가 움직이는지 여부</strong>가 분자내/분자간을 구별하는 표준적인 방법입니다.',
         en: 'A proton engaged in a hydrogen bond loses electron density and moves far downfield. In salicylaldehyde a six-membered <strong>intramolecular</strong> hydrogen bond persists on dilution, so δ hardly changes; phenol relies on <strong>intermolecular</strong> bonding and moves upfield as it is diluted. A more extreme case is the enol OH of acetylacetone at δ ≈ 15.5. <strong>Whether δ moves on dilution</strong> is the standard way to tell the two apart.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.15; Silverstein et al., 8th ed., Ch. 3.'
  });
  Q.push({
    id: 'E5', set: 'anisotropy', type: 'mc', d: 2,
    q: { ko: '알코올의 OH가 대개 이웃 CH<sub>2</sub>와 짝지음하지 않고 단일선으로 보이는 이유는?',
         en: 'Why does an alcohol OH usually appear as a singlet, without coupling to the neighbouring CH<sub>2</sub>?' },
    o: [
      { ko: '산·염기 불순물에 의한 빠른 양성자 교환이 짝지음을 평균화해 없애기 때문', en: 'Fast proton exchange, catalysed by traces of acid or base, averages the coupling away' },
      { ko: 'OH 양성자는 스핀이 없기 때문', en: 'The OH proton has no spin' },
      { ko: '산소가 짝지음을 차단하기 때문', en: 'Oxygen blocks the coupling' },
      { ko: 'OH가 언제나 다른 양성자와 3결합 이상 떨어져 있기 때문', en: 'OH is always more than three bonds from any other proton' }
    ], a: 0,
    e: { ko: 'OH 양성자는 다른 분자의 OH와 빠르게 자리를 바꾸므로, 이웃 양성자 입장에서는 스핀 상태가 평균화되어 짝지음이 관측되지 않습니다. 매우 순수한 시료를 DMSO-d<sub>6</sub> 같은 용매에서 측정하면 교환이 느려져 <strong>OH의 짝지음이 실제로 관측됩니다</strong>(1차 알코올 OH가 삼중선). 이는 시험에서 “예외”로 자주 언급됩니다.',
         en: 'The OH proton swaps places rapidly with OH protons of other molecules, so its spin state is averaged as far as the neighbours are concerned and no coupling is seen. In a very pure sample in a solvent such as DMSO-d<sub>6</sub>, exchange slows and <strong>the coupling is actually observed</strong> (a triplet for a primary alcohol OH). This exception is a favourite exam remark.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.15 and 5.9; Gottlieb et al., J. Org. Chem. 1997, 62, 7512.'
  });
  Q.push({
    id: 'E6', set: 'anisotropy', type: 'order', d: 2,
    q: { ko: '다음 양성자를 δ가 <strong>작은 것부터</strong> 배열하세요.',
         en: 'Order these protons from <strong>smallest δ</strong> upward.' },
    o: [
      { ko: '1-헥사인의 ≡C–H', en: '≡C–H of 1-hexyne' },
      { ko: '1-헥센의 =CH<sub>2</sub>', en: '=CH<sub>2</sub> of 1-hexene' },
      { ko: '벤젠의 Ar–H', en: 'Ar–H of benzene' },
      { ko: '벤즈알데하이드의 CHO', en: 'CHO of benzaldehyde' }
    ], a: [0, 1, 2, 3],
    e: { ko: '알카인 ≈ 1.9 &lt; 알켄 ≈ 4.9–5.0 &lt; 벤젠 7.26 &lt; 벤즈알데하이드 CHO 10.02. sp 탄소의 전기음성도가 가장 크지만 알카인 양성자가 가장 업필드라는 점이 핵심이며, 이는 차폐 원뿔 때문입니다.',
         en: 'Alkyne ≈ 1.9 &lt; alkene ≈ 4.9–5.0 &lt; benzene 7.26 &lt; benzaldehyde CHO 10.02. The key point is that the alkyne proton is the most upfield even though sp carbon is the most electronegative — the shielding cone is responsible.' },
    ref: 'Pavia et al., 5th ed., Appendix; SDBS (AIST).'
  });

  /* ============================================================ SET F */
  Q.push({
    id: 'F1', set: 'coupling', type: 'mc', d: 1,
    spec: { peaks: [{ ppm: 5.77, mult: 't', H: 1 }, { ppm: 3.96, mult: 'd', H: 2 }], min: 2, max: 7 },
    q: { ko: '1,1,2-트라이클로로에테인(CHCl<sub>2</sub>CH<sub>2</sub>Cl)은 δ 5.77 (1H, t)과 3.96 (2H, d)을 보입니다. 옳은 귀속은?',
         en: '1,1,2-Trichloroethane (CHCl<sub>2</sub>CH<sub>2</sub>Cl) shows δ 5.77 (1H, t) and 3.96 (2H, d). What is the correct assignment?' },
    o: [
      { ko: '5.77 = CHCl<sub>2</sub> (이웃 2H → 삼중선), 3.96 = CH<sub>2</sub>Cl (이웃 1H → 이중선)', en: '5.77 = CHCl<sub>2</sub> (two neighbours → triplet); 3.96 = CH<sub>2</sub>Cl (one neighbour → doublet)' },
      { ko: '5.77 = CH<sub>2</sub>Cl, 3.96 = CHCl<sub>2</sub>', en: '5.77 = CH<sub>2</sub>Cl; 3.96 = CHCl<sub>2</sub>' },
      { ko: '두 신호 모두 CH<sub>2</sub>Cl에서 온다', en: 'Both signals come from CH<sub>2</sub>Cl' },
      { ko: '적분비로는 구별할 수 없다', en: 'They cannot be distinguished from the integrals' }
    ], a: 0,
    e: { ko: '적분(1H 대 2H)과 다중도가 모두 같은 결론을 가리킵니다. CHCl<sub>2</sub>는 양성자가 1개이고 이웃 CH<sub>2</sub>의 2H에 의해 삼중선이 됩니다. 화학적 이동으로도 확인됩니다. 염소 2개가 붙은 탄소의 양성자가 1개 붙은 쪽보다 더 다운필드입니다(유도 효과의 누적).',
         en: 'Integration (1H versus 2H) and multiplicity point the same way: CHCl<sub>2</sub> has one proton and is split into a triplet by the two protons of the neighbouring CH<sub>2</sub>. The shifts confirm it — the carbon bearing two chlorines is further downfield, by accumulation of inductive effects.' },
    ref: 'Pavia et al., 5th ed., Ch. 5.2; SDBS (AIST).'
  });
  Q.push({
    id: 'F2', set: 'coupling', type: 'mc', d: 2,
    q: { ko: '어떤 화합물에 δ 1.22 (6H, d)와 δ 2.90 (1H, sept)이 있습니다. 확실히 존재하는 구조 조각은?',
         en: 'A compound shows δ 1.22 (6H, d) and δ 2.90 (1H, septet). Which fragment is definitely present?' },
    o: [
      { ko: '아이소프로필기 –CH(CH<sub>3</sub>)<sub>2</sub>', en: 'An isopropyl group, –CH(CH<sub>3</sub>)<sub>2</sub>' },
      { ko: '에틸기 –CH<sub>2</sub>CH<sub>3</sub>', en: 'An ethyl group, –CH<sub>2</sub>CH<sub>3</sub>' },
      { ko: 'tert-뷰틸기 –C(CH<sub>3</sub>)<sub>3</sub>', en: 'A tert-butyl group, –C(CH<sub>3</sub>)<sub>3</sub>' },
      { ko: '프로필기 –CH<sub>2</sub>CH<sub>2</sub>CH<sub>3</sub>', en: 'A propyl group, –CH<sub>2</sub>CH<sub>2</sub>CH<sub>3</sub>' }
    ], a: 0,
    e: { ko: '6H 이중선은 등가인 메틸 두 개가 하나의 이웃 양성자에 의해 갈라진 것이고, 1H 칠중선(septet)은 그 양성자가 6개의 등가 양성자에 둘러싸여 있음을 뜻합니다(n + 1 = 7). 에틸기라면 3H 삼중선 + 2H 사중선, tert-뷰틸이라면 이웃이 없어 9H 단일선, 프로필이라면 3H 삼중선 + 2H 다중선 + 2H 삼중선이 됩니다.',
         en: 'A 6H doublet is two equivalent methyls split by one neighbour, and a 1H septet says that proton is surrounded by six equivalent protons (n + 1 = 7). An ethyl group would give a 3H triplet plus a 2H quartet; a tert-butyl group has no neighbours and gives a 9H singlet; a propyl group gives 3H triplet, 2H multiplet, 2H triplet.' },
    ref: 'Pavia et al., 5th ed., Ch. 5.3.'
  });
  Q.push({
    id: 'F3', set: 'coupling', type: 'mc', d: 2,
    q: { ko: '이치환 알켄의 두 비닐 양성자 사이의 J가 16 Hz로 측정되었습니다. 기하 이성질은?',
         en: 'The two vinylic protons of a disubstituted alkene show J = 16 Hz. What is the geometry?' },
    o: [{ ko: 'trans (E)', en: 'trans (E)' }, { ko: 'cis (Z)', en: 'cis (Z)' },
        { ko: 'geminal', en: 'geminal' }, { ko: 'J 값으로는 판단할 수 없다', en: 'J cannot decide this' }],
    a: 0,
    e: { ko: 'trans(J = 12–18 Hz)가 cis(J = 6–12 Hz)보다 항상 큽니다. 두 C–H 결합의 이면각(dihedral angle)이 180°일 때 짝지음이 최대가 되기 때문이며(Karplus 관계), 16 Hz는 trans 영역에 확실히 들어갑니다. 같은 탄소에 붙은 geminal =CH<sub>2</sub>는 0–3 Hz로 매우 작습니다.',
         en: 'Trans coupling (J = 12–18 Hz) is always larger than cis (J = 6–12 Hz), because coupling is maximal when the two C–H bonds have a dihedral angle of 180° (the Karplus relationship). 16 Hz sits firmly in the trans range. Geminal protons on the same carbon of a =CH<sub>2</sub> couple only weakly, at 0–3 Hz.' },
    ref: 'Pavia et al., 5th ed., Ch. 5.7; Silverstein et al., 8th ed., Appendix F.'
  });
  Q.push({
    id: 'F4', set: 'coupling', type: 'mc', d: 2,
    q: { ko: '분자식 C<sub>10</sub>H<sub>12</sub>O<sub>2</sub>인 화합물의 적분비가 5 : 2 : 2 : 3으로 읽혔습니다. 각 신호의 실제 양성자 수는?',
         en: 'A compound of formula C<sub>10</sub>H<sub>12</sub>O<sub>2</sub> gives integrals in the ratio 5 : 2 : 2 : 3. What are the real proton counts?' },
    o: [
      { ko: '5H, 2H, 2H, 3H (합 12H)', en: '5H, 2H, 2H, 3H (total 12H)' },
      { ko: '10H, 4H, 4H, 6H', en: '10H, 4H, 4H, 6H' },
      { ko: '2.5H, 1H, 1H, 1.5H', en: '2.5H, 1H, 1H, 1.5H' },
      { ko: '적분비만으로는 알 수 없다', en: 'The ratio alone cannot tell' }
    ], a: 0,
    e: { ko: '적분은 상대비이므로 분자식의 총 수소 수에 맞춰 배율을 정합니다. 5 + 2 + 2 + 3 = 12이고 분자식의 H도 12이므로 배율은 1입니다. 만약 비의 합이 6이었다면 배율 2를 적용해 각각을 두 배로 읽어야 합니다. 참고로 5H 방향족 신호는 <strong>일치환 벤젠</strong>을 뜻하는 강력한 단서입니다.',
         en: 'Integrals are ratios, so scale them against the total hydrogen count in the formula. Here 5 + 2 + 2 + 3 = 12, matching the twelve hydrogens, so the scale factor is 1. Had the ratio summed to 6, you would double everything. Note that a 5H aromatic signal is a strong clue for a <strong>monosubstituted</strong> benzene.' },
    ref: 'Pavia et al., 5th ed., Ch. 3.16 and Ch. 8.'
  });
  Q.push({
    id: 'F5', set: 'coupling', type: 'mc', d: 2,
    q: { ko: 'para-이치환 벤젠의 방향족 영역이 “J ≈ 8 Hz인 2H 이중선 두 개”로 보이는 것에 대한 설명으로 옳은 것은?',
         en: 'Which statement correctly describes why a para-disubstituted benzene shows “two 2H doublets with J ≈ 8 Hz”?' },
    o: [
      { ko: '엄밀히는 AA′BB′ 계이지만 근사적으로 두 개의 이중선처럼 보이며, J ≈ 8 Hz는 ortho 짝지음이다', en: 'It is strictly an AA′BB′ system that approximates to two doublets, and J ≈ 8 Hz is the ortho coupling' },
      { ko: '두 이중선은 서로 para 관계인 양성자끼리 짝지은 결과이다', en: 'The doublets arise from coupling between protons that are para to each other' },
      { ko: '치환기가 EWG일 때만 나타나는 패턴이다', en: 'The pattern appears only when the substituent is an EWG' },
      { ko: '이중선이 두 개이므로 양성자 환경이 네 종류이다', en: 'Two doublets mean four distinct proton environments' }
    ], a: 0,
    e: { ko: 'para-이치환 고리에는 두 종류의 양성자가 각각 2개씩 있고, 서로 ortho 관계인 짝의 J가 6–9 Hz입니다. para 짝지음은 0–1 Hz로 사실상 보이지 않습니다. 이 대칭 패턴은 치환기의 전자적 성질과 무관하게 나타나며, 다만 <strong>두 이중선 사이의 간격</strong>이 EWG/EDG의 조합을 알려 줍니다. 환경은 두 종류입니다(신호 두 개, 각 2H).',
         en: 'A para-disubstituted ring has two kinds of proton, two of each, and the ortho-related pair couples at 6–9 Hz; para coupling is 0–1 Hz and effectively invisible. The symmetric pattern appears regardless of the electronic character of the substituents — what reports on the EWG/EDG combination is the <strong>gap between the two doublets</strong>. There are two environments, not four.' },
    ref: 'Pavia et al., 5th ed., Ch. 5.8; Silverstein et al., 8th ed., Ch. 3.'
  });
  Q.push({
    id: 'F6', set: 'coupling', type: 'mc', d: 1,
    q: { ko: '에테인(CH<sub>3</sub>CH<sub>3</sub>)이 삼중선이나 사중선이 아니라 <strong>6H 단일선</strong> 하나로 나오는 이유는?',
         en: 'Why does ethane give a single <strong>6H singlet</strong> rather than a triplet or quartet?' },
    o: [
      { ko: '두 메틸의 양성자가 모두 화학적으로 등가이며, 등가인 양성자끼리는 갈라짐이 관측되지 않기 때문', en: 'All six protons are chemically equivalent, and coupling between equivalent protons is not observed' },
      { ko: '메틸기가 자유 회전하여 짝지음이 사라지기 때문', en: 'Free rotation of the methyl groups destroys the coupling' },
      { ko: '에테인의 J가 0이기 때문', en: 'Because J is zero in ethane' },
      { ko: '양성자 사이의 거리가 너무 멀기 때문', en: 'Because the protons are too far apart' }
    ], a: 0,
    e: { ko: '짝지음 자체는 존재하지만, 화학적으로 등가인 핵들 사이의 짝지음은 스펙트럼에 나타나지 않습니다. 반대로 1,1,2-트라이클로로에테인처럼 두 탄소의 환경이 다르면 즉시 갈라짐이 보입니다. 자유 회전은 세 메틸 양성자를 서로 등가로 만들어 주는 역할을 하지만, 짝지음을 없애는 원인은 아닙니다.',
         en: 'The coupling exists but is not observable between chemically equivalent nuclei. As soon as the two carbons differ — as in 1,1,2-trichloroethane — the splitting appears. Free rotation is what makes the three methyl protons equivalent to each other, but it is not what removes the splitting here.' },
    ref: 'Pavia et al., 5th ed., Ch. 5.1; Clayden et al., 2nd ed., Ch. 13.'
  });
  Q.push({
    id: 'F7', set: 'coupling', type: 'mc', d: 3,
    q: { ko: '1-나이트로프로페인의 가운데 CH<sub>2</sub>가 <strong>육중선(sextet)</strong>으로 보이는 이유는?',
         en: 'Why does the central CH<sub>2</sub> of 1-nitropropane appear as a <strong>sextet</strong>?' },
    o: [
      { ko: '양쪽 이웃의 양성자 5개(CH<sub>3</sub> 3H + CH<sub>2</sub> 2H)에 대한 J가 우연히 비슷해 하나의 (5+1)중선처럼 보이기 때문', en: 'Its five neighbours (3H of CH<sub>3</sub> plus 2H of CH<sub>2</sub>) happen to have similar J values, so the pattern collapses to a single (5+1)-line multiplet' },
      { ko: '나이트로기가 추가로 갈라짐을 만들기 때문', en: 'The nitro group introduces extra splitting' },
      { ko: '이웃 양성자가 실제로 5개의 등가 양성자이기 때문', en: 'The five neighbouring protons are genuinely equivalent' },
      { ko: '육중선은 오독이며 실제로는 사중선이다', en: 'The sextet is a misreading; it is really a quartet' }
    ], a: 0,
    e: { ko: '엄밀히 말하면 CH<sub>3</sub>와 CH<sub>2</sub>는 등가가 아니므로 (3+1)×(2+1) = 12개의 선으로 갈라져야 합니다. 그러나 자유 회전하는 사슬에서 두 J가 모두 약 7 Hz로 거의 같아 선들이 겹치면서 1:5:10:10:5:1 형태의 육중선으로 보입니다. 이런 상황에서는 <strong>n = 이웃 양성자의 총수</strong>로 두고 (n+1)을 적용하는 근사가 통합니다. 나이트로기의 질소(<sup>14</sup>N)는 사중극자 완화 때문에 보통 짝지음을 만들지 않습니다.',
         en: 'Strictly, CH<sub>3</sub> and CH<sub>2</sub> are not equivalent, so the pattern should be (3+1) × (2+1) = 12 lines. But in a freely rotating chain both couplings are about 7 Hz, the lines overlap, and what you see is a 1:5:10:10:5:1 sextet. In that situation the approximation <strong>n = total number of neighbours</strong>, then (n+1), works. The <sup>14</sup>N of a nitro group normally causes no visible coupling because of quadrupolar relaxation.' },
    ref: 'Pavia et al., 5th ed., Ch. 5.5; Silverstein et al., 8th ed., Ch. 3.'
  });
  Q.push({
    id: 'F8', set: 'coupling', type: 'multi', d: 2,
    q: { ko: '짝지음 상수 J에 대한 설명 중 옳은 것을 모두 고르세요.',
         en: 'Select every correct statement about the coupling constant J.' },
    o: [
      { ko: '외부 자기장 세기와 무관하며 Hz 단위로 일정하다', en: 'It is independent of field strength and constant in Hz' },
      { ko: '서로 짝지은 두 신호는 같은 J 값을 갖는다', en: 'Two mutually coupled signals share the same J value' },
      { ko: '방향족 ortho 짝지음(6–9 Hz)이 meta 짝지음(1–3 Hz)보다 크다', en: 'Aromatic ortho coupling (6–9 Hz) is larger than meta coupling (1–3 Hz)' },
      { ko: '치환기가 EWG일수록 J가 커진다', en: 'The more strongly withdrawing the substituent, the larger J becomes' }
    ], a: [0, 1, 2],
    e: { ko: '④가 틀렸습니다. J는 결합의 개수·각도·혼성 등 <strong>기하와 결합 구조</strong>에 의해 결정되며, 치환기의 전자 효과는 δ를 바꿀 뿐 J에는 큰 영향을 주지 않습니다. ②는 짝을 찾는 실용적 도구입니다. 복잡한 스펙트럼에서 같은 J를 갖는 신호를 짝지어 연결 관계를 추적합니다.',
         en: 'Statement 4 is wrong. J is fixed by <strong>geometry and bonding</strong> — number of bonds, dihedral angle, hybridisation — while the electronic effect of a substituent changes δ without much affecting J. Statement 2 is a practical tool: in a crowded spectrum, match signals by their J values to trace connectivity.' },
    ref: 'Pavia et al., 5th ed., Ch. 5.2 and 5.7; Silverstein et al., 8th ed., Appendix F.'
  });

  /* ============================================================ SET G */
  Q.push({
    id: 'G1', set: 'carbon13', type: 'mc', d: 2,
    q: { ko: 'p-자일렌(1,4-dimethylbenzene)의 양성자 짝풀림 <sup>13</sup>C 스펙트럼에는 몇 개의 신호가 나타납니까?',
         en: 'How many signals appear in the proton-decoupled <sup>13</sup>C spectrum of p-xylene (1,4-dimethylbenzene)?' },
    o: [{ ko: '3개', en: '3' }, { ko: '4개', en: '4' }, { ko: '6개', en: '6' }, { ko: '8개', en: '8' }],
    a: 0,
    e: { ko: '대칭성 때문에 ① 두 CH<sub>3</sub>가 등가(δ 20.9), ② 두 ipso 탄소 C1·C4가 등가(δ 134.6), ③ 네 개의 CH 탄소가 모두 등가(δ 129.0)입니다. 총 3개입니다. 탄소가 8개라고 신호가 8개인 것이 아니며, <strong>신호 개수를 세는 것 자체가 대칭성 정보</strong>를 줍니다. o-자일렌과 m-자일렌은 각각 4개, 5개의 신호를 냅니다.',
         en: 'Symmetry makes the two methyls equivalent (δ 20.9), the two ipso carbons C1 and C4 equivalent (δ 134.6), and all four CH carbons equivalent (δ 129.0): three signals in total. Eight carbons do not mean eight signals, and <strong>counting signals is itself a measurement of symmetry</strong>. o-Xylene and m-xylene give four and five signals respectively.' },
    ref: 'Pavia et al., 5th ed., Ch. 4.4; SDBS (AIST).'
  });
  Q.push({
    id: 'G2', set: 'carbon13', type: 'mc', d: 2,
    q: { ko: 'DEPT-135 스펙트럼에서 <strong>아래쪽으로</strong> 나타나는 탄소는?',
         en: 'Which carbons point <strong>downwards</strong> in a DEPT-135 spectrum?' },
    o: [{ ko: 'CH<sub>2</sub>', en: 'CH<sub>2</sub>' }, { ko: 'CH', en: 'CH' },
        { ko: 'CH<sub>3</sub>', en: 'CH<sub>3</sub>' }, { ko: '사차 탄소', en: 'Quaternary carbons' }],
    a: 0,
    e: { ko: 'DEPT-135에서는 CH와 CH<sub>3</sub>가 위로, CH<sub>2</sub>가 아래로 나타나며, 수소가 없는 사차 탄소는 <strong>아예 나타나지 않습니다</strong>. 따라서 일반 <sup>13</sup>C 스펙트럼과 DEPT를 비교해 “일반에는 있는데 DEPT에는 없는” 신호를 찾으면 사차 탄소(카보닐, 방향족 ipso 등)를 즉시 식별할 수 있습니다.',
         en: 'In DEPT-135, CH and CH<sub>3</sub> point up, CH<sub>2</sub> points down, and quaternary carbons — having no attached hydrogen — <strong>do not appear at all</strong>. Comparing the ordinary <sup>13</sup>C spectrum with the DEPT and picking out the signals present in one but missing in the other identifies quaternary carbons (carbonyls, aromatic ipso carbons) immediately.' },
    ref: 'Pavia et al., 5th ed., Ch. 6.4.'
  });
  Q.push({
    id: 'G3', set: 'carbon13', type: 'mc', d: 2,
    q: { ko: '일반적인 양성자 짝풀림 <sup>13</sup>C 스펙트럼에서 <strong>해서는 안 되는</strong> 해석은?',
         en: 'Which interpretation must <strong>not</strong> be made from a routine proton-decoupled <sup>13</sup>C spectrum?' },
    o: [
      { ko: '봉우리 높이를 적분해 탄소 개수의 비를 구한다', en: 'Integrating peak heights to obtain a ratio of carbon numbers' },
      { ko: '신호 개수로 서로 다른 탄소 환경의 수를 센다', en: 'Counting signals to find the number of distinct carbon environments' },
      { ko: 'δ 200 부근의 신호를 케톤 카보닐로 본다', en: 'Reading a signal near δ 200 as a ketone carbonyl' },
      { ko: 'δ 110–160 영역에서 방향족 탄소를 찾는다', en: 'Looking for aromatic carbons between δ 110 and 160' }
    ], a: 0,
    e: { ko: '<sup>13</sup>C에서는 핵 오버하우저 효과(NOE)와 긴 이완 시간(T<sub>1</sub>) 때문에 신호 세기가 탄소 수에 비례하지 않습니다. 특히 수소가 없는 사차 탄소는 매우 작게 나타납니다. 따라서 <strong>적분은 사용하지 않습니다</strong>(정량이 필요하면 역게이트 짝풀림 등 별도 실험이 필요합니다). 나머지 셋은 모두 표준적인 해석입니다.',
         en: 'In <sup>13</sup>C, the nuclear Overhauser effect and long T<sub>1</sub> relaxation make intensities disproportionate to the number of carbons; quaternary carbons in particular come out very weak. So <strong>integration is not used</strong> (quantitation requires a dedicated experiment such as inverse-gated decoupling). The other three are standard readings.' },
    ref: 'Pavia et al., 5th ed., Ch. 4.3; Silverstein et al., 8th ed., Ch. 4.'
  });
  Q.push({
    id: 'G4', set: 'carbon13', type: 'mc', d: 2,
    q: { ko: '<sup>13</sup>C 스펙트럼에 δ 198 신호가 있는 화합물과 δ 168 신호가 있는 화합물이 있습니다. 각각 어떤 카보닐입니까?',
         en: 'One compound shows a <sup>13</sup>C signal at δ 198 and another at δ 168. What kind of carbonyl is each?' },
    o: [
      { ko: 'δ 198은 케톤/알데하이드, δ 168은 에스터/아마이드/카복실산', en: 'δ 198 is a ketone or aldehyde; δ 168 an ester, amide or carboxylic acid' },
      { ko: 'δ 198은 에스터, δ 168은 케톤', en: 'δ 198 is an ester; δ 168 a ketone' },
      { ko: '둘 다 케톤이며 차이는 용매 때문이다', en: 'Both are ketones and the difference is a solvent effect' },
      { ko: 'δ 168은 방향족 CH이다', en: 'δ 168 is an aromatic CH' }
    ], a: 0,
    e: { ko: '케톤·알데하이드의 카보닐은 δ 185–220, 에스터·아마이드·카복실산은 δ 155–185입니다. 후자는 이웃한 산소나 질소의 비공유 전자쌍이 카보닐 탄소로 공여되어 전자 밀도를 보태 주므로 상대적으로 <strong>업필드</strong>에 나타납니다. 여기서도 “전자를 받으면 업필드”라는 같은 원리가 작동합니다(예: 아세톤 206.0, 아세트산 178.1, 에틸 아세테이트 171.1).',
         en: 'Ketone and aldehyde carbonyls fall at δ 185–220; esters, amides and acids at δ 155–185. In the latter, the lone pair of the adjacent oxygen or nitrogen is donated onto the carbonyl carbon, adding electron density and putting it relatively <strong>upfield</strong>. The same “receive electrons, move upfield” principle applies (acetone 206.0, acetic acid 178.1, ethyl acetate 171.1).' },
    ref: 'Pretsch et al., 4th ed., 2009; Pavia et al., 5th ed., Ch. 4.6.'
  });
  Q.push({
    id: 'G5', set: 'carbon13', type: 'mc', d: 3,
    q: { ko: '아니솔의 <sup>13</sup>C: C-ipso 159.9, C-ortho 114.1, C-meta 129.5, C-para 120.7 (벤젠은 128.5). 이 데이터가 뒷받침하는 결론은?',
         en: 'Anisole <sup>13</sup>C: C-ipso 159.9, C-ortho 114.1, C-meta 129.5, C-para 120.7 (benzene is 128.5). What conclusion do these data support?' },
    o: [
      { ko: '산소의 비공유 전자쌍이 공명으로 ortho·para 탄소에 π 전자 밀도를 공급했고, meta는 거의 영향이 없다', en: 'The oxygen lone pair delivers π density to the ortho and para carbons by resonance, leaving meta almost untouched' },
      { ko: '산소가 ortho·para 탄소에서 전자를 빼앗았다', en: 'The oxygen removes density from the ortho and para carbons' },
      { ko: '모든 고리 탄소가 균일하게 차폐되었다', en: 'All the ring carbons are uniformly shielded' },
      { ko: '<sup>13</sup>C에서는 공명 효과가 작동하지 않는다', en: 'Resonance effects do not operate in <sup>13</sup>C' }
    ], a: 0,
    e: { ko: 'C-ortho는 벤젠보다 14.4 ppm, C-para는 7.8 ppm 업필드인 반면 C-meta는 +1.0 ppm에 불과합니다. <sup>1</sup>H에서 본 “ortho·para만 크게, meta는 거의 그대로”라는 패턴이 <sup>13</sup>C에서도 그대로 재현되며, 오히려 <sup>13</sup>C 쪽 변화 폭이 훨씬 커서 판별이 쉽습니다. ipso(159.9)만은 산소에 직결된 유도 효과가 지배하므로 별도로 취급합니다.',
         en: 'C-ortho is 14.4 ppm upfield of benzene and C-para 7.8 ppm, while C-meta differs by only +1.0 ppm. The pattern seen in <sup>1</sup>H — large at ortho and para, nothing at meta — is reproduced in <sup>13</sup>C, and the changes are much larger, making the diagnosis easier. Only the ipso carbon at 159.9 is treated separately, because induction from the directly bonded oxygen dominates there.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'G6', set: 'carbon13', type: 'mc', d: 3,
    q: { ko: '나이트로벤젠의 <sup>13</sup>C는 C-ipso 148.3, C-ortho 123.4, C-meta 129.3, C-para 134.7입니다. EWG의 효과를 판단할 때 가장 신뢰할 만한 지표는?',
         en: 'Nitrobenzene <sup>13</sup>C: C-ipso 148.3, C-ortho 123.4, C-meta 129.3, C-para 134.7. Which carbon is the most reliable indicator of the EWG effect?' },
    o: [
      { ko: 'C-para (134.7). 벤젠보다 +6.2로 뚜렷하게 다운필드이며 예상과 일치한다', en: 'C-para (134.7), clearly downfield by +6.2 and matching expectation' },
      { ko: 'C-ortho (123.4). 가장 크게 변했으므로 가장 신뢰할 만하다', en: 'C-ortho (123.4), because it changed the most' },
      { ko: 'C-ipso (148.3). 치환기에 가장 가까우므로', en: 'C-ipso (148.3), being closest to the substituent' },
      { ko: 'C-meta (129.3)', en: 'C-meta (129.3)' }
    ], a: 0,
    e: { ko: 'C-para는 +6.2 ppm 다운필드로 “EWG가 ortho·para의 전자 밀도를 낮춘다”는 예상과 정확히 맞습니다. 반면 C-ortho는 벤젠보다 오히려 5.1 ppm <strong>업필드</strong>인데, 이는 <sup>13</sup>C 화학적 이동에 π 전자 밀도 외에도 이웃 원자의 전기적·자기적 효과가 크게 섞이기 때문입니다. C-ipso는 질소에 직결되어 유도 효과가 지배합니다. 그래서 학부 수준에서는 <strong>C-para를 기준으로 판단</strong>하는 것이 안전합니다.',
         en: 'C-para is 6.2 ppm downfield, exactly as expected if an EWG drains density from the ortho and para positions. C-ortho, by contrast, is 5.1 ppm <strong>upfield</strong> of benzene, because <sup>13</sup>C shifts mix in neighbouring-atom electric and magnetic effects on top of π density. C-ipso is bonded to nitrogen and dominated by induction. At undergraduate level it is therefore safest to <strong>judge from C-para</strong>.' },
    ref: 'Pretsch et al., 4th ed., 2009; Silverstein et al., 8th ed., Ch. 4.'
  });

  /* ============================================================ SET H */
  Q.push({
    id: 'H1', set: 'structure', type: 'num', d: 1, tol: 0.1, unit: '',
    q: { ko: 'C<sub>8</sub>H<sub>9</sub>NO<sub>2</sub>의 불포화도(degree of unsaturation)를 구하세요. DoU = (2C + 2 + N − H − X) / 2.',
         en: 'Calculate the degree of unsaturation of C<sub>8</sub>H<sub>9</sub>NO<sub>2</sub>. DoU = (2C + 2 + N − H − X) / 2.' },
    a: 5,
    e: { ko: 'DoU = (2×8 + 2 + 1 − 9 − 0) / 2 = (16 + 2 + 1 − 9) / 2 = 10 / 2 = <strong>5</strong>. 산소는 계산에 들어가지 않습니다. DoU 4는 벤젠 고리 하나(고리 1 + π 결합 3)를 강하게 시사하며, 남은 1은 C=O나 또 다른 고리일 수 있습니다. 이 분자식을 갖는 예로는 4-나이트로에틸벤젠, 4-메톡시벤즈아마이드, 메틸 안트라닐레이트(methyl 2-aminobenzoate)가 있습니다.',
         en: 'DoU = (2×8 + 2 + 1 − 9 − 0) / 2 = (16 + 2 + 1 − 9) / 2 = 10 / 2 = <strong>5</strong>. Oxygen does not enter the formula. A value of 4 strongly suggests one benzene ring (one ring plus three π bonds), and the remaining 1 could be a C=O or another ring. Compounds with this formula include 4-nitroethylbenzene, 4-methoxybenzamide and methyl anthranilate (methyl 2-aminobenzoate).' },
    ref: 'Pavia et al., 5th ed., Ch. 8.1.'
  });
  Q.push({
    id: 'H2', set: 'structure', type: 'mc', d: 2,
    spec: { peaks: [{ ppm: 7.05, mult: 's', H: 4 }, { ppm: 2.31, mult: 's', H: 6 }], min: 0, max: 8 },
    q: { ko: 'C<sub>8</sub>H<sub>10</sub>: δ 7.05 (4H, s), 2.31 (6H, s). 이 화합물은?',
         en: 'C<sub>8</sub>H<sub>10</sub>: δ 7.05 (4H, s), 2.31 (6H, s). Identify the compound.' },
    o: [
      { ko: 'p-자일렌 (1,4-dimethylbenzene)', en: 'p-Xylene (1,4-dimethylbenzene)' },
      { ko: '에틸벤젠 (ethylbenzene)', en: 'Ethylbenzene' },
      { ko: 'o-자일렌 (1,2-dimethylbenzene)', en: 'o-Xylene' },
      { ko: '스타이렌 (styrene)', en: 'Styrene' }
    ], a: 0,
    e: { ko: '6H 단일선은 등가인 메틸 두 개이므로 에틸기(3H t + 2H q)가 아닙니다. 방향족 4H가 <strong>단일선처럼</strong> 하나로 보이는 것은 네 양성자의 δ가 거의 같기 때문인데, 이는 두 치환기가 서로 para로 마주 보아 완전한 대칭을 이룰 때 일어납니다. o-자일렌은 4H가 두 종류(AA′BB′, δ 7.10과 7.14로 다중선)로 나뉘고, 스타이렌은 분자식이 C<sub>8</sub>H<sub>8</sub>이며 비닐 양성자가 δ 5.2–6.7에 나타납니다.',
         en: 'A 6H singlet is two equivalent methyls, so this is not an ethyl group (which would give a 3H triplet plus a 2H quartet). The four aromatic protons collapsing to what looks like <strong>one singlet</strong> means their shifts are nearly identical, which happens when the two substituents face each other para and the ring is fully symmetric. o-Xylene gives two kinds of aromatic proton (an AA′BB′ multiplet near δ 7.10 and 7.14), and styrene is C<sub>8</sub>H<sub>8</sub> with vinyl protons at δ 5.2–6.7.' },
    ref: 'Pavia et al., 5th ed., Ch. 8; SDBS (AIST).'
  });
  Q.push({
    id: 'H3', set: 'structure', type: 'mc', d: 2,
    spec: { peaks: [{ ppm: 7.32, mult: 'm', H: 5 }, { ppm: 4.68, mult: 's', H: 2 }, { ppm: 1.95, mult: 'br', H: 1 }], min: 0, max: 8 },
    q: { ko: 'C<sub>7</sub>H<sub>8</sub>O: δ 7.28–7.38 (5H, m), 4.68 (2H, s), 1.95 (1H, 넓은 단일선, D<sub>2</sub>O 첨가 시 소실). 이 화합물은?',
         en: 'C<sub>7</sub>H<sub>8</sub>O: δ 7.28–7.38 (5H, m), 4.68 (2H, s), 1.95 (1H, broad singlet, lost on adding D<sub>2</sub>O). Identify it.' },
    o: [
      { ko: '벤질 알코올 (benzyl alcohol)', en: 'Benzyl alcohol' },
      { ko: '아니솔 (anisole)', en: 'Anisole' },
      { ko: 'p-크레졸 (p-cresol)', en: 'p-Cresol' },
      { ko: '벤즈알데하이드 (benzaldehyde)', en: 'Benzaldehyde' }
    ], a: 0,
    e: { ko: 'D<sub>2</sub>O로 사라지는 1H는 OH입니다. 방향족 5H는 일치환 벤젠을 뜻하고, δ 7.3 부근에 몰려 있다는 것은 고리에 붙은 것이 강한 EWG도 EDG도 아니라는 뜻입니다(–CH<sub>2</sub>OH는 거의 중성). 2H 단일선 δ 4.68은 Ar–CH<sub>2</sub>–OH입니다. 아니솔이라면 3H 단일선(δ 3.80)이고 교환성 양성자가 없으며, 방향족은 5H가 아니라 2H+1H+2H로 6.9–7.3에 흩어집니다. p-크레졸은 방향족이 4H(이중선 두 개)이고 CH<sub>3</sub>가 δ 2.27, 벤즈알데하이드는 분자식이 C<sub>7</sub>H<sub>6</sub>O입니다.',
         en: 'The 1H lost on D<sub>2</sub>O is an OH. Five aromatic protons mean a monosubstituted ring, and their clustering near δ 7.3 says the attached group is neither a strong EWG nor a strong EDG (–CH<sub>2</sub>OH is nearly neutral). The 2H singlet at δ 4.68 is Ar–CH<sub>2</sub>–OH. Anisole would give a 3H singlet at δ 3.80, no exchangeable proton, and an aromatic region split 2H + 1H + 2H across 6.9–7.3. p-Cresol has only four aromatic protons (two doublets) plus CH<sub>3</sub> at δ 2.27, and benzaldehyde is C<sub>7</sub>H<sub>6</sub>O.' },
    ref: 'Pavia et al., 5th ed., Ch. 8; SDBS (AIST).'
  });
  Q.push({
    id: 'H4', set: 'structure', type: 'mc', d: 3,
    spec: { peaks: [{ ppm: 8.04, mult: 'd', H: 2 }, { ppm: 7.55, mult: 't', H: 1 }, { ppm: 7.43, mult: 't', H: 2 }, { ppm: 3.91, mult: 's', H: 3 }], min: 3, max: 9 },
    q: { ko: 'C<sub>8</sub>H<sub>8</sub>O<sub>2</sub>인 두 이성질체 중 하나가 δ 8.04 (2H, d), 7.55 (1H, t), 7.43 (2H, t), 3.91 (3H, s)를 보입니다. 이 화합물은?',
         en: 'One of two C<sub>8</sub>H<sub>8</sub>O<sub>2</sub> isomers shows δ 8.04 (2H, d), 7.55 (1H, t), 7.43 (2H, t), 3.91 (3H, s). Which is it?' },
    o: [
      { ko: '메틸 벤조에이트 (methyl benzoate, C<sub>6</sub>H<sub>5</sub>COOCH<sub>3</sub>)', en: 'Methyl benzoate, C<sub>6</sub>H<sub>5</sub>COOCH<sub>3</sub>' },
      { ko: '페닐 아세테이트 (phenyl acetate, CH<sub>3</sub>COOC<sub>6</sub>H<sub>5</sub>)', en: 'Phenyl acetate, CH<sub>3</sub>COOC<sub>6</sub>H<sub>5</sub>' },
      { ko: '4-메톡시벤즈알데하이드', en: '4-Methoxybenzaldehyde' },
      { ko: '벤조산 (benzoic acid)', en: 'Benzoic acid' }
    ], a: 0,
    e: { ko: '두 가지가 결정적입니다. ① <strong>메틸의 위치</strong>: δ 3.91은 산소에 직결된 –OCH<sub>3</sub>입니다. 페닐 아세테이트라면 메틸이 카보닐 탄소에 붙어 δ 2.29에 나옵니다. ② <strong>방향족의 벌어짐</strong>: ortho 2H가 δ 8.04까지 밀린 것은 고리에 <strong>EWG인 C=O가 직접</strong> 붙었다는 뜻입니다(증분 –COOCH<sub>3</sub>: o +0.71 → 7.26 + 0.71 = 7.97). 페닐 아세테이트는 고리에 –O–가 붙어 약한 공여성을 보이므로 방향족이 δ 7.08–7.37에 모입니다. 4-메톡시벤즈알데하이드는 δ 9.88 알데하이드 신호가 있어야 하고, 벤조산은 δ 12 부근의 넓은 COOH가 있어야 합니다.',
         en: 'Two things decide it. ① <strong>Where the methyl sits</strong>: δ 3.91 is an –OCH<sub>3</sub> bonded to oxygen. In phenyl acetate the methyl is on the carbonyl carbon at δ 2.29. ② <strong>How far the aromatic signals spread</strong>: two ortho protons pushed out to δ 8.04 means <strong>the EWG carbonyl is attached directly to the ring</strong> (increment for –COOCH<sub>3</sub>: o +0.71, giving 7.26 + 0.71 = 7.97). Phenyl acetate has –O– on the ring, weakly donating, and its aromatic protons bunch between δ 7.08 and 7.37. 4-Methoxybenzaldehyde would need an aldehyde signal at δ 9.88, and benzoic acid a broad COOH near δ 12.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'H5', set: 'structure', type: 'mc', d: 3,
    q: { ko: '나이트로톨루엔 이성질체 중 하나가 δ 8.10 (2H, d, J = 8.7 Hz), 7.32 (2H, d, J = 8.7 Hz), 2.47 (3H, s)를 보입니다. 어느 이성질체이며 판단 근거는?',
         en: 'One nitrotoluene isomer shows δ 8.10 (2H, d, J = 8.7 Hz), 7.32 (2H, d, J = 8.7 Hz), 2.47 (3H, s). Which isomer is it, and on what grounds?' },
    o: [
      { ko: '4-나이트로톨루엔. 2H 이중선 두 개의 대칭 패턴이 para 치환을 뜻한다', en: '4-Nitrotoluene: two symmetric 2H doublets indicate para substitution' },
      { ko: '3-나이트로톨루엔. meta 치환에서만 이중선이 나타난다', en: '3-Nitrotoluene: only meta substitution gives doublets' },
      { ko: '2-나이트로톨루엔. ortho 치환은 언제나 2H 이중선 두 개를 만든다', en: '2-Nitrotoluene: ortho substitution always gives two 2H doublets' },
      { ko: '세 이성질체 모두 같은 패턴을 보여 구별할 수 없다', en: 'All three isomers give the same pattern and cannot be distinguished' }
    ], a: 0,
    e: { ko: 'para-이치환만이 두 종류의 양성자를 각각 2개씩 갖고 J ≈ 8–9 Hz의 대칭적인 이중선 쌍을 만듭니다. 3-나이트로톨루엔이라면 네 개의 서로 다른 양성자가 δ 7.4–8.1에 1H씩 흩어져 좁은 meta 짝지음(1–3 Hz)까지 섞인 복잡한 패턴이 됩니다. 계산으로도 확인됩니다. NO<sub>2</sub>에 ortho인 H = 7.26 + 0.95 − 0.09 = 8.12(실측 8.10), CH<sub>3</sub>에 ortho인 H = 7.26 − 0.17 + 0.26 = 7.35(실측 7.32). 참고로 ArCH<sub>3</sub> δ 2.47은 벤질 위치의 전형적인 값입니다.',
         en: 'Only para substitution gives two kinds of proton, two of each, with the symmetric pair of doublets at J ≈ 8–9 Hz. 3-Nitrotoluene would spread four distinct 1H signals across δ 7.4–8.1, complicated further by small meta couplings of 1–3 Hz. The increments confirm it: H ortho to NO<sub>2</sub> = 7.26 + 0.95 − 0.09 = 8.12 (obs. 8.10); H ortho to CH<sub>3</sub> = 7.26 − 0.17 + 0.26 = 7.35 (obs. 7.32). The ArCH<sub>3</sub> at δ 2.47 is a typical benzylic value.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'H6', set: 'structure', type: 'mc', d: 3,
    q: { ko: 'C<sub>8</sub>H<sub>8</sub>O. <sup>1</sup>H: δ 7.95 (2H, m), 7.56 (1H, m), 7.46 (2H, m), 2.60 (3H, s). <sup>13</sup>C: δ 198.1, 137.1, 133.1, 128.6, 128.3, 26.6. 이 화합물은?',
         en: 'C<sub>8</sub>H<sub>8</sub>O. <sup>1</sup>H: δ 7.95 (2H, m), 7.56 (1H, m), 7.46 (2H, m), 2.60 (3H, s). <sup>13</sup>C: δ 198.1, 137.1, 133.1, 128.6, 128.3, 26.6. Identify it.' },
    o: [
      { ko: '아세토페논 (acetophenone)', en: 'Acetophenone' },
      { ko: '페닐 아세트알데하이드', en: 'Phenylacetaldehyde' },
      { ko: '메틸 벤조에이트', en: 'Methyl benzoate' },
      { ko: '벤질 알코올', en: 'Benzyl alcohol' }
    ], a: 0,
    e: { ko: 'DoU = 5(벤젠 4 + C=O 1). <sup>13</sup>C δ 198.1은 <strong>케톤</strong> 카보닐입니다(에스터라면 165–175). <sup>1</sup>H에 알데하이드 신호(δ 9.5–10)가 없으므로 알데하이드도 아닙니다. 방향족 5H(2:1:2)는 일치환이고, ortho 2H가 δ 7.95까지 밀린 것은 고리에 EWG인 카보닐이 직결되었다는 뜻입니다(–COCH<sub>3</sub> 증분 o +0.62 → 7.88). δ 2.60 3H 단일선은 카보닐에 붙은 메틸이고, <sup>13</sup>C δ 26.6이 이를 뒷받침합니다. 신호가 6개인 것도 일치환 벤젠(4) + C=O(1) + CH<sub>3</sub>(1)과 정확히 맞습니다.',
         en: 'DoU = 5 (four for the ring, one for C=O). The <sup>13</sup>C signal at δ 198.1 is a <strong>ketone</strong> carbonyl (an ester would be 165–175), and the absence of any δ 9.5–10 proton rules out an aldehyde. Five aromatic protons in a 2:1:2 pattern mean a monosubstituted ring, and the ortho pair pushed to δ 7.95 shows the EWG carbonyl is bonded straight to it (increment for –COCH<sub>3</sub>: o +0.62 → 7.88). The 3H singlet at δ 2.60 is the methyl on the carbonyl, supported by <sup>13</sup>C δ 26.6. Six carbon signals also match: four for a monosubstituted ring, one C=O, one CH<sub>3</sub>.' },
    ref: 'Pavia et al., 5th ed., Ch. 8; SDBS (AIST).'
  });
  Q.push({
    id: 'H7', set: 'structure', type: 'multi', d: 3,
    q: { ko: '어떤 화합물의 <sup>1</sup>H NMR에서 방향족 영역이 δ 6.62 (2H, d)와 7.72 (2H, d)로 나타났습니다. 이 데이터에서 <strong>합리적으로 추론할 수 있는</strong> 것을 모두 고르세요.',
         en: 'A compound shows an aromatic region of δ 6.62 (2H, d) and 7.72 (2H, d). Select everything that can <strong>reasonably be inferred</strong>.' },
    o: [
      { ko: 'para-이치환 벤젠이다', en: 'It is a para-disubstituted benzene' },
      { ko: '한쪽 치환기는 강한 EDG, 다른 쪽은 EWG일 가능성이 높다', en: 'One substituent is probably a strong EDG and the other an EWG' },
      { ko: 'δ 6.62 쪽 양성자가 전자 밀도가 더 높은 위치에 있다', en: 'The protons at δ 6.62 sit at the more electron-rich positions' },
      { ko: '분자에 알데하이드기가 반드시 존재한다', en: 'The molecule must contain an aldehyde group' }
    ], a: [0, 1, 2],
    e: { ko: '2H 이중선 두 개의 대칭 패턴 → para 치환. 두 신호의 간격이 1.10 ppm으로 매우 크다는 것은 한쪽이 강하게 당기고 다른 쪽이 강하게 밀어 준다는 뜻입니다(예: 4-아미노아세토페논은 δ 6.64와 7.80, 4-아미노벤즈알데하이드는 δ 6.68과 7.66). 업필드 신호는 차폐된 위치, 즉 전자 밀도가 높은 자리입니다. 그러나 EWG의 정체가 CHO인지 COR인지 CN인지 NO<sub>2</sub>인지는 <strong>이 데이터만으로 확정할 수 없습니다</strong>. δ 9.8 부근 신호의 유무를 확인해야 합니다.',
         en: 'Two symmetric 2H doublets mean para substitution. A gap of 1.10 ppm is large, implying one substituent pulls hard while the other pushes hard (for comparison, 4-aminoacetophenone gives δ 6.64 and 7.80, and 4-aminobenzaldehyde δ 6.68 and 7.66). The upfield signal marks the shielded, electron-rich positions. But whether the EWG is CHO, COR, CN or NO<sub>2</sub> <strong>cannot be settled from these data alone</strong> — you would look for a signal near δ 9.8.' },
    ref: 'Pretsch et al., 4th ed., 2009; SDBS (AIST).'
  });
  Q.push({
    id: 'H8', set: 'structure', type: 'mc', d: 3,
    q: { ko: 'C<sub>9</sub>H<sub>10</sub>O<sub>2</sub>: δ 7.26–7.35 (5H, m), 3.68 (3H, s), 3.62 (2H, s). 이 화합물은?',
         en: 'C<sub>9</sub>H<sub>10</sub>O<sub>2</sub>: δ 7.26–7.35 (5H, m), 3.68 (3H, s), 3.62 (2H, s). Identify it.' },
    o: [
      { ko: '메틸 페닐아세테이트 C<sub>6</sub>H<sub>5</sub>CH<sub>2</sub>COOCH<sub>3</sub>', en: 'Methyl phenylacetate, C<sub>6</sub>H<sub>5</sub>CH<sub>2</sub>COOCH<sub>3</sub>' },
      { ko: '에틸 벤조에이트 C<sub>6</sub>H<sub>5</sub>COOCH<sub>2</sub>CH<sub>3</sub>', en: 'Ethyl benzoate, C<sub>6</sub>H<sub>5</sub>COOCH<sub>2</sub>CH<sub>3</sub>' },
      { ko: '4-메틸벤조산 메틸 에스터', en: 'Methyl 4-methylbenzoate' },
      { ko: '2-페닐프로판산', en: '2-Phenylpropanoic acid' }
    ], a: 0,
    e: { ko: '단일선만 있으므로 에틸기가 없습니다(에틸 벤조에이트라면 4.37 q + 1.39 t). 방향족 5H가 δ 7.3 부근에 모여 있는 것은 고리에 붙은 것이 <strong>EWG가 아니라 알킬</strong>이라는 뜻입니다. 만약 카보닐이 고리에 직결되었다면 ortho 2H가 δ 8 부근으로 분리되어 나왔을 것입니다. δ 3.68 (3H, s)는 에스터의 OCH<sub>3</sub>, δ 3.62 (2H, s)는 카보닐과 페닐 사이에 낀 CH<sub>2</sub>입니다(벤질 2.3 + 카보닐 α의 효과가 합쳐진 값). 2-페닐프로판산이라면 δ 11 부근에 COOH가, 그리고 3H 이중선과 1H 사중선이 있어야 합니다.',
         en: 'Only singlets, so no ethyl group (ethyl benzoate would show 4.37 q plus 1.39 t). Five aromatic protons bunched near δ 7.3 say that what is on the ring is <strong>an alkyl group, not an EWG</strong>; had the carbonyl been attached to the ring, the ortho pair would have separated out near δ 8. The 3H singlet at δ 3.68 is the ester OCH<sub>3</sub>, and the 2H singlet at δ 3.62 is the CH<sub>2</sub> sandwiched between the phenyl and the carbonyl (benzylic 2.3 plus the α-carbonyl contribution). 2-Phenylpropanoic acid would need a COOH near δ 11 plus a 3H doublet and a 1H quartet.' },
    ref: 'Pavia et al., 5th ed., Ch. 8; SDBS (AIST).'
  });

  global.SETS = SETS;
  global.QUESTIONS = Q;
})(window);
