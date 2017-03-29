ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def authenticated_header
    token = Knock::AuthToken.new(payload: { sub: users(:justin).id }).token

    { "Authorization": "Bearer #{token}" }
  end

  def authenticated_admin_header
    token = Knock::AuthToken.new(payload: { sub: admins(:thing).id }).token
    
    { "Authorization": "Bearer #{token}" }
  end
end
