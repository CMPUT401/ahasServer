Rails.application.routes.draw do

    post     'user_token', to: 'user_token#create'
    get      'static_pages/home'
    get      'static_pages/help'
    root     'static_pages#home'

    get 'signup', to: 'users#new'
    post '/login', to: 'users#authenticate'

    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
