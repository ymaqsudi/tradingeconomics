import WorldMap from "@/components/WorldMap";
import EconomicChart from "@/components/EconomicChart";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Market Sentiment App</h1>
      <WorldMap />
    </main>
  );
}
