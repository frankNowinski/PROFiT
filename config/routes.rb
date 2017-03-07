Rails.application.routes.draw do
  root 'sessions#index'

  get '/sessions/show', to: 'sessions#show'

  get '/home', to: 'home#index'

  namespace :api do
    namespace :v1 do
      get '/stock_lookup', to: 'stocks#lookup'
    end
  end

  # ==> Facebook Omniauth
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
end
