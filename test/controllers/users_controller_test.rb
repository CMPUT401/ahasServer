require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
    def setup
        @user =  {
            email: "jbarclay@ualberta.ca",
            password: "foobarz"
        }
        
    end

    test "logging in a valid user should be successful" do
        post "/api/login", params: @user
        assert response.success?
    end

    test "should create a new user" do
        
    end
end
