Singlepager::Application.routes.draw do
  root to: 'static_pages#root'

  resources :pages, only: [:index, :show, :create, :update, :edit]

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
end
