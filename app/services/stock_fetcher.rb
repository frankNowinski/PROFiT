class StockFetcher
  def initialize(ticker, start_date=nil)
    @ticker = [ticker].join('+')
    @url    = yahoo_api_url

    unless start_date.nil?
      @start_date = (start_date - 5).strftime('%Y-%m-%d')
      @end_date   = start_date.strftime('%Y-%m-%d')
      @url        = yahoo_api_url_with_dates
    end
  end

  def fetch_stock
    stock_data_from_yahoo_api
  end

  private

  def stock_data_from_yahoo_api
    stock_data = JSON.parse(yahoo_api_response)['query']['results']
    stock_data.nil? ? {} : stock_data['quote']
  end

  def yahoo_api_response
    Faraday.get(@url).body
  end

  def yahoo_api_url
    "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20"\
    "yahoo.finance.quotes%20where%20symbol%20in%20(%22#{@ticker}%22)&"\
    "format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&"\
    "callback="
  end

  def yahoo_api_url_with_dates
    "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20"\
    "yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22#{@ticker}%22"\
    "%20and%20startDate%20%3D%20%22#{@start_date}%22%20and%20endDate%20%3D"\
    "%20%22#{@end_date}%22&diagnostics=true&env=store%3A%2F%2Fdatatables"\
    ".org%2Falltableswithkeys&format=json"
  end
end
