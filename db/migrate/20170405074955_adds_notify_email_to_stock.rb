class AddsNotifyEmailToStock < ActiveRecord::Migration[5.0]
  def change
    add_column :stocks, :notify_email, :string
  end
end
