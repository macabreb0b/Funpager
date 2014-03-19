Singlepager::Application.routes.draw do
  root to: 'static_pages#root'
  get 'dashboard', to: 'static_pages#dashboard'
  get 'builder', to: 'static_pages#builder'

  # remove 'new' after install backbone
  resources :pages, only: [:new, :index, :show, :create, :update, :edit]

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
end
