// weatherAPI.js - 데이터 요청 및 수집을 담당하는 모듈

/**
 * Open-Meteo API를 호출하여 특정 위도/경도의 실시간 온도와 습도를 가져옵니다.
 * @param {number} lat 위도
 * @param {number} lon 경도
 * @returns {Promise<{temperature: number, humidity: number}>}
 */
export async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("날씨 정보를 불러오는 데 실패했습니다.");
    }
    const data = await response.json();
    return {
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
}
