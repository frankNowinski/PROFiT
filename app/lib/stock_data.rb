module StockData
  STOCK_DATA = {
    first_col: {
      'Percent Change': 'PercentChange',
      'Last Traded Price': 'LastTradePrice',
      'Previous Close': 'PreviousClose',
      'Open': 'Open',
      'Days High': 'DaysHigh',
      'Days Low': 'DaysLow',
      'Earnings Per Share': 'EarningsShare',
      'Price Per Earning': 'PERatio'
    },
    second_col: {
      'One Year Target': 'OneyrTargetPrice',
      'Year High': 'YearHigh',
      'Year Low': 'YearLow',
      '50 Day Moving Average': 'FiftydayMovingAverage',
      '200 Day Moving Average': 'TwoHundreddayMovingAverage',
      'Volume': 'Volume',
      'Average Daily Volume': 'AverageDailyVolume'
    }
  }.with_indifferent_access
end

