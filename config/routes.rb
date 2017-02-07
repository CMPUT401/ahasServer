Rails.application.routes.draw do


    get              'static_pages/home'
    get              'static_pages/help'
    root             'static_pages#home'
    post             'user_token', to: 'user_token#create'
    
    # we want our routes to be /api/routes but not our controllers
    # this may need to be reevalutated if we get lots of non api
    # controllers
    scope :api do
        post         'signup', to: 'users#create'
        post         'user_token', to: 'user_token#create'
        resources    :users
    end
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
