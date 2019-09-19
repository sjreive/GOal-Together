Rails.application.routes.draw do
  # Fallback Route
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  
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
    put 'commitments/:id/members/:id', to: 'commitments#accept_invitation'
    delete 'commitments/:id/members/:id', to: 'commitments#decline_invitation'
  end
end
