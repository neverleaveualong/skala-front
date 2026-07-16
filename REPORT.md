# 📑 SKALA-FRONT 실습 과제 수행 결과 보고서

본 보고서는 **SKALA-FRONT** 프로젝트의 13가지 실습 과제 및 CSS 미션들에 대한 구현 결과와 학습 내용을 정리한 문서입니다.  
각 단계별 HTML 기초 태그 연습부터 Flex와 Grid 레이아웃, 모바일 반응형 페이지 제작 및 애니메이션 추가까지 하나씩 실습해보며 작성했습니다.

---

## 📂 프로젝트 기본 구성
*   **프로젝트명:** SKALA-FRONT
*   **사용 기술:** HTML5, CSS3
*   **폴더 및 파일 위치:**
    *   `/html/`: 실습 HTML 파일 및 로고 이미지 (`sk_logo.png`)
    *   `/css/`: 공통 스타일시트 파일 (`style.css`)
    *   `/media/`: 여행지 소개 페이지용 파일 (BGM 음원, 사진, 비디오)
    *   `.gitignore`: 실습 진행 중 백업 등으로 생성되는 마크다운(`*.md`) 파일들이 git 관리 대상에 올라가지 않도록 미리 무시 파일 지정

---

## 🔍 과제별 구현 상세 및 매핑 정보

### 📌 과제 1. Project 구성과 index.html 생성
*   **구현 파일:** [`html/index.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/index.html)
*   **학습 내용:** 프로젝트 기본 뼈대를 세우고 타이틀과 본문을 작성했습니다.
*   **주요 코드:**
    ```html
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome SKALA</title>
      <link rel="stylesheet" href="../css/style.css">
    </head>
    ...
    <header>
      <h1>환영 인사</h1>
    </header>
    <main>
      <h2>👋 환영합니다!</h2>
      <p>스칼라에 오신 것을 환영합니다.</p>
    </main>
    ```

---

### 📌 과제 2. 나의 휴일 일과
*   **구현 파일:** [`html/myHoliday.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/myHoliday.html)
*   **학습 내용:** 휴일 일과를 적으면서 필수 태그인 `<h1>`, `<h2>`, `<br>`, `<p>`, `<mark>`의 쓰임새를 연습했습니다.
*   **주요 코드:**
    ```html
    <section id="morning">
      <h2>오전 일과</h2>
      <p>
        <strong>10:00 - 11:00</strong> | <mark>늦잠</mark> 자기 <br>
        주중에 쌓인 피로를 풀며 달콤한 늦잠을 만킵합니다.
      </p>
    </section>
    ```

---

### 📌 과제 3. 나의 소개
*   **구현 파일:** [`html/myProfile.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/myProfile.html)
*   **학습 내용:** 음식 소개(ul 중첩), 올해 계획(ol 순서), 단어 정의(dl/dt/dd) 리스트를 활용해 프로필을 꾸몄습니다. 처음에는 CSS 없이 기본 태그 구조만 실습했습니다.
*   **주요 코드:**
    ```html
    <!-- <ul> 좋아하는 음식 중첩 리스트 -->
    <ul>
      <li>피자
        <ul>
          <li>페퍼로니 피자</li>
        </ul>
      </li>
    </ul>
    <!-- <ol> 올해 계획 -->
    <ol type="A">
      <li>취업 준비</li>
      <li>운동 열심히 하기</li>
    </ol>
    <!-- <dl> 나를 나타내는 단어 설명 -->
    <dl>
      <dt>성실함</dt>
      <dd>매일 꾸준하게 노력하고 약속을 지키는 자세입니다.</dd>
    </dl>
    ```

---

### 📌 과제 4. 나의 강의 일정
*   **구현 파일:** [`html/myClass.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/myClass.html)
*   **학습 내용:** 테이블 구조(`table`, `thead`, `tbody`)를 실습하고, 2시간 연속 수업이나 점심시간을 표현하기 위해 가로/세로 셀 병합(`colspan`, `rowspan`)을 사용했습니다.
*   **주요 코드:**
    ```html
    <table border="1" width="100%" cellpadding="10" cellspacing="0">
      <thead>
        <tr>
          <th>시간</th>
          <th>월요일</th>
          <th>화요일</th>
          ...
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>09:00 ~ 10:00</td>
          <td class="course-statistics">데이터 분석 개요 및 기초통계</td>
          <td rowspan="3" class="course-python">데이터 분석을 위한 Python 이해</td>
          ...
        </tr>
        <tr>
          <td>12:00 ~ 13:00</td>
          <td colspan="5" align="center">점심시간 🍱</td>
        </tr>
      </tbody>
    </table>
    ```

---

### 📌 과제 5. 바로가기
*   **구현 파일:** [`html/index.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/index.html)
*   **학습 내용:** 메인 페이지에서 다른 과제 파일들로 바로 이동할 수 있도록 `<a>` 태그 경로를 연결했습니다.
*   **주요 코드:**
    ```html
    <nav>
      <h2>메뉴 바로가기</h2>
      <ul>
        <li><a href="myClass.html">나의 수업 (시간표)</a></li>
        <li><a href="myHoliday.html">나의 휴일 일과</a></li>
        <li><a href="myProfile.html">나의 소개 (프로필)</a></li>
      </ul>
    </nav>
    ```

---

### 📌 과제 6. 나의 여행지
*   **구현 파일:** [`html/myTrip.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/myTrip.html)
*   **학습 내용:** 이미지(`img`)와 오디오(`audio`), 비디오(`video`) 태그를 배치하여 멀티미디어 페이지를 구성했습니다. 파일명은 camelCase 규칙에 맞췄습니다.
*   **주요 코드:**
    ```html
    <!-- 여행 배경음악 플레이어 -->
    <audio controls>
      <source src="../media/travel_bgm.mp3" type="audio/mpeg">
    </audio>
    ...
    <!-- 뉴질랜드 여행 사진 -->
    <img src="../media/travelHamilton.jpg" alt="뉴질랜드 해밀턴 가든 전경" title="아름다운 해밀턴 가든" width="400">
    ...
    <!-- 홍콩 전망대 비디오 -->
    <video width="400" controls>
      <source src="../media/travelVictoriaPeak.webm" type="video/webm">
    </video>
    ```

---

### 📌 과제 7. 포털 사이트형 메인 Hub 만들기
*   **구현 파일:** [`html/index.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/index.html)
*   **학습 내용:** 마크업을 단순 나열하기보다 시맨틱 요소인 `<nav>`, `<main>`, `<aside>`를 활용하여 사이트 구조를 분할했습니다.
*   **주요 코드:**
    ```html
    <body>
      <div class="container">
        <div class="brand-logo">...</div>
        <nav>...</nav>
        
        <div class="content-layout">
          <main>...</main>
          <aside>...</aside>
        </div>
        <footer>...</footer>
      </div>
    </body>
    ```

---

### 📌 과제 8. 미션1 - 전체 테마 및 텍스트 Styling
*   **구현 파일:** [`css/style.css`](file:///Users/paul/skala-work/SKALA-FRONT/css/style.css)
*   **학습 내용:** 스타일시트 파일을 새로 만들어 연동하고, 구글 웹폰트(Inter + Noto Sans KR)를 가져와 글꼴과 텍스트 스타일을 적용했습니다. h1, h2 제목에 포인트를 주기 위해 그라데이션 및 테두리 효과를 공부했습니다.
*   **주요 코드:**
    ```css
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
    
    body {
      font-family: 'Inter', 'Noto Sans KR', sans-serif;
      background-color: #f8fafc;
      color: #334155;
      line-height: 1.75;
    }
    
    h1 {
      font-size: 2.25rem;
      background: linear-gradient(90deg, #E60024, #F9A100);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    ```

---

### 📌 과제 9. 미션2 - 박스 모델의 이해
*   **구현 파일:** [`css/style.css`](file:///Users/paul/skala-work/SKALA-FRONT/css/style.css), [`html/myTrip.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/myTrip.html), [`html/myClass.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/myClass.html)
*   **학습 내용:** 마진, 패딩, 보더, 폭 조정을 통해 요소를 정렬했습니다. 본문을 가운데로 모으기 위해 `.container` 클래스 선택자를 만들어 최대 가로폭과 마진 설정을 적용했으며, `myTrip.html`의 각 단락을 카드 형태로 만들었습니다. 시간표는 깔끔하게 선이 맞물리도록 `border-collapse`를 적용했습니다.
*   **주요 코드:**
    ```css
    .container {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      padding: 60px 80px;
      display: flex;
      flex-direction: column;
    }
    
    table {
      border-collapse: collapse !important;
      border: 1px solid #94a3b8 !important;
    }
    
    .trip-card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 24px;
    }
    ```

---

### 📌 과제 10. 미션3 - 가독성 높은 회원가입 폼
*   **구현 파일:** [`css/style.css`](file:///Users/paul/skala-work/SKALA-FRONT/css/style.css), [`html/signUp.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/signUp.html)
*   **학습 내용:** 회원가입 양식이 지저분해 보이지 않도록 `fieldset` 테두리를 다듬고, `input` 박스의 패딩을 키워 사용하기 편하게 만들었습니다. 가입하기 버튼은 그라데이션 컬러를 씌워 꾸몄습니다.
*   **주요 코드:**
    ```css
    input[type="text"], input[type="password"], select, textarea {
      padding: 14px 18px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
    }
    
    fieldset {
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 32px;
    }
    ```

---

### 📌 과제 11. 미션4 - Flex와 Grid로 레이아웃 잡기
*   **구현 파일:** [`html/index.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/index.html), [`html/myTrip.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/myTrip.html)
*   **학습 내용:** flexbox를 사용하여 바로가기 메뉴들을 가로로 나란히 배치하고, 본문(`main`)과 사이드바(`aside`)도 2단 구조로 가로 배치했습니다. 여행지 카드는 Grid를 사용해 3열 구조로 깔끔하게 떨어지게 만들었습니다.
*   **주요 코드:**
    ```css
    /* flex 가로 배치 */
    .content-layout {
      display: flex;
      gap: 32px;
    }
    
    /* 3열 Grid 배치 */
    .trip-grid-container {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 24px !important;
    }
    ```

---

### 📌 과제 12. 미션5 - 스마트폰에서 보기 (반응형 웹 디자인)
*   **구현 파일:** [`css/style.css`](file:///Users/paul/skala-work/SKALA-FRONT/css/style.css) 및 모든 HTML에 viewport meta 태그 삽입
*   **학습 내용:** 반응형 페이지 동작을 위해 뷰포트 메타 태그를 HTML에 모두 추가했습니다. 미디어 쿼리를 사용해 화면 가로폭이 `786px` 이하로 줄어들면 2단 레이아웃과 3열 그리드가 모두 세로 1줄 형태로 가지런히 바뀌도록 설계했습니다.
*   **주요 코드:**
    ```css
    @media (max-width: 786px) {
      /* 본문과 사이드바를 세로 1열로 적층 */
      .content-layout {
        flex-direction: column;
      }
      
      /* 메뉴 칩들을 세로로 쌓이게 정렬 */
      nav ul {
        flex-direction: column;
      }
    
      /* 여행지 그리드 3열을 1열로 축소 */
      .trip-grid-container {
        grid-template-columns: 1fr !important;
      }
    }
    ```

---

### 📌 과제 13. [실습] 미션6 - 생동감을 불어넣는 애니메이션
*   **구현 파일:** [`css/style.css`](file:///Users/paul/skala-work/SKALA-FRONT/css/style.css)
*   **학습 내용:** 
    *   마우스 호버 시 배경색이나 글자색이 천천히 변하는 페이드 효과를 주기 위해 모든 버튼과 네비게이션 요소의 `transition`을 `1초`로 넉넉히 주어 실습 확인이 잘 되게 설정했습니다. 
    *   회원가입 그라데이션 버튼은 일반 색상 호버 시 뚝뚝 끊기는 한계가 있어, `filter: brightness` 값을 1.15로 스무스하게 올리도록 조절해 끊김 현상을 예방했습니다.
    *   여행 카드는 호버 시 공중으로 `translateY(-4px)` 만큼 뜨며 그림자가 더 짙어지는 효과를 입혔습니다.
    *   `index.html`을 열 때 타이틀이 서서히 페이드인되며 아래로 내려앉는 등장 효과(`@keyframes headerFadeIn`)를 2.5초 길이로 연장해 구현했습니다.
*   **주요 코드:**
    ```css
    /* 1) 링크 및 버튼 1초 트랜지션 지정 */
    a, button, input[type="submit"], input[type="reset"] {
      transition: background-color 1s ease-in-out, color 1s ease-in-out, border-color 1s ease-in-out, box-shadow 1s ease-in-out, transform 1s ease-in-out;
    }
    
    /* 1) 그라데이션 버튼 필터 호버 효과 */
    input[type="submit"] {
      filter: brightness(1);
      transition: filter 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    input[type="submit"]:hover {
      filter: brightness(1.15);
      transform: translateY(-1px);
    }
    
    /* 2) 여행 카드 호버 리프트업 */
    .trip-grid-container section {
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .trip-grid-container section:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
    }
    
    /* 3) 제목 로딩 시 2.5초 페이드인 효과 */
    @keyframes headerFadeIn {
      from {
        opacity: 0;
        transform: translateY(-12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    h1 {
      animation: headerFadeIn 2.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    ```

---

### 📌 과제 14. Up-Down 숫자 맞추기 게임
*   **구현 파일:** 
    *   [`html/index.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/index.html)
    *   [`script/unDown.js`](file:///Users/paul/skala-work/SKALA-FRONT/script/unDown.js)
*   **학습 내용:**
    *   `Math.random()`과 `Math.floor()` 함수를 조합하여 1부터 50 사이의 임의의 비밀 숫자를 생성하도록 했습니다.
    *   `prompt()` 대화 상자를 통해 사용자 입력을 반복적으로 받고, `while(true)` 무한 루프 내에서 조건문을 통해 Up/Down 힌트를 알림창(`alert`)으로 제공했습니다.
    *   사용자가 숫자가 아닌 값을 입력하거나 취소를 눌렀을 때의 예외 처리를 반영하고, 정답을 맞힌 순간 시도 횟수를 출력하며 `break`로 반복문을 강제 탈출하도록 구현했습니다.

---

### 📌 과제 15. 성적 계산기
*   **구현 파일:** 
    *   [`script/grade.js`](file:///Users/paul/skala-work/SKALA-FRONT/script/grade.js)
*   **학습 내용:**
    *   `["HTML", "CSS", "JavaScript"]` 과목명이 담긴 배열을 미리 선언하고, `for` 반복문으로 배열의 길이에 맞춰 순회하도록 제어했습니다.
    *   각 과목의 점수를 연속으로 입력받아 총합(`total`)에 합산하였으며, 예외적인 평점(100 초과, 0 미만, 문자값 등) 입력 시 인덱스 `i`를 1 감소시켜 재입력을 유도하는 예외 복구를 구현했습니다.
    *   평균 점수를 연산하여 60점 이상이면 '합격', 미만이면 '불합격' 판정 결과를 알림창(`alert`)으로 시각화했습니다.

---

### 📌 과제 16. 내 가방 보기 (JavaScript Object)
*   **구현 파일:** 
    *   [`script/bag.js`](file:///Users/paul/skala-work/SKALA-FRONT/script/bag.js)
*   **학습 내용:**
    *   가방 속 소지품(물품명 `name`, 수량 `count`)을 키-값 쌍을 지닌 JavaScript 객체(Object)들의 배열(`myBag`)로 구조화하여 설계했습니다.
    *   `for` 반복문을 통해 각 인덱스의 소지품 객체 속성을 순회하여 화면 알림창(`alert`)과 브라우저 개발자 도구 콘솔(`console.log`)에 순차적으로 포맷에 맞추어 출력했습니다.

---

### 📌 과제 17. 실시간 날씨 - DOM/이벤트
*   **구현 파일:** 
    *   [`html/index.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/index.html)
    *   [`script/realtimeInfo.js`](file:///Users/paul/skala-work/SKALA-FRONT/script/realtimeInfo.js)
*   **학습 내용:**
    *   사이드바 영역에 도시를 선택할 수 있는 `<select id="city-select">` 태그와 정보를 출력할 `#weather-box` 레이아웃을 설계했습니다.
    *   사용자가 도시를 변경할 때 발생하는 `change` 이벤트를 리스닝하여, 선택된 도시의 좌표(위도/경도) 정보를 브라우저 DOM 객체(`textContent`)를 조작해 화면에 실시간으로 반영하는 실습을 진행했습니다.
    *   추가로 HTML5 Geolocation API를 연동해 실제 브라우저의 GPS 센서 신호를 잡아내 현재 위치의 위도/경도 좌표를 가져오도록 고도화했습니다.
    *   **localStorage 활용 (가산점 실습)**: 브라우저의 `localStorage` API를 연동하여 사용자가 마지막으로 선택한 도시 설정을 자동 백업하도록 했습니다. 페이지 로드 시(`DOMContentLoaded`) 백업 데이터를 복원해 해당 도시의 날씨를 즉시 자동 호출하는 상태 지속성(State Persistence)을 구현했습니다.

---

### 📌 과제 18. 실시간 날씨 - 비동기 호출
*   **구현 파일:** 
    *   [`script/weatherAPI.js`](file:///Users/paul/skala-work/SKALA-FRONT/script/weatherAPI.js)
    *   [`script/realtimeInfo.js`](file:///Users/paul/skala-work/SKALA-FRONT/script/realtimeInfo.js)
*   **학습 내용:**
    *   Open-Meteo 날씨 서버의 무료 기상 예보 API 규격에 맞춰 `fetch()` 통신 유틸리티를 작성하고, `async/await` 문법으로 네트워크 비동기 제어를 설계했습니다.
    *   네트워크 대기 시간 동안 사용자 경험(UX)을 보장하기 위해 화면에 `로딩 중... ⏳` 메시지를 띄우고 서서히 깜빡이는 애니메이션(`pulse`) 효과를 적용했습니다.
    *   **날씨 상태 코드 분석 (가산점 실습)**: API 응답 본문에 포함된 `weather_code` 데이터를 파싱하고 해독하는 기상 코드 테이블 함수를 구현하여, 단순 기온/습도 수치뿐 아니라 '☀️ 맑음', '⛅ 구름 조금', '🌧️ 비' 등의 한글 텍스트 및 이모지 상태를 다이나믹하게 표시했습니다.

---

### 📌 과제 19. 실시간 날씨 - 모듈분리
*   **구현 파일:** 
    *   [`html/index.html`](file:///Users/paul/skala-work/SKALA-FRONT/html/index.html)
    *   [`script/weatherAPI.js`](file:///Users/paul/skala-work/SKALA-FRONT/script/weatherAPI.js)
    *   [`script/realtimeInfo.js`](file:///Users/paul/skala-work/SKALA-FRONT/script/realtimeInfo.js)
*   **학습 내용:**
    *   데이터 요청을 전담하는 데이터 레이어 모듈(`weatherAPI.js`)과 화면 제어를 전담하는 뷰 레이어 모듈(`realtimeInfo.js`)로 관심사 분리(SoC)를 실습했습니다.
    *   `weatherAPI.js`에서 날씨 호출 함수를 `export`하고, `realtimeInfo.js`에서 이를 `import`하여 연동하는 ES6 모듈 시스템을 도입했습니다.
    *   `index.html`에서 `<script type="module">`로 진입점 스크립트를 연결하여 브라우저 모듈 스코프 상에서 유기적으로 파일들이 연동되도록 구성했습니다.

---

## 🏁 최종 자가 진단
이번 과제 및 미션을 직접 작성하며 HTML의 기본 시맨틱 태그 중요성과 CSS 박스모델, 반응형 및 미세한 트랜지션 디테일을 전반적으로 실습할 수 있었습니다. 특히 뷰포트 메타태그 누락 버그, 테이블 병합 열 뒤틀림 현상 등 실습 중에 겪은 크고 작은 문제들을 해결해가며 웹 개발의 기본기를 다질 수 있는 기회가 되었습니다.
