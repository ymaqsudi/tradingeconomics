"use client";

import { useEffect, useState } from "react";
import { fetchEconomicData } from "@/lib/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const INDICATORS = [
  "GDP",
  "Inflation Rate",
  "Unemployment Rate",
  "Consumer Confidence",
  "Business Confidence",
];

const INDICATOR_TITLES: Record<string, string> = {
  GDP: "GDP Growth Rate",
  "Inflation Rate": "Inflation Rate",
  "Unemployment Rate": "Unemployment Rate",
  "Consumer Confidence": "Consumer Confidence",
  "Business Confidence": "Business Confidence",
};

type DataEntry = { date: string; value: number };

type EconomicChartProps = { country: string };

const EconomicChart = ({ country }: EconomicChartProps) => {
  const [selectedIndicator, setSelectedIndicator] = useState<string>("gdp");
  const [economicData, setEconomicData] = useState<DataEntry[]>([]);

  useEffect(() => {
    if (!country || !selectedIndicator) return;

    const loadData = async () => {
      console.log(
        `Fetching ${selectedIndicator.toUpperCase()} data for ${country}...`
      );
      const data: DataEntry[] = await fetchEconomicData(
        selectedIndicator,
        country
      );

      console.log(`API Response Data for ${selectedIndicator}:`, data);

      if (!Array.isArray(data) || data.length === 0) {
        console.warn(`️No ${selectedIndicator} data found for ${country}`);
        setEconomicData([]);
        return;
      }

      const cleanedData = data.length > 1 ? data.slice(0, -1) : data;
      setEconomicData([...cleanedData.slice(-10)]);
    };

    loadData();
  }, [country, selectedIndicator]);

  const chartData = {
    labels: economicData.map((entry) => entry.date),
    datasets: [
      {
        label: `${country} ${INDICATOR_TITLES[selectedIndicator]}`,
        data: economicData.map((entry) => entry.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-center">
        {country} {INDICATOR_TITLES[selectedIndicator]}
      </h2>

      {/* Tabs for selecting indicator */}
      <div className="flex justify-center gap-4 my-4">
        {INDICATORS.map((indicator) => (
          <button
            key={indicator}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              selectedIndicator === indicator
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedIndicator(indicator)}
          >
            {INDICATOR_TITLES[indicator]}
          </button>
        ))}
      </div>

      {/* Chart or Empty State */}
      {economicData.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p className="text-center text-gray-500">
          No data available for {country}.
        </p>
      )}
    </div>
  );
};

export default EconomicChart;
