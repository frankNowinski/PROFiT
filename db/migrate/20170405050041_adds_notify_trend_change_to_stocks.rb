class AddsNotifyTrendChangeToStocks < ActiveRecord::Migration[5.0]
  def change
    add_column :stocks, :notify_trend_change, :boolean, default: :false
  end
end
