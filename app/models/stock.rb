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
    update_days_profit
    update_trend if updatable?

    self.attributes.merge(stock_data: @stock_data)
  end

  private

  def fetch_stock_data
    @stock_data = StockFetcher.new(ticker).fetch_stock_data.with_indifferent_access
  end

  def update_days_profit
    current_price  = @stock_data[:LastTradePriceOnly]
    previous_close = @stock_data[:PreviousClose]
    days_profit    = ((current_price.to_f - previous_close.to_f) * self.shares).round(2)

    self.update(days_profit: days_profit)
  end

  def updatable?
    last_trending_date.nil? || Date.today > last_trending_date
  end

  def update_trend
    send_trending_change_alert if trending_upward != trending_upward?
    self.update(last_trending_date: Date.today, trending_upward: trending_upward?)
  end

  def trending_upward?
    @stock_data[:FiftydayMovingAverage].to_f > @stock_data[:TwoHundreddayMovingAverage].to_f
  end

  def send_trending_change_alert
    puts '*' * 30
    puts 'ALERT THE USER'
  end
end
