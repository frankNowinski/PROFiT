class Api::V1::StocksController < ApplicationController
  def stock_lookup
    @stock = StockFetcher.new(stock_params).fetch_stock
  end

  private

  def stock_params
    params.require(:ticker)
  end
end

