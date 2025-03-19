"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import EconomicChart from "./EconomicChart";
import MarketSentiment from "./MarketSentiment";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const WorldMap = () => {
  const [L, setL] = useState<any>(null);
  const [markerIcon, setMarkerIcon] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const leaflet = await import("leaflet");
      setL(leaflet);

      const icon = leaflet.icon({
        iconUrl: "/assets/marker.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      setMarkerIcon(icon);
    })();
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<string>("Sweden");

  if (!L || !markerIcon) return <p>Loading map...</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-[600px]">
        <MapContainer center={[20, 0]} zoom={2} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <Marker
            position={[60.1282, 18.6435]}
            icon={markerIcon}
            eventHandlers={{ click: () => setSelectedCountry("Sweden") }}
          >
            <Popup>Click to view Sweden's economic data</Popup>
          </Marker>
          <Marker
            position={[23.6345, -102.5528]}
            icon={markerIcon}
            eventHandlers={{ click: () => setSelectedCountry("Mexico") }}
          >
            <Popup>Click to view Mexico's economic data</Popup>
          </Marker>
          <Marker
            position={[-40.9006, 174.886]}
            icon={markerIcon}
            eventHandlers={{ click: () => setSelectedCountry("New Zealand") }}
          >
            <Popup>Click to view New Zealand's economic data</Popup>
          </Marker>
          <Marker
            position={[15.87, 100.9925]}
            icon={markerIcon}
            eventHandlers={{ click: () => setSelectedCountry("Thailand") }}
          >
            <Popup>Click to view Thailand's economic data</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="w-full max-w-5xl mt-8 px-6">
        <h2 className="text-3xl font-bold text-center">
          {selectedCountry} Economic Data
        </h2>
        <EconomicChart country={selectedCountry} />
        <MarketSentiment country={selectedCountry} />
      </div>
    </div>
  );
};

export default WorldMap;
