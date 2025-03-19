"use client";

import { useEffect, useState } from "react";
import { fetchEconomicData } from "@/lib/api";

type SentimentProps = {
  country: string;
};

const MarketSentiment = ({ country }: SentimentProps) => {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!country) return;

    const loadSentimentData = async () => {
      try {
        const indicators = [
          "GDP Growth Rate",
          "Inflation Rate",
          "Unemployment Rate",
          "Consumer Confidence",
          "Business Confidence",
        ];

        const dataPromises = indicators.map((indicator) =>
          fetchEconomicData(indicator, country)
        );

        const results = await Promise.all(dataPromises);

        const structuredData = indicators.reduce((acc, indicator, index) => {
          acc[indicator] =
            results[index]?.[results[index].length - 1]?.value ?? null;
          return acc;
        }, {} as Record<string, number | null>);

        console.log(
          `📊 Processed Sentiment Data for ${country}:`,
          structuredData
        );

        const {
          "GDP Growth Rate": gdp,
          "Inflation Rate": inflation,
          "Unemployment Rate": unemployment,
          "Consumer Confidence": consumerConfidence,
          "Business Confidence": businessConfidence,
        } = structuredData;

        if (
          [
            gdp,
            inflation,
            unemployment,
            consumerConfidence,
            businessConfidence,
          ].includes(null)
        ) {
          setScore(null);
          return;
        }

        const sentimentScore =
          50 +
          (gdp ?? 0) * 5 - // Strong economy boosts score
          (inflation ?? 0) * 3 - // High inflation lowers score
          (unemployment ?? 0) * 2 + // Unemployment is negative
          (consumerConfidence ?? 0) * 1.5 + // Confidence factors in
          (businessConfidence ?? 0) * 1.5;

        // 🔹 **Clamp between 0-100**
        setScore(Math.max(0, Math.min(100, sentimentScore)));
      } catch (error) {
        console.error("❌ Error fetching sentiment data:", error);
        setScore(null);
      }
    };

    loadSentimentData();
  }, [country]);

  const getSentimentLabel = () => {
    if (score === null) return "No Data";
    if (score >= 80) return "Strong";
    if (score >= 50) return "Moderate";
    return "Weak";
  };

  const getSentimentColor = () => {
    if (score === null) return "bg-gray-400";
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 mt-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold">{country} Market Sentiment</h2>
      <div className="flex flex-col items-center justify-center mt-4">
        {score !== null ? (
          <>
            <div
              className={`text-white text-lg font-bold px-4 py-2 rounded-full ${getSentimentColor()}`}
            >
              {getSentimentLabel()}
            </div>
            <p className="text-2xl font-bold mt-2">{score.toFixed(1)} / 100</p>
          </>
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
};

export default MarketSentiment;
