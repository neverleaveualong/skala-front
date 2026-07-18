// advancedDashboard.js - 고도화 기능 3종 통합 제어 및 UI 렌더링 모듈
import { fetchRecentCommits } from './githubAPI.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. 초기 셋업 호출
  initThemeController();
  initCommitLogger();
  initKanbanBoard();
});

/* ==========================================
   1. 테마 컨트롤러 (Dark Mode & Color Swapper)
   ========================================== */
function initThemeController() {
  const darkToggleBtn = document.getElementById("dark-mode-toggle");
  const themeButtons = document.querySelectorAll(".theme-btn");

  if (!darkToggleBtn) return;

  // 1) 다크모드 상태 불러오기 및 설정
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  if (savedDarkMode) {
    document.documentElement.classList.add("dark-theme");
    updateDarkBtnText(true);
  }

  darkToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark-theme");
    localStorage.setItem("darkMode", isDark);
    updateDarkBtnText(isDark);
  });

  function updateDarkBtnText(isDark) {
    darkToggleBtn.textContent = isDark ? "☀️ 라이트 모드" : "🌙 다크 모드";
  }

  // 2) 컬러 테마 설정
  const savedTheme = localStorage.getItem("colorTheme") || "sk-red";
  applyColorTheme(savedTheme);

  themeButtons.forEach(btn => {
    // 저장된 테마 버튼 활성화 표시
    if (btn.dataset.theme === savedTheme) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", (e) => {
      themeButtons.forEach(b => b.classList.remove("active"));
      const selectedTheme = e.target.dataset.theme;
      e.target.classList.add("active");
      
      applyColorTheme(selectedTheme);
      localStorage.setItem("colorTheme", selectedTheme);
    });
  });

  function applyColorTheme(theme) {
    // 기존 테마 클래스 제거
    document.documentElement.classList.remove("theme-sk-red", "theme-mint", "theme-orange");
    // 신규 테마 클래스 주입
    document.documentElement.classList.add(`theme-${theme}`);
  }
}

/* ==========================================
   2. GitHub 실시간 커밋 로그 위젯
   ========================================= */
async function initCommitLogger() {
  const commitList = document.getElementById("commit-list");
  const refreshBtn = document.getElementById("refresh-commits-btn");

  if (!commitList) return;

  const loadCommits = async () => {
    commitList.innerHTML = `
      <div class="commit-loading">
        <span class="spinner-small"></span> 로딩 중... ⏳
      </div>
    `;

    try {
      // 깃허브 API 호출 (neverleaveualong/skala-front 저장소 타겟)
      const commits = await fetchRecentCommits('neverleaveualong', 'skala-front', 3);
      
      if (commits.length === 0) {
        commitList.innerHTML = `<p class="commit-empty">조회된 커밋이 없습니다.</p>`;
        return;
      }

      commitList.innerHTML = commits.map(c => `
        <div class="commit-card">
          <div class="commit-header">
            <span class="commit-author">👤 ${c.author}</span>
            <span class="commit-date">${c.date}</span>
          </div>
          <div class="commit-body">
            <a href="${c.url}" target="_blank" title="GitHub에서 커밋 확인" class="commit-msg">
              📝 ${c.message}
            </a>
          </div>
          <div class="commit-footer">
            <span class="commit-sha"># ${c.sha}</span>
          </div>
        </div>
      `).join("");
    } catch (error) {
      commitList.innerHTML = `
        <div class="commit-error">
          ⚠️ API 연결 제한 또는 실패<br>
          <small style="font-size: 11px; color: #ef4444;">(${error.message})</small>
        </div>
      `;
    }
  };

  if (refreshBtn) {
    refreshBtn.addEventListener("click", loadCommits);
  }

  // 최초 로드 실행
  loadCommits();
}

/* ==========================================
   3. 미니 칸반 보드 (Drag & Drop)
   ========================================== */
function initKanbanBoard() {
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("new-task-input");
  const columns = document.querySelectorAll(".kanban-list");

  if (!addTaskBtn || !taskInput) return;

  // 1) 로컬 스토리지에서 기존 할일 로드 및 렌더링
  let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [
    { id: "task-1", content: "HTML 포털 허브 만들기 🎨", status: "done" },
    { id: "task-2", content: "실시간 날씨 API 연동 테스트 ☀️", status: "done" },
    { id: "task-3", content: "TypeScript로 리팩토링 검토 ⚙️", status: "todo" }
  ];

  const renderTasks = () => {
    // 각 컬럼 비우기
    columns.forEach(col => col.innerHTML = "");

    tasks.forEach(task => {
      const targetCol = document.getElementById(`${task.status}-list`);
      if (targetCol) {
        const taskCard = createTaskElement(task.id, task.content);
        targetCol.appendChild(taskCard);
      }
    });
  };

  const createTaskElement = (id, content) => {
    const card = document.createElement("div");
    card.classList.add("kanban-card");
    card.setAttribute("draggable", "true");
    card.setAttribute("id", id);
    
    // 내용 영역 및 삭제 버튼 래퍼 구성
    card.innerHTML = `
      <span class="card-content">${content}</span>
      <button class="card-delete-btn" title="삭제">&times;</button>
    `;

    // 삭제 이벤트 처리
    card.querySelector(".card-delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
    });

    // 드래그 이벤트 바인딩
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", id);
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    return card;
  };

  const saveTasks = () => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  };

  // 2) 할 일 추가 액션
  const handleAddTask = () => {
    const text = taskInput.value.trim();
    if (!text) return;

    const newId = `task-${Date.now()}`;
    tasks.push({ id: newId, content: text, status: "todo" });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  };

  addTaskBtn.addEventListener("click", handleAddTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAddTask();
  });

  // 3) 드래그앤드롭 이벤트 리스너
  columns.forEach(col => {
    col.addEventListener("dragover", (e) => {
      e.preventDefault(); // 드롭 허용 처리
      col.classList.add("drag-over");
    });

    col.addEventListener("dragleave", () => {
      col.classList.remove("drag-over");
    });

    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("drag-over");
      
      const id = e.dataTransfer.getData("text/plain");
      const draggedCard = document.getElementById(id);
      
      if (draggedCard) {
        col.appendChild(draggedCard);
        
        // 데이터 상태 갱신
        const newStatus = col.id.replace("-list", "");
        tasks = tasks.map(t => {
          if (t.id === id) {
            return { ...t, status: newStatus };
          }
          return t;
        });
        saveTasks();
      }
    });
  });

  // 최초 렌더링
  renderTasks();
}
