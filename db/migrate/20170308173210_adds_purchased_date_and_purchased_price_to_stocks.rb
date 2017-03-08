class AddsPurchasedDateAndPurchasedPriceToStocks < ActiveRecord::Migration[5.0]
  def change
    add_column :stocks, :purchased_date, :date
    add_column :stocks, :purchased_price, :string
  end
end
