Rails.application.routes.draw do

    get 'static_pages/home'
    
    get 'static_pages/help'

    root     'static_pages#home'
        
    namespace :api do
        get 'signup', to: 'users/new'
        post '/login', to: 'users/authenticate'
        reousrces  :users
    end

    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
