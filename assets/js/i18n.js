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
    nav_sources:       { ko: '출처', en: 'Sources' },
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
    prog_storage_off:  { ko: '이 브라우저에는 기록을 저장할 수 없습니다(localStorage 차단 또는 용량 초과). 화면에는 반영되지만 <strong>창을 닫으면 사라집니다</strong> — 필요하면 아래에서 내보내 두십시오.', en: 'Progress cannot be saved in this browser (localStorage blocked or full). It is applied on screen but <strong>will be lost when you close the tab</strong> — export it below if you need it.' },

    /* 진도 내보내기·불러오기 / progress export and import */
    io_title:          { ko: '기록 내보내기·불러오기', en: 'Export and import progress' },
    io_intro: {
      ko: '기록은 이 브라우저에만 남으므로, 다른 기기나 실습실 공용 PC로 옮기려면 아래 JSON을 복사하거나 파일로 저장해 두십시오.',
      en: 'Progress lives only in this browser. To move it to another machine — a shared teaching-lab PC, say — copy the JSON below or save it as a file.'
    },
    io_export:         { ko: '내보내기', en: 'Export' },
    io_import:         { ko: '불러오기', en: 'Import' },
    io_copy:           { ko: '복사', en: 'Copy' },
    io_copied:         { ko: '복사했습니다.', en: 'Copied.' },
    io_copy_manual:    { ko: '자동 복사가 막혀 있습니다. 위 상자를 직접 선택해 복사하십시오.', en: 'Automatic copying is blocked here; select the box above and copy manually.' },
    io_download:       { ko: '파일로 저장', en: 'Save as file' },
    io_paste:          { ko: '내보낸 JSON을 여기에 붙여 넣으십시오.', en: 'Paste exported JSON here.' },
    io_merge:          { ko: '합치기', en: 'Merge' },
    io_replace:        { ko: '덮어쓰기', en: 'Replace' },
    io_merge_rule: {
      ko: '<strong>합치기</strong>는 문항별로 시도 횟수는 큰 쪽을, 정답 여부는 한 번이라도 맞혔으면 정답으로 둡니다(같은 파일을 여러 번 불러와도 결과가 달라지지 않습니다). <strong>덮어쓰기</strong>는 현재 기록을 버리고 파일의 내용만 남깁니다.',
      en: '<strong>Merge</strong> keeps the larger attempt count per question and marks it correct if either side was (so importing the same file twice changes nothing). <strong>Replace</strong> discards the current record and keeps only the file.'
    },
    io_bad_json:       { ko: '읽을 수 없습니다. 이 프로그램에서 내보낸 JSON이 맞는지 확인하십시오.', en: 'Could not read this. Check that it is JSON exported by this program.' },
    io_bad_app:        { ko: '다른 프로그램의 파일입니다.', en: 'This file is from a different program.' },
    io_bad_ver:        { ko: '더 새로운 형식의 파일입니다. 이 사본에서는 읽을 수 없습니다.', en: 'This file uses a newer format than this copy can read.' },
    io_empty:          { ko: '불러올 항목이 없습니다.', en: 'There is nothing to import.' },
    io_done:           { ko: '불러왔습니다.', en: 'Imported.' },
    io_saved_at:       { ko: '파일 저장 시각', en: 'File saved at' },
    io_stat_taken:     { ko: '반영한 문항', en: 'Questions applied' },
    io_stat_skipped:   { ko: '건너뛴 항목(모르는 문항 번호이거나 형식이 맞지 않음)', en: 'Skipped (unknown id, or a malformed entry)' },

    /* 무결성 확인 / integrity */
    integ_title:       { ko: '제작 정보와 무결성 확인', en: 'Build information and integrity' },
    integ_intro: {
      ko: '이 배포본의 콘텐츠(단원·문항·출처 전체)를 SHA-256으로 요약해 파일에 기록된 값과 대조합니다. 변조를 <strong>막는</strong> 장치가 아니라 <strong>드러내는</strong> 장치입니다. 계산은 이 브라우저 안에서만 이루어지며 아무것도 전송하지 않습니다.',
      en: 'The content of this copy — every lesson, question and source — is summarised with SHA-256 and compared with the value recorded in the file. It does not <strong>prevent</strong> tampering; it makes it <strong>visible</strong>. Everything is computed in this browser and nothing is transmitted.'
    },
    integ_run:         { ko: '지금 계산', en: 'Compute now' },
    integ_recorded:    { ko: '파일에 기록된 해시', en: 'Hash recorded in the file' },
    integ_current:     { ko: '지금 계산한 해시', en: 'Hash computed just now' },
    integ_match:       { ko: '일치 — 콘텐츠가 기록된 상태 그대로입니다. (이는 <strong>원본과 같다</strong>는 뜻일 뿐, 내용이 화학적으로 옳다는 보증은 아닙니다. 그 근거는 위의 출처와 소급 대장입니다.)', en: 'Match — the content is exactly as recorded. (That means it is <strong>identical to the original</strong>, not that the chemistry is correct; for that, see the sources and the provenance register above.)' },
    integ_mismatch:    { ko: '불일치 — 콘텐츠가 기록된 시점과 다릅니다. 직접 고쳤다면 정상이며, 그렇지 않다면 원본과 대조해 보십시오.', en: 'Mismatch — the content differs from what was recorded. That is expected if you edited it yourself; otherwise compare against the original.' },
    integ_unset:       { ko: '기준 해시가 아직 기록되지 않았습니다(개발 중인 사본). 아래 값을 <code>integrity.js</code>의 <code>BUILD_DIGEST</code>에 옮겨 적으면 대조가 시작됩니다.', en: 'No reference hash has been recorded yet (a working copy). Copy the value below into <code>BUILD_DIGEST</code> in <code>integrity.js</code> to start checking.' },
    integ_meta:        { ko: '제작 정보', en: 'Build information' },
    integ_counts_ok:   { ko: '제작 정보에 적힌 개수가 실제로 실린 단원·문항·출처 수와 일치합니다.', en: 'The counts in the build information match the lessons, questions and sources actually loaded.' },
    integ_counts_bad:  { ko: '제작 정보에 적힌 개수가 실제와 다릅니다.', en: 'The counts in the build information do not match what is loaded.' },
    integ_scope:       { ko: '검사 범위: 단원 본문, 문항과 해설, 출처·소급 대장·주의사항, 세트 목록, <strong>화면에 나오는 모든 UI 문구</strong>, 그리고 데이터 파일 밖에 있는 화학 수치까지 — <strong>치환기 증분표 16종, 기준값 δ 7.26, 다중선 세기표, 작용기 정의</strong> — 와 제작 정보. 포함되지 않는 것은 <strong>계산·렌더링 로직과 CSS·HTML</strong>뿐입니다. 코드를 고칠 수 있는 사람은 이 기준 해시도 고칠 수 있으므로, 이것은 잠금장치가 아니라 대조 장치입니다.', en: 'What is covered: lesson text, questions and explanations, sources, the provenance register, the caveats, the set list, <strong>every UI string on screen</strong>, and the chemical numbers that live outside the data files — <strong>the 16 substituent increments, the δ 7.26 reference, the multiplet intensity table and the functional-group definitions</strong> — plus the build information. What is not covered is <strong>the calculation and rendering logic, the CSS and the HTML</strong>. Anyone able to edit the code can edit this reference hash too, so this is a comparison, not a lock.' },

    /* sources */
    src_label:         { ko: '출처', en: 'Source' },
    lesson_refs:       { ko: '이 단원이 근거로 삼은 문헌', en: 'What this lesson is based on' },
    ref_title:         { ko: '참고문헌', en: 'Bibliography' },
    ref_intro: {
      ko: '이 프로그램의 모든 수치는 아래 아홉 문헌 중 하나로 소급됩니다. 각 항목에는 이 프로그램의 어느 부분에 쓰였는지를 함께 적었습니다. 단원 하단과 각 표·그림 아래, 그리고 모든 문항 해설 끝에도 해당 출처가 표시됩니다.',
      en: 'Every number in this program traces back to one of the nine works below, and each entry says which part of the program it backs. The same attributions appear at the foot of each lesson, under every table and figure, and at the end of every question explanation.'
    },
    ref_used:          { ko: '이 프로그램에서 쓰인 곳', en: 'What it is used for here' },
    prov_title:        { ko: '데이터 소급 대장', en: 'Where each number comes from' },
    prov_intro: {
      ko: '데이터 종류별로 어느 문헌에서 왔는지를 한눈에 정리한 표입니다.',
      en: 'A single table mapping each kind of datum to the work it came from.'
    },
    prov_what:         { ko: '데이터', en: 'Datum' },
    prov_where:        { ko: '사용처', en: 'Used in' },
    prov_ref:          { ko: '출처', en: 'Source' },
    caveat_title:      { ko: '수치를 읽을 때 주의할 점', en: 'Reading the numbers' },
    cite_title:        { ko: '이 자료를 인용할 때', en: 'Citing this material' },
    cite_body: {
      ko: '이 프로그램은 위 문헌들을 교육 목적으로 재구성한 2차 자료입니다. 보고서나 논문에는 이 프로그램이 아니라 <strong>원 문헌을 직접 인용</strong>하십시오. 특히 방향족 치환기 증분값을 인용할 때는 Pretsch 외(2009)를, 실측 스펙트럼을 인용할 때는 SDBS의 해당 화합물 레코드를 밝히는 것이 옳습니다.',
      en: 'This program is a teaching-oriented secondary compilation of the works above. In a report or a paper, <strong>cite the primary sources directly</strong> rather than this program. In particular, credit Pretsch et al. (2009) for the aromatic substituent increments, and the relevant SDBS record for any measured spectrum.'
    },

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
