Singlepager::Application.routes.draw do
  root to: 'static_pages#root'
  get 'splash', to: 'static_pages#splash'

  resources :pages, only: [:new, :index, :show, :create, :update, :destroy] do
    resources :widgets, only: [:index]
  end

  resources :widgets, only: [:create, :update, :destroy, :new, :show]

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  get '/:id', to: "pages#show"
end
