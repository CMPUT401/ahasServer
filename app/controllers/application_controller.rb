# Sets up basis for our controllers, handles routes and errors as well as authentication
class ApplicationController < ActionController::API
  include Knock::Authenticable
  rescue_from Exception, with: :server_error

  # Returns a 500 error in event of server error, or unhandled exception and taters
  #
  # @param exception [Exception] the format type, :exception
  # @return [JSON]
  def server_error(exception)
    # Print to server
    puts exception
    # Send 500 error JSON
    unless performed?
       render status: 500, json: {}
    end
  end
end
