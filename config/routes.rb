
Rails.application.routes.draw do
  # we want our routes to be /api/routes but not our controllers
  # this may need to be reevalutated if we get lots of non api
  # controllers
  scope :api do
    constraints format: :json do
      get          'users',      to: 'users#index'
      post         'signup',     to: 'users#create'
      delete       'users/:id',  to: 'users#delete'    

      post         'user_token', to: 'user_token#create'
      post         'login',      to: 'user_token#create'
      
      get          'patients/:patient_id/medications/:id', to: 'medications#show'
      get          'patients/:patient_id/medications/', to: 'medications#index'
      get          'patients/:patient_id/medications/filter/:filter', to: 'medications#filter'
      

      get          'patients/:patient_id/images',   to: 'images#index'
      get          'patients/:patient_id/images/:id', to: 'images#show'
      get          'patients/:patient_id/images/filter/:filter', to: 'images#filter'
      post         'patients/:patient_id/images',    to: 'images#create'

      resources    :users
      resources    :patients do
        resources  :medical_records do
          resources :notes
        end
      end
      resources    :client
      resources    :contacts
      resources    :schedules
    end
  end
#  mount_ember_app :frontend, to: '/'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
