Rails.application.routes.draw do
  root 'sessions#index'

  get '/home', to: 'home#index'
  get '/stock_lookup', to: 'stocks#lookup'

  # namespace :api do
    # namespace :v1 do
      # get '/stock_lookup', to: 'stocks#lookup'
    # end
  # end

  # ==> Facebook Omniauth
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
end
