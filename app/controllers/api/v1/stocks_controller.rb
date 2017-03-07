class Api::V1::StocksController < ApplicationController
  def lookup
    @stock = Stock.new(stock_params)

    @stock.get_stock_data
    render json: 'hello world'
  end

  private

  def stock_params
    params.require(:stock_ticker)
  end
end

