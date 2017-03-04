Rails.application.routes.draw do
  root 'sessions#index'

  get '/home', to: 'home#index'

  # ==> Facebook Omniauth
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
end
