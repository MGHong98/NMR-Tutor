/* i18n.js — UI 문자열 사전 / UI string dictionary
 * 국문에는 전문 용어의 영문을 괄호로 병기한다.
 * Korean strings carry the English term in parentheses on first use.
 */
(function (global) {
  'use strict';

  var UI = {
    skip_to_main:      { ko: '본문 바로가기', en: 'Skip to main content' },
    app_title:         { ko: 'NMR 분석 학습', en: 'NMR Analysis Tutor' },
    app_sub:           { ko: '학부 유기화학 · 1H / 13C NMR', en: 'Undergraduate organic chemistry · 1H / 13C NMR' },

    nav_learn:         { ko: '개념 학습', en: 'Learn' },
    nav_practice:      { ko: '연습문제', en: 'Practice' },
    nav_tools:         { ko: '치환기 계산기', en: 'Shift Calculator' },
    nav_progress:      { ko: '학습 현황', en: 'Progress' },
    lesson_list:       { ko: '단원 목록', en: 'Lessons' },

    /* practice */
    practice_intro_t:  { ko: '연습문제 세트', en: 'Problem sets' },
    practice_intro_d:  {
      ko: '세트를 선택하면 문제가 시작됩니다. ★ 표시는 EWG/EDG에 의한 업필드(upfield)·다운필드(downfield) 효과를 집중적으로 다루는 핵심 세트입니다.',
      en: 'Pick a set to begin. Sets marked ★ are the core sets that drill EWG/EDG upfield/downfield effects.'
    },
    q_of:              { ko: '문항', en: 'Question' },
    score_label:       { ko: '정답', en: 'Correct' },
    check:             { ko: '정답 확인', en: 'Check answer' },
    next:              { ko: '다음 문항', en: 'Next question' },
    finish:            { ko: '결과 보기', en: 'See results' },
    retry_set:         { ko: '이 세트 다시 풀기', en: 'Retry this set' },
    back_sets:         { ko: '세트 목록으로', en: 'Back to sets' },
    correct:           { ko: '정답입니다', en: 'Correct' },
    incorrect:         { ko: '오답입니다', en: 'Not quite' },
    your_answer:       { ko: '제출한 답', en: 'Your answer' },
    right_answer:      { ko: '정답', en: 'Answer' },
    source_label:      { ko: '출처', en: 'Source' },
    hint_mc:           { ko: '하나만 고르세요.', en: 'Choose one option.' },
    hint_multi:        { ko: '해당하는 것을 모두 고르세요.', en: 'Select all that apply.' },
    hint_order:        { ko: '보기를 눌러 순서대로 배열하세요. 다시 누르면 취소됩니다.', en: 'Click the items to place them in order. Click again in the tray to undo.' },
    hint_num:          { ko: '숫자만 입력하세요(ppm 단위).', en: 'Enter a number in ppm.' },
    order_placeholder: { ko: '여기에 순서대로 배열됩니다', en: 'Your ordering appears here' },
    result_title:      { ko: '세트 완료', en: 'Set complete' },
    result_msg_hi:     { ko: '개념이 잘 잡혀 있습니다. 더 어려운 세트로 넘어가세요.', en: 'Solid grasp — move on to a harder set.' },
    result_msg_mid:    { ko: '기본기는 있습니다. 틀린 문항의 해설을 다시 읽어 보세요.', en: 'Good base. Re-read the explanations for the ones you missed.' },
    result_msg_lo:     { ko: '해당 단원을 다시 읽고 재도전하는 것을 권합니다.', en: 'Review the matching lesson and try again.' },
    review_lesson:     { ko: '관련 단원 보기', en: 'Open related lesson' },

    /* difficulty */
    d1:                { ko: '기본', en: 'Basic' },
    d2:                { ko: '표준', en: 'Standard' },
    d3:                { ko: '심화', en: 'Advanced' },

    /* tools */
    calc_title:        { ko: '치환벤젠 화학적 이동 계산기', en: 'Substituted-benzene shift calculator' },
    calc_desc:         {
      ko: '단일치환 벤젠(monosubstituted benzene)의 고리 양성자 화학적 이동을 가법 증분(additive increment)으로 추정합니다. δ = 7.26 + Σ(증분). 이치환체는 두 치환기의 증분을 해당 위치에 대해 더합니다.',
      en: 'Estimates ring-proton shifts of substituted benzenes from additive increments: δ = 7.26 + Σ(increments). For disubstituted rings, add the increments each substituent contributes at that position.'
    },
    calc_sub1:         { ko: '치환기 A', en: 'Substituent A' },
    calc_sub2:         { ko: '치환기 B (선택)', en: 'Substituent B (optional)' },
    calc_rel:          { ko: 'B의 상대 위치', en: 'Position of B' },
    calc_none:         { ko: '없음', en: 'None' },
    pos_ortho:         { ko: 'ortho (1,2-)', en: 'ortho (1,2-)' },
    pos_meta:          { ko: 'meta (1,3-)', en: 'meta (1,3-)' },
    pos_para:          { ko: 'para (1,4-)', en: 'para (1,4-)' },
    calc_note:         {
      ko: '증분값은 Pretsch 등의 표에서 가져온 근사치입니다. 실제 값과 ±0.2 ppm 정도 차이 날 수 있고, 인접 치환기의 입체 효과나 강한 EWG/EDG 조합에서는 오차가 더 커집니다.',
      en: 'Increments are approximate literature values (Pretsch et al.). Expect ±0.2 ppm deviations; errors grow for adjacent substituents and for strong EWG/EDG combinations.'
    },
    calc_predicted:    { ko: '예측 스펙트럼(개형)', en: 'Predicted pattern (schematic)' },
    ref_table_title:   { ko: '치환기 증분표 (Δδ, ppm)', en: 'Substituent increments (Δδ, ppm)' },
    ref_table_note:    { ko: '양수 = 다운필드(deshielding), 음수 = 업필드(shielding). 기준값 벤젠 δ 7.26.', en: 'Positive = downfield (deshielding), negative = upfield (shielding). Benzene reference δ 7.26.' },
    col_group:         { ko: '치환기', en: 'Group' },
    col_class:         { ko: '분류', en: 'Class' },
    col_ortho:         { ko: 'ortho', en: 'ortho' },
    col_meta:          { ko: 'meta', en: 'meta' },
    col_para:          { ko: 'para', en: 'para' },

    /* progress */
    prog_title:        { ko: '학습 현황', en: 'Your progress' },
    prog_attempted:    { ko: '푼 문항', en: 'Attempted' },
    prog_correct:      { ko: '맞힌 문항', en: 'Correct' },
    prog_rate:         { ko: '정답률', en: 'Accuracy' },
    prog_total:        { ko: '전체 문항', en: 'Total items' },
    prog_by_set:       { ko: '세트별 현황', en: 'By set' },
    prog_reset:        { ko: '기록 초기화', en: 'Reset progress' },
    prog_reset_ask:    { ko: '저장된 학습 기록을 모두 지울까요?', en: 'Erase all saved progress?' },
    prog_empty:        { ko: '아직 푼 문항이 없습니다. 연습문제 탭에서 시작하세요.', en: 'Nothing attempted yet. Head to the Practice tab.' },
    prog_weak:         { ko: '보완이 필요한 주제', en: 'Topics to revisit' },
    prog_weak_none:    { ko: '약점으로 표시된 주제가 없습니다.', en: 'No weak topics flagged yet.' },
    prog_storage:      { ko: '기록은 이 브라우저에만 저장됩니다(localStorage).', en: 'Progress is stored in this browser only (localStorage).' },

    footer_note: {
      ko: '주요 참고문헌: Pavia 외, <em>Introduction to Spectroscopy</em>, 5판(2015); Silverstein 외, <em>Spectrometric Identification of Organic Compounds</em>, 8판(2014); Pretsch 외, <em>Structure Determination of Organic Compounds</em>, 4판(2009); Clayden 외, <em>Organic Chemistry</em>, 2판(2012); Gottlieb 외, <em>J. Org. Chem.</em> 1997, 62, 7512.',
      en: 'Key references: Pavia et al., <em>Introduction to Spectroscopy</em>, 5th ed. (2015); Silverstein et al., <em>Spectrometric Identification of Organic Compounds</em>, 8th ed. (2014); Pretsch et al., <em>Structure Determination of Organic Compounds</em>, 4th ed. (2009); Clayden et al., <em>Organic Chemistry</em>, 2nd ed. (2012); Gottlieb et al., <em>J. Org. Chem.</em> 1997, 62, 7512.'
    },
    footer_disclaimer: {
      ko: '표시된 화학적 이동은 교재의 대표값이며 용매·농도·온도에 따라 달라집니다. 스펙트럼 그림은 개념 설명을 위한 모식도이며 실측 데이터가 아닙니다.',
      en: 'Quoted shifts are representative textbook values and vary with solvent, concentration and temperature. Spectra shown are schematic teaching figures, not measured data.'
    }
  };

  var state = { lang: 'ko' };

  function setLang(l) { state.lang = (l === 'en') ? 'en' : 'ko'; }
  function getLang() { return state.lang; }

  /** t('key') → UI string in the current language */
  function t(key) {
    var e = UI[key];
    if (!e) { return key; }
    return e[state.lang] || e.ko;
  }

  /** L({ko:…, en:…}) → localized value; passes plain strings through */
  function L(obj) {
    if (obj == null) { return ''; }
    if (typeof obj === 'string') { return obj; }
    return obj[state.lang] != null ? obj[state.lang] : obj.ko;
  }

  global.I18N = { UI: UI, setLang: setLang, getLang: getLang, t: t, L: L };
})(window);
