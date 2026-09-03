import React, { useState, useMemo, useEffect } from "react";
import { DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";

export default function Controls({ onGenerate, loading, trendDirection, onTrendChange }) {
  const [companies, setCompanies] = useState([]);
  const [date, setDate] = useState(dayjs("2019-01-01"));
  const [selectedTicker, setSelectedTicker] = useState("THYAO.IS");

  useEffect(() => {
    let mounted = true;
    fetch(import.meta.env.BASE_URL + 'companies.json')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        console.log("Loaded companies:", data);
        const normalized = data
          .map((c) => ({ ...c, label: c.label ?? c.lable ?? c.value }))
          .sort((a, b) => (a.value ?? "").localeCompare(b.value ?? ""));
        setCompanies(normalized);
      })
      .catch(() => {
        if (!mounted) return;
        setCompanies([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const ticker = useMemo(
    () => companies.find((c) => c.value === selectedTicker),
    [selectedTicker, companies],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Select
        className="w-full"
        options={companies}
        value={selectedTicker}
        onChange={setSelectedTicker}
        placeholder={companies.length ? undefined : "Loading companies..."}
      />

      <DatePicker
        className="w-full"
        value={date}
        onChange={setDate}
        format="YYYY-MM-DD"
      />

      <Select
        className="w-full"
        value={trendDirection}
        onChange={onTrendChange}
        options={[
          { value: "none", label: "No Trend Arrow" },
          { value: "trend", label: "Trend Arrow" },
        ]}
      />

      <Button
        type="primary"
        loading={loading}
        disabled={!ticker}
        onClick={() =>
          ticker && onGenerate(ticker, date.format("YYYY-MM-DD"), "chart")
        }
      >
        Generate Line Chart
      </Button>

      <Button
        loading={loading}
        disabled={!ticker}
        onClick={() =>
          ticker && onGenerate(ticker, date.format("YYYY-MM-DD"), "table")
        }
      >
        Generate Values Table
      </Button>
    </div>
  );
}
