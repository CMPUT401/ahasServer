class ApplicationController < ActionController::Base
  include Knock::Authenticable
  before_action :authenticate_user
  rescue_from Exception, with: :server_error

  def server_error(exception)
    unless performed?
      respond_to do |format|
        format.html { render 'all/errors/server_error', status: status}
        format.all { head status }
      end
    end
  end
end
