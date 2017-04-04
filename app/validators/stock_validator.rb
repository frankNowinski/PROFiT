class StockValidator < ActiveModel::Validator
  def validate(stock)
    @stock = stock

    unless valid_attributes?
      stock.errors.add(:base, 'Invalid stock.')
    end
  end

  private

  def valid_attributes?
    valid_ticker? && valid_shares? && valid_purchased_date?
  end

  def valid_ticker?
    stock_data = fetch_stock

    if stock_data.empty?
      false
    else
      @stock.purchased_price = stock_data['Close']
      true
    end
  end

  def valid_shares?
    @stock.shares > 0
  end

  def valid_purchased_date?
    @stock.purchased_date <= Date.today
  end

  def fetch_stock
    StockFetcher.new(@stock.ticker, @stock.purchased_date).fetch_historical_stock_data
  end
end
