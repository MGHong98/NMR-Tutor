/* data-lessons.js — 개념 학습 단원 데이터 / Lesson content
 * 블록 타입 / block types:
 *   p, h, ul, ol, formula, note{kind:key|pitfall|tip|exam}, table, spec, compare
 * 모든 텍스트는 {ko, en} 쌍. 국문에는 전문 용어의 영문을 병기한다.
 */
(function (global) {
  'use strict';

  var L = [];

  /* ---------------------------------------------------------------- L1 */
  L.push({
    id: 'basics',
    kicker: { ko: '1단원', en: 'Lesson 1' },
    title: { ko: 'NMR의 원리와 화학적 이동', en: 'How NMR works and what δ means' },
    lead: {
      ko: '핵 스핀이 왜 신호를 내는지, 그리고 화학적 이동(chemical shift, δ)이 무엇을 세는 눈금인지 정리합니다. 업필드(upfield)·다운필드(downfield)라는 말의 정확한 의미를 여기서 확실히 잡아 둡니다.',
      en: 'Why nuclear spins give a signal, and what the chemical shift (δ) scale actually measures. This is also where the words upfield and downfield get pinned down precisely.'
    },
    blocks: [
      { type: 'h', ko: '1.1 핵 스핀과 공명 조건', en: '1.1 Nuclear spin and the resonance condition' },
      { type: 'p',
        ko: '스핀 양자수(spin quantum number) I = 1/2 인 핵(<sup>1</sup>H, <sup>13</sup>C, <sup>19</sup>F, <sup>31</sup>P)은 외부 자기장 B<sub>0</sub> 안에서 두 개의 에너지 준위(α, β)로 갈라집니다. 두 준위의 에너지 차이에 정확히 대응하는 라디오파를 쬐면 흡수가 일어나는데, 이것이 공명(resonance)입니다.',
        en: 'A nucleus with spin quantum number I = 1/2 (<sup>1</sup>H, <sup>13</sup>C, <sup>19</sup>F, <sup>31</sup>P) splits into two energy levels (α, β) inside an external field B<sub>0</sub>. Irradiating with a radio-frequency photon that exactly matches the gap causes absorption — resonance.' },
      { type: 'formula', ko: 'ν = γ·B<sub>0</sub> / 2π    (γ = 자기회전비 gyromagnetic ratio)', en: 'ν = γ·B<sub>0</sub> / 2π    (γ = gyromagnetic ratio)' },
      { type: 'p',
        ko: '9.4 T 자석에서 <sup>1</sup>H는 약 400 MHz에서 공명합니다. 그래서 그 기기를 “400 MHz NMR”이라고 부릅니다. 같은 자석에서 <sup>13</sup>C는 γ가 약 1/4이므로 약 100 MHz에서 공명합니다.',
        en: 'In a 9.4 T magnet <sup>1</sup>H resonates near 400 MHz — hence the name “400 MHz NMR”. In the same magnet <sup>13</sup>C, whose γ is about one quarter as large, resonates near 100 MHz.' },

      { type: 'h', ko: '1.2 차폐와 화학적 이동', en: '1.2 Shielding and the chemical shift' },
      { type: 'p',
        ko: '핵 주위의 전자는 B<sub>0</sub> 안에서 순환하면서 B<sub>0</sub>를 상쇄하는 방향의 작은 자기장을 만듭니다. 그래서 핵이 실제로 느끼는 자기장은 B<sub>0</sub>보다 작습니다. 이것이 차폐(shielding)이고, σ를 차폐상수(shielding constant)라고 합니다.',
        en: 'Electrons circulating around a nucleus in B<sub>0</sub> generate a small field that opposes B<sub>0</sub>, so the nucleus feels less than the applied field. This is shielding; σ is the shielding constant.' },
      { type: 'formula', ko: 'B<sub>eff</sub> = B<sub>0</sub>(1 − σ)', en: 'B<sub>eff</sub> = B<sub>0</sub>(1 − σ)' },
      { type: 'p',
        ko: '전자 밀도(electron density)가 높을수록 σ가 크고 차폐가 강해집니다. 전자 밀도가 낮으면 비차폐(deshielding)되어 신호가 왼쪽으로 밀립니다. 이 한 문장이 사실상 이 프로그램 전체의 주제입니다.',
        en: 'Higher electron density means larger σ and stronger shielding. Lower electron density means deshielding and a signal pushed to the left. That one sentence is essentially the whole subject of this tutorial.' },
      { type: 'formula',
        ko: 'δ (ppm) = [ ν<sub>시료</sub> − ν<sub>TMS</sub> (Hz) ] / ν<sub>기기</sub> (MHz)',
        en: 'δ (ppm) = [ ν<sub>sample</sub> − ν<sub>TMS</sub> (Hz) ] / ν<sub>spectrometer</sub> (MHz)' },
      { type: 'p',
        ko: 'TMS(tetramethylsilane, (CH<sub>3</sub>)<sub>4</sub>Si)를 δ = 0 으로 둡니다. 규소가 탄소보다 전기음성도가 작아 메틸기에 전자를 밀어 주므로 TMS의 12개 양성자는 거의 모든 유기 화합물보다 강하게 차폐되어 있고, 12H가 모두 등가라서 큰 단일선(singlet) 하나만 냅니다.',
        en: 'TMS (tetramethylsilane) defines δ = 0. Silicon is less electronegative than carbon, so it pushes electron density onto the methyls: the 12 protons of TMS are more shielded than those of almost any organic compound, and being equivalent they give one sharp singlet.' },
      { type: 'note', kind: 'tip',
        title: { ko: 'ppm을 쓰는 이유', en: 'Why the scale is in ppm' },
        body: {
          ko: 'Hz로 표시하면 400 MHz 기기와 600 MHz 기기에서 값이 달라집니다. 기기 주파수로 나눠 주면 기기와 무관한 값이 되므로 교재의 표를 그대로 쓸 수 있습니다. 반대로 실제 분리 폭이 필요할 때는 <span class="k">Δν(Hz) = Δδ × 기기 주파수(MHz)</span> 로 되돌립니다. 예: 400 MHz에서 δ 7.26과 δ 6.86의 간격은 0.40 × 400 = 160 Hz입니다.',
          en: 'In Hz the numbers would differ between a 400 MHz and a 600 MHz instrument. Dividing by the spectrometer frequency makes the value instrument-independent, so textbook tables transfer. To go back to a real separation use <span class="k">Δν(Hz) = Δδ × spectrometer frequency (MHz)</span>. Example: at 400 MHz, δ 7.26 and δ 6.86 are 0.40 × 400 = 160 Hz apart.'
        } },

      { type: 'h', ko: '1.3 업필드와 다운필드', en: '1.3 Upfield and downfield' },
      { type: 'p',
        ko: '이 두 단어는 옛 연속파(continuous-wave, CW) 장비에서 유래했습니다. 그 장비는 라디오파 주파수를 고정하고 자기장을 훑었습니다(field sweep). 차폐가 약한 핵은 전자의 도움을 덜 받으므로, 더 낮은 인가 자기장에서도 공명 조건을 만족합니다. 그래서 “아래쪽 자기장(down-field)”이라는 말이 붙었습니다.',
        en: 'Both words come from old continuous-wave (CW) instruments, which held the radio frequency fixed and swept the magnetic field. A poorly shielded nucleus gets less help from its electrons, so it already meets the resonance condition at a lower applied field — hence “down-field”.' },
      { type: 'table',
        caption: { ko: '표 1-1. 같은 현상을 부르는 여러 표현', en: 'Table 1-1. Different names for the same thing' },
        headers: [{ ko: '왼쪽(left)', en: 'Left side' }, { ko: '오른쪽(right)', en: 'Right side' }],
        rows: [
          [{ ko: '다운필드(downfield)', en: 'Downfield' }, { ko: '업필드(upfield)', en: 'Upfield' }],
          [{ ko: 'δ 값이 큼', en: 'Larger δ' }, { ko: 'δ 값이 작음', en: 'Smaller δ' }],
          [{ ko: '비차폐됨(deshielded)', en: 'Deshielded' }, { ko: '차폐됨(shielded)', en: 'Shielded' }],
          [{ ko: '전자 밀도 낮음', en: 'Lower electron density' }, { ko: '전자 밀도 높음', en: 'Higher electron density' }],
          [{ ko: '낮은 인가 자기장에서 공명(CW 기준)', en: 'Resonates at lower applied field (CW)' }, { ko: '높은 인가 자기장에서 공명(CW 기준)', en: 'Resonates at higher applied field (CW)' }],
          [{ ko: '높은 주파수(higher frequency)', en: 'Higher frequency' }, { ko: '낮은 주파수(lower frequency)', en: 'Lower frequency' }]
        ] },
      { type: 'note', kind: 'pitfall',
        title: { ko: '가장 흔한 혼동: “δ가 큰데 왜 low field인가?”', en: 'The classic confusion: “larger δ but low field?”' },
        body: {
          ko: 'δ와 자기장은 방향이 반대입니다. δ는 <em>주파수</em> 눈금이고, downfield는 <em>자기장</em> 눈금에서 나온 말이기 때문입니다. 시험에서는 이렇게 외우세요: <strong>다운필드 = 왼쪽 = δ 큼 = 비차폐 = 전자 부족</strong>. 자기장 이야기는 어원일 뿐이며, 문제를 풀 때는 전자 밀도만 따지면 됩니다. 현대 문헌은 혼동을 피하려고 “고주파 쪽(high-frequency side)”이라고 쓰기도 합니다.',
          en: 'δ and field run in opposite directions because δ is a <em>frequency</em> scale while “downfield” is inherited from a <em>field</em> scale. For exams, memorise the chain: <strong>downfield = left = larger δ = deshielded = electron-poor</strong>. The field wording is only etymology; when solving problems, reason about electron density alone. Modern papers often say “to high frequency” instead, precisely to dodge this.'
        } },
      { type: 'spec',
        spec: { peaks: [
          { ppm: 9.80, mult: 'q', H: 1, label: 'CHO' },
          { ppm: 2.46, mult: 'qd', H: 2, label: 'CH2' },
          { ppm: 1.13, mult: 't', H: 3, label: 'CH3' },
          { ppm: 0.00, mult: 's', H: 0, label: 'TMS' }
        ], min: 0, max: 10 },
        caption: {
          ko: '그림 1-1. 프로판알(propanal, CH<sub>3</sub>CH<sub>2</sub>CHO)의 모식도. 알데하이드 양성자는 δ 9.8로 가장 다운필드, 메틸은 δ 1.1로 업필드에 있습니다. 실측값: 9.80, 2.46, 1.13 (CDCl<sub>3</sub>).',
          en: 'Figure 1-1. Schematic spectrum of propanal. The aldehyde proton sits farthest downfield at δ 9.8; the methyl is upfield at δ 1.1. Reported values: 9.80, 2.46, 1.13 (CDCl<sub>3</sub>).'
        } },
      { type: 'h', ko: '1.4 스펙트럼에서 읽어내는 네 가지', en: '1.4 The four things a spectrum tells you' },
      { type: 'ol', items: [
        { ko: '<strong>신호의 개수</strong> — 화학적으로 등가가 아닌 양성자 그룹이 몇 종류인가.', en: '<strong>Number of signals</strong> — how many chemically distinct groups of protons there are.' },
        { ko: '<strong>화학적 이동(δ)</strong> — 각 그룹이 어떤 화학적 환경에 있는가. (이 프로그램의 주 초점)', en: '<strong>Chemical shift (δ)</strong> — what chemical environment each group sits in. (the focus of this tutorial)' },
        { ko: '<strong>적분(integration)</strong> — 각 그룹에 양성자가 몇 개인가(상대비).', en: '<strong>Integration</strong> — how many protons are in each group (as a ratio).' },
        { ko: '<strong>짝지음(spin–spin coupling)</strong> — 이웃에 양성자가 몇 개 있는가.', en: '<strong>Spin–spin coupling</strong> — how many protons sit on neighbouring carbons.' }
      ] }
    ],
    refs: [
      'Pavia et al., Introduction to Spectroscopy, 5th ed., Cengage, 2015, Ch. 3.',
      'Clayden, Greeves & Warren, Organic Chemistry, 2nd ed., OUP, 2012, Ch. 13.',
      'Gottlieb, Kotlyar & Nudelman, J. Org. Chem. 1997, 62, 7512 (reference and residual-solvent shifts).'
    ]
  });

  /* ---------------------------------------------------------------- L2 */
  L.push({
    id: 'regions',
    kicker: { ko: '2단원', en: 'Lesson 2' },
    title: { ko: '화학적 이동 영역 지도', en: 'The chemical-shift map' },
    lead: {
      ko: '문제를 빠르게 풀려면 “이 δ면 대략 이 환경” 이라는 지도를 머릿속에 갖고 있어야 합니다. 외울 값은 생각보다 적습니다.',
      en: 'Fast problem solving needs a mental map of “this δ means roughly this environment”. There are fewer numbers to memorise than you would think.'
    },
    blocks: [
      { type: 'h', ko: '2.1 <sup>1</sup>H 영역표', en: '2.1 <sup>1</sup>H regions' },
      { type: 'table',
        caption: { ko: '표 2-1. 대표적인 <sup>1</sup>H 화학적 이동 (CDCl<sub>3</sub> 기준, 근사값)', en: 'Table 2-1. Representative <sup>1</sup>H shifts (CDCl<sub>3</sub>, approximate)' },
        headers: [{ ko: '양성자 유형', en: 'Proton type' }, { ko: 'δ (ppm)', en: 'δ (ppm)' }, { ko: '메모', en: 'Note' }],
        rows: [
          ['TMS', '0.00', { ko: '기준물질(reference)', en: 'Reference compound' }],
          ['R–CH<sub>3</sub>', '0.9', { ko: '사슬 말단 메틸', en: 'Chain-terminal methyl' }],
          ['R–CH<sub>2</sub>–R', '1.3', { ko: '', en: '' }],
          ['R<sub>3</sub>C–H', '1.5', { ko: '', en: '' }],
          ['C=C–CH<sub>3</sub> (allylic)', '1.7', { ko: '알릴 위치', en: 'Allylic' }],
          ['C≡C–H', '2.0–3.0', { ko: '이방성으로 오히려 업필드', en: 'Anisotropy pushes it upfield' }],
          ['CH<sub>3</sub>–C=O', '2.1–2.6', { ko: '케톤·에스터의 아실 쪽', en: 'Acyl side of ketones/esters' }],
          ['Ar–CH<sub>3</sub> (benzylic)', '2.3', { ko: '', en: '' }],
          ['CH<sub>3</sub>–N', '2.2–3.0', { ko: '아민', en: 'Amines' }],
          ['CH<sub>3</sub>–Br / –Cl', '2.7 / 3.1', { ko: '전기음성도 순서', en: 'Follows electronegativity' }],
          ['CH<sub>3</sub>–O', '3.3–4.0', { ko: '에터·알코올·메틸에스터', en: 'Ethers, alcohols, methyl esters' }],
          ['–CH<sub>2</sub>–O–C=O', '4.1–4.7', { ko: '에스터의 알콕시 쪽', en: 'Alkoxy side of an ester' }],
          ['C=CH<sub>2</sub> / C=CH–', '4.6–5.7', { ko: '', en: '' }],
          ['Ar–H', '6.5–8.5', { ko: '치환기에 따라 크게 이동', en: 'Moves a lot with substituents' }],
          ['R–CHO', '9.5–10.1', { ko: '', en: '' }],
          ['R–COOH', '10–13', { ko: '넓은 봉우리, 교환성', en: 'Broad, exchangeable' }],
          ['R–OH / R–NH<sub>2</sub>', '0.5–5.5', { ko: '가변적, 교환성, 흔히 넓음', en: 'Variable, exchangeable, often broad' }]
        ] },
      { type: 'note', kind: 'key',
        title: { ko: '먼저 외울 다섯 개', en: 'Five landmarks to memorise first' },
        body: {
          ko: '<strong>0.9</strong> (CH<sub>3</sub>) · <strong>2.1</strong> (CH<sub>3</sub>CO) · <strong>3.7</strong> (CH<sub>3</sub>O) · <strong>7.26</strong> (벤젠 및 CDCl<sub>3</sub> 잔류 신호) · <strong>9.8</strong> (CHO). 나머지는 이 다섯 개에서 “전자를 당기면 오른쪽에서 왼쪽으로” 라는 원리로 보간하면 됩니다.',
          en: '<strong>0.9</strong> (CH<sub>3</sub>) · <strong>2.1</strong> (CH<sub>3</sub>CO) · <strong>3.7</strong> (CH<sub>3</sub>O) · <strong>7.26</strong> (benzene, and the residual CDCl<sub>3</sub> peak) · <strong>9.8</strong> (CHO). Everything else can be interpolated from these five using “pull electrons away and the signal moves left”.'
        } },
      { type: 'h', ko: '2.2 <sup>13</sup>C 영역표', en: '2.2 <sup>13</sup>C regions' },
      { type: 'table',
        caption: { ko: '표 2-2. <sup>13</sup>C 영역 (근사값)', en: 'Table 2-2. <sup>13</sup>C regions (approximate)' },
        headers: [{ ko: '탄소 유형', en: 'Carbon type' }, { ko: 'δ (ppm)', en: 'δ (ppm)' }],
        rows: [
          [{ ko: '알킬 (C–C)', en: 'Alkyl (C–C)' }, '0–50'],
          [{ ko: '아민 탄소 (C–N)', en: 'C–N (amines)' }, '30–65'],
          [{ ko: '알코올·에터 탄소 (C–O)', en: 'C–O (alcohols, ethers)' }, '50–90'],
          [{ ko: '알카인 (C≡C)', en: 'Alkyne (C≡C)' }, '65–90'],
          [{ ko: '알켄 (C=C)', en: 'Alkene (C=C)' }, '100–150'],
          [{ ko: '방향족 (aromatic)', en: 'Aromatic' }, '110–160'],
          [{ ko: '나이트릴 (C≡N)', en: 'Nitrile (C≡N)' }, '115–125'],
          [{ ko: '에스터·아마이드·산의 C=O', en: 'Ester / amide / acid C=O' }, '155–185'],
          [{ ko: '알데하이드·케톤의 C=O', en: 'Aldehyde / ketone C=O' }, '185–220']
        ] },
      { type: 'note', kind: 'tip',
        title: { ko: '용매 잔류 신호(residual solvent peak)', en: 'Residual solvent peaks' },
        body: {
          ko: 'CDCl<sub>3</sub>는 <sup>1</sup>H δ 7.26(s), <sup>13</sup>C δ 77.16(t). DMSO-d<sub>6</sub>는 2.50(quint) / 39.52(sept). D<sub>2</sub>O는 4.79. 문제에서 정체불명의 신호가 이 값과 겹치면 용매를 의심하세요. (Gottlieb 외, <em>J. Org. Chem.</em> 1997)',
          en: 'CDCl<sub>3</sub> gives <sup>1</sup>H δ 7.26 (s) and <sup>13</sup>C δ 77.16 (t). DMSO-d<sub>6</sub>: 2.50 (quint) / 39.52 (sept). D<sub>2</sub>O: 4.79. An unexplained peak at one of these values is usually the solvent. (Gottlieb et al., <em>J. Org. Chem.</em> 1997)'
        } }
    ],
    refs: [
      'Pavia et al., Introduction to Spectroscopy, 5th ed., 2015, Appendix (correlation tables).',
      'Silverstein, Webster, Kiemle & Bryce, Spectrometric Identification of Organic Compounds, 8th ed., Wiley, 2014, Ch. 3–4.',
      'Gottlieb, Kotlyar & Nudelman, J. Org. Chem. 1997, 62, 7512.'
    ]
  });

  /* ---------------------------------------------------------------- L3 */
  L.push({
    id: 'inductive',
    kicker: { ko: '3단원', en: 'Lesson 3' },
    title: { ko: '유도 효과 — 결합을 타고 오는 당김', en: 'The inductive effect — pull through the σ bonds' },
    lead: {
      ko: '전기음성도가 큰 원자는 σ 결합을 따라 전자를 끌어당깁니다. 세기, 누적, 거리라는 세 가지 규칙만 알면 지방족 사슬의 δ는 거의 다 예측됩니다.',
      en: 'Electronegative atoms drag electron density along the σ bonds. Three rules — strength, accumulation and distance — predict almost every aliphatic shift.'
    },
    blocks: [
      { type: 'h', ko: '3.1 규칙 1: 전기음성도가 클수록 다운필드', en: '3.1 Rule 1: more electronegative, further downfield' },
      { type: 'table',
        caption: { ko: '표 3-1. CH<sub>3</sub>–X 의 메틸 양성자 (Pavia, 부록)', en: 'Table 3-1. Methyl protons of CH<sub>3</sub>–X (Pavia, appendix)' },
        headers: [{ ko: 'X', en: 'X' }, { ko: '전기음성도(EN)', en: 'Electronegativity' }, { ko: 'δ (ppm)', en: 'δ (ppm)' }],
        rows: [
          ['F', '4.0', '4.26'], ['OH', '3.5 (O)', '3.40'], ['Cl', '3.1', '3.05'],
          ['Br', '2.8', '2.68'], ['I', '2.5', '2.16'], ['H', '2.1', '0.23'], ['Si(CH<sub>3</sub>)<sub>3</sub>', '1.8', '0.00']
        ] },
      { type: 'h', ko: '3.2 규칙 2: 치환기가 많을수록 누적된다', en: '3.2 Rule 2: substituents add up' },
      { type: 'compare', cards: [
        { title: { ko: 'CH<sub>3</sub>Cl', en: 'CH<sub>3</sub>Cl' }, big: 'δ 3.05', body: { ko: 'Cl 한 개', en: 'One Cl' } },
        { title: { ko: 'CH<sub>2</sub>Cl<sub>2</sub>', en: 'CH<sub>2</sub>Cl<sub>2</sub>' }, big: 'δ 5.30', body: { ko: 'Cl 두 개', en: 'Two Cl' } }
      ] },
      { type: 'p',
        ko: 'CHCl<sub>3</sub>는 δ 7.26까지 올라갑니다. 벤젠과 같은 값이지만 이유는 전혀 다릅니다(하나는 유도 효과, 하나는 고리 전류). 이 우연의 일치 때문에 CDCl<sub>3</sub> 잔류 신호가 방향족 영역과 겹칩니다.',
        en: 'CHCl<sub>3</sub> reaches δ 7.26 — numerically the same as benzene but for a completely different reason (induction versus ring current). That coincidence is why the residual CDCl<sub>3</sub> peak lands in the aromatic region.' },
      { type: 'h', ko: '3.3 규칙 3: 거리에 따라 급격히 감소한다', en: '3.3 Rule 3: the effect dies off fast with distance' },
      { type: 'table',
        caption: { ko: '표 3-2. 1-클로로프로페인과 1-나이트로프로페인 (CDCl<sub>3</sub>)', en: 'Table 3-2. 1-chloropropane and 1-nitropropane (CDCl<sub>3</sub>)' },
        headers: [{ ko: '화합물', en: 'Compound' }, { ko: 'α-CH<sub>2</sub>', en: 'α-CH<sub>2</sub>' }, { ko: 'β-CH<sub>2</sub>', en: 'β-CH<sub>2</sub>' }, { ko: 'γ-CH<sub>3</sub>', en: 'γ-CH<sub>3</sub>' }],
        rows: [
          ['CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>Cl', '3.47', '1.81', '1.03'],
          ['CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>NO<sub>2</sub>', '4.38', '2.07', '1.03'],
          [{ ko: '프로페인(propane, 참고)', en: 'Propane (reference)' }, '1.33', '1.33', '0.90']
        ] },
      { type: 'note', kind: 'key',
        title: { ko: '3결합이면 사실상 끝', en: 'Three bonds and it is gone' },
        body: {
          ko: '위 표에서 NO<sub>2</sub>는 α에서 +3.0 ppm 이상 밀지만 γ-메틸에서는 프로페인과 0.13 ppm밖에 차이 나지 않습니다. 유도 효과는 결합 하나 건널 때마다 대략 1/3 이하로 줄어듭니다. <strong>“먼 곳의 EWG는 δ에 거의 영향이 없다”</strong>가 시험에서 자주 나오는 판단 기준입니다.',
          en: 'NO<sub>2</sub> shifts the α protons by more than +3.0 ppm, yet the γ-methyl differs from propane by only 0.13 ppm. Induction falls by roughly a factor of three per bond. <strong>“A remote EWG barely changes δ”</strong> is a judgement call that shows up on exams constantly.'
        } },
      { type: 'note', kind: 'pitfall',
        title: { ko: '함정: 어느 CH<sub>2</sub>가 더 다운필드인가', en: 'Pitfall: which CH<sub>2</sub> is further downfield?' },
        body: {
          ko: '에틸 아세테이트(ethyl acetate, CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>)에서 δ 4.12의 사중선(quartet)은 <strong>산소에 붙은</strong> CH<sub>2</sub>이고, δ 2.05의 단일선은 카보닐에 붙은 CH<sub>3</sub>입니다. C=O는 강한 EWG처럼 보이지만, 산소에 직접 결합한 쪽이 언제나 더 크게 이동합니다. 카보닐 옆(α 위치)의 효과는 “결합 하나 건너”라 절반 이하입니다.',
          en: 'In ethyl acetate the δ 4.12 quartet is the CH<sub>2</sub> <strong>attached to oxygen</strong>; the δ 2.05 singlet is the CH<sub>3</sub> attached to the carbonyl carbon. C=O looks like a strong EWG, but a group bonded directly to oxygen always moves further. Being α to a carbonyl is one bond removed, and worth less than half as much.'
        } },
      { type: 'spec',
        spec: { peaks: [
          { ppm: 4.12, mult: 'q', H: 2, label: 'OCH2' },
          { ppm: 2.05, mult: 's', H: 3, label: 'CH3CO' },
          { ppm: 1.26, mult: 't', H: 3, label: 'CH3' }
        ], min: 0, max: 6 },
        caption: {
          ko: '그림 3-1. 에틸 아세테이트 모식도. 실측: 4.12 (2H, q, J = 7.1 Hz), 2.05 (3H, s), 1.26 (3H, t, J = 7.1 Hz).',
          en: 'Figure 3-1. Ethyl acetate, schematic. Reported: 4.12 (2H, q, J = 7.1 Hz), 2.05 (3H, s), 1.26 (3H, t, J = 7.1 Hz).'
        } }
    ],
    refs: [
      'Pavia et al., Introduction to Spectroscopy, 5th ed., 2015, Ch. 3.6–3.9.',
      'Silverstein et al., Spectrometric Identification of Organic Compounds, 8th ed., 2014, Appendix A.',
      'SDBS, National Institute of Advanced Industrial Science and Technology (AIST), Japan — experimental 1H spectra.'
    ]
  });
  /* ---------------------------------------------------------------- L4 */
  L.push({
    id: 'ewg-edg',
    kicker: { ko: '4단원 · 핵심', en: 'Lesson 4 · Core' },
    title: { ko: 'EWG와 EDG — 방향족 고리의 업필드·다운필드', en: 'EWG vs EDG — upfield and downfield on an aromatic ring' },
    lead: {
      ko: '이 단원이 이 프로그램의 핵심입니다. 전자끌개기(electron-withdrawing group, EWG)와 전자주개기(electron-donating group, EDG)가 고리 양성자를 어느 방향으로, 어느 위치에서, 얼마나 움직이는지를 정량적으로 다룹니다.',
      en: 'This is the core lesson. It treats quantitatively how an electron-withdrawing group (EWG) and an electron-donating group (EDG) move ring protons — in which direction, at which positions, and by how much.'
    },
    blocks: [
      { type: 'h', ko: '4.1 두 가지 경로: 유도와 공명', en: '4.1 Two pathways: induction and resonance' },
      { type: 'table',
        caption: { ko: '표 4-1. 두 효과의 성격 비교', en: 'Table 4-1. The two effects compared' },
        headers: [{ ko: '', en: '' }, { ko: '유도 효과(inductive, −I/+I)', en: 'Inductive (−I / +I)' }, { ko: '공명 효과(resonance, −M/+M)', en: 'Resonance / mesomeric (−M / +M)' }],
        rows: [
          [{ ko: '전달 경로', en: 'Travels through' }, { ko: 'σ 결합', en: 'σ bonds' }, { ko: 'π 계(conjugation)', en: 'the π system' }],
          [{ ko: '거리 의존성', en: 'Distance' }, { ko: '결합마다 급감', en: 'Decays fast per bond' }, { ko: '공액이 유지되면 멀리 간다', en: 'Reaches far while conjugation holds' }],
          [{ ko: '위치 선택성', en: 'Positional' }, { ko: '없음 (가까운 쪽이 큼)', en: 'None (just nearest wins)' }, { ko: '<strong>ortho·para에만</strong>', en: '<strong>ortho and para only</strong>' }],
          [{ ko: '예', en: 'Examples' }, { ko: '−F, −Cl, −N<sup>+</sup>R<sub>3</sub>', en: '−F, −Cl, −N<sup>+</sup>R<sub>3</sub>' }, { ko: '−NO<sub>2</sub>, −C=O, −OR, −NH<sub>2</sub>', en: '−NO<sub>2</sub>, −C=O, −OR, −NH<sub>2</sub>' }]
        ] },
      { type: 'note', kind: 'key',
        title: { ko: '왜 ortho와 para뿐인가', en: 'Why only ortho and para' },
        body: {
          ko: '공명 구조를 그려 보면 이유가 바로 보입니다. 나이트로벤젠에서 π 전자를 NO<sub>2</sub>로 밀어 넣으면 양전하는 <em>ipso, ortho, para</em> 탄소에만 나타나고 meta에는 나타나지 않습니다. 아니솔에서 산소의 비공유 전자쌍을 고리로 밀어 넣으면 음전하가 <em>ortho와 para</em>에만 생깁니다. 그래서 공명 효과는 meta 자리를 거의 건드리지 않습니다.',
          en: 'Draw the resonance structures and the reason is immediate. Pushing ring π density onto the NO<sub>2</sub> group puts positive charge on the <em>ipso, ortho and para</em> carbons only — never meta. Donating the oxygen lone pair of anisole into the ring puts negative charge on the <em>ortho and para</em> carbons only. Resonance therefore hardly touches the meta position.'
        } },
      { type: 'h', ko: '4.2 치환기 증분표', en: '4.2 Substituent increment table' },
      { type: 'p',
        ko: '치환벤젠의 고리 양성자는 벤젠의 δ 7.26에서 출발해 각 치환기의 증분(Δδ)을 더하면 근사적으로 예측됩니다. 양수는 다운필드(비차폐), 음수는 업필드(차폐)입니다.',
        en: 'Ring protons of a substituted benzene are estimated by starting from benzene at δ 7.26 and adding each substituent increment (Δδ). Positive means downfield (deshielded), negative means upfield (shielded).' },
      { type: 'formula', ko: 'δ<sub>예측</sub> = 7.26 + Σ Δδ<sub>i</sub>', en: 'δ<sub>predicted</sub> = 7.26 + Σ Δδ<sub>i</sub>' },
      { type: 'table',
        caption: { ko: '표 4-2. 벤젠 고리 양성자에 대한 치환기 증분 Δδ (ppm). Pretsch 외, 4판(2009)의 값을 정리.', en: 'Table 4-2. Substituent increments Δδ (ppm) for benzene ring protons, after Pretsch et al., 4th ed. (2009).' },
        headers: [{ ko: '치환기', en: 'Group' }, { ko: '분류', en: 'Class' }, { ko: 'ortho', en: 'ortho' }, { ko: 'meta', en: 'meta' }, { ko: 'para', en: 'para' }],
        rows: [
          ['–NO<sub>2</sub>', { ko: '강한 EWG', en: 'Strong EWG' }, '+0.95', '+0.26', '+0.38'],
          ['–COOH', { ko: 'EWG', en: 'EWG' }, '+0.85', '+0.18', '+0.27'],
          ['–COOCH<sub>3</sub>', { ko: 'EWG', en: 'EWG' }, '+0.71', '+0.11', '+0.21'],
          ['–COCH<sub>3</sub>', { ko: 'EWG', en: 'EWG' }, '+0.62', '+0.14', '+0.21'],
          ['–CHO', { ko: 'EWG', en: 'EWG' }, '+0.56', '+0.22', '+0.29'],
          ['–CN', { ko: 'EWG', en: 'EWG' }, '+0.36', '+0.18', '+0.28'],
          ['–Br', { ko: '−I / +M 상충', en: '−I vs +M' }, '+0.22', '−0.13', '−0.03'],
          ['–Cl', { ko: '−I / +M 상충', en: '−I vs +M' }, '+0.02', '−0.06', '−0.04'],
          ['–H', { ko: '기준', en: 'Reference' }, '0', '0', '0'],
          ['–NHCOCH<sub>3</sub>', { ko: '약한 EDG(아마이드)', en: 'Weak EDG (amide)' }, '+0.12', '−0.07', '−0.28'],
          ['–CH<sub>3</sub>', { ko: '약한 EDG', en: 'Weak EDG' }, '−0.17', '−0.09', '−0.18'],
          ['–OCH<sub>3</sub>', { ko: '강한 EDG', en: 'Strong EDG' }, '−0.48', '−0.09', '−0.44'],
          ['–OH', { ko: '강한 EDG', en: 'Strong EDG' }, '−0.56', '−0.12', '−0.45'],
          ['–N(CH<sub>3</sub>)<sub>2</sub>', { ko: '매우 강한 EDG', en: 'Very strong EDG' }, '−0.66', '−0.18', '−0.67'],
          ['–NH<sub>2</sub>', { ko: '매우 강한 EDG', en: 'Very strong EDG' }, '−0.75', '−0.25', '−0.65']
        ] },
      { type: 'note', kind: 'key',
        title: { ko: '표를 외우지 말고 구조를 외우세요', en: 'Memorise the shape of the table, not the numbers' },
        body: {
          ko: '① 부호는 EWG면 +, EDG면 −. ② 크기는 언제나 <strong>ortho ≳ para ≫ meta</strong>. ③ meta 값은 어떤 치환기든 대체로 |0.1–0.3| 안쪽이라 “거의 벤젠 값(7.26)”. ④ 할로젠은 −I와 +M이 상쇄되어 전 위치가 0 근처. 이 네 줄이면 대부분의 객관식이 풀립니다.',
          en: '① Sign: + for EWG, − for EDG. ② Magnitude is always <strong>ortho ≳ para ≫ meta</strong>. ③ The meta entry stays inside about |0.1–0.3| for every group, i.e. “basically benzene, 7.26”. ④ Halogens cancel −I against +M and sit near zero everywhere. Those four lines settle most multiple-choice questions.'
        } },
      { type: 'h', ko: '4.3 사례 1 — 나이트로벤젠 (EWG)', en: '4.3 Case 1 — nitrobenzene (EWG)' },
      { type: 'formula',
        ko: 'ortho: 7.26 + 0.95 = 8.21 (실측 8.22)<br>meta: 7.26 + 0.26 = 7.52 (실측 7.52)<br>para: 7.26 + 0.38 = 7.64 (실측 7.68)',
        en: 'ortho: 7.26 + 0.95 = 8.21 (obs. 8.22)<br>meta: 7.26 + 0.26 = 7.52 (obs. 7.52)<br>para: 7.26 + 0.38 = 7.64 (obs. 7.68)' },
      { type: 'spec',
        spec: { peaks: [
          { ppm: 8.22, mult: 'd', H: 2, label: 'ortho' },
          { ppm: 7.68, mult: 't', H: 1, label: 'para' },
          { ppm: 7.52, mult: 't', H: 2, label: 'meta' }
        ], min: 6.0, max: 9.0 },
        caption: {
          ko: '그림 4-1. 나이트로벤젠 방향족 영역. 순서가 <strong>ortho > para > meta</strong>임에 주목하세요. 적분비 2 : 1 : 2 도 함께 확인해야 위치를 배정할 수 있습니다.',
          en: 'Figure 4-1. Aromatic region of nitrobenzene. Note the order <strong>ortho > para > meta</strong>. The 2 : 1 : 2 integration is what lets you assign the positions.'
        } },
      { type: 'h', ko: '4.4 사례 2 — 아니솔 (EDG)', en: '4.4 Case 2 — anisole (EDG)' },
      { type: 'formula',
        ko: 'ortho: 7.26 − 0.48 = 6.78 (실측 6.89)<br>meta: 7.26 − 0.09 = 7.17 (실측 7.28)<br>para: 7.26 − 0.44 = 6.82 (실측 6.94)<br>OCH<sub>3</sub>: 실측 3.80',
        en: 'ortho: 7.26 − 0.48 = 6.78 (obs. 6.89)<br>meta: 7.26 − 0.09 = 7.17 (obs. 7.28)<br>para: 7.26 − 0.44 = 6.82 (obs. 6.94)<br>OCH<sub>3</sub>: obs. 3.80' },
      { type: 'spec',
        spec: { peaks: [
          { ppm: 7.28, mult: 't', H: 2, label: 'meta' },
          { ppm: 6.94, mult: 't', H: 1, label: 'para' },
          { ppm: 6.89, mult: 'd', H: 2, label: 'ortho' },
          { ppm: 3.80, mult: 's', H: 3, label: 'OCH3' }
        ], min: 3.0, max: 8.0 },
        caption: {
          ko: '그림 4-2. 아니솔. 고리 양성자는 모두 벤젠보다 <strong>업필드</strong>이지만, meta는 거의 7.26 근처에 그대로 남아 있습니다.',
          en: 'Figure 4-2. Anisole. Every ring proton is <strong>upfield</strong> of benzene, but the meta proton stays essentially at 7.26.'
        } },
      { type: 'note', kind: 'pitfall',
        title: { ko: '함정 1 — “EDG인데 왜 OCH<sub>3</sub>는 δ 3.8이나 되나?”', en: 'Pitfall 1 — “It is an EDG, so why is OCH<sub>3</sub> at δ 3.8?”' },
        body: {
          ko: '치환기가 고리에 전자를 <em>주는</em> 것과, 그 치환기 자신의 양성자가 어떤 환경에 있는지는 별개의 문제입니다. OCH<sub>3</sub>의 메틸 양성자는 <strong>산소에 직접 결합</strong>해 있으므로 유도 효과로 강하게 비차폐되어 δ 3.80에 나옵니다. 즉 <strong>고리는 업필드, 치환기 자신은 다운필드</strong>입니다. 아닐린의 NH<sub>2</sub>(δ ≈ 3.5)도 같습니다. 반대로 EWG인 −CHO의 양성자는 δ 9.9로 다운필드입니다. <em>“전자를 어디로 주는가”와 “그 양성자가 어디에 붙어 있는가”를 분리해서 보세요.</em>',
          en: 'Whether a group <em>donates</em> into the ring is a separate question from the environment of the protons inside that group. The methyl of OCH<sub>3</sub> is <strong>bonded straight to oxygen</strong>, so induction deshields it hard and it appears at δ 3.80. In other words, <strong>the ring goes upfield while the substituent itself goes downfield</strong>. The NH<sub>2</sub> of aniline (δ ≈ 3.5) behaves the same. Conversely the proton of the EWG −CHO is downfield at δ 9.9. <em>Keep “where does it push electrons” separate from “what is this proton attached to”.</em>'
        } },
      { type: 'note', kind: 'pitfall',
        title: { ko: '함정 2 — “벤젠보다 업필드”와 “절대적으로 업필드”', en: 'Pitfall 2 — “upfield of benzene” is not “upfield in absolute terms”' },
        body: {
          ko: '아니솔의 ortho 양성자 δ 6.89는 벤젠(7.26)보다 업필드지만, 알켄 양성자(δ 5.3)보다는 여전히 훨씬 다운필드입니다. 고리 전류(ring current)라는 큰 바탕 효과 위에 치환기 효과가 ±0.7 ppm 정도로 얹히는 구조이기 때문입니다. 문제에서 “업필드로 이동한다”는 표현은 <strong>비교 대상이 무엇인지</strong> 반드시 확인해야 합니다.',
          en: 'The ortho proton of anisole at δ 6.89 is upfield of benzene (7.26) but still far downfield of an alkene proton (δ 5.3). Substituent effects of roughly ±0.7 ppm ride on top of a large ring-current baseline. Whenever a question says “shifts upfield”, check <strong>upfield relative to what</strong>.'
        } },
      { type: 'h', ko: '4.5 상충하는 치환기 — 할로젠', en: '4.5 When the two effects fight — halogens' },
      { type: 'p',
        ko: '염소는 전기음성도가 커서 σ 결합으로는 전자를 강하게 당깁니다(−I). 동시에 비공유 전자쌍을 π 계로 밀어 넣습니다(+M). 두 효과가 ortho/para에서 거의 상쇄되어, 클로로벤젠의 고리 양성자는 δ 7.26–7.32로 벤젠과 거의 구분되지 않는 좁은 다중선을 만듭니다.',
        en: 'Chlorine is electronegative and pulls hard through the σ framework (−I), while simultaneously donating a lone pair into the π system (+M). At the ortho and para positions these nearly cancel, so chlorobenzene gives a narrow multiplet at δ 7.26–7.32, barely distinguishable from benzene.' },
      { type: 'note', kind: 'exam',
        title: { ko: '친전자성 방향족 치환 반응과 연결해서 외우기', en: 'Tie it to electrophilic aromatic substitution' },
        body: {
          ko: '이미 배운 배향성 규칙(directing effect)과 완전히 같은 전자 밀도 논리입니다.<br>• <strong>ortho/para 배향성 + 활성화기(EDG)</strong> → 고리 전자 풍부 → ortho·para 양성자 <strong>업필드</strong><br>• <strong>meta 배향성 + 비활성화기(EWG)</strong> → 고리 전자 부족 → ortho·para 양성자 <strong>다운필드</strong>, meta는 거의 그대로<br>• <strong>할로젠</strong>: ortho/para 배향성이지만 비활성화기 → NMR에서도 상충되어 이동이 거의 없음<br>배향성만 알면 화학적 이동의 방향은 새로 외울 것이 없습니다.',
          en: 'This is exactly the electron-density logic behind directing effects you already know.<br>• <strong>ortho/para director + activating (EDG)</strong> → electron-rich ring → ortho and para protons move <strong>upfield</strong><br>• <strong>meta director + deactivating (EWG)</strong> → electron-poor ring → ortho and para protons move <strong>downfield</strong>, meta stays put<br>• <strong>halogens</strong>: ortho/para directing yet deactivating → the two effects also cancel in the NMR, giving almost no shift<br>If you know the directing effect, the direction of the chemical shift needs no separate memorising.'
        } },
      { type: 'h', ko: '4.6 밀고 당기는 고리 — para-이치환체', en: '4.6 Push–pull rings — para-disubstituted benzenes' },
      { type: 'p',
        ko: '4-나이트로아니솔(4-nitroanisole)처럼 EDG와 EWG가 para로 마주 보면 두 종류의 고리 양성자가 서로 반대 방향으로 밀려나 간격이 크게 벌어집니다. 각 양성자에는 두 치환기의 증분을 모두 더합니다.',
        en: 'When an EDG and an EWG face each other across the ring, as in 4-nitroanisole, the two kinds of ring proton are pushed in opposite directions and the gap between them opens up. Add both substituent increments to each proton.' },
      { type: 'formula',
        ko: 'H(NO<sub>2</sub>의 ortho, OCH<sub>3</sub>의 meta): 7.26 + 0.95 − 0.09 = 8.12 (실측 8.20)<br>H(OCH<sub>3</sub>의 ortho, NO<sub>2</sub>의 meta): 7.26 − 0.48 + 0.26 = 7.04 (실측 6.95)',
        en: 'H (ortho to NO<sub>2</sub>, meta to OCH<sub>3</sub>): 7.26 + 0.95 − 0.09 = 8.12 (obs. 8.20)<br>H (ortho to OCH<sub>3</sub>, meta to NO<sub>2</sub>): 7.26 − 0.48 + 0.26 = 7.04 (obs. 6.95)' },
      { type: 'spec',
        spec: { peaks: [
          { ppm: 8.20, mult: 'd', H: 2, label: 'ortho to NO2' },
          { ppm: 6.95, mult: 'd', H: 2, label: 'ortho to OMe' },
          { ppm: 3.90, mult: 's', H: 3, label: 'OCH3' }
        ], min: 3.0, max: 9.0 },
        caption: {
          ko: '그림 4-3. 4-나이트로아니솔. para-이치환 벤젠의 특징인 대칭적 두 겹선(AA′BB′ 계, J ≈ 9 Hz)이 나타납니다.',
          en: 'Figure 4-3. 4-Nitroanisole, showing the symmetric pair of doublets (an AA′BB′ system, J ≈ 9 Hz) typical of a para-disubstituted ring.'
        } },
      { type: 'note', kind: 'tip',
        title: { ko: '실전 감각', en: 'A practical rule of thumb' },
        body: {
          ko: 'para-이치환 벤젠에서 두 겹선의 간격이 <strong>1 ppm 이상</strong>이면 한쪽은 강한 EWG, 다른 쪽은 강한 EDG일 가능성이 높습니다. 간격이 <strong>0.2 ppm 이하</strong>로 붙어 있으면 두 치환기의 성격이 비슷하거나 둘 다 약한 경우입니다.',
          en: 'In a para-disubstituted benzene, a gap of <strong>more than about 1 ppm</strong> between the two doublets usually means one strong EWG facing one strong EDG. A gap under <strong>0.2 ppm</strong> means the two substituents are similar in character, or both weak.'
        } }
    ],
    refs: [
      'Pretsch, Bühlmann & Badertscher, Structure Determination of Organic Compounds: Tables of Spectral Data, 4th ed., Springer, 2009 — aromatic substituent increments.',
      'Pavia et al., Introduction to Spectroscopy, 5th ed., 2015, Ch. 3.13 and Appendix.',
      'Clayden, Greeves & Warren, Organic Chemistry, 2nd ed., 2012, Ch. 21 (EAS directing effects) and Ch. 31.',
      'SDBS, AIST Japan — experimental spectra of nitrobenzene, anisole, chlorobenzene, 4-nitroanisole.'
    ]
  });

  /* ---------------------------------------------------------------- L5 */
  L.push({
    id: 'anisotropy',
    kicker: { ko: '5단원', en: 'Lesson 5' },
    title: { ko: '이방성 효과와 교환성 양성자', en: 'Anisotropy and exchangeable protons' },
    lead: {
      ko: '전자 밀도만으로 설명되지 않는 이동이 있습니다. π 결합이 만드는 유도 자기장(자기 이방성, magnetic anisotropy)과 수소 결합이 그 주인공입니다.',
      en: 'Some shifts are not explained by electron density alone. The induced fields of π systems (magnetic anisotropy) and hydrogen bonding are responsible.'
    },
    blocks: [
      { type: 'h', ko: '5.1 고리 전류(ring current)', en: '5.1 The ring current' },
      { type: 'p',
        ko: '벤젠의 6개 π 전자는 B<sub>0</sub> 안에서 고리를 따라 순환하며 자기장을 만듭니다. 고리 <em>바깥쪽</em>(양성자가 있는 곳)에서 이 유도 자기장은 B<sub>0</sub>와 같은 방향이 되어 양성자를 비차폐시킵니다. 그래서 방향족 양성자는 알켄(δ 5.3)보다 2 ppm이나 더 다운필드인 δ 7.26에 나옵니다.',
        en: 'The six π electrons of benzene circulate around the ring in B<sub>0</sub> and generate a field. <em>Outside</em> the ring, where the protons sit, this induced field adds to B<sub>0</sub> and deshields them. That is why aromatic protons appear at δ 7.26, some 2 ppm downfield of an alkene proton at δ 5.3.' },
      { type: 'p',
        ko: '반대로 고리 <em>위쪽</em>에 놓인 양성자는 강하게 차폐됩니다. [18]annulene의 안쪽 양성자가 δ −3 부근(TMS보다 오른쪽!)에 나타나는 것이 고전적인 증거입니다.',
        en: 'A proton held <em>above</em> the ring is strongly shielded instead. The classic evidence is [18]annulene, whose inner protons appear near δ −3 — to the right of TMS.' },
      { type: 'note', kind: 'pitfall',
        title: { ko: '함정 — 알카인 양성자는 왜 업필드인가', en: 'Pitfall — why the alkyne proton is upfield' },
        body: {
          ko: 'sp 탄소는 sp<sup>2</sup>보다 s 성분이 많아 전기음성도가 큽니다. 유도 효과만 보면 말단 알카인 양성자(≡C–H)는 알켄 양성자(δ 5.3)보다 다운필드여야 합니다. 그러나 실제로는 δ 2.0–3.0으로 <strong>훨씬 업필드</strong>입니다. 원통형 π 전자 순환의 차폐 원뿔(shielding cone) 축 위에 C–H 결합이 놓여 있어, 이방성 차폐가 유도 효과를 이기기 때문입니다. “전기음성도 논리를 이방성이 뒤집는” 대표적인 예이고 시험 단골입니다.',
          en: 'An sp carbon has more s character than sp<sup>2</sup> and is more electronegative, so on induction alone a terminal alkyne proton should be downfield of an alkene proton (δ 5.3). In fact it appears at δ 2.0–3.0, <strong>much further upfield</strong>. The C–H bond lies along the axis of the cylindrical π circulation, inside the shielding cone, and anisotropic shielding beats induction. This is the textbook case of anisotropy overriding electronegativity, and it is a perennial exam item.'
        } },
      { type: 'table',
        caption: { ko: '표 5-1. 이방성이 지배하는 대표 값', en: 'Table 5-1. Shifts dominated by anisotropy' },
        headers: [{ ko: '양성자', en: 'Proton' }, { ko: 'δ (ppm)', en: 'δ (ppm)' }, { ko: '해석', en: 'Interpretation' }],
        rows: [
          ['C≡C–H', '2.0–3.0', { ko: '차폐 원뿔 내부 → 업필드', en: 'Inside the shielding cone → upfield' }],
          ['C=C–H', '4.6–5.7', { ko: '비차폐 영역', en: 'Deshielding region' }],
          ['Ar–H', '6.5–8.5', { ko: '고리 전류로 강한 비차폐', en: 'Strong deshielding by ring current' }],
          ['R–CHO', '9.5–10.1', { ko: '이방성 + 카보닐 EWG 효과의 합', en: 'Anisotropy plus the carbonyl EWG effect' }],
          ['R–COOH', '10–13', { ko: '이방성 + 수소 결합', en: 'Anisotropy plus hydrogen bonding' }]
        ] },
      { type: 'h', ko: '5.2 교환성 양성자 (OH, NH, COOH)', en: '5.2 Exchangeable protons (OH, NH, COOH)' },
      { type: 'ul', items: [
        { ko: '<strong>위치가 가변적</strong>: 농도·온도·용매·수소 결합 정도에 따라 몇 ppm씩 움직입니다. 알코올의 OH는 δ 0.5–5.5 어디에나 나올 수 있습니다.', en: '<strong>Position is variable</strong>: it moves by whole ppm with concentration, temperature, solvent and hydrogen bonding. An alcohol OH can appear anywhere from δ 0.5 to 5.5.' },
        { ko: '<strong>흔히 넓은 단일선</strong>: 빠른 양성자 교환 때문에 이웃과의 짝지음이 평균화되어 사라집니다.', en: '<strong>Usually a broad singlet</strong>: fast proton exchange averages away the coupling to neighbours.' },
        { ko: '<strong>D<sub>2</sub>O 흔들기(D<sub>2</sub>O shake)</strong>: D<sub>2</sub>O를 몇 방울 넣고 다시 측정하면 이 신호가 사라집니다. 교환성 양성자를 확인하는 표준 실험입니다.', en: '<strong>The D<sub>2</sub>O shake</strong>: add a few drops of D<sub>2</sub>O and re-run; the signal disappears. This is the standard test for an exchangeable proton.' },
        { ko: '<strong>분자내 수소 결합</strong>은 극단적인 다운필드를 만듭니다. 살리실알데하이드의 OH는 δ ≈ 11, 아세틸아세톤 엔올형의 OH는 δ ≈ 15.5입니다.', en: '<strong>Intramolecular hydrogen bonds</strong> give extreme downfield shifts: the OH of salicylaldehyde sits near δ 11, and that of the enol of acetylacetone near δ 15.5.' }
      ] },
      { type: 'note', kind: 'tip',
        title: { ko: '적분에서 제외하고 생각하기', en: 'Set them aside when counting' },
        body: {
          ko: '구조 문제에서 넓고 위치가 애매한 1H 신호가 하나 있으면 우선 OH/NH로 가정하고, 나머지 신호들로 탄소 골격을 먼저 맞춘 뒤 마지막에 되돌아오는 편이 빠릅니다.',
          en: 'In a structure problem, when one broad 1H signal sits at an awkward position, provisionally call it OH or NH, build the carbon skeleton from the remaining signals, and come back to it at the end. It is much faster.'
        } }
    ],
    refs: [
      'Pavia et al., Introduction to Spectroscopy, 5th ed., 2015, Ch. 3.12 (anisotropy) and 3.15 (exchangeable protons).',
      'Silverstein et al., Spectrometric Identification of Organic Compounds, 8th ed., 2014, Ch. 3.',
      'Clayden, Greeves & Warren, Organic Chemistry, 2nd ed., 2012, Ch. 13.'
    ]
  });

  /* ---------------------------------------------------------------- L6 */
  L.push({
    id: 'coupling',
    kicker: { ko: '6단원', en: 'Lesson 6' },
    title: { ko: '적분과 스핀-스핀 짝지음', en: 'Integration and spin–spin coupling' },
    lead: {
      ko: 'δ가 “어떤 환경인가”를 알려 준다면, 적분(integration)은 “몇 개인가”를, 짝지음(coupling)은 “무엇과 이웃인가”를 알려 줍니다.',
      en: 'If δ tells you the environment, integration tells you how many protons there are and coupling tells you what they are next to.'
    },
    blocks: [
      { type: 'h', ko: '6.1 적분은 비율이다', en: '6.1 Integration gives ratios' },
      { type: 'p',
        ko: '적분값은 절대적인 양성자 수가 아니라 <strong>상대비</strong>입니다. 3 : 2 로 읽혔다면 실제로는 3H : 2H일 수도, 6H : 4H일 수도 있습니다. 분자식이 있을 때 총합을 맞춰 확정합니다.',
        en: 'An integral is a <strong>ratio</strong>, not an absolute count. A 3 : 2 reading could be 3H : 2H or 6H : 4H. Fix it against the total from the molecular formula.' },
      { type: 'h', ko: '6.2 n + 1 규칙', en: '6.2 The n + 1 rule' },
      { type: 'p',
        ko: '이웃한 탄소에 등가인 양성자가 n개 있으면 신호는 (n + 1)개로 갈라집니다. 세기 비는 파스칼 삼각형(Pascal triangle)을 따릅니다.',
        en: 'A signal is split into (n + 1) lines by n equivalent protons on the neighbouring carbon, with intensities following Pascal triangle.' },
      { type: 'table',
        caption: { ko: '표 6-1. 갈라짐 패턴', en: 'Table 6-1. Splitting patterns' },
        headers: [{ ko: '이웃 H 수 (n)', en: 'Neighbours (n)' }, { ko: '패턴', en: 'Pattern' }, { ko: '세기 비', en: 'Intensity ratio' }],
        rows: [
          ['0', { ko: '단일선 (singlet, s)', en: 'singlet (s)' }, '1'],
          ['1', { ko: '이중선 (doublet, d)', en: 'doublet (d)' }, '1 : 1'],
          ['2', { ko: '삼중선 (triplet, t)', en: 'triplet (t)' }, '1 : 2 : 1'],
          ['3', { ko: '사중선 (quartet, q)', en: 'quartet (q)' }, '1 : 3 : 3 : 1'],
          ['4', { ko: '오중선 (quintet)', en: 'quintet' }, '1 : 4 : 6 : 4 : 1'],
          ['6', { ko: '칠중선 (septet)', en: 'septet' }, '1 : 6 : 15 : 20 : 15 : 6 : 1']
        ] },
      { type: 'h', ko: '6.3 짝지음 상수 J', en: '6.3 The coupling constant J' },
      { type: 'table',
        caption: { ko: '표 6-2. 대표적인 J 값 (Hz)', en: 'Table 6-2. Typical J values (Hz)' },
        headers: [{ ko: '관계', en: 'Relationship' }, { ko: 'J (Hz)', en: 'J (Hz)' }],
        rows: [
          [{ ko: '자유 회전하는 사슬 (vicinal, 3J)', en: 'Freely rotating chain (vicinal, 3J)' }, '6–8'],
          [{ ko: '알켄 cis', en: 'Alkene cis' }, '6–12'],
          [{ ko: '알켄 trans', en: 'Alkene trans' }, '12–18'],
          [{ ko: '알켄 geminal (=CH<sub>2</sub>)', en: 'Alkene geminal (=CH<sub>2</sub>)' }, '0–3'],
          [{ ko: '방향족 ortho', en: 'Aromatic ortho' }, '6–9'],
          [{ ko: '방향족 meta', en: 'Aromatic meta' }, '1–3'],
          [{ ko: '방향족 para', en: 'Aromatic para' }, '0–1']
        ] },
      { type: 'note', kind: 'key',
        title: { ko: 'J는 Hz, δ는 ppm', en: 'J in Hz, δ in ppm' },
        body: {
          ko: 'J는 자기장 세기와 <strong>무관</strong>합니다. 400 MHz에서 7 Hz면 600 MHz에서도 7 Hz입니다. 반면 두 신호의 <em>간격</em>은 Hz로 보면 자기장에 비례해 커집니다. 고자기장 기기를 쓰면 겹쳐 있던 봉우리가 풀리는 이유가 이것입니다.',
          en: 'J does <strong>not</strong> depend on field strength: 7 Hz at 400 MHz is still 7 Hz at 600 MHz. The <em>separation</em> between two signals, measured in Hz, does scale with the field. That is exactly why overlapping peaks resolve on a higher-field instrument.'
        } },
      { type: 'note', kind: 'pitfall',
        title: { ko: '함정 — EWG/EDG는 갈라짐을 바꾸지 않는다', en: 'Pitfall — EWG/EDG do not change the splitting' },
        body: {
          ko: '치환기 효과는 <strong>δ의 위치</strong>를 바꿀 뿐, 다중도(multiplicity)와 J는 거의 그대로입니다. 1-클로로프로페인과 1-나이트로프로페인은 δ는 크게 다르지만 둘 다 t / sext / t 패턴에 J ≈ 7 Hz입니다. “EWG가 붙으면 갈라짐이 늘어난다”는 잘못된 서술이 선택지로 자주 등장합니다.',
          en: 'A substituent moves <strong>where</strong> a signal sits; multiplicity and J stay essentially the same. 1-Chloropropane and 1-nitropropane differ a lot in δ yet both show t / sextet / t with J ≈ 7 Hz. “Adding an EWG increases the splitting” is a frequent distractor and it is wrong.'
        } },
      { type: 'h', ko: '6.4 등가성과 AA′BB′', en: '6.4 Equivalence and AA′BB′' },
      { type: 'ul', items: [
        { ko: '<strong>등가인 양성자끼리는 갈라지지 않습니다.</strong> CH<sub>3</sub>CH<sub>3</sub>는 6H 단일선 하나입니다.', en: '<strong>Equivalent protons do not split each other.</strong> Ethane is a single 6H singlet.' },
        { ko: 'para-이치환 벤젠은 엄밀히는 AA′BB′ 계이지만, 학부 수준에서는 <strong>J ≈ 8–9 Hz의 이중선 두 개</strong>로 다루면 충분합니다. 이 대칭 패턴 자체가 para 치환의 강력한 증거입니다.', en: 'A para-disubstituted ring is strictly an AA′BB′ system, but at undergraduate level treating it as <strong>two doublets with J ≈ 8–9 Hz</strong> is enough. The symmetric pattern is itself strong evidence for para substitution.' },
        { ko: '<strong>지붕 효과(roofing)</strong>: 짝지어진 두 신호는 서로를 향한 쪽 봉우리가 더 높아집니다. 어느 신호와 어느 신호가 짝인지 찾는 단서가 됩니다.', en: '<strong>Roofing</strong>: coupled multiplets lean towards each other, the inner lines being taller. It is a useful clue for pairing up partners.' },
        { ko: 'OH·NH는 빠른 교환 때문에 보통 짝지음이 보이지 않아 단일선으로 나옵니다.', en: 'OH and NH usually show no coupling because exchange is fast, so they appear as singlets.' }
      ] }
    ],
    refs: [
      'Pavia et al., Introduction to Spectroscopy, 5th ed., 2015, Ch. 4 and 5.',
      'Silverstein et al., Spectrometric Identification of Organic Compounds, 8th ed., 2014, Ch. 3 (Appendix F, coupling constants).'
    ]
  });

  /* ---------------------------------------------------------------- L7 */
  L.push({
    id: 'carbon13',
    kicker: { ko: '7단원', en: 'Lesson 7' },
    title: { ko: '<sup>13</sup>C NMR과 치환기 효과', en: '<sup>13</sup>C NMR and substituent effects' },
    lead: {
      ko: '<sup>13</sup>C는 범위가 넓어 신호가 잘 겹치지 않습니다. 다만 방향족 <em>ipso</em> 탄소에서는 <sup>1</sup>H와 정반대처럼 보이는 결과가 나와 혼동을 부릅니다.',
      en: 'The wide <sup>13</sup>C range keeps signals from overlapping. But the aromatic <em>ipso</em> carbon behaves in a way that looks backwards compared with <sup>1</sup>H, and that trips people up.'
    },
    blocks: [
      { type: 'h', ko: '7.1 실험적 특징', en: '7.1 Practical features' },
      { type: 'ul', items: [
        { ko: '<sup>13</sup>C의 천연 존재비는 1.1%에 불과해 감도가 낮습니다. 인접한 두 <sup>13</sup>C가 만날 확률이 거의 없어 C–C 짝지음은 보이지 않습니다.', en: 'The natural abundance of <sup>13</sup>C is only 1.1%, so sensitivity is low. Two adjacent <sup>13</sup>C nuclei are so rare that C–C coupling is not observed.' },
        { ko: '보통 <strong>양성자 광대역 짝풀림(broadband proton decoupling)</strong>으로 측정하므로 모든 탄소가 단일선으로 나옵니다. 대신 세기가 탄소 수에 비례하지 않아 <strong>적분을 쓸 수 없습니다</strong>.', en: 'Spectra are normally run with <strong>broadband proton decoupling</strong>, so every carbon appears as a singlet. The trade-off is that intensities are not proportional to the number of carbons, so <strong>integration is not usable</strong>.' },
        { ko: '<strong>DEPT-135</strong>: CH와 CH<sub>3</sub>는 위로, CH<sub>2</sub>는 아래로, 사차 탄소(quaternary)는 나타나지 않습니다.', en: '<strong>DEPT-135</strong>: CH and CH<sub>3</sub> point up, CH<sub>2</sub> points down, and quaternary carbons vanish.' },
        { ko: '대칭성이 높으면 신호 수가 크게 줄어듭니다. para-이치환 벤젠 고리는 탄소 6개지만 신호는 4개입니다.', en: 'Symmetry cuts the number of signals sharply: the six carbons of a para-disubstituted ring give only four signals.' }
      ] },
      { type: 'h', ko: '7.2 방향족 치환기 효과', en: '7.2 Aromatic substituent effects' },
      { type: 'table',
        caption: { ko: '표 7-1. 벤젠(128.5) 대비 고리 탄소의 <sup>13</sup>C 화학적 이동 (ppm, CDCl<sub>3</sub>)', en: 'Table 7-1. Ring-carbon <sup>13</sup>C shifts versus benzene at 128.5 (ppm, CDCl<sub>3</sub>)' },
        headers: [{ ko: '화합물', en: 'Compound' }, { ko: 'C-ipso', en: 'C-ipso' }, { ko: 'C-ortho', en: 'C-ortho' }, { ko: 'C-meta', en: 'C-meta' }, { ko: 'C-para', en: 'C-para' }],
        rows: [
          [{ ko: '벤젠', en: 'Benzene' }, '128.5', '128.5', '128.5', '128.5'],
          [{ ko: '나이트로벤젠 (EWG)', en: 'Nitrobenzene (EWG)' }, '148.3', '123.4', '129.3', '134.7'],
          [{ ko: '아니솔 (EDG)', en: 'Anisole (EDG)' }, '159.9', '114.1', '129.5', '120.7'],
          [{ ko: '톨루엔 (약한 EDG)', en: 'Toluene (weak EDG)' }, '137.8', '129.3', '128.5', '125.6']
        ] },
      { type: 'note', kind: 'key',
        title: { ko: 'ortho·para 탄소는 <sup>1</sup>H와 같은 논리', en: 'The ortho and para carbons follow the same logic as <sup>1</sup>H' },
        body: {
          ko: '아니솔의 C-ortho(114.1)와 C-para(120.7)는 벤젠보다 크게 <strong>업필드</strong>입니다. 산소의 비공유 전자쌍이 그 자리에 π 전자 밀도를 몰아주기 때문이며, <sup>1</sup>H에서 ortho·para 양성자가 업필드로 가는 것과 같은 이유입니다. 나이트로벤젠에서는 C-ortho가 123.4로 <em>업필드</em>인 점이 예외적으로 보이지만(이는 이웃 원자 효과가 겹친 결과), C-para 134.7은 예상대로 뚜렷하게 다운필드입니다. 학부 수준에서는 <strong>C-para를 기준으로 판단</strong>하는 편이 안전합니다.',
          en: 'The ortho (114.1) and para (120.7) carbons of anisole are far <strong>upfield</strong> of benzene, because the oxygen lone pair piles π density onto exactly those positions — the same reason the ortho and para protons move upfield. In nitrobenzene the ortho carbon at 123.4 looks anomalously <em>upfield</em> (a neighbouring-atom effect superimposed on the resonance one), but the para carbon at 134.7 is clearly downfield as expected. At undergraduate level it is safer to <strong>judge from the para carbon</strong>.'
        } },
      { type: 'note', kind: 'pitfall',
        title: { ko: '함정 — ipso 탄소는 완전히 다른 이야기', en: 'Pitfall — the ipso carbon is a different story' },
        body: {
          ko: '아니솔의 <em>ipso</em> 탄소는 δ 159.9로 나이트로벤젠의 148.3보다도 훨씬 다운필드입니다. EDG가 붙었는데 왜 가장 다운필드일까요? ipso 탄소는 <strong>산소에 직접 결합</strong>해 있어서 유도 효과가 압도적이기 때문입니다. 4단원의 “OCH<sub>3</sub> 양성자가 δ 3.8” 함정과 정확히 같은 구조의 문제입니다.<br><strong>정리: 직접 결합한 원자의 전기음성도는 ipso를 지배하고, 공명에 의한 전자 밀도는 ortho·para를 지배한다.</strong>',
          en: 'The <em>ipso</em> carbon of anisole is at δ 159.9, even further downfield than that of nitrobenzene at 148.3. Why would an EDG give the most downfield carbon? Because the ipso carbon is <strong>bonded directly to oxygen</strong>, and induction dominates there. It is structurally the same trap as “the OCH<sub>3</sub> protons at δ 3.8” from Lesson 4.<br><strong>Summary: the electronegativity of the directly bonded atom controls the ipso carbon; resonance-delivered electron density controls the ortho and para carbons.</strong>'
        } }
    ],
    refs: [
      'Pavia et al., Introduction to Spectroscopy, 5th ed., 2015, Ch. 4 (13C NMR) and Ch. 6 (DEPT).',
      'Pretsch, Bühlmann & Badertscher, Structure Determination of Organic Compounds, 4th ed., 2009 — 13C substituent tables.',
      'Silverstein et al., Spectrometric Identification of Organic Compounds, 8th ed., 2014, Ch. 4.'
    ]
  });

  /* ---------------------------------------------------------------- L8 */
  L.push({
    id: 'strategy',
    kicker: { ko: '8단원', en: 'Lesson 8' },
    title: { ko: '구조 결정 전략', en: 'A workflow for structure determination' },
    lead: {
      ko: '문제를 앞에서부터 순서대로 푸는 절차를 익혀 두면 처음 보는 스펙트럼에서도 헤매지 않습니다.',
      en: 'A fixed order of attack keeps you from flailing on a spectrum you have never seen.'
    },
    blocks: [
      { type: 'h', ko: '8.1 여섯 단계', en: '8.1 Six steps' },
      { type: 'ol', items: [
        { ko: '<strong>불포화도(degree of unsaturation, DoU)</strong>를 계산합니다. DoU = (2C + 2 + N − H − X) / 2. 4 이상이면 벤젠 고리를 먼저 의심하세요(고리 1 + π 3 = 4).', en: 'Compute the <strong>degree of unsaturation</strong>: DoU = (2C + 2 + N − H − X) / 2. A value of 4 or more should make you suspect a benzene ring first (one ring plus three π bonds).' },
        { ko: '<strong>적분 합</strong>을 분자식의 H 수에 맞춰 각 신호의 실제 양성자 수를 확정합니다.', en: 'Scale the <strong>integrals</strong> to the hydrogen count in the formula to fix the real number of protons per signal.' },
        { ko: '<strong>특징적 영역</strong>을 먼저 봅니다. δ 9–10은 알데하이드, 10–13은 카복실산, 6.5–8.5는 방향족, 3.3–4.5는 산소 옆 탄소.', en: 'Scan the <strong>diagnostic regions</strong> first: δ 9–10 aldehyde, 10–13 carboxylic acid, 6.5–8.5 aromatic, 3.3–4.5 carbon next to oxygen.' },
        { ko: '<strong>방향족 패턴</strong>으로 치환 양상을 정합니다. 대칭적인 이중선 두 개(각 2H)면 para, 5H 다중선이면 일치환(monosubstituted).', en: 'Use the <strong>aromatic pattern</strong> to settle the substitution: two symmetric doublets of 2H each means para; a 5H multiplet means monosubstituted.' },
        { ko: '<strong>짝지음</strong>으로 조각을 잇습니다. 3H 삼중선 + 2H 사중선이면 –CH<sub>2</sub>CH<sub>3</sub> 조각이 확정입니다.', en: 'Use <strong>coupling</strong> to connect fragments: a 3H triplet plus a 2H quartet locks in a –CH<sub>2</sub>CH<sub>3</sub> unit.' },
        { ko: '<strong>검산</strong>: 제안한 구조로 δ, 적분, 다중도를 되짚어 모두 설명되는지 확인합니다.', en: '<strong>Check backwards</strong>: predict δ, integration and multiplicity from your proposed structure and confirm every peak is accounted for.' }
      ] },
      { type: 'h', ko: '8.2 예제 — C<sub>9</sub>H<sub>10</sub>O<sub>2</sub> 이성질체 구별', en: '8.2 Worked example — telling two C<sub>9</sub>H<sub>10</sub>O<sub>2</sub> isomers apart' },
      { type: 'compare', cards: [
        { title: { ko: '스펙트럼 A', en: 'Spectrum A' }, big: '4.37 q · 1.39 t',
          body: { ko: '8.04 (2H, d) · 7.55 (1H, t) · 7.43 (2H, t) · 4.37 (2H, q) · 1.39 (3H, t)', en: '8.04 (2H, d) · 7.55 (1H, t) · 7.43 (2H, t) · 4.37 (2H, q) · 1.39 (3H, t)' } },
        { title: { ko: '스펙트럼 B', en: 'Spectrum B' }, big: '3.68 s · 3.62 s',
          body: { ko: '7.26–7.35 (5H, m) · 3.68 (3H, s) · 3.62 (2H, s)', en: '7.26–7.35 (5H, m) · 3.68 (3H, s) · 3.62 (2H, s)' } }
      ] },
      { type: 'p',
        ko: 'DoU는 둘 다 5(벤젠 4 + C=O 1)입니다. A는 사중선/삼중선 쌍이 있으므로 에틸기를 갖고, 그 CH<sub>2</sub>가 δ 4.37이라는 것은 <strong>산소에 결합</strong>했다는 뜻입니다. 게다가 방향족 2H가 δ 8.04까지 밀려 있으므로 고리에 EWG(C=O)가 직접 붙어 있습니다. 따라서 A는 <strong>에틸 벤조에이트(ethyl benzoate)</strong>입니다.',
        en: 'Both have DoU 5 (four for the ring, one for C=O). A contains a quartet/triplet pair, so an ethyl group; its CH<sub>2</sub> at δ 4.37 means that ethyl is <strong>on oxygen</strong>. On top of that, two aromatic protons are pushed to δ 8.04, so an EWG (the carbonyl) is attached directly to the ring. A is therefore <strong>ethyl benzoate</strong>.' },
      { type: 'p',
        ko: 'B는 단일선만 있으므로 에틸기가 없습니다. δ 3.68의 3H 단일선은 메틸 에스터의 OCH<sub>3</sub>, δ 3.62의 2H 단일선은 벤질 위치의 CH<sub>2</sub>입니다. 방향족이 5H이고 δ 7.3 근처에 뭉쳐 있다는 것은 고리에 붙은 것이 <strong>EWG가 아니라 알킬</strong>이라는 뜻입니다. 따라서 B는 <strong>메틸 페닐아세테이트(methyl phenylacetate)</strong>입니다.',
        en: 'B has only singlets, so no ethyl group. The 3H singlet at δ 3.68 is the OCH<sub>3</sub> of a methyl ester, and the 2H singlet at δ 3.62 is a benzylic CH<sub>2</sub>. Five aromatic protons bunched near δ 7.3 say that what is attached to the ring is <strong>an alkyl group, not an EWG</strong>. B is <strong>methyl phenylacetate</strong>.' },
      { type: 'note', kind: 'exam',
        title: { ko: '에스터 뒤집기 — 가장 자주 나오는 판별', en: 'The ester flip — the most common discrimination on exams' },
        body: {
          ko: '에틸 아세테이트 CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>: 4.12 (q), 2.05 (s), 1.26 (t)<br>메틸 프로파노에이트 CH<sub>3</sub>CH<sub>2</sub>COOCH<sub>3</sub>: 3.67 (s), 2.32 (q), 1.14 (t)<br>둘 다 분자식은 C<sub>4</sub>H<sub>8</sub>O<sub>2</sub>이지만, 사중선의 위치가 δ 4.1인지 δ 2.3인지가 결정적입니다. <strong>산소에 붙은 쪽이 δ 3.6–4.5, 카보닐에 붙은 쪽이 δ 2.0–2.5</strong>. 이 한 쌍만 외워 두면 대부분의 에스터 문제가 풀립니다.',
          en: 'Ethyl acetate CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>: 4.12 (q), 2.05 (s), 1.26 (t)<br>Methyl propanoate CH<sub>3</sub>CH<sub>2</sub>COOCH<sub>3</sub>: 3.67 (s), 2.32 (q), 1.14 (t)<br>Both are C<sub>4</sub>H<sub>8</sub>O<sub>2</sub>; what decides the answer is whether the quartet sits at δ 4.1 or at δ 2.3. <strong>The group on oxygen falls at δ 3.6–4.5, the group on the carbonyl at δ 2.0–2.5.</strong> That single pair unlocks most ester problems.'
        } },
      { type: 'spec',
        spec: { peaks: [
          { ppm: 8.04, mult: 'd', H: 2, label: 'ortho' },
          { ppm: 7.55, mult: 't', H: 1, label: 'para' },
          { ppm: 7.43, mult: 't', H: 2, label: 'meta' },
          { ppm: 4.37, mult: 'q', H: 2, label: 'OCH2' },
          { ppm: 1.39, mult: 't', H: 3, label: 'CH3' }
        ], min: 0, max: 9 },
        caption: {
          ko: '그림 8-1. 에틸 벤조에이트 모식도. 방향족 ortho 양성자가 δ 8.04까지 밀린 것이 고리에 EWG가 붙었다는 직접적인 증거입니다.',
          en: 'Figure 8-1. Ethyl benzoate, schematic. The ortho protons pushed out to δ 8.04 are direct evidence of an EWG on the ring.'
        } }
    ],
    refs: [
      'Pavia et al., Introduction to Spectroscopy, 5th ed., 2015, Ch. 8 (combined structure problems).',
      'Silverstein et al., Spectrometric Identification of Organic Compounds, 8th ed., 2014, Ch. 7.',
      'SDBS, AIST Japan — experimental spectra of ethyl benzoate, methyl phenylacetate, ethyl acetate, methyl propanoate.'
    ]
  });

  global.LESSONS = L;
})(window);
