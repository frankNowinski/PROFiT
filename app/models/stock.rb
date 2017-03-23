class Stock < ApplicationRecord
  belongs_to :user

  validates_with StockValidator
  validates_presence_of :ticker, :shares, :purchased_date
  validates :ticker, uniqueness: true

  def purchased_date=(date)
    write_attribute(:purchased_date, Time.zone.parse(date))
  end

  def get_stock_data
    fetch_stock_data
    self.attributes.merge(stock_data: @stock_data)
  end

  private

  def fetch_stock_data
    @stock_data = StockFetcher.new([ticker, ticker]).fetch_stock
      .first.with_indifferent_access
    update_days_profit
  end

  def update_days_profit
    current_price  = @stock_data[:LastTradePriceOnly]
    previous_close = @stock_data[:PreviousClose]
    days_profit    = ((current_price.to_f - previous_close.to_f) * self.shares).round(2);

    self.update(days_profit: days_profit)
  end
end
