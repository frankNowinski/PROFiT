class AddsTrendToStocks < ActiveRecord::Migration[5.0]
  def change
    add_column :stocks, :trending_upward, :boolean, default: :false
    add_column :stocks, :last_trending_date, :date
  end
end
