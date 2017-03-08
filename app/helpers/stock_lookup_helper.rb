module StockLookupHelper
  def current_price(stock)
    stock['Ask'] || stock['LastTradePriceOnly']
  end
end
