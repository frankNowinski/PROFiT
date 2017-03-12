class Stock < ApplicationRecord
  belongs_to :user

  validates_with StockValidator
  validates_presence_of :ticker, :shares, :purchased_date

  private

  def closing_price_on_purchased_date
    StockFetcher.new(self.ticker, self.purchased_date)
      .fetch_stock.first['Close']
  end
end
