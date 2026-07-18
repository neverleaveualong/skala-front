// themeLoader.js - 화면 깜빡임 방지용 초경량 테마 사전 로더 (HTML 최상단 head에서 즉시 실행)
(function() {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const savedTheme = localStorage.getItem("colorTheme") || "sk-red";
  
  // body가 생성되기 전 html(documentElement)에 즉시 클래스를 주어 스타일 깜빡임(Flicker)을 예방
  if (savedDarkMode) {
    document.documentElement.classList.add("dark-theme");
  }
  document.documentElement.classList.add(`theme-${savedTheme}`);
})();
