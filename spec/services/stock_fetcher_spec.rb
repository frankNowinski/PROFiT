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

    xcontext 'when initialized with a ticker and start date' do
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

  describe '#fetch_stock'do
    let(:stock) { described_class.new(['AAPL', 'AAPL']).fetch_stock }

    it 'should return the stock object' do
      VCR.use_cassette('stock') do
        expect(stock.first[:symbol]).to eq 'AAPL'
        expect(stock.first[:Ask]).to eq '141.49'
      end
    end
  end
end

