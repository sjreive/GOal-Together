Rails.application.routes.draw do
  namespace :api do
    resources :votes
    resources :activities
    resources :commitments
    resources :users
    get 'find_user' => 'users#find_current_user'
    get 'attendance', to: 'users#attendance'
    get 'commitments/:id/attendance', to: 'commitments#attendance'
    get 'commitments/:id/activities/:id/attendance', to: 'activities#attendance'
    post 'user_token' => 'user_token#create'
  end
end
