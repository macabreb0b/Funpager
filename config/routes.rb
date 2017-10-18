Singlepager::Application.routes.draw do
  root to: 'static_pages#root'
  get 'splash', to: 'static_pages#splash'

  resources :pages, only: [:new, :index, :show, :create, :update, :destroy, :edit] do
    resources :widgets, only: [:index, :show]
  end

  resources :widgets, only: [:new, :create, :destroy, :update]
  post 'widgets/:id/move', to: 'widgets#adjust_rank'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  get '/:id', to: "pages#show"
end
