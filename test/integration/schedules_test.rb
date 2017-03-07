require 'test_helper'

class SchedulesTest < ActionDispatch::IntegrationTest
  def setup
  @client = clients(:Justin)
  @client.save
  @scheduleInstance = schedules(:one)
  @scheduleInstance.clientId = @client.id
  @scheduleInstance.save
  end

  test 'posting invalid info to /api/schedules' do
    assert_no_difference 'Schedule.count' do
      post '/api/schedules', headers: authenticated_header,
        params: {schedule: { appointmentDate: ' ',
                             client: ' ',
                             notes: 0,
                             reason: 'foaming at mouth'}}
    assert_response :error
    assert JSON.parse(response.body)['errors'].count > 0
  end

  test 'posting a valid schedule to /api/schedules'
    post '/api/schedules', headers: authenticated_header,
          params: JSON.parse(@scheduleInstance.to_json)

    assert_response :success
  end

end
