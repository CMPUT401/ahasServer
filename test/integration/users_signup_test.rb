require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
    test "invalid account infomation should fail" do
        assert_no_difference 'User.count' do
            post signup_path, params: { user: { name: "",
                                              email: "justin@invalid",
                                              password: "foo",
                                              password_confirmation: "bar" } }
        end
        assert_response :missing
    end
end
