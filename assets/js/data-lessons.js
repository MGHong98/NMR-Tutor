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
        ko: 'TMS(tetramethylsilane, (CH<sub>3</sub>)<sub>4</sub>Si)를 δ = 0 으로 둡니다. 규소가 탄소보다 전기음성도가 작아 메틸기에 전자를 밀어 주므로 TMS의 12개 양성자는 거의 모든 유기 화합물보다 강하게 차폐되어 있고(고리 전류의 차폐 영역에 놓여 δ가 음수가 되는 예외는 5단원에서 다룹니다), 12H가 모두 등가라서 큰 단일선(singlet) 하나만 냅니다.',
        en: 'TMS (tetramethylsilane) defines δ = 0. Silicon is less electronegative than carbon, so it pushes electron density onto the methyls: the 12 protons of TMS are more shielded than those of almost any organic compound (Lesson 5 covers the exceptions, protons inside a ring current whose δ turns negative), and being equivalent they give one sharp singlet.' },
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
      { type: 'table', src: ['pavia'],
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
      { type: 'mol', src: [['sdbs', 'propanal']],
        mols: [
          { kind: 'chain', nodes: [{ ann: '1.13' }, { ann: '2.46' }, { dbl: 'O', ann: '9.80' }], note: 'propanal' }
        ],
        caption: { ko: '구조 1-1. 프로판알(propanal). 골격선식(skeletal formula)에서 꺾인 점과 끝점은 탄소이고, 탄소에 붙은 수소는 그리지 않습니다. 초록색 숫자가 그 자리 양성자의 δ입니다. 사슬 끝(δ 1.13)에서 카보닐(δ 9.80)로 갈수록 값이 커지는 것을 구조 위에서 바로 확인할 수 있습니다.', en: 'Structure 1-1. Propanal as a skeletal formula: every vertex and every end of a line is a carbon, and hydrogens on carbon are not drawn. The green figures are the δ of the protons at that position — rising from the end of the chain (1.13) to the carbonyl (9.80).' } },
      { type: 'spec', src: [['sdbs', 'propanal']],
        spec: { peaks: [
          { ppm: 9.80, mult: 't', H: 1, label: 'CHO' },
          { ppm: 2.46, mult: 'm', H: 2, label: 'CH2' },
          { ppm: 1.13, mult: 't', H: 3, label: 'CH3' },
          { ppm: 0.00, mult: 's', H: 0, label: 'TMS' }
        ], min: 0, max: 10 },
        caption: {
          ko: '그림 1-1. 프로판알(propanal, CH<sub>3</sub>CH<sub>2</sub>CHO)의 모식도. 알데하이드 양성자는 δ 9.8로 가장 다운필드, 메틸은 δ 1.1로 업필드에 있습니다. 실측: 9.80 (1H, t, <sup>3</sup>J = 1.4 Hz), 2.46 (2H, qd, J = 7.3, 1.4 Hz), 1.13 (3H, t, J = 7.3 Hz), CDCl<sub>3</sub>. 알데하이드 양성자가 삼중선인 것은 이웃 CH<sub>2</sub>와 매우 작은 J로 짝지음하기 때문입니다.',
          en: 'Figure 1-1. Schematic spectrum of propanal. The aldehyde proton sits farthest downfield at δ 9.8; the methyl is upfield at δ 1.1. Reported: 9.80 (1H, t, <sup>3</sup>J = 1.4 Hz), 2.46 (2H, qd, J = 7.3, 1.4 Hz), 1.13 (3H, t, J = 7.3 Hz) in CDCl<sub>3</sub>. The aldehyde proton is a triplet because it couples weakly to the adjacent CH<sub>2</sub>.'
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
      { r: 'pavia', at: { ko: '3장 — 핵 스핀, 차폐, δ 눈금의 정의', en: 'Ch. 3 — nuclear spin, shielding, and the definition of δ' } },
      { r: 'clayden', at: { ko: '13장 — 공명 조건과 화학적 이동의 물리적 의미', en: 'Ch. 13 — the resonance condition and what a chemical shift means' } },
      { r: 'gottlieb', at: { ko: '기준물질 및 용매 잔류 신호의 δ', en: 'shifts of the reference compound and residual solvents' } }
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
      { type: 'table', src: [['pavia', 'Appendix 1, correlation charts'], 'silverstein'],
        caption: { ko: '표 2-1. 대표적인 <sup>1</sup>H 화학적 이동 (CDCl<sub>3</sub> 기준, 근사값)', en: 'Table 2-1. Representative <sup>1</sup>H shifts (CDCl<sub>3</sub>, approximate)' },
        headers: [{ ko: '양성자 유형', en: 'Proton type' }, { ko: 'δ (ppm)', en: 'δ (ppm)' }, { ko: '메모', en: 'Note' }],
        rows: [
          ['TMS', '0.00', { ko: '기준물질(reference)', en: 'Reference compound' }],
          ['R–CH<sub>3</sub>', '0.9', { ko: '사슬 말단 메틸', en: 'Chain-terminal methyl' }],
          ['R–CH<sub>2</sub>–R', '1.3', { ko: '', en: '' }],
          ['R<sub>3</sub>C–H', '1.5', { ko: '', en: '' }],
          ['C=C–CH<sub>3</sub> (allylic)', '1.7', { ko: '알릴 위치', en: 'Allylic' }],
          ['C≡C–H', '1.7–3.0', { ko: '이방성으로 오히려 업필드', en: 'Anisotropy pushes it upfield' }],
          ['CH<sub>3</sub>–C=O', '2.0–2.6', { ko: '케톤·에스터의 아실 쪽', en: 'Acyl side of ketones/esters' }],
          ['Ar–CH<sub>3</sub> (benzylic)', '2.3', { ko: '', en: '' }],
          ['CH<sub>3</sub>–N', '2.2–3.0', { ko: '아민', en: 'Amines' }],
          ['CH<sub>3</sub>–Br / –Cl', '2.7 / 3.1', { ko: '전기음성도 순서', en: 'Follows electronegativity' }],
          ['CH<sub>3</sub>–O', '3.2–4.0', { ko: '에터·알코올·메틸에스터', en: 'Ethers, alcohols, methyl esters' }],
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
      { type: 'table', src: [['pretsch', '13C tables'], ['pavia', 'Ch. 4']],
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
      { r: 'pavia', at: { ko: '부록 1 상관표 — 표 2-1의 모든 δ 범위', en: 'Appendix 1 correlation charts — every δ range in Table 2-1' } },
      { r: 'silverstein', at: { ko: '3-4장 — 상관표 교차 확인 및 13C 영역', en: 'Ch. 3-4 — cross-check of the charts and the 13C regions' } },
      { r: 'gottlieb', at: { ko: 'CDCl3 7.26 / 77.16, DMSO-d6 2.50 / 39.52, D2O 4.79', en: 'CDCl3 7.26 / 77.16, DMSO-d6 2.50 / 39.52, D2O 4.79' } }
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
      { type: 'table', src: [['pavia', 'Table 3.4']],
        caption: { ko: '표 3-1. CH<sub>3</sub>–X 의 메틸 양성자 (Pavia, 부록)', en: 'Table 3-1. Methyl protons of CH<sub>3</sub>–X (Pavia, appendix)' },
        headers: [{ ko: 'X', en: 'X' }, { ko: '전기음성도(EN)', en: 'Electronegativity' }, { ko: 'δ (ppm)', en: 'δ (ppm)' }],
        rows: [
          ['F', '4.0', '4.26'], ['OH', '3.5 (O)', '3.40'], ['Cl', '3.1', '3.05'],
          ['Br', '2.8', '2.68'], ['I', '2.5', '2.16'], ['H', '2.1', '0.23'], ['Si(CH<sub>3</sub>)<sub>3</sub>', '1.8', '0.00']
        ] },
      { type: 'h', ko: '3.2 규칙 2: 치환기가 많을수록 누적된다', en: '3.2 Rule 2: substituents add up' },
      { type: 'compare', src: [['pavia', 'Ch. 3.9']], cards: [
        { title: { ko: 'CH<sub>3</sub>Cl', en: 'CH<sub>3</sub>Cl' }, big: 'δ 3.05', body: { ko: 'Cl 한 개', en: 'One Cl' } },
        { title: { ko: 'CH<sub>2</sub>Cl<sub>2</sub>', en: 'CH<sub>2</sub>Cl<sub>2</sub>' }, big: 'δ 5.30', body: { ko: 'Cl 두 개', en: 'Two Cl' } }
      ] },
      { type: 'p',
        ko: 'CHCl<sub>3</sub>는 δ 7.26까지 올라갑니다. 벤젠과 같은 값이지만 이유는 전혀 다릅니다(하나는 유도 효과, 하나는 고리 전류). 이 우연의 일치 때문에 CDCl<sub>3</sub> 잔류 신호가 방향족 영역과 겹칩니다.',
        en: 'CHCl<sub>3</sub> reaches δ 7.26 — numerically the same as benzene but for a completely different reason (induction versus ring current). That coincidence is why the residual CDCl<sub>3</sub> peak lands in the aromatic region.' },
      { type: 'h', ko: '3.3 규칙 3: 거리에 따라 급격히 감소한다', en: '3.3 Rule 3: the effect dies off fast with distance' },
      { type: 'mol', src: [['sdbs', '1-chloropropane / 1-nitropropane']],
        mols: [
          { kind: 'chain', nodes: [{ ann: '1.03' }, { ann: '1.81' }, { ann: '3.47' }, { label: 'Cl' }], note: '1-chloropropane' },
          { kind: 'chain', nodes: [{ ann: '1.03' }, { ann: '2.07' }, { ann: '4.38' }, { label: 'NO2' }], note: '1-nitropropane' }
        ],
        caption: { ko: '구조 3-1. 치환기에서 멀어질수록 δ가 급격히 떨어집니다. 두 화합물 모두 α 자리는 크게 다르지만(3.47 대 4.38) γ-메틸은 δ 1.03으로 같습니다.', en: 'Structure 3-1. δ falls away sharply with distance from the substituent. The α positions differ a lot between the two compounds (3.47 versus 4.38), yet both γ-methyls sit at the same δ 1.03.' } },
      { type: 'table', src: ['sdbs', ['pavia', 'Ch. 3.8']],
        caption: { ko: '표 3-2. 1-클로로프로페인과 1-나이트로프로페인 (CDCl<sub>3</sub>). * 프로페인은 치환기가 H이므로 α 자리가 CH<sub>2</sub>가 아니라 CH<sub>3</sub>입니다. 비교의 핵심은 γ-CH<sub>3</sub> 열(0.90 대 1.03)입니다.', en: 'Table 3-2. 1-Chloropropane and 1-nitropropane (CDCl<sub>3</sub>). * In propane the substituent is H, so the α position is a CH<sub>3</sub>, not a CH<sub>2</sub>. The meaningful comparison is the γ-CH<sub>3</sub> column: 0.90 versus 1.03.' },
        headers: [{ ko: '화합물', en: 'Compound' }, { ko: 'α-CH<sub>2</sub>', en: 'α-CH<sub>2</sub>' }, { ko: 'β-CH<sub>2</sub>', en: 'β-CH<sub>2</sub>' }, { ko: 'γ-CH<sub>3</sub>', en: 'γ-CH<sub>3</sub>' }],
        rows: [
          ['CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>Cl', '3.47', '1.81', '1.03'],
          ['CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>NO<sub>2</sub>', '4.38', '2.07', '1.03'],
          [{ ko: '프로페인 (X = H, 비교)', en: 'Propane (X = H, reference)' }, '0.90*', '1.33', '0.90']
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
          ko: '에틸 아세테이트(ethyl acetate, CH<sub>3</sub>COOCH<sub>2</sub>CH<sub>3</sub>)에서 δ 4.12의 사중선(quartet)은 <strong>산소에 붙은</strong> CH<sub>2</sub>이고, δ 2.05의 단일선은 카보닐에 붙은 CH<sub>3</sub>입니다. C=O는 강한 EWG처럼 보이지만, 에스터에서는 산소에 직접 결합한 쪽이 항상 더 크게 이동합니다. 메테인(0.23)을 기준으로 하면 메탄올의 CH<sub>3</sub>는 +3.17, 아세톤의 CH<sub>3</sub>는 +1.94이므로 카보닐 옆(α 위치)의 효과는 산소에 직접 붙은 경우의 <strong>3분의 2 정도</strong>입니다.',
          en: 'In ethyl acetate the δ 4.12 quartet is the CH<sub>2</sub> <strong>attached to oxygen</strong>; the δ 2.05 singlet is the CH<sub>3</sub> attached to the carbonyl carbon. C=O looks like a strong EWG, but in an ester the group bonded directly to oxygen always moves further. Measured from methane (0.23), the methyl of methanol is +3.17 while the methyl of acetone is +1.94, so being α to a carbonyl is worth <strong>about two thirds</strong> of sitting on the oxygen itself.'
        } },
      { type: 'mol', src: [['sdbs', 'ethyl acetate']],
        mols: [
          { kind: 'chain', nodes: [{ ann: '2.05' }, { dbl: 'O' }, { label: 'O' }, { ann: '4.12' }, { ann: '1.26' }], note: 'ethyl acetate' }
        ],
        caption: { ko: '구조 3-2. 에틸 아세테이트. 산소에 직접 붙은 CH<sub>2</sub>가 δ 4.12이고, 카보닐 탄소에 붙은 CH<sub>3</sub>는 δ 2.05입니다. 두 자리를 구조에서 짚어 보면 “산소 쪽이 항상 더 멀리 간다”는 것이 눈에 들어옵니다.', en: 'Structure 3-2. Ethyl acetate. The CH<sub>2</sub> bonded straight to oxygen is δ 4.12; the CH<sub>3</sub> on the carbonyl carbon is δ 2.05. Pointing at the two positions on the structure makes “the oxygen side always moves further” obvious.' } },
      { type: 'spec', src: [['sdbs', 'ethyl acetate']],
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
      { r: 'pavia', at: { ko: '3.6-3.9절과 표 3.4 — 전기음성도, 누적, 거리 감쇠', en: 'Ch. 3.6-3.9 and Table 3.4 — electronegativity, accumulation, distance decay' } },
      { r: 'silverstein', at: { ko: '부록 A — 지방족 δ 상관 데이터', en: 'Appendix A — aliphatic shift correlations' } },
      { r: 'sdbs', at: { ko: '1-클로로프로페인, 1-나이트로프로페인, 1-브로모프로페인, 에틸 아세테이트의 실측값', en: 'measured values for 1-chloropropane, 1-nitropropane, 1-bromopropane and ethyl acetate' } }
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
      { type: 'table', src: [['clayden', 'Ch. 21'], ['pavia', 'Ch. 3.13']],
        caption: { ko: '표 4-1. 두 효과의 성격 비교', en: 'Table 4-1. The two effects compared' },
        headers: [{ ko: '', en: '' }, { ko: '유도 효과(inductive, −I/+I)', en: 'Inductive (−I / +I)' }, { ko: '공명 효과(resonance, −M/+M)', en: 'Resonance / mesomeric (−M / +M)' }],
        rows: [
          [{ ko: '전달 경로', en: 'Travels through' }, { ko: 'σ 결합', en: 'σ bonds' }, { ko: 'π 계(conjugation)', en: 'the π system' }],
          [{ ko: '거리 의존성', en: 'Distance' }, { ko: '결합마다 급감', en: 'Decays fast per bond' }, { ko: '공액이 유지되면 멀리 간다', en: 'Reaches far while conjugation holds' }],
          [{ ko: '위치 선택성', en: 'Positional' }, { ko: '없음 (가까운 쪽이 큼)', en: 'None (just nearest wins)' }, { ko: '<strong>ortho·para에만</strong>', en: '<strong>ortho and para only</strong>' }],
          [{ ko: '예', en: 'Examples' }, { ko: '−N<sup>+</sup>(CH<sub>3</sub>)<sub>3</sub>, −CF<sub>3</sub>, 할로젠의 σ 성분', en: '−N<sup>+</sup>(CH<sub>3</sub>)<sub>3</sub>, −CF<sub>3</sub>, the σ component of a halogen' }, { ko: '−NO<sub>2</sub>, −C=O, −C≡N, −OR, −NH<sub>2</sub>', en: '−NO<sub>2</sub>, −C=O, −C≡N, −OR, −NH<sub>2</sub>' }]
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
      { type: 'table', src: [['pretsch', 'aromatic substituent increments']],
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
          ko: '① 부호는 EWG면 +, EDG면 −. ② 크기는 <em>대체로</em> <strong>ortho ≳ para ≫ meta</strong>이지만 예외가 있습니다. 염소는 ortho(+0.02)가 meta(−0.06)보다 오히려 작고, NHCOCH<sub>3</sub>는 para(−0.28)가 ortho(+0.12)보다 큽니다. ③ meta 값은 어떤 치환기든 절댓값 0.3 ppm을 넘지 않아 “거의 벤젠 값(7.26)”. ④ 할로젠은 −I와 +M이 상쇄되어 염소는 전 위치가 0 근처이고, 브로민·아이오딘은 ortho에서만 약간 +쪽으로 기웁니다. 이 네 줄이면 대부분의 객관식이 풀립니다.',
          en: '① Sign: + for EWG, − for EDG. ② Magnitude <em>usually</em> runs <strong>ortho ≳ para ≫ meta</strong>, but not always: chlorine is smaller at ortho (+0.02) than at meta (−0.06), and NHCOCH<sub>3</sub> is larger at para (−0.28) than at ortho (+0.12). ③ The meta entry never exceeds 0.3 ppm in magnitude for any group — “basically benzene, 7.26”. ④ Halogens cancel −I against +M: chlorine sits near zero at every position, while bromine and iodine tip slightly positive at ortho only. Those four lines settle most multiple-choice questions.'
        } },
      { type: 'h', ko: '4.3 사례 1 — 나이트로벤젠 (EWG)', en: '4.3 Case 1 — nitrobenzene (EWG)' },
      { type: 'formula',
        ko: 'ortho: 7.26 + 0.95 = 8.21 (실측 8.22)<br>meta: 7.26 + 0.26 = 7.52 (실측 7.52)<br>para: 7.26 + 0.38 = 7.64 (실측 7.68)',
        en: 'ortho: 7.26 + 0.95 = 8.21 (obs. 8.22)<br>meta: 7.26 + 0.26 = 7.52 (obs. 7.52)<br>para: 7.26 + 0.38 = 7.64 (obs. 7.68)' },
      { type: 'mol', src: [['sdbs', 'nitrobenzene'], 'pretsch'],
        mols: [
          { kind: 'benzene', subs: { 1: 'NO2' }, ann: { 2: '8.22', 3: '7.52', 4: '7.68', 5: '7.52', 6: '8.22' }, note: 'nitrobenzene' }
        ],
        caption: { ko: '구조 4-1. 나이트로벤젠. 고리 옆 숫자는 그 자리 양성자의 δ입니다. NO<sub>2</sub>가 붙은 자리를 1번으로 두면 ortho는 2·6, meta는 3·5, para는 4번이며 이는 증분표의 번호와 그대로 일치합니다. ortho(8.22)가 가장 크고 meta(7.52)가 가장 작습니다.', en: 'Structure 4-1. Nitrobenzene; the figures beside the ring are the δ of the proton at that position. Numbering the substituted carbon 1 puts ortho at 2 and 6, meta at 3 and 5 and para at 4 — exactly the numbering of the increment table. Ortho (8.22) is largest, meta (7.52) smallest.' } },
      { type: 'spec', src: [['sdbs', 'nitrobenzene'], 'pretsch'],
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
      { type: 'mol', src: [['sdbs', 'anisole'], 'pretsch'],
        mols: [
          { kind: 'benzene', subs: { 1: 'OCH3' }, ann: { 2: '6.89', 3: '7.28', 4: '6.94', 5: '7.28', 6: '6.89' }, note: 'anisole' },
          { kind: 'benzene', ann: { 1: '7.26', 2: '7.26', 3: '7.26', 4: '7.26', 5: '7.26', 6: '7.26' }, note: 'benzene' }
        ],
        caption: { ko: '구조 4-2. 아니솔과 벤젠의 비교. 산소의 비공유 전자쌍이 ortho(6.89)와 para(6.94)로 전자 밀도를 보내 두 자리를 벤젠(7.26)보다 업필드로 끌어내립니다. meta(7.28)는 벤젠과 사실상 같습니다.', en: 'Structure 4-2. Anisole against benzene. The oxygen lone pair delivers density to ortho (6.89) and para (6.94), pulling both upfield of benzene at 7.26, while meta (7.28) is essentially unchanged.' } },
      { type: 'spec', src: [['sdbs', 'anisole'], 'pretsch'],
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
          ko: '치환기가 고리에 전자를 <em>주는</em> 것과, 그 치환기 자신의 양성자가 어떤 환경에 있는지는 별개의 문제입니다. OCH<sub>3</sub>의 메틸 양성자는 <strong>산소에 직접 결합</strong>해 있으므로 유도 효과로 강하게 비차폐되어 δ 3.80에 나옵니다. 즉 <strong>고리는 업필드, 치환기 자신은 다운필드</strong>입니다. 아닐린의 NH<sub>2</sub>(δ ≈ 3.5)도 “고리에는 전자를 주면서 자기 자신은 헤테로원자에 붙어 있는” 같은 구도입니다. 다만 NH·OH 양성자의 δ는 유도 효과보다 교환(exchange)·수소 결합·농도에 좌우되므로 정량적 비교의 근거로는 쓰지 마세요. 반대로 EWG인 −CHO의 양성자는 δ 9.9로 다운필드입니다. <em>“전자를 어디로 주는가”와 “그 양성자가 어디에 붙어 있는가”를 분리해서 보세요.</em>',
          en: 'Whether a group <em>donates</em> into the ring is a separate question from the environment of the protons inside that group. The methyl of OCH<sub>3</sub> is <strong>bonded straight to oxygen</strong>, so induction deshields it hard and it appears at δ 3.80. In other words, <strong>the ring goes upfield while the substituent itself goes downfield</strong>. The NH<sub>2</sub> of aniline (δ ≈ 3.5) is the same arrangement — donating into the ring while itself sitting on the heteroatom — though the δ of NH and OH protons is governed by exchange, hydrogen bonding and concentration rather than by induction, so do not use them for quantitative comparisons. Conversely the proton of the EWG −CHO is downfield at δ 9.9. <em>Keep “where does it push electrons” separate from “what is this proton attached to”.</em>'
        } },
      { type: 'note', kind: 'pitfall',
        title: { ko: '함정 2 — “벤젠보다 업필드”와 “절대적으로 업필드”', en: 'Pitfall 2 — “upfield of benzene” is not “upfield in absolute terms”' },
        body: {
          ko: '아니솔의 ortho 양성자 δ 6.89는 벤젠(7.26)보다 업필드지만, 알켄 양성자(δ 5.3)보다는 여전히 훨씬 다운필드입니다. 고리 전류(ring current)라는 큰 바탕 효과 위에 치환기 효과가 대개 ±1 ppm 안쪽으로 얹히는 구조이기 때문입니다(가장 큰 축에 드는 NO<sub>2</sub>의 ortho 증분이 +0.95입니다). 문제에서 “업필드로 이동한다”는 표현은 <strong>비교 대상이 무엇인지</strong> 반드시 확인해야 합니다.',
          en: 'The ortho proton of anisole at δ 6.89 is upfield of benzene (7.26) but still far downfield of an alkene proton (δ 5.3). Substituent effects, usually within about ±1 ppm (the ortho increment of NO<sub>2</sub>, one of the largest, is +0.95), ride on top of a large ring-current baseline. Whenever a question says “shifts upfield”, check <strong>upfield relative to what</strong>.'
        } },
      { type: 'h', ko: '4.5 상충하는 치환기 — 할로젠', en: '4.5 When the two effects fight — halogens' },
      { type: 'mol', src: [['sdbs', 'chlorobenzene'], 'pretsch'],
        mols: [
          { kind: 'benzene', subs: { 1: 'Cl' }, ann: { 2: '7.28', 3: '7.20', 4: '7.22', 5: '7.20', 6: '7.28' }, note: 'chlorobenzene' }
        ],
        caption: { ko: '구조 4-3. 클로로벤젠. 표시한 값은 증분표로 <strong>계산</strong>한 δ입니다(ortho +0.02, meta −0.06, para −0.04). 세 종류의 양성자가 모두 벤젠(7.26) 근처에 몰려 있어 실제 스펙트럼에서는 δ 7.2–7.4의 겹친 다중선 하나로 보입니다. 염소의 −I(당김)와 +M(밀어줌)이 상쇄된 결과입니다.', en: 'Structure 4-3. Chlorobenzene. The figures are δ values <strong>calculated</strong> from the increment table (ortho +0.02, meta −0.06, para −0.04). All three kinds of proton crowd around the benzene value of 7.26, so the real spectrum shows one overlapping multiplet at δ 7.2–7.4 — the result of chlorine&#39;s −I pulling and +M pushing cancelling out.' } },
      { type: 'p',
        ko: '염소는 전기음성도가 커서 σ 결합으로는 전자를 강하게 당깁니다(−I). 동시에 비공유 전자쌍을 π 계로 밀어 넣습니다(+M). 두 효과가 ortho/para에서 거의 상쇄되어, 클로로벤젠의 고리 양성자는 세 자리가 모두 벤젠 값 근처(계산값 7.20–7.28)에 몰리고, 실제 스펙트럼에서는 δ 7.2–7.4에 겹친 다중선 하나로 나타납니다.',
        en: 'Chlorine is electronegative and pulls hard through the σ framework (−I), while simultaneously donating a lone pair into the π system (+M). At the ortho and para positions these nearly cancel, so all three ring positions crowd around the benzene value (calculated 7.20–7.28) and the real spectrum shows one overlapping multiplet at δ 7.2–7.4, barely distinguishable from benzene.' },
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
      { type: 'mol', src: [['sdbs', '4-nitroanisole'], 'pretsch'],
        mols: [
          { kind: 'benzene', subs: { 1: 'OCH3', 4: 'NO2' }, ann: { 2: '6.95', 3: '8.20', 5: '8.20', 6: '6.95' }, note: '4-nitroanisole' }
        ],
        caption: { ko: '구조 4-4. 4-나이트로아니솔. 각 양성자가 두 치환기와 맺는 관계가 서로 다르다는 점이 구조에서 바로 보입니다. 위쪽 두 자리는 OCH<sub>3</sub>에 ortho이면서 NO<sub>2</sub>에 meta라 δ 6.95이고, 아래쪽 두 자리는 그 반대라 δ 8.20입니다.', en: 'Structure 4-4. 4-Nitroanisole. The structure shows at a glance that each proton stands in a different relationship to each substituent: the upper pair is ortho to OCH<sub>3</sub> and meta to NO<sub>2</sub> (δ 6.95), the lower pair the other way round (δ 8.20).' } },
      { type: 'spec', src: [['sdbs', '4-nitroanisole'], 'pretsch'],
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
          ko: 'para-이치환 벤젠에서 두 겹선의 간격이 <strong>1 ppm 이상</strong>이면 한쪽은 강한 EWG, 다른 쪽은 강한 EDG일 가능성이 높습니다. 간격이 <strong>0.2 ppm 이하</strong>로 붙어 있으면 두 치환기의 성격이 비슷하거나 둘 다 약한 경우입니다. 다만 간격만 보지 말고 <strong>두 겹선의 절대 위치</strong>도 함께 확인하세요. 둘 다 7.26보다 다운필드면 EWG 두 개, 둘 다 업필드면 EDG 두 개입니다.',
          en: 'In a para-disubstituted benzene, a gap of <strong>more than about 1 ppm</strong> between the two doublets usually means one strong EWG facing one strong EDG. A gap under <strong>0.2 ppm</strong> means the two substituents are similar in character, or both weak. Read the gap together with the <strong>absolute positions</strong> of the two doublets, though: both downfield of 7.26 means two EWGs, both upfield means two EDGs.'
        } }
    ],
    refs: [
      { r: 'pretsch', at: { ko: '표 4-2의 증분 Δδ 전체 — 이 단원 모든 계산의 수치 근거', en: 'all the Δδ increments in Table 4-2 — the numerical basis of every calculation here' } },
      { r: 'pavia', at: { ko: '3.13절 — 방향족 치환기 효과', en: 'Ch. 3.13 — substituent effects on aromatic rings' } },
      { r: 'clayden', at: { ko: '21장 — 친전자성 방향족 치환의 배향성(4.5절 연결 논증의 근거)', en: 'Ch. 21 — EAS directing effects, the basis of the argument in section 4.5' } },
      { r: 'sdbs', at: { ko: '나이트로벤젠, 아니솔, 클로로벤젠, 4-나이트로아니솔의 실측 스펙트럼', en: 'measured spectra of nitrobenzene, anisole, chlorobenzene and 4-nitroanisole' } }
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
          ko: 'sp 탄소는 sp<sup>2</sup>보다 s 성분이 많아 전기음성도가 큽니다. 유도 효과만 보면 말단 알카인 양성자(≡C–H)는 알켄 양성자(δ 5.3)보다 다운필드여야 합니다. 그러나 실제로는 δ 1.8–3.0(단순 말단 알카인은 δ 1.8–2.1)으로 <strong>훨씬 업필드</strong>입니다. 원통형 π 전자 순환의 차폐 원뿔(shielding cone) 축 위에 C–H 결합이 놓여 있어, 이방성 차폐가 유도 효과를 이기기 때문입니다. “전기음성도 논리를 이방성이 뒤집는” 대표적인 예이고 시험 단골입니다.',
          en: 'An sp carbon has more s character than sp<sup>2</sup> and is more electronegative, so on induction alone a terminal alkyne proton should be downfield of an alkene proton (δ 5.3). In fact it appears at δ 1.8–3.0 — δ 1.8–2.1 for a simple terminal alkyne — <strong>much further upfield</strong>. The C–H bond lies along the axis of the cylindrical π circulation, inside the shielding cone, and anisotropic shielding beats induction. This is the textbook case of anisotropy overriding electronegativity, and it is a perennial exam item.'
        } },
      { type: 'mol', src: [['pavia', 'Ch. 3.12'], 'sdbs'],
        mols: [
          { kind: 'chain', baseDeg: 15, nodes: [{ ann: '0.98' }, { ann: '1.53' }, { ann: '2.18' }, {}, { tb: true, turn: 0, ann: '1.93' }], note: '1-pentyne' },
          { kind: 'benzene', subs: { 1: { g: 'CH3', ann: ['2.36'] } }, ann: { 2: '7.17', 3: '7.25', 4: '7.17', 5: '7.25', 6: '7.17' }, note: 'toluene' }
        ],
        caption: { ko: '구조 5-1. 왼쪽: 1-펜타인의 말단 ≡C–H는 δ 1.93으로, 바로 옆 CH<sub>2</sub>(2.18)보다도 업필드입니다. 전기음성도만 보면 나올 수 없는 값이며 차폐 원뿔 때문입니다. 오른쪽: 톨루엔의 메틸(2.36)은 고리 평면 바깥 가장자리, 곧 비차폐 영역에 놓여 에테인(0.86)보다 크게 다운필드입니다.', en: 'Structure 5-1. Left: the terminal ≡C–H of 1-pentyne sits at δ 1.93, upfield even of the CH<sub>2</sub> next to it (2.18) — impossible on electronegativity alone, and down to the shielding cone. Right: the methyl of toluene (2.36) lies at the outer edge of the ring plane, in the deshielding region, far downfield of ethane at 0.86.' } },
      { type: 'table', src: [['pavia', 'Ch. 3.12'], 'clayden'],
        caption: { ko: '표 5-1. 이방성이 지배하는 대표 값', en: 'Table 5-1. Shifts dominated by anisotropy' },
        headers: [{ ko: '양성자', en: 'Proton' }, { ko: 'δ (ppm)', en: 'δ (ppm)' }, { ko: '해석', en: 'Interpretation' }],
        rows: [
          ['C≡C–H', '1.7–3.0', { ko: '차폐 원뿔 내부 → 업필드', en: 'Inside the shielding cone → upfield' }],
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
      { r: 'pavia', at: { ko: '3.12절 이방성, 3.15절 교환성 양성자와 D2O 흔들기', en: 'Ch. 3.12 anisotropy; Ch. 3.15 exchangeable protons and the D2O shake' } },
      { r: 'silverstein', at: { ko: '3장 — 수소 결합과 δ의 농도 의존성', en: 'Ch. 3 — hydrogen bonding and the concentration dependence of δ' } },
      { r: 'clayden', at: { ko: '13장 — 고리 전류와 [18]annulene의 내부 양성자', en: 'Ch. 13 — ring currents and the inner protons of [18]annulene' } }
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
      { type: 'table', src: [['pavia', 'Ch. 5.3']],
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
      { type: 'table', src: [['silverstein', 'Appendix F'], ['pavia', 'Ch. 5.7']],
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
        { ko: 'para 자리에 <strong>서로 다른</strong> 두 치환기가 붙은 벤젠은 엄밀히는 AA′BB′ 계이지만, 학부 수준에서는 <strong>J ≈ 8–9 Hz의 이중선 두 개</strong>로 다루면 충분합니다. 이 대칭 패턴 자체가 para 치환의 강력한 증거입니다. 두 치환기가 <strong>같으면</strong> 네 양성자가 모두 등가가 되어 단일선 하나만 나옵니다(예: p-자일렌 δ 7.05).', en: 'A ring carrying <strong>two different</strong> para substituents is strictly an AA′BB′ system, but at undergraduate level treating it as <strong>two doublets with J ≈ 8–9 Hz</strong> is enough, and the symmetric pattern is itself strong evidence for para substitution. If the two substituents are <strong>identical</strong>, all four protons become equivalent and give a single singlet instead (p-xylene, δ 7.05).' },
        { ko: '<strong>지붕 효과(roofing)</strong>: 짝지어진 두 신호는 서로를 향한 쪽 봉우리가 더 높아집니다. 어느 신호와 어느 신호가 짝인지 찾는 단서가 됩니다.', en: '<strong>Roofing</strong>: coupled multiplets lean towards each other, the inner lines being taller. It is a useful clue for pairing up partners.' },
        { ko: 'OH·NH는 빠른 교환 때문에 보통 짝지음이 보이지 않아 단일선으로 나옵니다.', en: 'OH and NH usually show no coupling because exchange is fast, so they appear as singlets.' }
      ] }
    ],
    refs: [
      { r: 'pavia', at: { ko: '5장 — n+1 규칙, 파스칼 삼각형, 적분', en: 'Ch. 5 — the n+1 rule, Pascal triangle, integration' } },
      { r: 'silverstein', at: { ko: '부록 F — 표 6-2의 모든 J 값', en: 'Appendix F — every J value in Table 6-2' } }
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
        { ko: '보통 <strong>양성자 광대역 짝풀림(broadband proton decoupling)</strong>으로 측정하므로 시료의 모든 탄소가 단일선으로 나옵니다(중수소화 용매의 탄소만은 <sup>2</sup>H와 짝지어져 그대로 갈라집니다 — CDCl<sub>3</sub>는 δ 77.2의 삼중선). 대신 세기가 탄소 수에 비례하지 않아 <strong>적분을 쓸 수 없습니다</strong>.', en: 'Spectra are normally run with <strong>broadband proton decoupling</strong>, so every carbon of the sample appears as a singlet — the deuterated solvent excepted, since its carbon still couples to <sup>2</sup>H (CDCl<sub>3</sub> is a triplet at δ 77.2). The trade-off is that intensities are not proportional to the number of carbons, so <strong>integration is not usable</strong>.' },
        { ko: '<strong>DEPT-135</strong>: CH와 CH<sub>3</sub>는 위로, CH<sub>2</sub>는 아래로, 사차 탄소(quaternary)는 나타나지 않습니다.', en: '<strong>DEPT-135</strong>: CH and CH<sub>3</sub> point up, CH<sub>2</sub> points down, and quaternary carbons vanish.' },
        { ko: '대칭성이 높으면 신호 수가 크게 줄어듭니다. <strong>서로 다른</strong> 두 치환기가 para로 놓인 고리는 탄소 6개지만 신호는 4개이고, p-자일렌처럼 두 치환기가 같으면 고리 신호가 2개까지 줄어듭니다.', en: 'Symmetry cuts the number of signals sharply: a ring carrying two <strong>different</strong> substituents para to each other gives four signals from six carbons, and when the two substituents are identical, as in p-xylene, the ring drops to two.' }
      ] },
      { type: 'h', ko: '7.2 방향족 치환기 효과', en: '7.2 Aromatic substituent effects' },
      { type: 'mol', src: [['pretsch', '13C substituent tables'], 'sdbs'],
        mols: [
          { kind: 'benzene', subs: { 1: 'OCH3' }, ann: { 1: '159.9', 2: '114.1', 3: '129.5', 4: '120.7', 5: '129.5', 6: '114.1' }, note: 'anisole (13C)' },
          { kind: 'benzene', subs: { 1: 'NO2' }, ann: { 1: '148.3', 2: '123.4', 3: '129.3', 4: '134.7', 5: '129.3', 6: '123.4' }, note: 'nitrobenzene (13C)' }
        ],
        caption: { ko: '구조 7-1. 여기 숫자는 <strong>탄소</strong>의 δ입니다(벤젠은 128.5). 아니솔에서 ortho(114.1)와 para(120.7) 탄소가 크게 업필드인 것은 <sup>1</sup>H와 같은 논리입니다. 반면 ipso 탄소(159.9)만은 산소에 직결된 유도 효과가 지배해 정반대로 보입니다.', en: 'Structure 7-1. These figures are <strong>carbon</strong> shifts (benzene is 128.5). In anisole the ortho (114.1) and para (120.7) carbons are far upfield, following the same logic as <sup>1</sup>H. Only the ipso carbon at 159.9 looks reversed, because induction from the directly bonded oxygen dominates there.' } },
      { type: 'table', src: [['pretsch', '13C substituent tables'], 'sdbs'],
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
          ko: '아니솔의 C-ortho(114.1)와 C-para(120.7)는 벤젠보다 크게 <strong>업필드</strong>입니다. 산소의 비공유 전자쌍이 그 자리에 π 전자 밀도를 몰아주기 때문이며, <sup>1</sup>H에서 ortho·para 양성자가 업필드로 가는 것과 같은 이유입니다. 나이트로벤젠에서는 C-ortho가 123.4로 <em>업필드</em>인 점이 예외적으로 보이지만(<sup>13</sup>C 이동은 π 전자 밀도만으로 정해지지 않고, 치환기의 전기장·자기 이방성 기여가 바로 옆자리인 ortho에서 특히 크기 때문입니다), C-para 134.7은 예상대로 뚜렷하게 다운필드입니다. 학부 수준에서는 <strong>C-para를 기준으로 판단</strong>하는 편이 안전합니다.',
          en: 'The ortho (114.1) and para (120.7) carbons of anisole are far <strong>upfield</strong> of benzene, because the oxygen lone pair piles π density onto exactly those positions — the same reason the ortho and para protons move upfield. In nitrobenzene the ortho carbon at 123.4 looks anomalously <em>upfield</em> (<sup>13</sup>C shifts are not set by π density alone: the electric-field and anisotropy contributions of the substituent itself are largest at the adjacent ortho carbon), but the para carbon at 134.7 is clearly downfield as expected. At undergraduate level it is safer to <strong>judge from the para carbon</strong>.'
        } },
      { type: 'note', kind: 'pitfall',
        title: { ko: '함정 — ipso 탄소는 완전히 다른 이야기', en: 'Pitfall — the ipso carbon is a different story' },
        body: {
          ko: '아니솔의 <em>ipso</em> 탄소는 δ 159.9로 나이트로벤젠의 148.3보다도 훨씬 다운필드입니다. EDG가 붙었는데 왜 가장 다운필드일까요? ipso 탄소는 <strong>산소에 직접 결합</strong>해 있어서 유도 효과가 압도적이기 때문입니다. 4단원의 “OCH<sub>3</sub> 양성자가 δ 3.8” 함정과 정확히 같은 구조의 문제입니다.<br><strong>정리: 직접 결합한 원자의 전기음성도는 ipso를 지배하고, 공명에 의한 전자 밀도는 ortho·para를 지배한다.</strong>',
          en: 'The <em>ipso</em> carbon of anisole is at δ 159.9, even further downfield than that of nitrobenzene at 148.3. Why would an EDG give the most downfield carbon? Because the ipso carbon is <strong>bonded directly to oxygen</strong>, and induction dominates there. It is structurally the same trap as “the OCH<sub>3</sub> protons at δ 3.8” from Lesson 4.<br><strong>Summary: the electronegativity of the directly bonded atom controls the ipso carbon; resonance-delivered electron density controls the ortho and para carbons.</strong>'
        } }
    ],
    refs: [
      { r: 'pavia', at: { ko: '4장 13C 측정 조건, 6장 DEPT-135', en: 'Ch. 4 for 13C acquisition, Ch. 6 for DEPT-135' } },
      { r: 'pretsch', at: { ko: '표 7-1의 13C 치환기 효과 값', en: 'the 13C substituent values in Table 7-1' } },
      { r: 'silverstein', at: { ko: '4장 — NOE와 T1 때문에 적분을 쓸 수 없는 이유', en: 'Ch. 4 — why NOE and T1 make integration unusable' } }
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
        { ko: '<strong>특징적 영역</strong>을 먼저 봅니다. δ 9.5–10.1은 알데하이드, 10–13은 카복실산, 6.5–8.5는 방향족, 3.2–4.5는 산소 옆 탄소.', en: 'Scan the <strong>diagnostic regions</strong> first: δ 9.5–10.1 aldehyde, 10–13 carboxylic acid, 6.5–8.5 aromatic, 3.2–4.5 carbon next to oxygen.' },
        { ko: '<strong>방향족 패턴</strong>으로 치환 양상을 정합니다. 대칭적인 이중선 두 개(각 2H)면 para, 5H 다중선이면 일치환(monosubstituted).', en: 'Use the <strong>aromatic pattern</strong> to settle the substitution: two symmetric doublets of 2H each means para; a 5H multiplet means monosubstituted.' },
        { ko: '<strong>짝지음</strong>으로 조각을 잇습니다. 3H 삼중선 + 2H 사중선이면 –CH<sub>2</sub>CH<sub>3</sub> 조각이 확정입니다.', en: 'Use <strong>coupling</strong> to connect fragments: a 3H triplet plus a 2H quartet locks in a –CH<sub>2</sub>CH<sub>3</sub> unit.' },
        { ko: '<strong>검산</strong>: 제안한 구조로 δ, 적분, 다중도를 되짚어 모두 설명되는지 확인합니다.', en: '<strong>Check backwards</strong>: predict δ, integration and multiplicity from your proposed structure and confirm every peak is accounted for.' }
      ] },
      { type: 'h', ko: '8.2 예제 — C<sub>9</sub>H<sub>10</sub>O<sub>2</sub> 이성질체 구별', en: '8.2 Worked example — telling two C<sub>9</sub>H<sub>10</sub>O<sub>2</sub> isomers apart' },
      { type: 'compare', src: [['sdbs', 'ethyl benzoate / methyl phenylacetate']], cards: [
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
      { type: 'mol', src: [['sdbs', 'ethyl benzoate / methyl phenylacetate']],
        mols: [
          { kind: 'benzene', subs: { 1: 'COOCH2CH3' }, ann: { 2: '8.04', 3: '7.43', 4: '7.55', 5: '7.43', 6: '8.04' }, note: 'A: ethyl benzoate' },
          { kind: 'benzene', subs: { 1: 'CH2COOCH3' }, ann: { 2: '7.30', 3: '7.32', 4: '7.28', 5: '7.32', 6: '7.30' }, note: 'B: methyl phenylacetate' }
        ],
        caption: { ko: '구조 8-1. 같은 분자식 C<sub>9</sub>H<sub>10</sub>O<sub>2</sub>의 두 이성질체. A는 카보닐이 <strong>고리에 직접</strong> 붙어 ortho 양성자를 δ 8.04까지 밀어냈고, B는 고리와 카보닐 사이에 CH<sub>2</sub>가 끼어 있어 고리 양성자가 δ 7.3 부근에 그대로 모여 있습니다. 이 차이가 두 구조를 가르는 결정적 단서입니다.', en: 'Structure 8-1. Two isomers of C<sub>9</sub>H<sub>10</sub>O<sub>2</sub>. In A the carbonyl is attached <strong>directly to the ring</strong> and pushes the ortho protons out to δ 8.04; in B a CH<sub>2</sub> sits between ring and carbonyl, so the ring protons stay bunched near δ 7.3. That contrast is what separates the two structures.' } },
      { type: 'spec', src: [['sdbs', 'ethyl benzoate']],
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
      { r: 'pavia', at: { ko: '8장 — 종합 구조 문제의 풀이 절차와 불포화도', en: 'Ch. 8 — the workflow for combined problems, and degrees of unsaturation' } },
      { r: 'silverstein', at: { ko: '7장 — 여러 분광법을 함께 쓰는 구조 결정', en: 'Ch. 7 — structure determination using several spectroscopies together' } },
      { r: 'sdbs', at: { ko: '에틸 벤조에이트, 메틸 페닐아세테이트, 에틸 아세테이트, 메틸 프로파노에이트의 실측값', en: 'measured values for ethyl benzoate, methyl phenylacetate, ethyl acetate and methyl propanoate' } }
    ]
  });

  /* ------------------------------------------------------------ 부록 A */
  L.push({
    id: 'instrument',
    badge: { ko: '부록 A', en: 'App. A' },
    kicker: { ko: '부록 A', en: 'Appendix A' },
    title: { ko: '분광기가 실제로 재는 것', en: 'What the spectrometer actually measures' },
    lead: {
      ko: '1단원에서 공명 조건만 적어 두고 넘어간 자리를 여기서 채웁니다. 시험 범위 밖일 수 있지만, “<sup>13</sup>C는 왜 오래 걸리나”, “적분은 왜 <sup>1</sup>H에서만 믿나”, “600 MHz 기기는 무엇이 다른가” 같은 질문의 답이 전부 이 부록의 숫자에서 나옵니다.',
      en: 'This fills in what Lesson 1 left as a bare resonance condition. It may sit outside your syllabus, but the answers to “why does <sup>13</sup>C take so long”, “why is integration trusted only in <sup>1</sup>H” and “what does a 600 MHz instrument buy you” all come from the numbers here.'
    },
    blocks: [
      { type: 'h', ko: 'A.1 제만 갈라짐과 라모어 주파수', en: 'A.1 Zeeman splitting and the Larmor frequency' },
      { type: 'p',
        ko: '스핀 양자수 I = 1/2 인 핵은 자기장 B<sub>0</sub> 안에서 두 준위로 갈라집니다(제만 갈라짐, Zeeman splitting). 두 준위의 에너지 차는 자기장에 <strong>비례</strong>하고, 그 차이에 해당하는 주파수를 라모어 주파수(Larmor frequency)라고 합니다.',
        en: 'A nucleus with I = 1/2 splits into two levels in a field B<sub>0</sub> — Zeeman splitting. The gap is <strong>proportional</strong> to the field, and the frequency matching it is the Larmor frequency.' },
      { type: 'formula',
        ko: 'ΔE = γ ħ B<sub>0</sub> = h·ν&nbsp;&nbsp;⟹&nbsp;&nbsp;ν = γ B<sub>0</sub> / 2π',
        en: 'ΔE = γ ħ B<sub>0</sub> = h·ν&nbsp;&nbsp;⟹&nbsp;&nbsp;ν = γ B<sub>0</sub> / 2π' },
      { type: 'table', src: [['nist', 'γ/2π, 동위원소 존재비'], 'keeler'],
        caption: { ko: '표 A-1. 자기회전비와 9.4 T에서의 공명 주파수', en: 'Table A-1. Gyromagnetic ratios and resonance frequencies at 9.4 T' },
        headers: [{ ko: '핵', en: 'Nucleus' }, { ko: 'γ/2π (MHz/T)', en: 'γ/2π (MHz/T)' }, { ko: '9.4 T에서 ν (MHz)', en: 'ν at 9.4 T (MHz)' }, { ko: '자연존재비', en: 'Natural abundance' }],
        rows: [
          ['<sup>1</sup>H', '42.58', '400.2', '99.99%'],
          ['<sup>19</sup>F', '40.08', '376.7', '100%'],
          ['<sup>31</sup>P', '17.24', '162.0', '100%'],
          ['<sup>13</sup>C', '10.71', '100.7', '1.07%'],
          ['<sup>2</sup>H', '6.54', '61.4', '0.0115%']
        ] },
      { type: 'p',
        ko: '표의 마지막 줄 <sup>2</sup>H는 관측 대상이 아니라 <strong>락(lock) 신호</strong>로 쓰입니다(A.6). 스핀 양자수가 I = 1인 사중극자 핵(quadrupolar nucleus)이라 준위가 둘이 아니라 셋으로 갈라지지만, 락에 필요한 것은 그 공명 주파수뿐입니다.',
        en: 'The last row, <sup>2</sup>H, is not observed as a spectrum: it supplies the <strong>lock signal</strong> (A.6). It is a quadrupolar nucleus with I = 1, so it splits into three levels rather than two — but all the lock needs is its resonance frequency.' },
      { type: 'note', kind: 'key',
        title: { ko: '“400 MHz 기기”라는 이름의 뜻', en: 'What “a 400 MHz instrument” names' },
        body: {
          ko: '기기 이름은 그 자석에서 <sup>1</sup>H가 공명하는 주파수입니다. 9.4 T이면 400 MHz, 14.1 T이면 600 MHz입니다. 같은 400 MHz 기기에서 <sup>13</sup>C는 100.7 MHz, <sup>19</sup>F는 376.7 MHz로 공명합니다. 즉 한 기기가 핵마다 다른 주파수를 씁니다.',
          en: 'The name is the frequency at which <sup>1</sup>H resonates in that magnet: 9.4 T gives 400 MHz, 14.1 T gives 600 MHz. In that same 400 MHz instrument <sup>13</sup>C resonates at 100.7 MHz and <sup>19</sup>F at 376.7 MHz — one magnet, a different frequency for each nucleus.'
        } },

      { type: 'h', ko: 'A.2 NMR이 둔감한 이유 — 볼츠만 분포', en: 'A.2 Why NMR is insensitive — the Boltzmann distribution' },
      { type: 'p',
        ko: '두 준위의 에너지 차가 라디오파 영역이라 상온의 열에너지 kT에 비하면 극히 작습니다. 그래서 아래 준위에 있는 스핀이 위 준위보다 아주 조금 많을 뿐이고, 신호는 그 <strong>차이만큼</strong>에서만 나옵니다.',
        en: 'The gap lies in the radio-frequency range, which is tiny next to the thermal energy kT at room temperature. Only a very slight excess of spins sits in the lower level, and the signal comes from <strong>that excess alone</strong>.' },
      { type: 'formula',
        ko: 'ΔN / N ≈ hν / 2kT = (6.626×10<sup>−34</sup> × 4.00×10<sup>8</sup>) / (2 × 1.381×10<sup>−23</sup> × 298) = 3.2×10<sup>−5</sup>',
        en: 'ΔN / N ≈ hν / 2kT = (6.626×10<sup>−34</sup> × 4.00×10<sup>8</sup>) / (2 × 1.381×10<sup>−23</sup> × 298) = 3.2×10<sup>−5</sup>' },
      { type: 'p',
        ko: '400 MHz, 25 °C에서 초과 스핀은 <strong>100만 개당 약 32개</strong>입니다. 자외선 분광법이 들뜬 상태와 바닥 상태의 인구 차이를 사실상 100%로 쓰는 것과 비교하면 출발점이 다릅니다. NMR에 mg 단위의 시료와 반복 적산이 필요한 이유가 이 한 숫자입니다.',
        en: 'At 400 MHz and 25 °C the excess is <strong>about 32 spins per million</strong>. UV spectroscopy effectively works with a 100% population difference; NMR starts from here. That single number is why NMR needs milligrams of sample and repeated averaging.' },
      { type: 'note', kind: 'key',
        title: { ko: '여기서 두 가지가 따라 나옵니다', en: 'Two consequences follow' },
        body: {
          ko: '① 인구 차는 ν에 비례하므로 <strong>자기장을 올리면 감도가 오릅니다</strong>. 고자기장 경쟁의 이유입니다. ② 인구 차는 1/T에도 비례하므로 온도를 낮추면 조금 유리하지만, 상온 근처에서 얻는 이득은 자기장 쪽에 비하면 작습니다.',
          en: '① The excess scales with ν, so <strong>a stronger magnet is a more sensitive one</strong> — hence the race to higher fields. ② It also scales as 1/T, so cooling helps a little, but near room temperature the gain is small next to what the field buys.'
        } },

      { type: 'h', ko: 'A.3 <sup>13</sup>C가 유독 어려운 이유', en: 'A.3 Why <sup>13</sup>C is the hard one' },
      { type: 'p',
        ko: '같은 수의 핵을 같은 자기장에서 잰다고 할 때 감도는 대략 γ<sup>3</sup>에 비례하고, 여기에 자연존재비가 곱해집니다. 이 둘을 곱한 값을 상대 수용도(relative receptivity)라고 부릅니다.',
        en: 'For the same number of nuclei in the same field, sensitivity scales roughly as γ<sup>3</sup>, multiplied by the natural abundance. The product is called the relative receptivity.' },
      { type: 'formula',
        ko: '(γ<sub>C</sub> / γ<sub>H</sub>)<sup>3</sup> × 0.0107 = (1/3.98)<sup>3</sup> × 0.0107 = 1.6×10<sup>−2</sup> × 0.0107 ≈ 1.7×10<sup>−4</sup>',
        en: '(γ<sub>C</sub> / γ<sub>H</sub>)<sup>3</sup> × 0.0107 = (1/3.98)<sup>3</sup> × 0.0107 = 1.6×10<sup>−2</sup> × 0.0107 ≈ 1.7×10<sup>−4</sup>' },
      { type: 'p',
        ko: '<sup>1</sup>H의 약 <strong>1/6000</strong>입니다. 7단원에서 <sup>13</sup>C 측정에 시간이 오래 걸린다고 한 것은 이 숫자를 말한 것입니다. 같은 신호 대 잡음비를 얻으려면 시료를 더 넣거나 스캔 수를 크게 늘려야 합니다.',
        en: 'That is roughly <strong>one six-thousandth</strong> of <sup>1</sup>H. When Lesson 7 says a <sup>13</sup>C spectrum takes a long time, this is the number it means: matching the signal-to-noise takes more sample or many more scans.' },
      { type: 'note', kind: 'key',
        title: { ko: '존재비 1.07%가 낳는 또 하나의 결과', en: 'What an abundance of 1.07% also buys you' },
        body: {
          ko: '한 분자 안에서 <sup>13</sup>C 두 개가 이웃할 확률은 0.0107<sup>2</sup> ≈ 1.1×10<sup>−4</sup>로 사실상 0입니다. 그래서 <strong><sup>13</sup>C–<sup>13</sup>C 짝지음은 보이지 않습니다</strong>. 여기에 양성자 짝풀림까지 걸면 탄소마다 단일선 하나가 남습니다(7단원). 감도를 잃은 대가로 스펙트럼이 단순해진 셈입니다.',
          en: 'The chance of two <sup>13</sup>C nuclei sitting next to each other in one molecule is 0.0107<sup>2</sup> ≈ 1.1×10<sup>−4</sup> — effectively zero, so <strong><sup>13</sup>C–<sup>13</sup>C coupling is never seen</strong>. Add proton decoupling and each carbon is left as one singlet (Lesson 7). The simplicity of the spectrum is what the lost sensitivity buys.'
        } },

      { type: 'h', ko: 'A.4 펄스와 FID — 왜 여러 번 재는가', en: 'A.4 Pulses and the FID — why you average' },
      { type: 'p',
        ko: '옛 연속파(continuous wave, CW) 기기는 주파수 또는 자기장을 조금씩 훑으며 공명을 하나씩 지나갔습니다. 현대 기기는 짧고 센 라디오파 펄스(pulse)로 범위 안의 모든 핵을 한꺼번에 들뜨게 하고, 시간에 따라 감쇠하는 신호를 받습니다. 이것이 자유 유도 감쇠(free induction decay, FID)이고, 여기에 푸리에 변환(Fourier transform)을 걸면 익숙한 주파수 축 스펙트럼이 됩니다.',
        en: 'Old continuous-wave instruments swept the frequency — or the field — slowly through one resonance at a time. A modern one excites everything in range at once with a short, hard radio-frequency pulse and records the decaying signal that follows — the free induction decay (FID). A Fourier transform turns it into the frequency-axis spectrum you are used to.' },
      { type: 'p',
        ko: '한 번에 전부 재기 때문에 같은 측정을 반복해 더할 수 있습니다. 신호는 스캔 수 n에 비례해 쌓이고 잡음은 √n으로만 쌓이므로, 신호 대 잡음비는 <strong>√n</strong>에 비례합니다.',
        en: 'Because everything is recorded at once, the same experiment can be repeated and co-added. Signal grows as the number of scans n while noise grows only as √n, so the signal-to-noise ratio goes as <strong>√n</strong>.' },
      { type: 'note', kind: 'tip',
        title: { ko: '스캔 수의 셈', en: 'The arithmetic of averaging' },
        body: {
          ko: 'S/N을 <strong>2배</strong>로 올리려면 스캔을 <strong>4배</strong>, 4배로 올리려면 <strong>16배</strong> 해야 합니다. 8회 스캔에 1분 걸리던 측정을 S/N 4배로 만들려면 16분이 듭니다. 시료를 더 넣을 수 있다면 그쪽이 거의 언제나 빠릅니다.',
          en: 'Doubling S/N costs <strong>four times</strong> the scans; quadrupling it costs <strong>sixteen</strong>. A one-minute, eight-scan measurement becomes sixteen minutes for four times the S/N. If you can simply add more sample, that is almost always the faster route.'
        } },
      { type: 'p',
        ko: '디지털 분해능(digital resolution)은 획득 시간(acquisition time)의 역수입니다. 2초를 받으면 0.5 Hz 간격으로 점이 찍힙니다. J = 7 Hz를 읽으려면 문제가 없지만, 좁은 갈라짐을 보려면 더 오래 받아야 합니다.',
        en: 'Digital resolution is the reciprocal of the acquisition time: two seconds of FID gives points 0.5 Hz apart. That is ample for reading J = 7 Hz, but a narrow splitting needs a longer acquisition.' },
      { type: 'note', kind: 'pitfall',
        title: { ko: '봉우리 모양은 처리에도 좌우됩니다', en: 'Peak shape is partly a processing choice' },
        body: {
          ko: 'FID에 창함수(window function)를 곱해 잡음을 줄이면 선이 넓어지고, 반대로 분해능을 강조하면 잡음이 커집니다. 갈라짐이 뭉개져 보일 때 원인이 시료가 아니라 <strong>처리 설정</strong>인 경우가 드물지 않습니다. 이 프로그램의 그림은 모두 모식도이므로 이런 효과가 반영되어 있지 않습니다.',
          en: 'Multiplying the FID by a window function trades linewidth against noise in either direction. A splitting that looks smeared is quite often a <strong>processing</strong> choice rather than a property of the sample. The figures in this program are schematic and show none of this.'
        } },

      { type: 'h', ko: 'A.5 이완 — T<sub>1</sub>과 T<sub>2</sub>', en: 'A.5 Relaxation — T<sub>1</sub> and T<sub>2</sub>' },
      { type: 'ul', items: [
        { ko: '<strong>T<sub>1</sub> (세로 이완, spin–lattice)</strong> — 들뜬 스핀이 원래의 인구 분포로 돌아가는 시간 상수입니다. 다음 펄스까지 회복되지 않으면 그 신호는 작게 나옵니다. 완전 회복에는 약 <strong>5×T<sub>1</sub></strong>이 필요합니다(1 − e<sup>−5</sup> = 99.3%).',
          en: '<strong>T<sub>1</sub> (spin–lattice)</strong> — the time constant for returning to the original population difference. A signal that has not recovered before the next pulse comes back weak; full recovery takes about <strong>5×T<sub>1</sub></strong> (1 − e<sup>−5</sup> = 99.3%).' },
        { ko: '<strong>T<sub>2</sub> (가로 이완, spin–spin)</strong> — 스핀들의 위상이 흐트러지는 시간 상수이며 <strong>봉우리의 폭</strong>을 정합니다: Δν<sub>1/2</sub> = 1 / (πT<sub>2</sub>*). 실제 폭에는 자기장 불균일도 함께 들어가므로 별표를 붙여 T<sub>2</sub>*라고 씁니다.',
          en: '<strong>T<sub>2</sub> (spin–spin)</strong> — the time constant for losing phase coherence, and what sets the <strong>linewidth</strong>: Δν<sub>1/2</sub> = 1 / (πT<sub>2</sub>*). The starred form is used because field inhomogeneity contributes to the observed width as well.' }
      ] },
      { type: 'formula',
        ko: 'T<sub>2</sub>* = 1 s → Δν<sub>1/2</sub> = 1 / (π × 1) = 0.32 Hz',
        en: 'T<sub>2</sub>* = 1 s → Δν<sub>1/2</sub> = 1 / (π × 1) = 0.32 Hz' },
      { type: 'table', src: [['claridge', '실험 조건과 이완'], 'silverstein'],
        caption: { ko: '표 A-2. 작은 유기 분자의 대략적인 T<sub>1</sub>', en: 'Table A-2. Typical T<sub>1</sub> for small organic molecules' },
        headers: [{ ko: '핵과 자리', en: 'Nucleus and site' }, { ko: 'T<sub>1</sub> (s)', en: 'T<sub>1</sub> (s)' }, { ko: '결과', en: 'Consequence' }],
        rows: [
          [{ ko: '<sup>1</sup>H 대부분', en: 'Most <sup>1</sup>H' }, '0.5–5', { ko: '기본 조건에서 적분이 성립', en: 'Integration holds under default conditions' }],
          [{ ko: '<sup>13</sup>C — 양성자가 붙은 탄소', en: '<sup>13</sup>C with attached protons' }, '0.5–5', { ko: 'NOE 이득도 크게 받음', en: 'Also gains the most NOE' }],
          [{ ko: '<sup>13</sup>C — 사차 탄소', en: '<sup>13</sup>C quaternary' }, '10–100', { ko: '봉우리가 작게 나오는 주된 원인', en: 'The main reason these peaks look small' }]
        ] },
      { type: 'note', kind: 'key',
        title: { ko: '6단원과 7단원의 두 서술이 여기서 만납니다', en: 'Where Lessons 6 and 7 meet' },
        body: {
          ko: '<sup>1</sup>H 적분을 믿는 이유는 T<sub>1</sub>이 짧아 보통 조건에서 거의 완전히 이완되기 때문입니다. <sup>13</sup>C 적분을 쓰지 않는 이유는 두 가지가 겹치기 때문입니다. ① 사차 탄소의 T<sub>1</sub>이 길어 회복되지 않고, ② 양성자 짝풀림이 만드는 핵 오버하우저 효과(NOE)가 <strong>양성자 붙은 탄소만</strong> 최대 약 3배까지 키웁니다(최대 이득 1 + γ<sub>H</sub>/2γ<sub>C</sub> ≈ 2.99). 두 효과가 같은 방향으로 작용해 사차 탄소 봉우리는 유독 작아집니다.',
          en: '<sup>1</sup>H integration is trusted because those T<sub>1</sub> values are short enough to relax almost fully under normal conditions. <sup>13</sup>C integration is not, for two reasons that reinforce each other: ① quaternary carbons have long T<sub>1</sub> and do not recover, and ② the nuclear Overhauser effect from proton decoupling enhances <strong>only protonated carbons</strong>, by up to about threefold (maximum 1 + γ<sub>H</sub>/2γ<sub>C</sub> ≈ 2.99). Both push the same way, which is why quaternary peaks come out so small.'
        } },

      { type: 'h', ko: 'A.6 자석·프로브·락·심', en: 'A.6 Magnet, probe, lock and shims' },
      { type: 'ul', items: [
        { ko: '<strong>초전도 자석(superconducting magnet)</strong> — 액체 헬륨으로 냉각한 코일이며, 자기장은 켜고 끄는 것이 아니라 늘 걸려 있습니다. 기기 주변의 강자성 물체를 조심해야 하는 이유입니다.',
          en: '<strong>Superconducting magnet</strong> — a helium-cooled coil whose field is always on, not switched on for a measurement. That is why ferromagnetic objects near the instrument are a hazard.' },
        { ko: '<strong>락(lock)</strong> — 용매의 <sup>2</sup>H 신호를 계속 지켜보며 자기장의 느린 흐름(drift)을 보정합니다. 중수소화 용매를 쓰는 첫 번째 이유입니다.',
          en: '<strong>Lock</strong> — the instrument watches the <sup>2</sup>H signal of the solvent and corrects the slow drift of the field. This is the first reason for using a deuterated solvent.' },
        { ko: '<strong>심(shim)</strong> — 시료 부피 안에서 자기장을 균일하게 맞추는 보정 코일입니다. 심이 나쁘면 봉우리가 비대칭으로 퍼지고 좁은 갈라짐이 먼저 뭉개집니다.',
          en: '<strong>Shims</strong> — correction coils that flatten the field across the sample volume. Poor shimming smears peaks asymmetrically, and the narrowest splittings are the first to disappear.' },
        { ko: '<strong>프로브(probe)</strong> — 시료를 감싸는 코일로, 펄스를 보내고 FID를 받습니다. 극저온 프로브(cryoprobe)는 코일과 전치증폭기를 냉각해 잡음을 줄이며, 같은 시료에서 S/N을 몇 배 올립니다.',
          en: '<strong>Probe</strong> — the coil around the sample that both transmits the pulse and receives the FID. A cryoprobe cools the coil and preamplifier to cut noise, worth several times the S/N on the same sample.' },
        { ko: '<strong>시료 회전(spinning)</strong> — 가로 방향의 불균일을 평균해 1차원 스펙트럼의 분해능을 올립니다. 대신 회전 부대 신호(spinning sideband)가 생길 수 있고, 2차원 실험에서는 보통 끕니다.',
          en: '<strong>Spinning</strong> — averages inhomogeneity across the tube and sharpens 1D spectra, at the cost of possible spinning sidebands. It is normally switched off for 2D experiments.' }
      ] },

      { type: 'h', ko: 'A.7 더 센 자석이 사는 것', en: 'A.7 What a stronger magnet buys' },
      { type: 'p',
        ko: '자기장을 올리면 두 가지가 동시에 좋아집니다. 인구 차가 커져 <strong>감도</strong>가 오르고(인구 차 자체는 B<sub>0</sub>에 비례하고 검출 효율이 더해져 대략 B<sub>0</sub><sup>3/2</sup>), 화학적 이동의 Hz 간격이 비례해 <strong>벌어집니다</strong>. 반면 짝지음 상수 J는 결합을 통한 상호작용이라 <strong>자기장과 무관하게 그대로</strong>입니다.',
        en: 'A higher field improves two things at once: the population difference grows, so <strong>sensitivity</strong> rises (the excess itself scales with B<sub>0</sub>, and detection efficiency adds the rest, for roughly B<sub>0</sub><sup>3/2</sup>), and the separation between shifts in Hz <strong>widens</strong> in proportion. The coupling constant J, being a through-bond interaction, <strong>does not change with the field at all</strong>.' },
      { type: 'formula',
        ko: 'Δν(Hz) = Δδ × 기기 주파수(MHz)&nbsp;&nbsp;|&nbsp;&nbsp;J(Hz) = 자기장과 무관<br>δ 7.30과 7.26: 400 MHz에서 16 Hz, 600 MHz에서 24 Hz. J = 8 Hz는 양쪽 모두 8 Hz.',
        en: 'Δν(Hz) = Δδ × spectrometer frequency (MHz)&nbsp;&nbsp;|&nbsp;&nbsp;J(Hz) is field-independent<br>δ 7.30 against 7.26: 16 Hz at 400 MHz, 24 Hz at 600 MHz. J = 8 Hz stays 8 Hz on both.' },
      { type: 'p',
        ko: '그래서 자기장을 올리면 Δν/J 비가 커집니다. 이 비가 작을 때 나타나는 것이 6단원의 지붕 효과(roofing)이고, 더 작아지면 봉우리 위치와 세기가 n+1 규칙에서 벗어나는 2차 스펙트럼(second-order spectrum)이 됩니다. Δν/J가 대략 <strong>6~10 이상</strong>이면 1차(first-order) 해석이 안전합니다. 낮은 자기장에서 뭉쳐 보이던 방향족 다중선이 600 MHz에서 깔끔한 이중선으로 풀리는 것이 이 때문입니다.',
        en: 'Raising the field therefore raises the Δν/J ratio. A small ratio is what produces the roofing of Lesson 6; smaller still, peak positions and intensities depart from the n+1 rule altogether — a second-order spectrum. A ratio above roughly <strong>6 to 10</strong> makes first-order analysis safe. It is why an aromatic multiplet that is a huddle at low field resolves into clean doublets at 600 MHz.' },
      { type: 'note', kind: 'exam',
        title: { ko: '자기장을 바꿔도 변하지 않는 것', en: 'What a change of field leaves alone' },
        body: {
          ko: '시험에서 자주 묻습니다. 기기를 바꿔도 <strong>δ(ppm)</strong>, <strong>적분비</strong>, 그리고 <strong>Hz로 잰 J</strong>는 그대로입니다. 달라지는 것은 <strong>Hz로 잰 화학적 이동 간격</strong>과 <strong>S/N</strong>입니다. 그러므로 “600 MHz에서 J가 커진다”는 서술은 곧바로 오답입니다. 다만 <em>겉모습</em>은 달라질 수 있습니다. Δν/J가 커지면서 2차 스펙트럼이 1차 패턴으로 풀리기 때문인데, 이는 J가 변해서가 아니라 <strong>간격이 벌어져 n+1 규칙이 성립하게 된 것</strong>입니다.',
          en: 'A common exam question. Changing instrument leaves <strong>δ in ppm</strong>, the <strong>integral ratios</strong> and <strong>J in Hz</strong> untouched; what changes is the <strong>shift separation measured in Hz</strong> and the <strong>signal-to-noise</strong>. So “J gets larger at 600 MHz” is wrong on sight. The <em>appearance</em> can still change, though: as Δν/J grows a second-order pattern relaxes into a first-order one — not because J moved, but because <strong>the separation widened until the n+1 rule applies</strong>.'
        } },
      { type: 'table', src: ['nist', 'keeler'],
        caption: { ko: '표 A-3. 기억할 숫자', en: 'Table A-3. Numbers worth remembering' },
        headers: [{ ko: '양', en: 'Quantity' }, { ko: '값', en: 'Value' }],
        rows: [
          [{ ko: '<sup>1</sup>H의 γ/2π', en: 'γ/2π of <sup>1</sup>H' }, '42.58 MHz/T'],
          [{ ko: '400 MHz 기기의 자기장', en: 'Field of a 400 MHz instrument' }, '9.4 T'],
          [{ ko: '600 MHz 기기의 자기장', en: 'Field of a 600 MHz instrument' }, '14.1 T'],
          [{ ko: '인구 차 (400 MHz, 25 °C)', en: 'Population excess (400 MHz, 25 °C)' }, '3.2×10<sup>−5</sup>'],
          [{ ko: '<sup>13</sup>C의 상대 수용도', en: 'Relative receptivity of <sup>13</sup>C' }, '≈ 1.7×10<sup>−4</sup>'],
          [{ ko: '완전 이완에 필요한 시간', en: 'Time for full relaxation' }, '5 × T<sub>1</sub>'],
          [{ ko: '신호 대 잡음비', en: 'Signal-to-noise' }, '∝ √(스캔 수)'],
          [{ ko: '봉우리 반치폭', en: 'Linewidth at half height' }, '1 / (πT<sub>2</sub>*)']
        ] }
    ],
    refs: [
      { r: 'keeler', at: { ko: '2·4·5·9장 — 제만 갈라짐, 펄스와 FID, 푸리에 변환, T₁·T₂ 이완', en: 'Ch. 2, 4, 5, 9 — Zeeman splitting, pulses and the FID, Fourier transform, T₁ and T₂ relaxation' } },
      { r: 'nist', at: { ko: 'γ/2π, h, k, 동위원소 존재비 — 표 A-1과 A.2·A.3의 계산', en: 'γ/2π, h, k and isotopic abundances — Table A-1 and the arithmetic in A.2 and A.3' } },
      { r: 'claridge', at: { ko: '2·3장 — 이완 시간의 실측 범위, NOE, 프로브와 심', en: 'Ch. 2–3 — measured relaxation times, the NOE, probes and shimming' } },
      { r: 'silverstein', at: { ko: '3장 — <sup>13</sup>C 실험 조건과 NOE', en: 'Ch. 3 — <sup>13</sup>C experimental practice and the NOE' } }
    ]
  });

  /* ------------------------------------------------------------ 부록 B */
  L.push({
    id: 'bench',
    badge: { ko: '부록 B', en: 'App. B' },
    kicker: { ko: '부록 B', en: 'Appendix B' },
    title: { ko: '실험대에서 — 시료부터 스펙트럼까지', en: 'At the bench — from sample to spectrum' },
    lead: {
      ko: '이 프로그램의 문항은 이미 잘 측정된 스펙트럼을 읽는 연습입니다. 실제 실험실에서는 그 “잘 측정된”을 만드는 단계에서 해석이 갈립니다. 여기서는 시료를 넣기 전에 정해지는 것들을 정리합니다.',
      en: 'Every question in this program hands you a well-measured spectrum to read. In a real laboratory, most interpretation problems are made before that point. This appendix collects the decisions taken before the sample goes in.'
    },
    blocks: [
      { type: 'h', ko: 'B.1 용매 — 왜 중수소화 용매인가', en: 'B.1 The solvent, and why it is deuterated' },
      { type: 'ul', items: [
        { ko: '<strong>락 신호</strong>를 주기 위해서입니다(A.6). 용매의 <sup>2</sup>H를 기준으로 자기장 흐름을 잡습니다.',
          en: 'It supplies the <strong>lock signal</strong> (A.6): the field drift is held against the solvent&#39;s <sup>2</sup>H.' },
        { ko: '용매 자신의 <strong><sup>1</sup>H 신호를 없애기</strong> 위해서입니다. 0.6 mL의 클로로폼은 약 7.5 mmol이고 시료 10 mg(M = 200)은 0.05 mmol이니 <strong>분자 수로 100배가 넘습니다</strong>. 보통의 클로로폼을 쓰면 그 단일선 하나가 시료의 어떤 신호보다 수십 배 커져, 수용기의 동적 범위(dynamic range)를 혼자 차지해 버립니다.',
          en: 'It <strong>removes the solvent&#39;s own <sup>1</sup>H signal</strong>. Six hundred microlitres of chloroform is about 7.5 mmol against 0.05 mmol for 10 mg of a sample of M = 200 — <strong>more than a hundredfold in molecules</strong>. In ordinary chloroform that one singlet would stand tens of times taller than any sample peak and take the receiver&#39;s dynamic range for itself.' }
      ] },
      { type: 'p',
        ko: '다만 100% 중수소화된 용매는 없습니다. 남은 <sup>1</sup>H가 <strong>잔류 신호(residual peak)</strong>를 내고, 이 위치는 정확히 알려져 있어 기준으로도 쓰입니다. 시료 신호가 잔류 신호와 겹치면 그 자리는 읽을 수 없으므로, 겹칠 것 같으면 용매를 바꿉니다.',
        en: 'No solvent is fully deuterated, though. The leftover <sup>1</sup>H gives a <strong>residual peak</strong> whose position is accurately known and is therefore also usable as a reference. Where a sample signal lands on top of it, that region is unreadable — which is a reason to change solvent.' },
      { type: 'table', src: ['gottlieb'],
        caption: { ko: '표 B-1. 흔한 용매의 잔류 신호와 물 신호 — 각 값은 <strong>그 용매에서</strong> 측정한 δ입니다', en: 'Table B-1. Residual solvent and water signals — each value is the δ measured <strong>in that solvent</strong>' },
        headers: [{ ko: '용매', en: 'Solvent' }, { ko: '잔류 <sup>1</sup>H', en: 'Residual <sup>1</sup>H' }, { ko: '<sup>13</sup>C', en: '<sup>13</sup>C' }, { ko: '그 용매 안의 물', en: 'Water in it' }],
        rows: [
          ['CDCl<sub>3</sub>', '7.26', '77.16 (t)', '1.56'],
          ['DMSO-<em>d</em><sub>6</sub>', '2.50 (quint)', '39.52 (sept)', '3.33'],
          ['CD<sub>3</sub>OD', '3.31 (quint)', '49.00 (sept)', '4.87'],
          [{ ko: '아세톤-<em>d</em><sub>6</sub>', en: 'Acetone-<em>d</em><sub>6</sub>' }, '2.05 (quint)', '29.84, 206.26', '2.84'],
          ['D<sub>2</sub>O', '4.79', '—', { ko: '잔류 신호가 곧 HDO', en: 'the residual peak is HDO' }]
        ] },
      { type: 'note', kind: 'pitfall',
        title: { ko: '용매를 바꾸면 δ가 움직입니다', en: 'Changing solvent moves δ' },
        body: {
          ko: '교재 값과 실측값을 비교할 때는 <strong>용매부터</strong> 확인하십시오. 특히 OH·NH는 DMSO-<em>d</em><sub>6</sub>에서 수소 결합 때문에 크게 다운필드로 가고, 교환이 느려져 짝지음이 보이기도 합니다(5단원). 이 프로그램의 값은 별도 표기가 없으면 CDCl<sub>3</sub> 기준입니다.',
          en: 'When a measured value disagrees with a table, <strong>check the solvent first</strong>. OH and NH in particular move far downfield in DMSO-<em>d</em><sub>6</sub>, where hydrogen bonding is strong and exchange slow enough for their coupling to appear (Lesson 5). Unless stated otherwise, every value in this program is for CDCl<sub>3</sub>.'
        } },

      { type: 'h', ko: 'B.2 시료 준비', en: 'B.2 Preparing the sample' },
      { type: 'ul', items: [
        { ko: '<strong><sup>1</sup>H</strong>: 5 mm 관에 용매 0.6 mL, 시료 5–25 mg. 액면 높이가 약 4 cm는 되어야 코일 영역을 채우고 심이 잡힙니다.',
          en: '<strong><sup>1</sup>H</strong>: 5–25 mg in 0.6 mL of solvent in a 5 mm tube. A column about 4 cm deep is needed to fill the coil region and let the shims settle.' },
        { ko: '<strong><sup>13</sup>C</strong>: 같은 부피에 20–50 mg 이상을 넣거나, 시료가 부족하면 스캔 수로 시간을 씁니다. A.3의 1.7×10<sup>−4</sup>가 그 차이의 이유입니다.',
          en: '<strong><sup>13</sup>C</strong>: 20–50 mg or more in the same volume — or, if the sample is scarce, buy the difference in scans. The 1.7×10<sup>−4</sup> of A.3 is why.' },
        { ko: '먼지와 고체 부스러기는 <strong>반드시 거릅니다</strong>. 부유물은 시료 부피 안의 자기장 균일도를 깨서 봉우리를 비대칭으로 퍼뜨립니다.',
          en: 'Dust and undissolved solid must be <strong>filtered out</strong>. Suspended particles wreck the field homogeneity across the sample and smear peaks asymmetrically.' },
        { ko: '상자성 물질(철 가루, 상자성 금속 이온)은 T<sub>2</sub>를 줄여 선폭을 넓힙니다. 미량이라도 눈에 띄게 나빠집니다. 녹아 있는 산소도 상자성이지만 주로 T<sub>1</sub>을 줄이는 쪽이라, 일상적인 <sup>1</sup>H 측정의 선폭보다는 이완 시간 측정과 NOE 실험에서 문제가 됩니다.',
          en: 'Paramagnetic material — iron filings, paramagnetic metal ions — shortens T<sub>2</sub> and broadens every line, visibly so even in traces. Dissolved oxygen is paramagnetic too, but mostly shortens T<sub>1</sub>: it matters for relaxation measurements and NOE work rather than for the linewidth of a routine <sup>1</sup>H spectrum.' }
      ] },
      { type: 'note', kind: 'tip',
        title: { ko: '진하게 넣을수록 좋은 것은 아닙니다', en: 'More concentrated is not simply better' },
        body: {
          ko: '농도를 지나치게 올리면 점도가 커져 분자 운동이 느려지고, T<sub>2</sub>가 짧아져 선이 넓어집니다. 게다가 농도가 달라지면 수소 결합에 민감한 OH·NH의 δ가 눈에 띄게 움직입니다. 신호가 약할 때 첫 번째 대책은 농도가 아니라 <strong>스캔 수</strong>입니다.',
          en: 'Push the concentration too far and the solution gets viscous: molecular tumbling slows, T<sub>2</sub> shortens and every line broadens. Concentration also visibly moves the δ of hydrogen-bonded OH and NH. When the signal is weak, the first lever is <strong>scans</strong>, not concentration.'
        } },

      { type: 'h', ko: 'B.3 기준과 δ 0', en: 'B.3 Referencing, and where δ 0 comes from' },
      { type: 'p',
        ko: 'TMS를 소량 넣으면 그 단일선을 δ 0으로 둡니다(1단원). 요즘 실무에서는 TMS를 넣지 않고, 위치가 정확히 알려진 <strong>용매 잔류 신호</strong>를 기준으로 삼는 경우가 더 많습니다(표 B-1).',
        en: 'A trace of TMS gives a singlet that is defined as δ 0 (Lesson 1). In current practice TMS is often left out and the accurately known <strong>residual solvent peak</strong> is used as the reference instead (Table B-1).' },
      { type: 'p',
        ko: '그래서 <strong>소수 둘째 자리의 차이는 기준 방식과 용매·농도만으로도 생깁니다</strong>. 같은 화합물의 δ가 문헌마다 7.28과 7.26으로 갈리는 것을 보고 당황할 필요가 없습니다. 이 프로그램이 0.02 ppm 차이 하나로 정답이 갈리는 문항을 두지 않는 것도 같은 이유입니다.',
        en: 'A <strong>difference in the second decimal can come from the referencing, the solvent or the concentration alone</strong>. Seeing the same compound quoted at 7.28 in one source and 7.26 in another is not a contradiction to worry about — and it is why this program avoids questions that turn on 0.02 ppm.' },

      { type: 'h', ko: 'B.4 적분을 믿을 수 있는 조건', en: 'B.4 When integration can be trusted' },
      { type: 'p',
        ko: '<sup>1</sup>H 적분이 양성자 개수에 비례하려면 모든 신호가 다음 펄스 전에 충분히 이완되어야 합니다. 즉 <strong>반복 지연(relaxation delay, d1) + 획득 시간 ≥ 5×T<sub>1</sub></strong>이면 안전합니다(A.5).',
        en: 'For <sup>1</sup>H integrals to track proton counts, every signal must relax before the next pulse: <strong>relaxation delay (d1) + acquisition time ≥ 5×T<sub>1</sub></strong> is the safe condition (A.5).' },
      { type: 'p',
        ko: '일상적인 설정(d1 1–2초)은 표 A-2의 아래쪽, 즉 T<sub>1</sub>이 1초 안팎인 자리에는 충분합니다. T<sub>1</sub>이 몇 초에 이르는 자리는 5×T<sub>1</sub>에 못 미쳐 상대적으로 <strong>과소평가</strong>됩니다. 실무에서는 90°보다 작은 펄스 각(예: 30°)을 써서 회복에 필요한 시간을 줄여 이 제약을 완화합니다. 구조 결정용 상대 적분에는 이 정도로 충분하지만, 정량이 목적이면 d1을 늘려 다시 측정해야 합니다.',
        en: 'A routine setup (d1 of one to two seconds) covers the lower end of Table A-2, where T<sub>1</sub> is around a second. Sites whose T<sub>1</sub> runs to several seconds fall short of 5×T<sub>1</sub> and come out <strong>underestimated</strong>. In practice a flip angle below 90° (30°, say) is used to cut the recovery needed and ease the constraint. This is good enough for the relative integrals of structure determination; for quantitative work, lengthen d1 and measure again.' },
      { type: 'note', kind: 'key',
        title: { ko: '<sup>13</sup>C 적분을 쓰지 않는 이유', en: 'Why <sup>13</sup>C integrals are not used' },
        body: {
          ko: '7단원에서 “<sup>13</sup>C는 적분을 쓸 수 없다”고 한 근거는 A.5의 두 가지입니다. 사차 탄소의 긴 T<sub>1</sub>과, 양성자 붙은 탄소만 키우는 NOE. 두 효과를 모두 없앤 조건(긴 d1 + 역 게이트 짝풀림, inverse-gated decoupling)에서는 <sup>13</sup>C도 정량이 됩니다. 그래서 “원리상 불가능”이 아니라 <strong>“기본 조건에서 성립하지 않는다”</strong>가 정확한 표현입니다.',
          en: 'What stands behind Lesson 7&#39;s “<sup>13</sup>C integrals are not usable” is the pair of effects in A.5: the long T<sub>1</sub> of quaternary carbons, and an NOE that enhances only protonated ones. Suppress both — a long d1 with inverse-gated decoupling — and <sup>13</sup>C becomes quantitative. The accurate statement is therefore not “impossible in principle” but <strong>“not valid under default conditions”</strong>.'
        } },

      { type: 'h', ko: 'B.5 스펙트럼이 이상해 보일 때', en: 'B.5 When the spectrum looks wrong' },
      { type: 'table', src: [['gottlieb', '불순물 δ'], ['claridge', '측정 아티팩트']],
        caption: { ko: '표 B-2. 증상과 원인', en: 'Table B-2. Symptom and cause' },
        headers: [{ ko: '증상', en: 'Symptom' }, { ko: '먼저 의심할 것', en: 'First suspect' }],
        rows: [
          [{ ko: '모든 봉우리가 한쪽으로 꼬리를 끈다', en: 'Every peak tails to one side' }, { ko: '심(shim) 불량 — 시료 자체의 문제가 아님', en: 'Shimming, not the sample' }],
          [{ ko: '모든 봉우리가 넓다', en: 'Every peak is broad' }, { ko: '점도, 상자성 불순물, 부유물', en: 'Viscosity, paramagnetic impurity, suspended solid' }],
          [{ ko: '기준선이 굽어 적분이 안 맞는다', en: 'A rolling baseline spoils the integrals' }, { ko: '기준선 보정(baseline correction) 등 처리 단계', en: 'Processing — baseline correction' }],
          [{ ko: 'δ 1.26의 큰 단일선과 0.86의 삼중선', en: 'A large singlet at 1.26 with a triplet at 0.86' }, { ko: '그리스·알케인 오염', en: 'Grease or alkane contamination' }],
          [{ ko: 'δ 2.17 / 4.12·2.05·1.26 / 1.43', en: 'δ 2.17 / 4.12, 2.05, 1.26 / 1.43' }, { ko: '아세톤 / 에틸 아세테이트 / 사이클로헥세인 잔류', en: 'Residual acetone / ethyl acetate / cyclohexane' }],
          [{ ko: '넓은 봉우리 하나가 D<sub>2</sub>O를 넣자 사라졌다', en: 'One broad peak vanishes after a D<sub>2</sub>O shake' }, { ko: '교환성 양성자 — 오류가 아니라 확인 실험 (5단원)', en: 'An exchangeable proton — the experiment worked (Lesson 5)' }]
        ] },
      { type: 'note', kind: 'exam',
        title: { ko: '해석 전에 확인하는 순서', en: 'The order to check things in' },
        body: {
          ko: '① 용매와 기준을 확인한다 → ② 표 B-1·B-2의 잔류·불순물 신호를 <strong>먼저 지운다</strong> → ③ 남은 신호의 적분 합을 분자식과 맞춘다 → ④ 그다음에 8단원의 절차로 들어갑니다. 실제로 틀리는 경우의 상당수는 ②를 건너뛰고 용매 신호를 시료 신호로 센 것입니다.',
          en: '① Confirm solvent and reference → ② <strong>strike out</strong> the residual and impurity signals of Tables B-1 and B-2 first → ③ match the remaining integrals to the molecular formula → ④ only then start the workflow of Lesson 8. A large share of real mistakes are step ② skipped, with a solvent peak counted as a sample signal.'
        } },

      { type: 'h', ko: 'B.6 여기서 한 걸음 더 — 2차원 실험', en: 'B.6 One step further — the 2D experiments' },
      { type: 'p',
        ko: '이 프로그램은 1차원 <sup>1</sup>H와 <sup>13</sup>C만으로 풀 수 있는 범위를 다룹니다. 실제 연구에서는 아래 실험을 함께 써서, 8단원에서 손으로 이어 붙이던 조각 연결을 직접 읽습니다.',
        en: 'This program stays inside what 1D <sup>1</sup>H and <sup>13</sup>C can settle. Real work adds the experiments below, which read off directly the fragment connections that Lesson 8 assembles by hand.' },
      { type: 'ul', items: [
        { ko: '<strong>DEPT</strong> — 탄소를 CH<sub>3</sub> / CH<sub>2</sub> / CH / 사차로 나눕니다. 이미 7단원에서 다뤘습니다.',
          en: '<strong>DEPT</strong> — sorts carbons into CH<sub>3</sub>, CH<sub>2</sub>, CH and quaternary. Already covered in Lesson 7.' },
        { ko: '<strong>COSY</strong> — <sup>1</sup>H–<sup>1</sup>H 짝지음 상대를 격자에서 읽습니다. 6단원에서 삼중선과 사중선을 짝지어 –CH<sub>2</sub>CH<sub>3</sub>를 세우던 작업이 교차 봉우리 하나로 끝납니다.',
          en: '<strong>COSY</strong> — reads <sup>1</sup>H–<sup>1</sup>H coupling partners off a grid. Pairing a triplet with a quartet to build –CH<sub>2</sub>CH<sub>3</sub>, as in Lesson 6, becomes a single cross peak.' },
        { ko: '<strong>HSQC</strong> — 한 결합 떨어진 <sup>1</sup>H–<sup>13</sup>C 짝을 잇습니다. 어떤 양성자가 어떤 탄소에 붙어 있는지가 확정됩니다.',
          en: '<strong>HSQC</strong> — links each <sup>1</sup>H to the <sup>13</sup>C one bond away, fixing which proton sits on which carbon.' },
        { ko: '<strong>HMBC</strong> — 두세 결합 떨어진 <sup>1</sup>H–<sup>13</sup>C 상관을 봅니다. 양성자가 없어 HSQC에 나타나지 않는 <strong>사차 탄소와 카보닐</strong>을 조각에 이어 붙이는 데 결정적입니다.',
          en: '<strong>HMBC</strong> — shows <sup>1</sup>H–<sup>13</sup>C correlations two and three bonds away. It is what connects the <strong>quaternary carbons and carbonyls</strong>, invisible to HSQC, to the rest of the skeleton.' }
      ] },
      { type: 'note', kind: 'tip',
        title: { ko: '1차원으로 어디까지 가는가', en: 'How far 1D takes you' },
        body: {
          ko: '학부 과정의 문제는 대부분 <sup>1</sup>H 적분·다중도와 <sup>13</sup>C 신호 개수만으로 결정됩니다. 2차원이 필요해지는 지점은 <strong>조각은 다 알겠는데 잇는 방법이 여럿일 때</strong>입니다. 8단원의 마지막 단계에서 후보가 둘 이상 남으면, 그때가 HMBC를 찾는 순간입니다.',
          en: 'Most undergraduate problems are settled by <sup>1</sup>H integrals and multiplicities plus a <sup>13</sup>C signal count. The point where 2D becomes necessary is when <strong>the fragments are known but there is more than one way to join them</strong>. If the last step of Lesson 8 leaves two candidates standing, that is the moment to reach for HMBC.'
        } }
    ],
    refs: [
      { r: 'claridge', at: { ko: '3·4·5·6장 — 시료 준비, 실험 조건, 정량 조건, COSY·HSQC·HMBC', en: 'Ch. 3–6 — sample preparation, acquisition conditions, quantitative conditions, COSY, HSQC and HMBC' } },
      { r: 'gottlieb', at: { ko: '표 B-1·B-2의 잔류 용매와 불순물 δ 전체', en: 'every residual-solvent and impurity δ in Tables B-1 and B-2' } },
      { r: 'pavia', at: { ko: '3장 — 시료 준비와 기준물질, 부록의 상관표', en: 'Ch. 3 — sample handling and referencing; the correlation charts in the appendix' } },
      { r: 'keeler', at: { ko: '이완과 적분의 정량성에 관한 배경', en: 'the background on relaxation and the quantitative validity of integrals' } }
    ]
  });

  global.LESSONS = L;
})(window);
