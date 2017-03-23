class AddsDaysProfitToStocks < ActiveRecord::Migration[5.0]
  def change
    add_column :stocks, :days_profit, :float, default: 0
  end
end
