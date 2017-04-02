
Rails.application.routes.draw do
  # we want our routes to be /api/routes but not our controllers
  # this may need to be reevalutated if we get lots of non api
  # controllers
  scope :api do
    constraints format: :json do

      post         'admin/invite',         to: 'admins#invite'
      get          'admin/users',          to: 'admins#index'
      post         'admin/reset_password', to: 'admins#reset_password'
      delete       'admin/users/:id',      to: 'admins#delete'
      get          'admin/users/:id',      to: 'admins#show'
      
      post         'signup',               to: 'users#create'
      get          'users/:token',         to: 'users#show'
      post         'reset_password',       to: 'users#reset_password'
      post         'user_token',           to: 'user_token#create'
      post         'login',                to: 'user_token#create'
      
      get          'patients/:patient_id/medications/:id', to: 'medications#show'
      get          'patients/:patient_id/medications/', to: 'medications#index'
      get          'patients/:patient_id/medications/filter/:filter', to: 'medications#filter'
      

      get          'patients/:patient_id/images',   to: 'images#index'
      get          'patients/:patient_id/images/:id', to: 'images#show'
      get          'patients/:patient_id/images/filter/:filter', to: 'images#filter'
      post         'patients/:patient_id/images',    to: 'images#create'
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

  get '*path', to: 'static_pages#home'
#  mount_ember_app :frontend, to: '/'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
