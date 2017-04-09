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
    update_trend if prior_last_trend_date?

    self.attributes.merge(stock_data: @stock_data)
  end

  private

  def fetch_stock_data
    @stock_data = StockFetcher.new(ticker).fetch_stock_data.with_indifferent_access
  end

  def update_days_profit
    days_profit = ((current_price - previous_close) * self.shares).round(2)
    self.update(days_profit: days_profit)
  end

  def current_price
    @stock_data[:LastTradePriceOnly].to_f
  end

  def previous_close
    @stock_data[:PreviousClose].to_f
  end

  def prior_last_trend_date?
    last_trending_date.nil? || Date.today > last_trending_date
  end

  def update_trend
    downward_trend_change_email if change_from_upward_to_downward_trend?
    self.update(last_trending_date: Date.today, trending_upward: currently_trending_upward?)
  end

  def change_from_upward_to_downward_trend?
    notify_trend_change && trending_upward && currently_trending_downward?
  end

  def currently_trending_upward?
    @trending_upward ||=
      @stock_data[:FiftydayMovingAverage].to_f > @stock_data[:TwoHundreddayMovingAverage].to_f
  end

  def currently_trending_downward?
    !trending_upward? && last_trending_date < Date.today
  end

  def downward_trend_change_email
    UserMailer.downward_trend_email(user, self).deliver!
  end

  def user
    @user = User.find(user_id)
  end
end
