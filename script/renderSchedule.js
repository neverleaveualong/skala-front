// renderSchedule.js - Excel 일정 데이터 기반 주차별 가변 시간표 렌더링 모듈
import { scheduleData } from './scheduleData.js';

document.addEventListener("DOMContentLoaded", () => {
  const classSelect = document.getElementById("class-select");
  const prevWeekBtn = document.getElementById("prev-week-btn");
  const nextWeekBtn = document.getElementById("next-week-btn");
  const weekLabel = document.getElementById("week-label");
  const scheduleTableBody = document.getElementById("schedule-table-body");
  const scheduleTableHeader = document.getElementById("schedule-table-header");

  if (!classSelect || !prevWeekBtn || !nextWeekBtn || !weekLabel || !scheduleTableBody || !scheduleTableHeader) return;

  // 1. 데이터 주차(Week) 기준으로 그룹화
  const weeks = {};
  scheduleData.forEach(item => {
    const w = parseFloat(item.week);
    if (isNaN(w)) return; // 주차 정보가 없는 행은 제외
    
    if (!weeks[w]) {
      weeks[w] = [];
    }
    weeks[w].push(item);
  });

  const weekKeys = Object.keys(weeks).map(Number).sort((a, b) => a - b);
  
  // 2. 초기 상태 로드 (로컬 스토리지 확인 또는 1주차 기본값)
  let currentWeek = parseFloat(localStorage.getItem("currentWeek")) || weekKeys[0];
  if (!weekKeys.includes(currentWeek)) {
    currentWeek = weekKeys[0];
  }

  let selectedBan = localStorage.getItem("selectedBan") || "1반";
  classSelect.value = selectedBan;

  // 3. 날씨/시간표 카드 클래스 매핑 함수
  function getCourseClass(subject) {
    if (!subject) return "course-default";
    const s = subject.toLowerCase();
    
    if (s.includes("python") || s.includes("파이썬")) return "course-python";
    if (s.includes("git") || s.includes("팀빌딩")) return "course-git";
    if (s.includes("html") || s.includes("css") || s.includes("javascript")) return "course-web";
    if (s.includes("통계") || s.includes("기초통계") || s.includes("데이터 분석 개요")) return "course-statistics";
    if (s.includes("prompt") || s.includes("프롬프트") || s.includes("context")) return "course-prompt";
    if (s.includes("스마트 데이터")) return "course-smart-data";
    if (s.includes("llm") || s.includes("transformer") || s.includes("트랜스포머")) return "course-transformer";
    if (s.includes("java") || s.includes("springboot") || s.includes("spring") || s.includes("api")) return "course-java";
    if (s.includes("agile") || s.includes("애자일") || s.includes("msa")) return "course-msa";
    if (s.includes("sllm") || s.includes("fine-tuning") || s.includes("튜닝")) return "course-sllm";
    if (s.includes("feature") || s.includes("피처") || s.includes("엔지니어링")) return "course-feature";
    if (s.includes("vue")) return "course-vue";
    
    return "course-default";
  }

  // 4. 셀 렌더링 헬퍼 함수
  function renderCell(dayItem) {
    if (!dayItem) {
      return `<td class="empty-cell">수업 없음 💤</td>`;
    }

    const subject = dayItem.subject ? dayItem.subject.trim() : "";
    const teacher = dayItem.teachers[selectedBan] ? dayItem.teachers[selectedBan].trim() : "";

    if (!subject) {
      return `<td class="empty-cell">수업 없음 💤</td>`;
    }

    // 공휴일/대체휴일 감지
    if (subject.includes("대체휴일") || subject.includes("휴강") || subject.includes("추석") || subject.includes("개천절") || subject.includes("한글날") || subject.includes("성탄절") || subject.includes("신정")) {
      return `<td class="holiday-cell">🇰🇷 <strong>${subject}</strong></td>`;
    }

    const cellClass = getCourseClass(subject);

    return `
      <td class="${cellClass}">
        <div class="subject-title">${subject}</div>
        ${teacher ? `<div class="teacher-name">👤 담당: ${teacher} 교수</div>` : `<div class="teacher-name">👤 실습 및 자율학습</div>`}
      </td>
    `;
  }

  // 5. 시간표 렌더링 핵심 로직
  function renderTimetable() {
    // 상태 동기화 저장
    localStorage.setItem("currentWeek", currentWeek);
    localStorage.setItem("selectedBan", selectedBan);

    const weekItems = weeks[currentWeek] || [];
    
    // 해당 주차의 범위 날짜 산출 (월요일 ~ 금요일)
    const activeDays = weekItems.filter(item => ['월', '화', '수', '목', '금'].includes(item.day));
    let dateRangeStr = "";
    if (activeDays.length > 0) {
      const start = activeDays[0].date;
      const end = activeDays[activeDays.length - 1].date;
      dateRangeStr = ` (${start} ~ ${end})`;
    }

    // 네비게이션 헤더 정보 세팅
    weekLabel.textContent = `제 ${currentWeek} 주차${dateRangeStr}`;
    prevWeekBtn.disabled = currentWeek === weekKeys[0];
    nextWeekBtn.disabled = currentWeek === weekKeys[weekKeys.length - 1];

    // 요일 컬럼 리스트 매핑
    const weekdays = ['월', '화', '수', '목', '금'];
    const daysData = weekdays.map(wd => weekItems.find(item => item.day === wd) || null);

    // 테이블 헤더 (날짜 포함) 그리기
    let headerHtml = `<th>교시 / 시간</th>`;
    daysData.forEach((dayItem, idx) => {
      const dayName = weekdays[idx];
      const dateShort = dayItem ? dayItem.date.substring(5).replace('-', '/') : ""; // MM/DD 포맷
      headerHtml += `<th>${dayName}요일${dateShort ? `<br><small>${dateShort}</small>` : ""}</th>`;
    });
    scheduleTableHeader.innerHTML = headerHtml;

    // 테이블 본문 그리기
    let bodyHtml = "";

    // 오전 세션 (09:00 ~ 12:00)
    bodyHtml += `<tr><td class="time-col"><strong>오전 수업</strong><br><small>09:00 ~ 12:00</small></td>`;
    daysData.forEach(dayItem => {
      bodyHtml += renderCell(dayItem);
    });
    bodyHtml += `</tr>`;

    // 점심시간 고정 세션 (12:00 ~ 13:00)
    bodyHtml += `<tr><td class="time-col"><strong>점심 시간</strong><br><small>12:00 ~ 13:00</small></td>`;
    bodyHtml += `<td colspan="5" class="lunch-cell">🍱 맛있는 점심식사 및 휴식 시간</td>`;
    bodyHtml += `</tr>`;

    // 오후 세션 (13:00 ~ 18:00)
    bodyHtml += `<tr><td class="time-col"><strong>오후 수업</strong><br><small>13:00 ~ 18:00</small></td>`;
    daysData.forEach(dayItem => {
      bodyHtml += renderCell(dayItem);
    });
    bodyHtml += `</tr>`;

    scheduleTableBody.innerHTML = bodyHtml;
  }

  // 6. 이벤트 등록
  classSelect.addEventListener("change", (e) => {
    selectedBan = e.target.value;
    renderTimetable();
  });

  prevWeekBtn.addEventListener("click", () => {
    const currentIndex = weekKeys.indexOf(currentWeek);
    if (currentIndex > 0) {
      currentWeek = weekKeys[currentIndex - 1];
      renderTimetable();
    }
  });

  nextWeekBtn.addEventListener("click", () => {
    const currentIndex = weekKeys.indexOf(currentWeek);
    if (currentIndex < weekKeys.length - 1) {
      currentWeek = weekKeys[currentIndex + 1];
      renderTimetable();
    }
  });

  // 최초 렌더링
  renderTimetable();
});
