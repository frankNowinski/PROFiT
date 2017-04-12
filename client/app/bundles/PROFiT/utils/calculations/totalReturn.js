export default function calculateTotalReturn(stock) {
  let shares         = stock.shares;
  let currentPrice   = stock.stock_data.LastTradePriceOnly;
  let purchasedPrice = stock.purchased_price;

  return (currentPrice - purchasedPrice) * shares;
}
