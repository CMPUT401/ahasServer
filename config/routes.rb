Rails.application.routes.draw do


    get              'static_pages/home'
    get              'static_pages/help'
    root             'static_pages#home'
    post             'user_token', to: 'user_token#create'
    
    
    scope :api do
        post         'signup', to: 'users#new'
        post         'user_token', to: 'user_token#create'
        resources    :users
    end
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
