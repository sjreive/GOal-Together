Rails.application.routes.draw do
  namespace :api do
    resources :votes
    resources :activities
    resources :commitments
    resources :users
    get 'attendance', to: 'users#attendance'
    get 'commitments/:id/attendance', to: 'commitments#attendance'
    get 'commitments/:id/activities/:id/attendance', to: 'activities#attendance'
  end
end
