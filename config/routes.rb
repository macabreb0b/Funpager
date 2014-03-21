Singlepager::Application.routes.draw do
  root to: 'static_pages#root'

  resources :pages, only: [:new, :index, :show, :create, :update, :edit, :destroy] do
    resources :widgets, only: [:index, :show, :destroy]
  end

  resources :widgets, only: [:create, :update]

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
