class UserTokenController < Knock::AuthTokenController
  use Rack::Cors do
    allow do
      origins '*' #-> has to be "*" or specific
      resource '*', headers: :any, methods: [:get, :post, :options]
    end
  end
end
