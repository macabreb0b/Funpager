Singlepager::Application.routes.draw do
  root to: 'static_pages#root'

  # remove 'new' after install backbone
  resources :pages, only: [:new, :index, :show, :create, :update, :edit, :destroy] do
    resources :widgets, only: [:index]
  end
  resources :widgets, except: [:index]

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
