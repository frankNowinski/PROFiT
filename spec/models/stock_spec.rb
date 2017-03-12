require 'rails_helper'

RSpec.describe Stock, type: :model do
  let(:user) { create(:user) }

  describe '#initialize' do
    let(:stock) do
      described_class.new({
        ticker: ticker,
        shares: shares,
        purchased_date: purchased_date,
        user_id: user.id
      })
    end

    it { should validate_presence_of(:ticker) }
    it { should validate_presence_of(:shares) }
    it { should validate_presence_of(:purchased_date) }

    context 'when a stock is created with an invalid stock ticker' do
      let(:ticker)         { 'APPLE' }
      let(:shares)         { 3 }
      let(:purchased_date) { stubbed_date }

      it 'should return false and add an error to the stock obj' do
        expect(stock.save).to be_falsey
        expect(stock.errors[:base]).to include('Invalid Stock')
      end
    end

    context 'when a stock is created with a valid stock' do
      let(:ticker)          { 'AAPL' }
      let(:shares)          { 3 }
      let(:purchased_date)  { stubbed_date }
      let(:purchased_price) { '138.679993' }

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
  end
end
