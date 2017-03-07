class Stock < ApplicationRecord
  belongs_to :user

  def get_stock_data
    binding.pry
  end
end
