exports.handler = async (event, context) => {
  // Add CORS headers to all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  const { startDate, endDate } = event.queryStringParameters;

  if (!startDate || !endDate) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing startDate or endDate parameters' }),
    };
  }

  // CoinCap API uses milliseconds
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime(); // CoinCap includes data up to this time

  try {
    // Fetch historical data from CoinCap (Free, no key required usually)
    // interval=d1 for daily data
    const response = await fetch(
      `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${start}&end=${end}`
    );
    
    if (!response.ok) {
       const errorText = await response.text();
       console.error("CoinCap Error:", errorText);
       return {
         statusCode: response.status,
         headers,
         body: JSON.stringify({ error: `CoinCap API error: ${response.statusText}` })
       }
    }

    const json = await response.json();
    
    // CoinCap returns { data: [ { time: 15234324..., priceUsd: "3232.23" }, ... ] }
    // We need to transform it to match the frontend expectation: [[timestamp, price], ...]
    const prices = json.data.map(item => [
        item.time, 
        parseFloat(item.priceUsd)
    ]);

    // If the end date is today, or very close to today, we should also try to get the CURRENT price
    // because historical daily data often lags by 1 day or closes at UTC midnight.
    const now = new Date().getTime();
    const oneDayMs = 86400000;
    
    if (end > (now - oneDayMs)) {
        try {
            const currentPriceResponse = await fetch('https://api.coincap.io/v2/assets/bitcoin');
            if (currentPriceResponse.ok) {
                const currentJson = await currentPriceResponse.json();
                // { data: { id: "bitcoin", priceUsd: "...", ... } }
                if (currentJson.data && currentJson.data.priceUsd) {
                    const currentPrice = parseFloat(currentJson.data.priceUsd);
                    const currentTimestamp = new Date().getTime();
                    // Append current price to the array
                    prices.push([currentTimestamp, currentPrice]);
                }
            }
        } catch (e) {
            console.warn("Failed to fetch current price, falling back to history only", e);
        }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(prices),
    };
  } catch (error) {
    console.error('Error fetching BTC data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch Bitcoin data' }),
    };
  }
};
