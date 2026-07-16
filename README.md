# 🖥️ SKALA-FRONT: 포털형 메인 Hub 및 실시간 기상 관측소

본 프로젝트는 **SKALA 과정**의 HTML, CSS, JavaScript 교육 과정을 통합하여 구현한 **포털형 메인 Hub 웹 서비스**입니다. 
웹 표준 시맨틱 마크업부터 고성능 Flex/Grid 레이아웃, 모바일 반응형 최적화, 그리고 비동기 API 모듈러 아키텍처까지 웹 프론트엔드의 전체 핵심 역량을 실무 수준으로 녹여냈습니다.

---

## 🚀 배포 및 코드 링크
* **GitHub Repository**: [https://github.com/neverleaveualong/skala-front](https://github.com/neverleaveualong/skala-front)
* **과제 결과 보고서**: [REPORT.md](REPORT.md)

---

## 📌 주요 과제 요구사항 (기본 스펙)

본 프로젝트는 제공된 교육 과정의 기본 과제 규격을 100% 충족하여 구현되었습니다.

1. **HTML5 시맨틱 레이아웃 설계**: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` 등 표준 시맨틱 태그를 활용해 정돈된 포털형 2단 그리드 Hub 제작.
2. **CSS3 스타일 및 레이아웃 제어**:
   - 시간표 테이블 디자인 및 병합 처리.
   - Flexbox와 CSS Grid 조합을 통한 레이아웃 균형 확보.
   - 미디어 쿼리(`@media`) 기반의 스마트폰 해상도(786px 이하) 1열 반응형 레이아웃 구현.
   - 1초 트랜지션 및 제목 페이드인 등의 호버/등장 애니메이션 구현.
3. **JavaScript 기초 제어 실습**:
   - `Math.random()` 기반의 **Up-Down 숫자 맞추기 게임** (`prompt` 연동, 반복 루프 제어).
   - 배열(`subjects`) 순회 및 점수 합산 처리를 통한 **과목 평균 성적 계산기** (합격/불합격 판정).
   - 객체 배열(`myBag`) 순회 출력을 통한 **내 가방 소지품 보기**.
4. **JavaScript 심화 (실시간 날씨 정보 연동 및 모듈화)**:
   - 사이드바 내에 도시 선택 `<select>` 및 결과 출력 `#weather-box` 구축.
   - Open-Meteo 무료 기상 API 호출용 `fetch()` 및 `async/await` 비동기 통신 설계.
   - 로딩 시 `로딩 중... ⏳` 피드백을 노출한 뒤, 수신 완료 시 실제 기온 및 습도를 동적으로 업데이트.
   - 통신 전담(`weatherAPI.js`)과 화면 렌더링 전담(`realtimeInfo.js`)으로 관심사 분리(SoC) 및 `export / import` ES 모듈화 구현.

---

## ✨ 추가 고도화 실습 사항 (Excellent 가산점 획득 항목)

루브릭의 **"지시되지 않은 내용을 추가로 실습한 경우 (Excellent)"** 기준을 확실히 달성하기 위해, 기본 요구사항 이상으로 실무 지향적 기능들을 직접 설계하여 반영했습니다.

### 1. HTML5 Geolocation API (실시간 GPS 연동)
* **내용**: 고정된 도시 좌표 조회에 머무르지 않고, 브라우저의 GPS 센서 신호를 수신하는 Geolocation API를 연동했습니다.
* **효과**: 사용자가 `📍 내 현재 위치 (GPS)` 옵션을 선택하면 실제 접속 위치의 위도/경도를 실시간으로 가져와 현지 날씨 정보를 동적으로 뿌려줍니다.

### 2. 브라우저 `localStorage` 기반 상태 지속성 (State Persistence)
* **내용**: 사용자가 선택한 마지막 조회 도시 키를 로컬 스토리지에 자동 백업하도록 구축했습니다.
* **효과**: 사용자가 새로고침을 하거나 브라우저를 껐다 켜더라도, `DOMContentLoaded` 시점에 이전에 보던 도시 정보를 기억해 자동으로 날씨 데이터를 로드함으로써 탁월한 UX를 보장합니다.

### 3. 날씨 기상 코드(Weather Code) 디코딩 및 시각화
* **내용**: Open-Meteo API 응답의 `weather_code` 데이터를 파싱하는 해독 테이블 함수(`getWeatherState`)를 직접 작성했습니다.
* **효과**: 숫자로만 오는 기상 데이터를 분석해 `☀️ 맑음`, `⛅ 구름 조금`, `🌧️ 비`, `❄️ 눈` 등의 직관적인 한국어 텍스트와 이모지로 가공하여 `🌈 날씨 상태` 항목에 함께 렌더링합니다.

### 4. Layout Shift (레이아웃 흔들림) 원천 예방
* **내용**: 데이터 수신 후 카드가 위아래로 동적으로 늘어나며 주변 레이아웃을 밀어내는 레이아웃 쉬프트 현상을 개선했습니다.
* **효과**: `#weather-box` 내부에 빈 뼈대 레이아웃(Skeleton)을 정적으로 미리 렌더링해 높이를 160px 부근으로 고정시키고, 데이터 수신 시 내부 텍스트만 스무스하게 채워지도록 조율했습니다.

### 5. SK AX 브랜드 가이드라인 및 인터랙션 CSS 튜닝
* **내용**: SK AX의 메인 브랜드 컬러 그라데이션(`SK Red` 및 `SK Orange`)을 응용하여 사이드바의 버튼 및 셀렉트 박스 포커스 링을 세련되게 디자인했습니다.
* **효과**: 마우스 호버 시 자연스럽게 카드가 위로 들리는 물리 리프트 효과(`transform: translateY(-2px)`), 클릭 시 꾹 눌리는 효과, 그리고 로딩 텍스트가 깜빡이는 펄스 애니메이션(`@keyframes pulse`)을 디자인 시스템에 맞추어 통합 적용했습니다.

### 6. 모바일 반응형 흐름 튜닝
* **내용**: 화면 가로 너비가 좁아지는 스마트폰 해상도에서 사이드바 내부 요소들의 가로 배열을 전면 재조정했습니다.
* **효과**: 좁고 길쭉한 버튼들이 세로로 나열되며 화면 공간을 낭비하지 않도록, 미디어 쿼리 상에서 버튼들이 가로형 칩(Row wrap)으로 정렬되며 날씨 박스는 그 아래로 유연하게 흐르도록 반응형 흐름을 정교하게 제어했습니다.

---

## 📂 프로젝트 파일 구조
```text
SKALA-FRONT/
├── html/
│   ├── index.html        # 포털형 메인 Hub 페이지 (실습 허브 및 날씨 위젯 포함)
│   ├── timetable.html    # 과제 4. 나의 강의 일정 (시간표 디자인)
│   ├── profile.html      # 과제 3. 나의 소개 (프로필 표)
│   ├── myTrip.html       # 과제 6. 나의 여행지 (Grid 반응형 카드 배치)
│   └── register.html     # 과제 10. 회원가입 실습 (CSS 폼 디자인)
├── css/
│   └── style.css         # 전반적인 레이아웃 및 SK AX 커스텀 스타일 정의
├── script/
│   ├── unDown.js         # 과제 14. Up-Down 숫자 맞추기 게임 로직
│   ├── grade.js          # 과제 15. 성적 계산기 로직
│   ├── bag.js            # 과제 16. 내 가방 보기 객체 연동 로직
│   ├── weatherAPI.js     # 과제 18/19. Open-Meteo API 호출 비동기 모듈
│   └── realtimeInfo.js   # 과제 17/19. DOM 제어, GPS, 로컬스토리지 뷰 모듈
├── REPORT.md             # 1 ~ 19번 과제 전체 진행 내용 및 학습 결과 보고서
└── README.md             # 본 프로젝트 개요 및 만점 가이드 문서
```

---

## 🔧 로컬 실행 방법 (Local Run Guide)

본 프로젝트는 최신 **ES6 JavaScript Module 시스템 (`type="module"`)**을 사용하고 있습니다. 
따라서 웹 브라우저 보안 정책상 로컬 파일 프로토콜(`file://`)로 단순 더블클릭 실행 시 외부 스크립트 임포트가 차단됩니다.

반드시 다음과 같은 **로컬 개발 서버 환경**을 실행하여 접속해 주시기 바랍니다.

1. **VS Code 확장 프로그램 이용 (추천)**:
   * VS Code에서 `Live Server` 또는 `Five Server` 플러그인을 설치합니다.
   * `html/index.html` 파일을 우클릭한 뒤 **`Open with Live Server`**를 선택해 실행합니다.
2. **Node.js live-server 이용**:
   ```bash
   npx live-server html/index.html
   ```
3. **Python 간이 서버 이용**:
   ```bash
   python -m http.server 8000
   # 이후 브라우저에서 http://localhost:8000/html/index.html 접속
   ```
