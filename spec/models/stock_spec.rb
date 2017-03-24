require 'rails_helper'

RSpec.describe Stock, type: :model do
  let(:user) { create(:user) }

  describe '#initialize' do
    let(:ticker)          { 'AAPL' }
    let(:shares)          { 3 }
    let(:purchased_date)  { stubbed_purchased_date }
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
    end

    it { should validate_presence_of(:ticker) }
    it { should validate_presence_of(:shares) }
    it 'should validate the uniqueness of a stock ticker' do
      stock.save
      should validate_uniqueness_of(:ticker)
    end

    context 'when a stock is created with an invalid stock ticker' do
      let(:ticker)         { 'APPLE' }

      it 'should return false and add an error to the stock obj' do
        expect(stock.save).to be_falsey
        expect(stock.errors[:base]).to include('Invalid stock.')
      end
    end

    context 'when a stock is created with a valid stock ticker' do
      it 'should set the purchsed price' do
        VCR.use_cassette('stock_history') do
          stock.save
          expect(stock.purchased_price).to eq purchased_price
        end
      end

      it 'should return true' do
        VCR.use_cassette('stock_history') do
          expect(stock.save).to be_truthy
        end
      end
    end

    context 'when a stock is created with no shares' do
      let(:shares)          { 0 }

      it 'should return false and add an error msg' do
        expect(stock.save).to be_falsey
        expect(stock.errors[:base]).to include('Invalid stock.')
      end
    end

    context 'when a stock is created with negative shares' do
      let(:shares)          { -1 }

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

    context 'when a stock is created with an valid date' do
      let(:purchased_date)  { Date.today.to_s }

      it 'should return false and add an error msg' do
        expect(stock.save).to be_truthy
        expect(stock.purchased_date).to eq(Date.today)
      end
    end
  end

  describe '#get_stock_data' do
    let(:stock) { create(:stock, user: user) }

    it 'should update the days profit' do
      # VCR.use_cassette('stock') do
        stock.get_stock_data
        expect(stock.days_profit).to eq 4.74
      # end
    end

    context 'when a stock is retreived' do
      let(:stock_data) { { ticker: 'AAPL', shares: '3' } }

      before do
        allow(stock).to receive(:update)
      end

      it 'should merge stock data to the stock object' do
        VCR.use_cassette('stock') do
          expect(stock.get_stock_data[:stock_data][:symbol]).to eq 'AAPL'
        end
      end
    end
  end
end
