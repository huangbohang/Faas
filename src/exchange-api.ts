interface ExchangeRatesResponse {
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
}

const rateCache: { [base: string]: ExchangeRatesResponse } = {};

export async function getExchangeRate(
  context: any,
  base: string,
  target: string
): Promise<number | undefined> {
  const url = `https://api.exchangerate-api.com/v4/latest/${base}`;

  try {
    let data: ExchangeRatesResponse = null;
    if (rateCache[base]) {
      data = rateCache[base];
    } else {
      const response = await context.fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = (await response.json()) as ExchangeRatesResponse;
      rateCache[base] = data; // 存储整个ExchangeRatesResponse对象到缓存
    }

    const rate = data.rates[target];

    if (rate === undefined) {
      throw new Error(`Exchange rate not found for target currency: ${target}`);
    }

    return rate;
  } catch (error) {
    console.error(`Error fetching exchange rate: ${error.message}`);
    return undefined; // 在 catch 块中返回 undefined 或根据需要处理错误
  }
}
