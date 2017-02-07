require 'test_helper'

class KnockAuthenticationTests < ActionDispatch::IntegrationTest
    def setup
        @user = users(:justin)
    end

    test "logging in a valid user should be successful" do
        post "/user_token", params: {auth: { email: @user.email, password: "foobarbaz"} }
        assert_response :success
    end

    test "logging in a valid username but wrong password should fail" do
        post "/user_token", params: {auth:{ email: @user.email, password: "wrongpassword"} }
        assert_response :missing
    end
    

    test "loggin in the wrong user should fail" do
        user = {email: "bligh@ualberta.ca", password: "fail"}
        post "/user_token", params: {auth: user}
        assert_response :missing
    end
end
