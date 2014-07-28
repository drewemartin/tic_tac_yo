Rails.application.routes.draw do

  root to: 'welcomes#index'
  
  resources :welcomes
 
  get 'games/show/:invitee_id/:inviter_id', to: 'games#show', as: 'game'
  # http://0.0.0.0:3000/games/show/21/12
  # In controller:
  # params[:inviter_id] = 12
  # params[:invitee_id] = 21

  resources :users_sessions
  
  resources :users do
    resources :private_messages, :only => [:index,:new,:create] 
    resources :blocks
    resources :favorites
  end

  resources :private_messages, :only =>[:destroy, :show]


  get 'login' => 'users_sessions#new', :as => :login
  post 'logout' => 'users_sessions#destroy', :as => :logout

end
