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

  // Convert dates to UNIX timestamp (seconds)
  // CoinGecko expects UNIX timestamp in seconds
  const from = Math.floor(new Date(startDate).getTime() / 1000);
  const to = Math.floor(new Date(endDate).getTime() / 1000) + 86400; // Add one day to include end date

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
    );
    
    if (!response.ok) {
       const errorText = await response.text();
       console.error("CoinGecko Error:", errorText);
       return {
         statusCode: response.status,
         headers,
         body: JSON.stringify({ error: `CoinGecko API error: ${response.statusText}` })
       }
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data.prices), // Returns array of [timestamp, price]
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

