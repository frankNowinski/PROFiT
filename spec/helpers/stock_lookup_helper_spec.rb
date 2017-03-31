require 'rails_helper'

describe StockLookupHelper do
  let(:pos_percent_change) { { 'PercentChange': '1.0' }.with_indifferent_access }
  let(:neg_percent_change) { { 'PercentChange': '-1.0' }.with_indifferent_access }

  describe '#percent_change_color' do
    context 'when the percent change is positive' do
      it 'should return positive' do
        expect(percent_change_color(pos_percent_change)).to eq 'positive'
      end
    end

    context 'when the percent change is negative' do
      it 'should return negative' do
        expect(percent_change_color(neg_percent_change)).to eq 'negative'
      end
    end
  end

  describe '#non_currency' do
    context 'when the stock data attribute is not currency ' do
      it 'should return the Asking price' do
        expect(non_currency('Volume')).to eq true
        expect(non_currency('AverageDailyVolume')).to eq true
        expect(non_currency('Open')).to eq false
      end
    end
  end
end
