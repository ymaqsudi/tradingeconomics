import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_TE_API_KEY;
const BASE_URL = "https://api.tradingeconomics.com/historical/indicator";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const indicator = searchParams.get("indicator");
    const country = searchParams.get("country");

    console.log("Received request for:", { indicator, country });

    if (!indicator || !country) {
      console.error("Missing parameters in API request!");
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const url = `${BASE_URL}/${indicator}/country/${country}?c=${API_KEY}`;
    console.log("Fetching Trading Economics API:", url);

    const response = await fetch(url);

    if (response.status === 409) {
      console.warn(
        `API Conflict: Too many requests for ${country}. Retrying...`
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return GET(req); // Retry the request
    }

    if (!response.ok) {
      console.error(
        `Error from Trading Economics API: ${response.status} - ${response.statusText}`
      );
      return NextResponse.json(
        { error: `Failed to fetch data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
