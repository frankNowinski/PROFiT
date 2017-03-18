class Stock < ApplicationRecord
  belongs_to :user

  validates_with StockValidator
  validates_presence_of :ticker, :shares, :purchased_date
  validates :ticker, uniqueness: true

  def purchased_date=(date)
    write_attribute(:purchased_date, Time.zone.parse(date))
  end

  def get_stock_data
    stock_data = StockFetcher.new(ticker).fetch_stock

    if after_four? && last_traded_time_not_four?(stock_data['LastTradeTime'])
      stock_data = StockFetcher.new(ticker).fetch_stock
    end

    self.attributes.merge(stock_data: stock_data)
  end

  private

  def after_four?
    Time.now.hour >= 16
  end

  def last_traded_time_not_four?(time)
    !(Time.parse(time).hour >= 16)
  end
end
