require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
    test "invalid account infomation should fail" do
        assert_no_difference 'User.count' do
            post signup_path, params: { user: { name: "",
                                                email: "justin@invalid",
                                                password: "foo",
                                                password_confirmation: "bar" } }
        end
        assert_response :error
#        put(response.body)
        # I should get a list of errors back
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
end
