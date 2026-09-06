/* 적대적 리뷰에서 고친 항목이 코드에 그대로 남아 있는지 확인한다.
   각 항목은 "다시 깨지면 잡히는" 형태로 검사한다. */
const ROOT = require('path').join(__dirname, '..') + '/';
const fs = require('fs');
const R = ROOT;
const app = fs.readFileSync(R + 'assets/js/app.js', 'utf8');
const integ = fs.readFileSync(R + 'assets/js/integrity.js', 'utf8');
const css = fs.readFileSync(R + 'assets/css/styles.css', 'utf8');
const i18n = fs.readFileSync(R + 'assets/js/i18n.js', 'utf8');

let n = 0, bad = 0;
function must(label, cond) { n++; if (!cond) { bad++; console.log('   ✗', label); } }

/* --- 이론적 항목 --- */
must('49 증분표가 해시 대상에 등록된다', /register\('increments',\s*INC\)/.test(app));
must('49 다중선 세기표가 payload 에 들어간다', /Spectrum\.PATTERNS/.test(integ));
must('49 작용기 정의가 payload 에 들어간다', /Structure\.GROUPS/.test(integ));
must('49+ 기준값 7.26 이 등록된다', /register\('benzene',\s*BENZENE\)/.test(app));
must('49+ UI 문구가 payload 에 들어간다', /I18N\.UI/.test(integ));
must('50 "일치" 문구가 화학적 옳음과 구분된다', /화학적으로 옳다는 보증은 아닙니다/.test(i18n));
must('51 합치기 규칙이 화면에 적혀 있다', /io_merge_rule/.test(i18n) && /멱등|여러 번 불러와도/.test(i18n));
must('52 파일 저장 시각을 보여 준다', /io_saved_at/.test(i18n) && /r\.savedAt/.test(app));
must('53 잠금장치가 아님을 명시한다', /잠금장치가 아니라 대조 장치/.test(i18n));

/* --- 코드적 항목 --- */
must('54 문항 조회가 hasOwnProperty 를 쓴다',
     /hasOwnProperty\.call\(Q_BY_ID, k\)/.test(app));
must('54 __proto__ 를 명시적으로 배제한다', /k === '__proto__'/.test(app));
must('55 placeholder 를 속성 문자열로 넣지 않는다',
     !/placeholder="'\s*\+/.test(app) && /\$\('#ioIn'\)\.placeholder =/.test(app));
must('56 시도 횟수를 클램프한다', /a > 9999/.test(app) && /!isFinite\(a\)/.test(app));
must('56 배열 항목을 거부한다', /toString\.call\(e\) === '\[object Array\]'/.test(app));
must('56 빈 항목을 버린다', /a === 0 && !e\.correct/.test(app));
must('57 세트를 문항에서 가져온다', /set: q\.set/.test(app));
must('58 등록 대신 공개 객체에서 읽는다(순서 의존 없음)',
     !/Integrity\.register/.test(fs.readFileSync(R + 'assets/js/spectrum.js', 'utf8')) &&
     !/Integrity\.register/.test(fs.readFileSync(R + 'assets/js/structure.js', 'utf8')));
must('59 제작 정보 표가 min-width 를 풀었다', /\.buildtab\{[^}]*min-width:0/.test(css));
must('60 canonical 이 undefined 를 처리한다', /v === undefined \|\| typeof v === 'function'/.test(integ));
must('61 붙여 넣기 크기 상한이 있다', /text\.length > 2000000/.test(app));
must('62 등록이 캐시를 무효화한다', /function register\([\s\S]{0,200}cache = null/.test(integ));

/* --- 이번 회차에서 고친 것 --- */
must('R1 save() 가 성공 여부를 돌려준다', /function save\(\)[\s\S]{0,240}return storageOK;/.test(app));
must('R1 저장 불가를 화면에 알린다', /prog_storage_off/.test(i18n) && /prog_storage_off/.test(app));
must('R1 불러오기 결과에도 저장 실패를 표시한다', /persisted \? '' :/.test(app));

/* --- 회귀 방지: 이전 회차의 콘텐츠 수정 --- */
const les = fs.readFileSync(R + 'assets/js/data-lessons.js', 'utf8');
const qs = fs.readFileSync(R + 'assets/js/data-questions.js', 'utf8');
must('27 "언제나 ortho ≳ para" 단정이 없다', !/크기는 언제나 <strong>ortho/.test(les));
must('39 톨루엔 CH3 가 2.36 으로 통일됐다', !/톨루엔의 CH<sub>3<\/sub>는 δ 2\.32/.test(qs));
must('43 표 B-1 캡션이 "CDCl3 기준"이 아니다', !/표 B-1\..*CDCl<sub>3<\/sub> 기준 δ/.test(les));
must('40 1H 존재비가 99.99% 다', /'42\.58', '400\.2', '99\.99%'/.test(les));

/* --- 2차원 지도와 부록 C --- */
const s2d = fs.readFileSync(R + 'assets/js/spectrum2d.js', 'utf8');
must('2D 지도가 외부 라이브러리를 쓰지 않는다', !/import |require\(/.test(s2d));
must('2D 지도의 스타일이 파일 안에 <style> 로 들어가지 않는다', !/<style/.test(s2d));
must('동핵 지도는 대각선 대칭으로 그린다', /mirror: true/.test(s2d));
must('spec2d 블록이 렌더러에 연결돼 있다', /case 'spec2d'/.test(app));
must('문항 지문에서 2D 지도를 쓸 수 있다', /q\.spec2d/.test(app));

/* --- 8차 검토 --- */
const les2 = fs.readFileSync(R + 'assets/js/data-lessons.js', 'utf8');
must('73 사차 탄소가 "짝지음을 만들지 않는다"고 하지 않는다',
     !/사차 탄소와 카보닐은 짝지음을 만들지 않으므로/.test(les2));
must('74 1J(CH) 을 하나의 값으로 단정하지 않는다', /125–145 Hz/.test(les2));
must('75 벤질 아세테이트의 결합 수가 다섯으로 적혀 있다', /다섯 결합/.test(qs));
must('76 NOE 영교차를 분자량 구간으로 적는다', /1,000–2,000/.test(les2));
must('77 ROESY 주석 제목이 중간 크기 분자다', /중간 크기 분자에서는 ROESY/.test(les2));
must('78 숫자 입력 안내가 단위를 고정하지 않는다', !/ppm 단위/.test(i18n));
must('79 그림에 <desc> 가 들어간다',
     /<desc>/.test(fs.readFileSync(R + 'assets/js/spectrum.js', 'utf8')) && /<desc>/.test(s2d));
must('80 아세토페논 ortho 가 7.96 으로 통일됐다', !/7\.95/.test(qs));
must('81 부록 C 의 1-클로로프로페인이 3.47 이다', !/3\.53/.test(les2));

console.log('리뷰 항목 잔존 검사:', n, '건 | 깨진 항목:', bad);
process.exit(bad ? 1 : 0);
