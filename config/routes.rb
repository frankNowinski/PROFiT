Rails.application.routes.draw do
  root 'sessions#index'

  get '/portfolio', to: 'portfolio#index'
  get '/stock_lookup', to: 'api/v1/stocks#stock_lookup'

  namespace :api do
    namespace :v1 do
      resources :stocks, only: [:create]
    end
  end

  # ==> Facebook Omniauth
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
end
