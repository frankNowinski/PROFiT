require 'rails_helper'

RSpec.describe Api::V1::StocksController, type: :controller do
  describe 'POST create' do
    let(:user)  { create(:user) }
    let(:stock) { create(:stock, user: user) }
    let(:stock_params) do
      {
        stock: {
          ticker: 'AAPL',
          shares: '3',
          purchased_date: stubbed_date
        }
      }
    end

    before do
      allow(Stock).to receive(:new).and_return(stock)
      allow(controller).to receive(:current_user).and_return(user)
    end

    it 'responds successfully with the stock object' do
      post :create, params: stock_params

      VCR.use_cassette('stock_history') do
        expect(response).to be_success
        expect(response.body).to eq(stock.to_json)
      end
    end
  end

  describe 'GET stock_lookup' do
    let(:stock_params) { { 'ticker': 'AAPL' } }

    before do
      allow(StockFetcher).to receive_message_chain(:new, :fetch_stock)
    end

    it 'responds successfully with the stock object' do
      expect(response).to be_success
      expect(get :stock_lookup, params: stock_params).to render_template(:stock_lookup)
    end
  end
end
