require 'capybara/rspec'
require 'omniauth-facebook'
require 'warden'

include Warden::Test::Helpers

def stubbed_purchased_date
  Time.local(2017, 3, 9)
end

def stubbed_purchased_date_string
  Time.local(2017, 3, 9).to_s
end

def yahoo_api_url
  "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20"\
  "yahoo.finance.quotes%20where%20symbol%20in%20(%22AAPL+AAPL%22)&"\
  "format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&"\
  "callback="
end

def yahoo_api_url_with_dates
  "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20"\
  "yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22AAPL%22"\
  "%20and%20startDate%20%3D%20%22#{(stubbed_purchased_date - 5).strftime('%Y-%m-%d')}"\
  "%22%20and%20endDate%20%3D%20%22#{stubbed_purchased_date.strftime('%Y-%m-%d')}"\
  "%22&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&format=json"
end

RSpec.configure do |config|
  config.include Warden::Test::Helpers

  config.after :each do
    Warden.test_reset!
  end

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
end
