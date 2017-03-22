
class ApplicationController < ActionController::API
  include Knock::Authenticable
  rescue_from Exception, with: :server_error

  def server_error(exception)
    puts exception
    unless performed?
       render status: 500, json: {}
    end
  end
end
