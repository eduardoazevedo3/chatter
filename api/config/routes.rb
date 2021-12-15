Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  namespace :v1 do
    resources :users do
      get :signed_in, on: :collection
    end
    resources :chat_messages, except: [:show]

    mount_devise_token_auth_for 'User', at: 'auth'
  end
end
