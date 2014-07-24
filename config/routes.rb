Rails.application.routes.draw do
 
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
