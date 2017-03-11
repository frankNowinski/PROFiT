require 'rails_helper'

RSpec.describe Stock, type: :model do
  let(:user)  { build(:user) }
  let(:stock) { build(:stock, user: user) }

  describe '#set_purchased_price' do
    it 'should set the purhcase price' do
      VCR.use_cassette('stock_history') do
        expect(stock.set_purchased_price).to eq '139.139999'
      end
    end
  end
end
