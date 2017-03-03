Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'sessions#index'

  get '/users_show', to: 'sessions#show'

  # ==> Facebook Omniauth
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
end
