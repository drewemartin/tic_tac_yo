Rails.application.routes.draw do
  resources :user_sessions
  resources :users

  get 'login' => 'users_sessions#new', :as => :login
  post 'logout' => 'user_sessions#destroy', :as => :logout

end
