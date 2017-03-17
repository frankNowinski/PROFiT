class PortfolioController < ApplicationController
  def index
    @stocks = current_user.stocks.map(&:get_stock_data)
  end
end
