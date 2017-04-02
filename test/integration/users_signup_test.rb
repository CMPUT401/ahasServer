require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
  test "An admin can signin" do
    post '/api/user_token', params: { auth: { email: "admin@ahas.dev",
                                             password: "bizbazboo" } }
  end

  test "A user can signin" do
    post '/api/user_token', params: { auth: { email: "jbarclay@ualberta.ca",
                                              password: "foobarbaz" } }
  end
end
