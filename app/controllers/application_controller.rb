class ApplicationController < ActionController::Base
  include Knock::Authenticable
  # before_action :authenticate_user
  def set_acces
    @response.headers["Access-Control-Allow-Origin"] = "*"
  end
end
