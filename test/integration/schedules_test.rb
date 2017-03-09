require 'test_helper'

class SchedulesTest < ActionDispatch::IntegrationTest
  def setup
  @client = clients(:Justin)
  @client.save
  @schedule = schedules(:one)
  @schedule.save
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

  test 'respond to successful GET /id' do
    good_id = @schedule.id.to_s
    get '/api/schedules/' + good_id, headers: authenticated_header

    assert_response :success
    assert JSON.parse(response.body)['success']

    # This is kind of convolutes but I'm lazy and this is the easiest way to ensure that a parsed JSON string matches a client
    assert_equal JSON.parse(@schedule.to_json), JSON.parse(response.body)['schedule']
  end

  test 'respond to failed GET' do
    bad_id = Schedule.last.id + 1
    get '/api/schedules/' + bad_id.to_s, headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end
  test 'respond to GET all' do
    get '/api/schedules', headers: authenticated_header
    assert_response :success
  end

end
