import React, { useState, useMemo, useEffect } from "react";
import { DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";

const companies = [
  { type: "stock", label: "ASELSAN", value: "ASELS.IS" },
  { type: "stock", label: "BIM MAGAZALAR", value: "BIMAS.IS" },
  { type: "stock", label: "EMLAK KONUT GMYO", value: "EKGYO.IS" },
  { type: "stock", label: "EREGLI DEMIR CELIK", value: "EREGL.IS" },
  { type: "stock", label: "KOC HOLDING", value: "KCHOL.IS" },
  { type: "stock", label: "PEGASUS", value: "PGSUS.IS" },
  { type: "stock", label: "SASA POLYESTER", value: "SASA.IS" },
  { type: "stock", label: "TURKCELL", value: "TCELL.IS" },
  { type: "stock", label: "THY", value: "THYAO.IS" },
  { type: "stock", label: "TUPRAS", value: "TUPRS.IS" },
  { type: "stock", label: "AKBANK", value: "AKBNK.IS" },
  { type: "stock", label: "ALARKO HOLDING", value: "ALARK.IS" },
  { type: "stock", label: "ARCELIK", value: "ARCLK.IS" },
  { type: "stock", label: "ASTOR ENERJI", value: "ASTOR.IS" },
  { type: "stock", label: "BORUSAN BORU SANAYI", value: "BRSAN.IS" },
  { type: "stock", label: "COCA COLA", value: "CCOLA.IS" },
  { type: "stock", label: "DOGUS OTOMOTIV", value: "DOAS.IS" },
  { type: "stock", label: "ENKA INSAAT", value: "ENKAI.IS" },
  { type: "stock", label: "FORD OTOSAN", value: "FROTO.IS" },
  { type: "stock", label: "GARANTI", value: "GARAN.IS" },
  { type: "stock", label: "HALK BANKASI", value: "HALKB.IS" },
  { type: "stock", label: "IS BANKASI", value: "ISCTR.IS" },
  { type: "stock", label: "KARDEMIR", value: "KRDMD.IS" },
  { type: "stock", label: "MAVI GIYIM", value: "MAVI.IS" },
  { type: "stock", label: "MIGROS TICARET", value: "MGROS.IS" },
  { type: "stock", label: "OYAK CIMENTO", value: "OYAKC.IS" },
  { type: "stock", label: "PASIFIK EURASIA LOJISTIK", value: "PASEU.IS" },
  { type: "stock", label: "PETKIM", value: "PETKM.IS" },
  { type: "stock", label: "SABANCI HOLDING", value: "SAHOL.IS" },
  { type: "stock", label: "SISE CAM", value: "SISE.IS" },
  { type: "stock", label: "TAV HAVALIMANLARI", value: "TAVHL.IS" },
  { type: "stock", label: "TOFAS OTO. FAB.", value: "TOASO.IS" },
  { type: "stock", label: "TURK ALTIN ISLETMELERI", value: "TRALT.IS" },
  { type: "stock", label: "TR ANADOLU METAL MADENCILIK", value: "TRMET.IS" },
  { type: "stock", label: "TURK TELEKOM", value: "TTKOM.IS" },
  { type: "stock", label: "ULKER BISKUVI", value: "ULKER.IS" },
  { type: "stock", label: "VAKIFLAR BANKASI", value: "VAKBN.IS" },
  { type: "stock", label: "YAPI VE KREDI BANK.", value: "YKBNK.IS" },
  { type: "stock", label: "AKSA", value: "AKSA.IS" },
  { type: "stock", label: "BIRLESIM GRUP ENERJI", value: "BIGEN.IS" },
  { type: "crypto", label: "Ethereum", value: "ETH-USD" },
  { type: "crypto", label: "Bitcoin", value: "BTC-USD" }
];

export default function Controls({ onGenerate, loading }) {
  const [date, setDate] = useState(dayjs("2019-01-01"));
  const [selectedTicker, setSelectedTicker] = useState("THYAO.IS");

  const ticker = useMemo(
    () => companies.find(c => c.value === selectedTicker),
    [selectedTicker]
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Select
        className="md:w-1/3"
        options={companies}
        value={selectedTicker}
        onChange={setSelectedTicker}
      />

      <DatePicker
        className="md:w-1/3"
        value={date}
        onChange={setDate}
        format="YYYY-MM-DD"
      />

      <Button
        type="primary"
        loading={loading}
        onClick={() =>
          onGenerate(ticker, date.format("YYYY-MM-DD"), "chart")
        }
      >
        Generate Line Chart
      </Button>

      <Button
        loading={loading}
        onClick={() =>
          onGenerate(ticker, date.format("YYYY-MM-DD"), "table")
        }
      >
        Generate Values Table
      </Button>
    </div>
  );
}
