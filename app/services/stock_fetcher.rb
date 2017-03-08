class StockFetcher
  def initialize(ticker)
    @ticker = ticker
  end

  def fetch_stock
    stock_data_from_yahoo_api
  end

  private

  def stock_data_from_yahoo_api
    stock = JSON.parse(yahoo_api_response).with_indifferent_access
    stock[:query][:results][:quote]
  end

  def yahoo_api_response
    Faraday.get(yahoo_api_url).body
  end

  def yahoo_api_url
    "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20"\
    "yahoo.finance.quotes%20where%20symbol%20in%20(%22#{@ticker}%22)&"\
    "format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&"\
    "callback="
  end
end
