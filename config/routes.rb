Rails.application.routes.draw do
 
  get 'games/show/:invitee_id/:inviter_id', to: 'games#show', as: 'game'
  # http://0.0.0.0:3000/games/show/21/12
  # In controller:
  # params[:inviter_id] = 12
  # params[:invitee_id] = 21

  resources :private_messages
  resources :blocks
  resources :favorites
  resources :user_sessions
  
  resources :users do
    resources :private_messages
    resources :blocks
    resources :favorites
  end


  get 'login' => 'users_sessions#new', :as => :login
  post 'logout' => 'user_sessions#destroy', :as => :logout

end
