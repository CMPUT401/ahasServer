
Rails.application.routes.draw do

  get 'api/patients/:patient_id/images/:filter', to: 'images#index'
  # we want our routes to be /api/routes but not our controllers
  # this may need to be reevalutated if we get lots of non api
  # controllers
  scope :api do
    constraints format: :json do
      post         'signup',     to: 'users#create'
      post         'user_token', to: 'user_token#create'
      post         'login',      to: 'user_token#create'
      post         'patients/:patient_id/medications/', to: 'medications#show'
      get          'patients/:patient_id/medications/:id', to: 'medications#show'
      get          'patients/:patient_id/medications/', to: 'medications#index'
      # post        'patient/:patient_id/medical_records/:medical_record_id', to: 'medical_records#create'
      # get         'patients/:patient_id/medical_records',                    to: 'medical_record#index'
      # get         'patients/:patient_id/medical_records/:medical_record_id', to: 'medical_records#show'
      
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
