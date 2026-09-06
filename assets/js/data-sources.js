/* data-sources.js — 참고문헌과 데이터 출처 대장
 * Bibliography and data-provenance register.
 *
 * 프로그램 안의 모든 수치는 아래 아홉 출처 중 하나로 소급됩니다.
 * Every number in this program traces back to one of the nine entries below.
 */
(function (global) {
  'use strict';

  var SOURCES = {
    pavia: {
      short: { ko: 'Pavia 외 (2015)', en: 'Pavia et al. (2015)' },
      full: 'Pavia, D. L.; Lampman, G. M.; Kriz, G. S.; Vyvyan, J. R. <em>Introduction to Spectroscopy</em>, 5th ed.; Cengage Learning: Stamford, CT, 2015. ISBN 978-1-285-46012-3.',
      use: {
        ko: '<sup>1</sup>H·<sup>13</sup>C 화학적 이동 상관표, CH<sub>3</sub>–X 전기음성도 표(표 3.4), 이방성·교환성 양성자 설명, 종합 구조 문제의 풀이 절차.',
        en: '<sup>1</sup>H and <sup>13</sup>C correlation charts, the CH<sub>3</sub>–X electronegativity table (Table 3.4), the treatment of anisotropy and exchangeable protons, and the workflow for combined structure problems.'
      }
    },
    silverstein: {
      short: { ko: 'Silverstein 외 (2014)', en: 'Silverstein et al. (2014)' },
      full: 'Silverstein, R. M.; Webster, F. X.; Kiemle, D. J.; Bryce, D. L. <em>Spectrometric Identification of Organic Compounds</em>, 8th ed.; Wiley: Hoboken, NJ, 2014. ISBN 978-0-470-61637-6.',
      use: {
        ko: '짝지음 상수 J 값 표(부록 F), <sup>13</sup>C 실험 조건과 DEPT, 화학적 이동 상관표의 교차 확인.',
        en: 'The coupling-constant tables (Appendix F), <sup>13</sup>C experimental practice and DEPT, and cross-checking of the correlation charts.'
      }
    },
    pretsch: {
      short: { ko: 'Pretsch 외 (2009)', en: 'Pretsch et al. (2009)' },
      full: 'Pretsch, E.; B&uuml;hlmann, P.; Badertscher, M. <em>Structure Determination of Organic Compounds: Tables of Spectral Data</em>, 4th ed.; Springer: Berlin, 2009. DOI: 10.1007/978-3-540-93810-1.',
      use: {
        ko: '<strong>방향족 치환기 증분 Δδ 전체(16종)</strong> — 4단원의 계산, 치환기 계산기, C·D 세트 문항의 수치 근거. <sup>13</sup>C 치환기 효과 표.',
        en: '<strong>All 16 aromatic substituent increments Δδ</strong> — the arithmetic in Lesson 4, the shift calculator, and the numbers behind sets C and D. Also the <sup>13</sup>C substituent tables.'
      }
    },
    clayden: {
      short: { ko: 'Clayden 외 (2012)', en: 'Clayden et al. (2012)' },
      full: 'Clayden, J.; Greeves, N.; Warren, S. <em>Organic Chemistry</em>, 2nd ed.; Oxford University Press: Oxford, 2012. ISBN 978-0-19-927029-3.',
      use: {
        ko: '유도 효과와 공명 효과의 구분, 친전자성 방향족 치환의 배향성과 화학적 이동을 잇는 논리(21장), 고리 전류와 이방성(13장).',
        en: 'The distinction between inductive and resonance effects, the argument tying electrophilic aromatic substitution directing effects to chemical shift (Ch. 21), and ring currents and anisotropy (Ch. 13).'
      }
    },
    gottlieb: {
      short: { ko: 'Gottlieb 외 (1997)', en: 'Gottlieb et al. (1997)' },
      full: 'Gottlieb, H. E.; Kotlyar, V.; Nudelman, A. NMR Chemical Shifts of Common Laboratory Solvents as Trace Impurities. <em>J. Org. Chem.</em> <strong>1997</strong>, <em>62</em> (21), 7512&ndash;7515. DOI: 10.1021/jo971176v.',
      use: {
        ko: '용매 잔류 신호와 흔한 불순물의 δ — CDCl<sub>3</sub> 7.26 / 77.16, DMSO-d<sub>6</sub> 2.50 / 39.52, D<sub>2</sub>O 4.79, CDCl<sub>3</sub> 중의 물 1.56.',
        en: 'Residual solvent and common impurity shifts — CDCl<sub>3</sub> 7.26 / 77.16, DMSO-d<sub>6</sub> 2.50 / 39.52, D<sub>2</sub>O 4.79, and water in CDCl<sub>3</sub> at 1.56.'
      }
    },
    keeler: {
      short: { ko: 'Keeler (2010)', en: 'Keeler (2010)' },
      full: 'Keeler, J. <em>Understanding NMR Spectroscopy</em>, 2nd ed.; Wiley: Chichester, 2010. ISBN 978-0-470-74608-0.',
      use: {
        ko: '부록 A의 이론적 배경 — 제만 갈라짐(Zeeman splitting)과 라모어 주파수, 볼츠만 인구 차, 펄스와 FID, 푸리에 변환, T<sub>1</sub>·T<sub>2</sub> 이완.',
        en: 'The theory behind Appendix A — Zeeman splitting and the Larmor frequency, the Boltzmann population difference, pulses and the FID, Fourier transformation, and T<sub>1</sub>/T<sub>2</sub> relaxation.'
      }
    },
    claridge: {
      short: { ko: 'Claridge (2016)', en: 'Claridge (2016)' },
      full: 'Claridge, T. D. W. <em>High-Resolution NMR Techniques in Organic Chemistry</em>, 3rd ed.; Elsevier: Amsterdam, 2016. ISBN 978-0-08-099986-9. DOI: 10.1016/C2015-0-04654-8.',
      use: {
        ko: '부록 B의 실험 조건 — 시료 준비, 락(lock)과 심(shim), 반복 지연과 적분의 정량성, NOE, COSY·HSQC·HMBC 개요. 표 A-2의 T<sub>1</sub> 범위.',
        en: 'The practice behind Appendix B — sample preparation, lock and shims, relaxation delay and the validity of integrals, the NOE, and the outline of COSY, HSQC and HMBC. Also the T<sub>1</sub> ranges in Table A-2.'
      }
    },
    nist: {
      short: { ko: 'CODATA 2018 · NIST', en: 'CODATA 2018 · NIST' },
      full: 'Tiesinga, E.; Mohr, P. J.; Newell, D. B.; Taylor, B. N. CODATA Recommended Values of the Fundamental Physical Constants: 2018. <em>Rev. Mod. Phys.</em> <strong>2021</strong>, <em>93</em> (2), 025010. DOI: 10.1103/RevModPhys.93.025010. &mdash; Atomic Weights and Isotopic Compositions; National Institute of Standards and Technology: Gaithersburg, MD. https://physics.nist.gov/Comp',
      use: {
        ko: '부록 A의 물리상수 — 자기회전비 γ/2π(<sup>1</sup>H 42.58 MHz/T 등), 플랑크 상수 h, 볼츠만 상수 k, 동위원소 자연존재비(<sup>13</sup>C 1.07%). 표 A-1과 A.2·A.3의 계산은 모두 이 값들로 다시 계산해 확인했습니다.',
        en: 'The physical constants in Appendix A — gyromagnetic ratios γ/2π (42.58 MHz/T for <sup>1</sup>H and so on), the Planck and Boltzmann constants, and natural isotopic abundances (1.07% for <sup>13</sup>C). Table A-1 and the arithmetic in A.2 and A.3 were recomputed from these values.'
      }
    },
    sdbs: {
      short: { ko: 'SDBS (AIST)', en: 'SDBS (AIST)' },
      full: 'SDBS: Spectral Database for Organic Compounds; National Institute of Advanced Industrial Science and Technology (AIST): Tsukuba, Japan. https://sdbs.db.aist.go.jp',
      use: {
        ko: '예제와 문항에 인용된 <strong>개별 화합물의 실측값</strong> — 나이트로벤젠, 아니솔, 4-나이트로아니솔, 에틸 아세테이트, 아세토페논 등. 교재 값과 교차 확인했습니다.',
        en: 'The <strong>measured values for individual compounds</strong> quoted in examples and questions — nitrobenzene, anisole, 4-nitroanisole, ethyl acetate, acetophenone and others — cross-checked against the textbook values.'
      }
    }
  };

  /* 데이터 종류별 소급 대장 / provenance register, by kind of datum */
  var PROVENANCE = [
    { what: { ko: '방향족 치환기 증분 Δδ (16종)', en: 'Aromatic substituent increments Δδ (16 groups)' },
      where: { ko: '4단원 표 4-2, 치환기 계산기, C·D 세트', en: 'Lesson 4 Table 4-2, the shift calculator, sets C and D' },
      refs: ['pretsch'] },
    { what: { ko: '<sup>1</sup>H 화학적 이동 영역표', en: '<sup>1</sup>H chemical-shift regions' },
      where: { ko: '2단원 표 2-1, A 세트', en: 'Lesson 2 Table 2-1, set A' },
      refs: ['pavia', 'silverstein'] },
    { what: { ko: 'CH<sub>3</sub>–X 전기음성도와 δ', en: 'Electronegativity and δ of CH<sub>3</sub>–X' },
      where: { ko: '3단원 표 3-1, B 세트', en: 'Lesson 3 Table 3-1, set B' },
      refs: ['pavia'] },
    { what: { ko: '짝지음 상수 J 값', en: 'Coupling constants J' },
      where: { ko: '6단원 표 6-2, F 세트', en: 'Lesson 6 Table 6-2, set F' },
      refs: ['silverstein', 'pavia'] },
    { what: { ko: '<sup>13</sup>C 영역과 치환기 효과', en: '<sup>13</sup>C regions and substituent effects' },
      where: { ko: '2단원 표 2-2, 7단원 표 7-1, G 세트', en: 'Lesson 2 Table 2-2, Lesson 7 Table 7-1, set G' },
      refs: ['pretsch', 'pavia'] },
    { what: { ko: '용매 잔류 신호', en: 'Residual solvent peaks' },
      where: { ko: '2단원, 부록 B 표 B-1·B-2, 문항 A6', en: 'Lesson 2, Appendix B Tables B-1 and B-2, question A6' },
      refs: ['gottlieb'] },
    { what: { ko: '개별 화합물의 실측 δ', en: 'Measured δ of individual compounds' },
      where: { ko: '모든 그림과 구조 결정 문항', en: 'Every figure and every structure problem' },
      refs: ['sdbs', 'pavia'] },
    { what: { ko: '유도/공명 효과, 배향성과의 연결', en: 'Inductive vs resonance effects; the link to directing effects' },
      where: { ko: '3·4단원 개념 설명', en: 'The exposition in Lessons 3 and 4' },
      refs: ['clayden', 'pavia'] },
    { what: { ko: '이방성, 고리 전류, 교환성 양성자', en: 'Anisotropy, ring currents, exchangeable protons' },
      where: { ko: '5단원, E 세트', en: 'Lesson 5, set E' },
      refs: ['pavia', 'clayden', 'silverstein'] },
    { what: { ko: '자기회전비 γ/2π, h, k, 동위원소 존재비', en: 'Gyromagnetic ratios γ/2π, h, k, isotopic abundances' },
      where: { ko: '부록 A 표 A-1·A-3과 A.2·A.3의 계산', en: 'Appendix A, Tables A-1 and A-3 and the arithmetic in A.2 and A.3' },
      refs: ['nist'] },
    { what: { ko: '제만 갈라짐, 펄스와 FID, T<sub>1</sub>·T<sub>2</sub> 이완', en: 'Zeeman splitting, pulses and the FID, T<sub>1</sub>/T<sub>2</sub> relaxation' },
      where: { ko: '부록 A', en: 'Appendix A' },
      refs: ['keeler', 'claridge'] },
    { what: { ko: '시료 준비, 측정 조건, 적분의 정량성, 2차원 실험 개요', en: 'Sample preparation, acquisition conditions, quantitative integration, the 2D outline' },
      where: { ko: '부록 B', en: 'Appendix B' },
      refs: ['claridge', 'silverstein', 'pavia'] }
  ];

  /* 데이터를 읽을 때의 주의 / caveats when reading the numbers */
  var CAVEATS = [
    { ko: '<strong>계산값과 실측값을 구분해 표기했습니다.</strong> “7.26 + 0.95 = 8.21 (실측 8.22)”처럼 괄호 안이 실측입니다. 계산값은 가법 증분 모형의 예측일 뿐입니다.',
      en: '<strong>Calculated and measured values are labelled separately.</strong> In “7.26 + 0.95 = 8.21 (obs. 8.22)” the bracketed number is the measurement; the other is only what the additive-increment model predicts.' },
    { ko: '<strong>증분 모형의 오차는 대략 ±0.2 ppm입니다.</strong> 치환기가 서로 ortho로 인접하거나, 강한 EWG와 강한 EDG가 함께 있거나, 입체 장애로 공액이 뒤틀린 경우에는 오차가 더 커집니다.',
      en: '<strong>The increment model is good to roughly ±0.2 ppm.</strong> Errors grow when substituents are ortho to each other, when a strong EWG and a strong EDG are both present, or when steric twisting breaks conjugation.' },
    { ko: '<strong>모든 δ는 용매·농도·온도에 의존합니다.</strong> 별도 표기가 없으면 CDCl<sub>3</sub> 기준의 희석 용액 값입니다. OH·NH의 δ는 특히 가변적이라 참고값으로만 쓰십시오.',
      en: '<strong>Every δ depends on solvent, concentration and temperature.</strong> Unless stated otherwise, values are for dilute solutions in CDCl<sub>3</sub>. OH and NH shifts are especially variable and should be treated as indicative only.' },
    { ko: '<strong>스펙트럼 그림은 모식도입니다.</strong> 실측 FID에서 그린 것이 아니며, 다중선 간격은 눈에 보이도록 과장되어 있습니다. 봉우리 높이는 적분에 비례하도록 그렸을 뿐 실제 세기가 아닙니다.',
      en: '<strong>The spectra are schematic.</strong> They are not drawn from measured FIDs, and multiplet spacings are exaggerated for legibility. Peak heights merely track the integration and are not real intensities.' },
    { ko: '<strong>전기음성도 값은 Pavia의 표를 따릅니다</strong>(F 4.0, O 3.5, Cl 3.1, Br 2.8, I 2.5, H 2.1, Si 1.8). Pauling 원표(F 3.98, Cl 3.16 …)와 소수점 이하가 다르지만, 순서와 논지는 같습니다.',
      en: '<strong>Electronegativities follow the table in Pavia</strong> (F 4.0, O 3.5, Cl 3.1, Br 2.8, I 2.5, H 2.1, Si 1.8). These differ in the first decimal from the original Pauling values (F 3.98, Cl 3.16 …), but the ordering and the argument are identical.' }
  ];

  global.SOURCES = SOURCES;
  global.PROVENANCE = PROVENANCE;
  global.CAVEATS = CAVEATS;
})(window);
