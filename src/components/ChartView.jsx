import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function calculateTrendline(data) {
  const n = data.length;

  console.log("Calculating trendline for data:", data);
  console.log("Number of data points (n):", n);

  if (n < 2) {
    return {
      data: data.map((item, index) => ({
        ...item,
        trendValue: 0,
      })),
      angle: 0,
    };
  }

  // Excel'deki X değerleri: 1, 2, 3, ..., n
  const x = data.map((_, index) => index + 1);
  const y = data.map((item) => Number(item.value));

  const sumX = x.reduce((sum, value) => sum + value, 0);
  const sumY = y.reduce((sum, value) => sum + value, 0);

  const sumXY = x.reduce((sum, value, index) => sum + value * y[index], 0);

  const sumX2 = x.reduce((sum, value) => sum + value * value, 0);

  // Excel: SLOPE(known_y's, known_x's)
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

  // Excel: INTERCEPT(known_y's, known_x's)
  const intercept = (sumY - slope * sumX) / n;

  // Eğimin açı karşılığı
  // Excel: DEGREES(ATAN(slope))
  const angle = Math.atan(slope) * (180 / Math.PI);

  return {
    data: data.map((item, index) => ({
      ...item,
      trendValue: intercept + slope * x[index],
    })),
    angle,
  };
}

export default function ChartView({ data, trendDirection = "none" }) {
  const hasTrendline = trendDirection !== "none";
  const trend = hasTrendline ? calculateTrendline(data) : { data, angle: 0 };
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <LineChart
          data={trend.data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }} // space for vertical labels
        >
          <XAxis dataKey="date" angle={-90} textAnchor="end" height={70} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
          {hasTrendline && (
            <Line
              type="linear"
              dataKey="trendValue"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={false}
              strokeDasharray="6 4"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
