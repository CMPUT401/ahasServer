class ApplicationController < ActionController::Base
  include Knock::Authenticable
  before_action :authenticate_user
  rescue_from Exception, with: :server_error
  
  # set_access
  use Rack::Cors do
    allow do
      origins '*' #-> has to be "*" or specific
      resource '*', headers: :any, methods: [:get, :post, :options]
    end
  end
  # before_action :authenticate_user


  def server_error(exception)
    unless performed?
      respond_to do |format|
        format.html { render "all/errors/server_error", status: status}
        format.all { head status }
      end
    end
  end
end
