export const fetchEconomicData = async (indicator: string, country: string) => {
  if (!country) {
    console.error("Error: Country parameter is missing!");
    return [];
  }

  try {
    const apiUrl = `/api/economic-data?indicator=${indicator}&country=${encodeURIComponent(
      country
    )}`;
    console.log("Fetching from Next.js API:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const rawData = await response.json();

    console.log("Raw API Response:", rawData);

    if (!Array.isArray(rawData)) {
      console.error("Unexpected API Response Format:", rawData);
      return [];
    }

    const formattedData = rawData
      .filter((entry: any) => entry.Value !== null)
      .map((entry: any) => ({
        date: entry.DateTime ? entry.DateTime.split("T")[0] : "Unknown Date",
        value: entry.Value ?? 0,
      }));

    console.log("📊 Processed Data for Chart.js:", formattedData);

    return formattedData;
  } catch (error) {
    console.error(`Error fetching ${indicator} for ${country}:`, error);
    return [];
  }
};
