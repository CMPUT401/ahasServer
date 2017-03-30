require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
  def setup
    @admins = admins(:thing)
  end

  test "invalid account infomation should fail" do
    assert_no_difference 'User.count' do
      post signup_path, params: { user: { name: "",
                                          email: "justin@invalid",
                                          password: "foo",
                                          password_confirmation: "bar" } }
    end
    assert_response :error
    assert (JSON.parse(response.body)["errors"].count > 0)
  end

  test "An account with valid information" do
    old_count = User.count

    assert_same old_count, User.count
    post signup_path, params: { user: { name: "Mackenzie Bligh",
                                        email: "bligh@ualberta.ca",
                                        password: "bazfoobar",
                                        password_confirmation: "bazfoobar" } }
    assert User.count == old_count + 1
  end

  test "An admin can signup" do
    post '/api/user_token', params: { auth: { email: "admin@ahas.dev",
                                             password: "bizbazboo" } }

    puts JSON.parse(response.body)
  end

  test "A user can signup" do
    post '/api/user_token', params: { auth: { email: "jbarclay@ualberta.ca",
                                              password: "foobarbaz" } }

    puts JSON.parse(response.body)
  end
end
