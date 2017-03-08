module StockLookupHelper
  def current_price(stock)
    ActionView::Base.full_sanitizer.sanitize(stock['LastTradeWithTime'].split(' - ').last)
  end

  def last_traded_time(stock)
    stock['LastTradeWithTime'].split(' - ').first
  end
end
