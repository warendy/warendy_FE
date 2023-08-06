export const fetchNearbyWineStores = async (latitude, longitude) => {
  try {
    // 와인가게 정보를 얻기 위한 API 호출
    const response = await fetch(`${API_KEY}?lat=${latitude}&lnt=${longitude}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching nearby wine stores:", error);
    return [];
  }
};
