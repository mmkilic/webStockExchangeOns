import React, { useState } from "react";
import { fetchStockData, fetchCryptoData } from "./api";
import Controls from "./components/Controls";
import ChartView, { calculateTrendline } from "./components/ChartView";
import TableView from "./components/TableView";

export default function App() {
  const [data, setData] = useState([]);
  const [view, setView] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avg, setAvg] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [now, setNow] = useState(0);
  const [trendDirection, setTrendDirection] = useState("none");
  const [angle, setAngle] = useState(0);
  const [avgAnnualScore, setAvgAnnualScore] = useState(0);

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

      const trendAngle = trendDirection === "none"
        ? 0
        : calculateTrendline(result).angle;
      setAngle(trendAngle);
      setAvgAnnualScore(247 * Math.tan((trendAngle * Math.PI) / 180));
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

        <Controls
          onGenerate={handleGenerate}
          loading={loading}
          trendDirection={trendDirection}
          onTrendChange={setTrendDirection}
        />

        {data.length > 0 && (
          <section className="my-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
                  Price Statistics
                </h2>
                <p className="text-xs text-slate-500">
                  XAU (Stock: mgr / Coin: gr)
                </p>
              </div>
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                Latest data
              </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
              <div className="min-w-0 px-4 py-4 sm:px-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Min</p>
                <p className="mt-1 truncate text-lg font-semibold tabular-nums text-slate-800">{min}</p>
              </div>
              <div className="min-w-0 px-4 py-4 sm:px-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Avg</p>
                <p className="mt-1 truncate text-lg font-semibold tabular-nums text-slate-800">{avg}</p>
              </div>
              <div className="min-w-0 px-4 py-4 sm:px-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Max</p>
                <p className="mt-1 truncate text-lg font-semibold tabular-nums text-slate-800">{max}</p>
              </div>
              <div className="min-w-0 px-4 py-4 sm:px-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Now</p>
                <p className="mt-1 truncate text-lg font-semibold tabular-nums text-emerald-700">{now}</p>
              </div>
              <div className="min-w-0 px-4 py-4 sm:px-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Angle</p>
                <p className="mt-1 truncate text-lg font-semibold tabular-nums text-blue-700">
                  {angle >= 0 ? "+" : ""}{angle.toFixed(3)}°
                </p>
              </div>
              <div className="min-w-0 px-4 py-4 sm:px-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Avg Annual Score</p>
                <p className="mt-1 truncate text-lg font-semibold tabular-nums text-amber-700">
                  {avgAnnualScore >= 0 ? "+" : ""}{avgAnnualScore.toFixed(3)}
                </p>
              </div>
            </div>
          </section>
        )}
        {view === "chart" && (
          <ChartView data={data} trendDirection={trendDirection} />
        )}
        {view === "table" && <TableView data={data} />}
      </div>
    </div>
  );
}
