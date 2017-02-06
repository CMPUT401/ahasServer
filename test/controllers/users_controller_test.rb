require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
    
    def setup
        @user = users(:justin)
    end

    test "logging in a valid user should be successful" do
        post "/user_token", params: {auth: @user}
        assert_response :success
    end

    test "should create a new user" do
        
    end
end
