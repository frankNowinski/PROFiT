class PortfolioController < ApplicationController
  def index
    @stocks = current_user.stocks
  end
end
