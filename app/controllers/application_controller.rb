
class ApplicationController < ActionController::Base
  include Knock::Authenticable
  rescue_from Exception, with: :server_error

  def server_error(exception)
    unless performed?
      respond_to do |format|
        format.html { render status: status, json: status }
        format.all { head status }
      end
    end
  end
end
