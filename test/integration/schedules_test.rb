require 'test_helper'

class SchedulesTest < ActionDispatch::IntegrationTest
  def setup
  @client = clients(:Justin)
  @client.save
  end

  test 'posting invalid info to /api/schedules' do
    assert_no_difference 'Schedule.count' do
      post '/api/schedules', headers: authenticated_header,
        params:{schedule: { appointmentDate: '',
                            clientId: '',
                            reason: '',
                            notes: 0,
                            location: ''} }
    end
    assert_response :error
    assert JSON.parse(response.body)['errors'].count > 0
  end

  test 'posting a valid schedule to /api/schedules' do
    post '/api/schedules', headers: authenticated_header,
          params: {schedule: { appointmentDate: '1489077477',
                               clientId: @client.id,
                               reason: 'bitey dog',
                               notes: '',
                               location: '1234 fake st', 
                               duration: "20"}}

    assert_response 201 
  end

end
