require 'rails_helper'

describe StockLookupHelper do
  let(:stock) do
    {
      'Ask': asking_price,
      'LastTradePriceOnly': '50'
    }.with_indifferent_access
  end

  describe '#current_price' do
    context 'when the stock has an Asking price' do
      let(:asking_price) { '100' }

      it 'should return the Asking price' do
        expect(current_price(stock)).to eq '100'
      end
    end

    context 'when the stock does not have an Asking price' do
      let(:asking_price) { nil }

      it 'should return the Last Trading Price' do
        expect(current_price(stock)).to eq '50'
      end
    end
  end
end
