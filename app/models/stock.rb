class Stock < ApplicationRecord
  belongs_to :user

  def set_purchased_price
    self.purchased_price = closing_price_on_purchased_date
  end

  private

  def closing_price_on_purchased_date
    StockFetcher.new(self.ticker, self.purchased_date)
      .fetch_stock.first['Close']
  end
end
