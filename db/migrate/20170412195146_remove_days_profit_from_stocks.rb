class RemoveDaysProfitFromStocks < ActiveRecord::Migration[5.0]
  def change
    remove_column :stocks, :days_profit
  end
end
