class ApplicationController < ActionController::Base
  include Knock::Authenticable
  # set_access
  use Rack::Cors do
    allow do

      origins '*' #-> has to be "*" or specific
      resource '*', headers: :any, methods: [:get, :post, :options]
    end
  end
#  before_action :authenticate_user
  def set_access
    @response.headers["Access-Control-Allow-Origin"] = "*"
  end
end
