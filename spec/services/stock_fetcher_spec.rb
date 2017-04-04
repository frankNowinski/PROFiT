require 'rails_helper'

RSpec.describe StockFetcher, type: :services do
  describe '#initialize' do
    context 'when initialized without any arguments' do
      it 'should raise an Argument Error' do
        expect{ described_class.new }.to raise_error ArgumentError
      end
    end

    context 'when initialized with a stock ticker' do
      let(:stock_fetcher) { described_class.new('AAPL') }

      it 'should return true' do
        expect(stock_fetcher).to be_truthy
      end

      it 'should not set the start date' do
        expect(stock_fetcher.instance_variable_get(:@start_date)).to eq nil
      end

      it 'should set the appropriate url' do
        expect(stock_fetcher.instance_variable_get(:@url)).to eq yahoo_api_url
      end
    end

    context 'when initialized with a ticker and start date' do
      let(:stock_fetcher) { described_class.new('AAPL', stubbed_purchased_date) }
      let(:start_date)    { (stubbed_purchased_date - 5).strftime('%Y-%m-%d') }
      let(:end_date)      { stubbed_purchased_date.strftime('%Y-%m-%d') }

      it 'should set start and end stubbed_date' do
        expect(stock_fetcher.instance_variable_get(:@start_date)).to eq start_date
        expect(stock_fetcher.instance_variable_get(:@end_date)).to eq end_date
      end

      it 'should set the appropriate url' do
        expect(stock_fetcher.instance_variable_get(:@url)).to eq yahoo_api_url_with_dates
      end
    end
  end

  describe '#fetch_stock_data' do
    let(:stock_fetcher) { described_class.new(ticker) }

    context 'when fetching stock data for an invalid stock' do
      let(:ticker) { 'APPLE' }

      it 'should return an empty object' do
        expect(stock_fetcher.fetch_stock_data).to eq({})
      end
    end

    context 'when fetching stock data for a valid stock' do
      let(:ticker) { 'AAPL' }

      it 'should return stock data' do
        VCR.use_cassette('stock') do
          expect(stock_fetcher.fetch_stock_data['Name']).to eq 'Apple Inc.'
          expect(stock_fetcher.fetch_stock_data['Ask']).to eq '144.60'
        end
      end
    end

    describe '#fetch_historical_stock_data' do
      let(:stock_fetcher) { described_class.new(ticker, stubbed_purchased_date) }

      context 'when fetching historical stock data for an invalid stock' do
        let(:ticker) { 'APPLE' }

        it 'should return stock data' do
          expect(stock_fetcher.fetch_historical_stock_data).to eq({})
        end
      end

      context 'when fetching historical stock data for a valid stock' do
        let(:ticker) { 'AAPL' }

        it 'should return stock data' do
          VCR.use_cassette('stock_history') do
            expect(stock_fetcher.fetch_historical_stock_data['Symbol']).to eq 'AAPL'
            expect(stock_fetcher.fetch_historical_stock_data['Close']).to eq '138.679993'
          end
        end
      end
    end
  end
end

