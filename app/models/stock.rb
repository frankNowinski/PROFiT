class Stock < ApplicationRecord
  belongs_to :user

  validates_with StockValidator
  validates_presence_of :ticker, :shares, :purchased_date
  validates :ticker, uniqueness: true

  def purchased_date=(date)
    write_attribute(:purchased_date, Time.zone.parse(date))
  end

  def get_stock_data
    stock_data = StockFetcher.new([ticker, ticker]).fetch_stock.first
    self.attributes.merge(stock_data: stock_data)
  end
end
