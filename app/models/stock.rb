class Stock < ApplicationRecord
  belongs_to :user

  validates_with StockValidator
  validates_presence_of :ticker, :shares, :purchased_date

  def get_stock_data
    stock_data = StockFetcher.new(ticker).fetch_stock
    self.attributes.merge(stock_data: stock_data)
  end
end
