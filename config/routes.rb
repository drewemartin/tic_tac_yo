Rails.application.routes.draw do

  root to: 'welcomes#index'
  
  get 'games/show/:invitee_id/:inviter_id', to: 'games#show', as: 'game'
  # http://0.0.0.0:3000/games/show/21/12

  resources :users_sessions, :only => [:new, :create, :destroy]
  
  resources :users do
    resources :private_messages, :only => [:index,:new,:create] 
    resources :blocks, :only => [:create]
    resources :favorites, :only =>[:create]
  end

  resources :private_messages, :only =>[:destroy]
  resources :blocks, :only =>[:destroy]
  resources :favorites, :only =>[:destroy]


  get 'login' => 'users_sessions#new', :as => :login
  post 'logout' => 'users_sessions#destroy', :as => :logout

end
