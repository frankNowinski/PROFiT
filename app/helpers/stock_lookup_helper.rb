module StockLookupHelper
  def percent_change_color(stock_data)
    stock_data['PercentChange'].to_f >= 0 ? 'positive' : 'negative'
  end

  def non_currency(stock_data_attr)
    ['Volume', 'AverageDailyVolume'].include?(stock_data_attr)
  end
end
