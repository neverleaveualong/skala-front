// realtimeInfo.js - 화면 렌더링 및 이벤트를 담당하는 모듈
import { fetchWeather } from './weatherAPI.js';

// 각 도시의 위도/경도 매핑 테이블 (글로벌 도시 대폭 확장)
const cityCoordinates = {
  seoul: { name: "서울 (대한민국)", lat: 37.5665, lon: 126.9780 },
  busan: { name: "부산 (대한민국)", lat: 35.1796, lon: 129.0756 },
  jeju: { name: "제주 (대한민국)", lat: 33.4996, lon: 126.5312 },
  tokyo: { name: "도쿄 (일본)", lat: 35.6762, lon: 139.6503 },
  london: { name: "런던 (영국)", lat: 51.5074, lon: -0.1278 },
  paris: { name: "파리 (프랑스)", lat: 48.8566, lon: 2.3522 },
  newyork: { name: "뉴욕 (미국)", lat: 40.7128, lon: -74.0060 },
  sydney: { name: "시드니 (호주)", lat: -33.8688, lon: 151.2093 },
  hamilton: { name: "해밀턴 (뉴질랜드)", lat: -37.7870, lon: 175.2793 },
  danang: { name: "다낭 (베트남)", lat: 16.0544, lon: 108.2022 },
  hongkong: { name: "홍콩 (중국)", lat: 22.3193, lon: 114.1694 }
};

// 기상 코드를 한국어 직관 설명 및 이모지로 매핑하는 해독기 함수
function getWeatherState(code) {
  if (code === 0) return "☀️ 맑음";
  if ([1, 2, 3].includes(code)) return "⛅ 구름 조금";
  if ([45, 48].includes(code)) return "🌫️ 안개";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌧️ 이슬비";
  if ([61, 63, 65, 66, 67].includes(code)) return "🌧️ 비";
  if ([71, 73, 75, 77].includes(code)) return "❄️ 눈";
  if ([80, 81, 82].includes(code)) return "🌦️ 소나기";
  if ([95, 96, 99].includes(code)) return "⛈️ 뇌우";
  return "🌈 날씨 분석 완료";
}

document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.getElementById("city-select");
  const loadingContainer = document.getElementById("weather-loading");
  const displayContainer = document.getElementById("weather-display");
  
  const cityNameEl = document.getElementById("weather-city-name");
  const coordinatesEl = document.getElementById("weather-coordinates");
  const tempEl = document.getElementById("weather-temp");
  const humidityEl = document.getElementById("weather-humidity");
  const stateEl = document.getElementById("weather-state");

  if (!citySelect || !loadingContainer || !displayContainer || 
      !cityNameEl || !coordinatesEl || !tempEl || !humidityEl || !stateEl) return;

  // 로딩 상태 제어 헬퍼 함수
  function showLoading(isLoading) {
    if (isLoading) {
      displayContainer.style.display = "none";
      loadingContainer.style.display = "flex";
    } else {
      loadingContainer.style.display = "none";
      displayContainer.style.display = "block";
    }
  }

  citySelect.addEventListener("change", async (event) => {
    const selectedKey = event.target.value;

    // 선택 기록 저장
    localStorage.setItem("selectedCity", selectedKey);

    // 1. 선택 초기화 (아무것도 선택 안 했을 때)
    if (!selectedKey) {
      showLoading(false);
      cityNameEl.textContent = "📍 도시 미선택";
      coordinatesEl.textContent = "위도 및 경도 좌표 대기 중";
      tempEl.textContent = "-";
      humidityEl.textContent = "-";
      stateEl.textContent = "-";
      return;
    }

    // 2. 내 현재 위치 (GPS) 선택 시
    if (selectedKey === "current") {
      showLoading(true);

      if (!navigator.geolocation) {
        showLoading(false);
        cityNameEl.textContent = "📍 내 현재 위치";
        coordinatesEl.textContent = "위치 서비스 미지원 브라우저";
        tempEl.textContent = "⚠️ 에러";
        humidityEl.textContent = "⚠️ 에러";
        stateEl.textContent = "⚠️ 에러";
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = Math.round(position.coords.latitude * 10000) / 10000;
        const lon = Math.round(position.coords.longitude * 10000) / 10000;

        try {
          const weatherData = await fetchWeather(lat, lon);
          cityNameEl.textContent = "📍 내 현재 위치";
          coordinatesEl.textContent = `위도: ${lat}° / 경도: ${lon}°`;
          tempEl.textContent = `${weatherData.temperature}°C`;
          humidityEl.textContent = `${weatherData.humidity}%`;
          stateEl.textContent = getWeatherState(weatherData.weatherCode);
        } catch (error) {
          cityNameEl.textContent = "📍 내 현재 위치";
          coordinatesEl.textContent = `위도: ${lat}° / 경도: ${lon}°`;
          tempEl.textContent = "⚠️ 에러";
          humidityEl.textContent = "⚠️ 에러";
          stateEl.textContent = "⚠️ 에러";
        }
        showLoading(false); // 로딩 종료 후 콘텐츠 렌더링
      }, (error) => {
        console.error("Geolocation error:", error);
        showLoading(false);
        cityNameEl.textContent = "📍 내 현재 위치";
        coordinatesEl.textContent = "위치 권한 차단됨";
        tempEl.textContent = "⚠️ 제한됨";
        humidityEl.textContent = "⚠️ 제한됨";
        stateEl.textContent = "⚠️ 제한됨";
      });
      return;
    }

    // 3. 고정 도시 선택 시
    if (cityCoordinates[selectedKey]) {
      const { name, lat, lon } = cityCoordinates[selectedKey];
      showLoading(true); // 로딩 시작

      try {
        const weatherData = await fetchWeather(lat, lon);
        cityNameEl.textContent = `📍 ${name}`;
        coordinatesEl.textContent = `위도: ${lat}° / 경도: ${lon}°`;
        tempEl.textContent = `${weatherData.temperature}°C`;
        humidityEl.textContent = `${weatherData.humidity}%`;
        stateEl.textContent = getWeatherState(weatherData.weatherCode);
      } catch (error) {
        cityNameEl.textContent = `📍 ${name}`;
        coordinatesEl.textContent = `위도: ${lat}° / 경도: ${lon}°`;
        tempEl.textContent = "⚠️ 에러";
        humidityEl.textContent = "⚠️ 에러";
        stateEl.textContent = "⚠️ 에러";
      }
      showLoading(false); // 로딩 종료 후 콘텐츠 렌더링
    }
  });

  // 복원 처리
  const savedCity = localStorage.getItem("selectedCity");
  if (savedCity) {
    citySelect.value = savedCity;
    citySelect.dispatchEvent(new Event("change"));
  }
});
