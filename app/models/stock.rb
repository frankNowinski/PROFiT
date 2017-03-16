class Stock < ApplicationRecord
  belongs_to :user

  validates_with StockValidator
  validates_presence_of :ticker, :shares, :purchased_date

end
