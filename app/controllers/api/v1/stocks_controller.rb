class Api::V1::StocksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :find_stock, only: [:update, :destroy]

  def create
    @stock = current_user.stocks.new(stock_params)

    if @stock.save
      render json: @stock.get_stock_data
    else
      render json: @stock.errors
    end
  end

  def update
    if @stock.update(stock_params)
      render json: @stock.get_stock_data
    else
      render json: @stock.errors
    end
  end

  def destroy
    if @stock.destroy
      render json: @stock.id
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

  def find_stock
    @stock = current_user.stocks.find(params.require(:id))
  end
end

