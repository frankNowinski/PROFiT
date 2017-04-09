class AddsWishlistToStocks < ActiveRecord::Migration[5.0]
  def change
    add_column :stocks, :wishlist, :boolean, default: false
  end
end

