export async function fetchStockData(ticker, startDate) {
  const url = `https://api.mmkilic.com/api-stock-exchange-ons/stock/gold?ticker=${ticker}&start_date=${startDate}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export async function fetchCryptoData(ticker, startDate) {
  const url = `https://api.mmkilic.com/api-stock-exchange-ons/crypto/gold?ticker=${ticker}&start_date=${startDate}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}