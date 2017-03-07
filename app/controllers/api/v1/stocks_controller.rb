class Api::V1::StocksController < ApplicationController
  def lookup
    @stock = StockFetcher.new(stock_params).fetch_stock

    render json: @stock
  end

  private

  def stock_params
    params.permit(:ticker)
  end
end

