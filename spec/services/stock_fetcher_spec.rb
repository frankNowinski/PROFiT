require 'rails_helper'

RSpec.describe StockFetcher, type: :services do
  describe '#initialize' do
    context 'when initialized without a stock ticker' do
      it 'should raise an Argument Error' do
        expect{ described_class.new }.to raise_error ArgumentError
      end
    end

    context 'when initialized with a stock ticker' do
      let(:stock_ticker) { described_class.new('aapl') }

      it 'should return true' do
        expect(stock_ticker).to be_truthy
      end

      context 'when it is a valid stock ticker' do
        let(:stock_object) { double(:stock_object) }
        let(:stock) do
          { query: {
              results: {
                quote: stock_object
              }
            }
          }.with_indifferent_access
        end

        before do
          allow(Faraday).to receive_message_chain(:get, :body).and_return(stock)
          allow(JSON).to receive(:parse).and_return(stock)
        end

        it 'should return the stock object' do
          expect(stock_ticker.fetch_stock).to eq stock_object
        end
      end
    end
  end
end
