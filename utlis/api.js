export const fetchNearbyWineStores = async (longitude, latitude) => {
  try {
    // 와인가게 정보를 얻기 위한 API 호출
    const response = await fetch(
      `${process.env.API_KEY}winebars/around?lnt=${longitude}&lat=${latitude}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching nearby wine stores:", error);
  }
};
