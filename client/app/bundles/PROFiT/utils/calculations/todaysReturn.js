export default function calculateTodaysReturn(stock) {
  let shares         = stock.shares;
  let currentPrice   = stock.stock_data.LastTradePriceOnly;
  let previousClose  = stock.stock_data.PreviousClose;

  return (currentPrice - previousClose) * shares;
}

