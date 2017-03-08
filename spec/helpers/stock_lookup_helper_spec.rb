require 'rails_helper'

describe StockLookupHelper do
  let(:stock) do
    {
      'LastTradeWithTime': '12:33pm - <b>22.40</b>'
    }.with_indifferent_access
  end

  describe '#current_price' do
    context 'when the stock has an Asking price' do
      it 'should return the Asking price' do
        expect(current_price(stock)).to eq '22.40'
      end
    end
  end

  describe '#last_traded_time' do
    context 'when the stock has an Asking price' do
      it 'should return the Asking price' do
        expect(last_traded_time(stock)).to eq '12:33pm'
      end
    end
  end
end
