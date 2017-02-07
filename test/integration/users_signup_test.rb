require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
    test "invalid account infomation should fail" do
        assert_no_difference 'User.count' do
            post '/api/signup', params: {name: "", email: "justin@invalid", password: "short", password_confirmation: "thing"}
        end
        assert_response :missing
    end
end
