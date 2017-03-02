Rails.application.routes.draw do
  root 'sessions#index'

  get '/users_show', to: 'sessions#show'

  # ==> Facebook Omniauth
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
end
