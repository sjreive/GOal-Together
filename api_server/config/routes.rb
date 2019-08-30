Rails.application.routes.draw do
  namespace :api do
    resources :votes
    resources :activities
    resources :commitments
    resources :users
  end
end
