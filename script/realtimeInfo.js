// realtimeInfo.js - 화면 렌더링 및 이벤트를 담당하는 모듈
import { fetchWeather } from './weatherAPI.js';

// 각 도시의 위도/경도 매핑 테이블 (학습 페이지 내 여행기 목적지 및 주요 도시 연동)
const cityCoordinates = {
  seoul: { name: "서울 (대한민국)", lat: 37.5665, lon: 126.9780 },
  tokyo: { name: "도쿄 (일본)", lat: 35.6762, lon: 139.6503 },
  hamilton: { name: "해밀턴 (뉴질랜드)", lat: -37.7870, lon: 175.2793 },
  danang: { name: "다낭 (베트남)", lat: 16.0544, lon: 108.2022 },
  hongkong: { name: "홍콩 (중국)", lat: 22.3193, lon: 114.1694 }
};

document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.getElementById("city-select");
  const cityNameEl = document.getElementById("weather-city-name");
  const coordinatesEl = document.getElementById("weather-coordinates");
  const tempEl = document.getElementById("weather-temp");
  const humidityEl = document.getElementById("weather-humidity");

  if (!citySelect || !cityNameEl || !coordinatesEl || !tempEl || !humidityEl) return;

  citySelect.addEventListener("change", async (event) => {
    const selectedKey = event.target.value;

    // 1. 선택 초기화 (아무것도 선택 안 했을 때)
    if (!selectedKey) {
      cityNameEl.textContent = "📍 도시 미선택";
      coordinatesEl.textContent = "위도 및 경도 좌표 대기 중";
      tempEl.textContent = "-";
      humidityEl.textContent = "-";
      return;
    }

    // 2. 내 현재 위치 (GPS) 선택 시
    if (selectedKey === "current") {
      cityNameEl.textContent = "📍 내 현재 위치";
      coordinatesEl.textContent = "GPS 좌표 신호 수신 중...";
      tempEl.innerHTML = "<span class='loading'>로딩 중... ⏳</span>";
      humidityEl.innerHTML = "<span class='loading'>로딩 중... ⏳</span>";

      if (!navigator.geolocation) {
        coordinatesEl.textContent = "위치 서비스 미지원 브라우저";
        tempEl.textContent = "⚠️ 에러";
        humidityEl.textContent = "⚠️ 에러";
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = Math.round(position.coords.latitude * 10000) / 10000;
        const lon = Math.round(position.coords.longitude * 10000) / 10000;

        coordinatesEl.textContent = `위도: ${lat}° / 경도: ${lon}°`;

        try {
          const weatherData = await fetchWeather(lat, lon);
          tempEl.textContent = `${weatherData.temperature}°C`;
          humidityEl.textContent = `${weatherData.humidity}%`;
        } catch (error) {
          tempEl.textContent = "⚠️ 에러";
          humidityEl.textContent = "⚠️ 에러";
        }
      }, (error) => {
        console.error("Geolocation error:", error);
        coordinatesEl.textContent = "위치 권한 차단됨";
        tempEl.textContent = "⚠️ 제한됨";
        humidityEl.textContent = "⚠️ 제한됨";
      });
      return;
    }

    // 3. 고정 도시 선택 시
    if (cityCoordinates[selectedKey]) {
      const { name, lat, lon } = cityCoordinates[selectedKey];

      // 좌표 정보 표시 및 날씨 데이터 로딩 상태 전환
      cityNameEl.textContent = `📍 ${name}`;
      coordinatesEl.textContent = `위도: ${lat}° / 경도: ${lon}°`;
      tempEl.innerHTML = "<span class='loading'>로딩 중... ⏳</span>";
      humidityEl.innerHTML = "<span class='loading'>로딩 중... ⏳</span>";

      try {
        const weatherData = await fetchWeather(lat, lon);
        tempEl.textContent = `${weatherData.temperature}°C`;
        humidityEl.textContent = `${weatherData.humidity}%`;
      } catch (error) {
        tempEl.textContent = "⚠️ 에러";
        humidityEl.textContent = "⚠️ 에러";
      }
    }
  });
});
