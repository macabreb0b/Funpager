Singlepager::Application.routes.draw do
  root to: 'static_pages#root'

  # remove 'new' after install backbone
  resources :pages, only: [:new, :index, :show, :create, :update, :edit] do
    resources :widgets, only: [:index, :show, :create, :update, :destroy]
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
