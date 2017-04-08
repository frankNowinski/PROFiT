require 'rails_helper'

RSpec.describe Stock, type: :model do
  let(:user) { create(:user) }

  describe '#initialize' do
    let(:ticker)          { 'AAPL' }
    let(:shares)          { 3 }
    let(:purchased_date)  { stubbed_purchased_date_string }
    let(:purchased_price) { '138.679993' }
    let(:stock) do
      described_class.new({
        ticker: ticker,
        shares: shares,
        purchased_date: purchased_date,
        user_id: user.id
      })
    end

    before do
      allow(stock).to receive(:purchased_date=).with(purchased_date)
      allow(User).to receive(:find).and_return(user)
    end

    it { should validate_presence_of(:ticker) }
    it { should validate_presence_of(:shares) }
    it 'should validate the uniqueness of a stock ticker' do
      stock.save
      should validate_uniqueness_of(:ticker)
    end

    context 'when a stock is created with an invalid stock ticker' do
      let(:ticker) { 'APPLE' }

      it 'should return false and add an error to the stock obj' do
        expect(stock.save).to be_falsey
        expect(stock.errors[:base]).to include('Invalid stock.')
      end
    end

    context 'when a stock is created with a valid stock ticker' do
      it 'should set the purchsed price' do
        VCR.use_cassette('stock_purchase_date') do
          stock.save
          expect(stock.purchased_price).to eq purchased_price
          expect(stock.save).to be_truthy
        end
      end
    end

    context 'when a stock is created with no shares' do
      let(:shares) { 0 }

      it 'should return false and add an error msg' do
        VCR.use_cassette('stock_purchase_date') do
          expect(stock.save).to be_falsey
          expect(stock.errors[:base]).to include('Invalid stock.')
        end
      end
    end

    context 'when a stock is created with negative shares' do
      let(:shares) { -1 }

      it 'should return false and add an error msg' do
        expect(stock.save).to be_falsey
        expect(stock.errors[:base]).to include('Invalid stock.')
      end
    end

    context 'when a stock is created with an invalid date' do
      let(:purchased_date)  { (Date.today + 1).to_s }

      it 'should return false and add an error msg' do
        expect(stock.save).to be_falsey
        expect(stock.errors[:base]).to include('Invalid stock.')
      end
    end

    context 'when a stock is created with a valid date' do
      let(:purchased_date)  { Date.today.to_s }

      it 'should return false and add an error msg' do
        expect(stock.save).to be_truthy
        expect(stock.purchased_date).to eq(Date.today)
      end
    end
  end

  describe '#get_stock_data' do
    let(:date)          { stubbed_purchased_date }
    let(:stock)         { create(:stock, user: user, last_trending_date: date) }
    let(:closing_price) { { 'Close': 100 } }
    let(:stock_data) do
      {
        'symbol': 'AAPL',
        'LastTradePriceOnly': '10',
        'PreviousClose': '9',
        'FiftydayMovingAverage': '20',
        'TwoHundreddayMovingAverage': '10'
      }
    end

    before do
      allow(StockFetcher).to receive_message_chain(:new, :fetch_historical_stock_data)
        .and_return(closing_price)
      allow(StockFetcher).to receive_message_chain(:new, :fetch_stock_data, :with_indifferent_access)
        .and_return(stock_data)
    end

    it 'should update the days profit' do
      VCR.use_cassette('stock') do
        stock.get_stock_data
        expect(stock.days_profit).to eq 3.0
      end
    end

    it 'should merge stock data to the stock object' do
      VCR.use_cassette('stock') do
        expect(stock.get_stock_data[:stock_data][:symbol]).to eq 'AAPL'
      end
    end

    context 'when the last trending date was updated today' do
      let(:date) { Date.today }

      before do
        allow(StockFetcher).to receive_message_chain(:new, :fetch_stock_data, :with_indifferent_access)
        allow(stock).to receive(:update_days_profit)
        stock.get_stock_data
      end

      it 'should not update the trend' do
        expect(stock).not_to receive(:update_trend)
      end
    end

    context 'when the last trending date was prior to today' do
      let(:date) { Date.yesterday }

      before do
        allow(StockFetcher).to receive_message_chain(:new, :fetch_stock_data, :with_indifferent_access)
        allow(stock).to receive(:update_days_profit)
      end

      describe 'when updating the model' do
        before do
          allow(stock).to receive(:trending_upward?).and_return true
          stock.get_stock_data
        end

        it 'should update the last trend date' do
          expect(stock.last_trending_date).to eq Date.today
          expect(stock.trending_upward).to eq true
        end
      end

      describe 'when the stock does not change to a downward trend' do
        before do
          allow(stock).to receive(:trending_downward?).and_return false
        end

        it 'should not send an alert to the user' do
          expect(stock).not_to receive(:downward_trend_change_alert)
        end
      end

      describe 'when the stock does change to a downward trend' do
        before do
          allow(stock).to receive(:trending_upward?).and_return false
          stock.get_stock_data
        end

        # it 'should not send an alert to the user' do
          # expect(UserMailer).to receive(:welcome_email).with(user)
        # end
      end
    end
  end
end
