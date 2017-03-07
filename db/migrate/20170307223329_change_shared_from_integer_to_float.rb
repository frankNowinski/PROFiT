class ChangeSharedFromIntegerToFloat < ActiveRecord::Migration[5.0]
  def change
    change_column :stocks, :shares, :decimal, null: false
  end
end
