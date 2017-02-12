require 'test_helper'

class PersonControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get person_new_url
    assert_response :success
  end

end
