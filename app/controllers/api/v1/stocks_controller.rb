class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @stock = current_user.stocks.new(stock_params)

    if @stock.save
      render json: @stock.get_stock_data
    else
      render json: @stock.errors
    end
  end

  def stock_lookup
    @stock = StockFetcher.new(stock_ticker_params).fetch_stock
  end

  private

  def stock_params
    params.require(:stock).permit(:ticker, :shares, :purchased_date)
  end

  def stock_ticker_params
    params.require(:ticker)
  end
end

