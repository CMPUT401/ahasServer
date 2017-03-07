require 'test_helper'

class SchedulesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get schedules_new_url
    assert_response :success
  end

end
