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
    if fetch_stock.empty?
      false
    else
      @stock.purchased_price = fetch_stock.first['Close']
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
    StockFetcher.new(@stock.ticker, @stock.purchased_date).fetch_stock
  end
end
