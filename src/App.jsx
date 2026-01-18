import React, { useState } from "react";
import { fetchStockData, fetchCryptoData } from "./api";
import Controls from "./components/Controls";
import ChartView from "./components/ChartView";
import TableView from "./components/TableView";

export default function App() {
  const [data, setData] = useState([]);
  const [view, setView] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avg, setAvg] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [now, setNow] = useState(0);

  const handleGenerate = async (ticker, startDate, targetView) => {
    setLoading(true);
    setView(null);

    try {
      let result = [];

      if (ticker.type === "crypto") {
        result = await fetchCryptoData(ticker.value, startDate);
      } else if (ticker.type === "stock") {
        result = await fetchStockData(ticker.value, startDate);
      }

      if (!Array.isArray(result) || result.length === 0) {
        throw new Error("No data returned from API");
      }

      setData(result);
      setView(targetView);

      const values = result.map((item) => item.value);

      setAvg((values.reduce((a, b) => a + b, 0) / values.length).toFixed(3));
      setMin(Math.min(...values).toFixed(3));
      setMax(Math.max(...values).toFixed(3));
      setNow(values[values.length - 1].toFixed(3));
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Stock / Gold Viewer
        </h1>

        <Controls onGenerate={handleGenerate} loading={loading} />

        {data.length > 0 && (
          <div className="my-3 p-3 bg-gray-40 rounded">
            <h2 className="text-lg font-medium mb-2">
              Price Statistics (XAU):
            </h2>
            <p>
              Min: {min} - Avg: {avg} - Max: {max} - Now: {now}
            </p>
          </div>
        )}
        {view === "chart" && <ChartView data={data} />}
        {view === "table" && <TableView data={data} />}
      </div>
    </div>
  );
}
