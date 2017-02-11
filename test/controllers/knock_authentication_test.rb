require 'test_helper'

class KnockAuthenticationTests < ActionDispatch::IntegrationTest
    def setup
        @user = users(:justin)
    end

    test "logging in a valid user" do
        post "/api/user_token", params: {auth: { email: @user.email, password: "foobarbaz"} }
        assert_response 201
    end

    test "logging in a valid username but wrong password should fail" do
        post "/api/user_token", params: {auth:{ email: @user.email, password: "wrongpassword"} }
        assert_response :missing
    end
    

    test "logging in the wrong user should fail" do
        user = {email: "bligh@ualberta.ca", password: "fail"}
        post "/api/user_token", params: {auth: user}
        assert_response :missing
    end

    # test "passing in JWT authentication to Authorization header"
    # end
end
