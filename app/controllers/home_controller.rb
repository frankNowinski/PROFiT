class HomeController < ApplicationController
  def index
    @props = { stocks: [{ ticker: 'AAPL' }, { ticker: 'XOXO' } ] }
  end
end
