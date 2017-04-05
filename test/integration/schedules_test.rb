require 'test_helper'

class SchedulesTest < ActionDispatch::IntegrationTest
  def setup
    @patient = patients(:one)
    @patient.save
    @patient_id = @patient.id
    @schedule = schedules(:one)
    @schedule.save
    @schedule2 = schedules(:two)
    @schedule2.save
    @scheduleBody = {schedule:{patient_id: @patient_id.to_s,
                                 reason:"foaming at mouth",
                                 notes:"really bitey",
                                 location:"1234 Fake St.",
                                 appointmentStartDate:1490786591,
                                 appointmentEndDate:1490790191}}

  end

  test 'posting invalid info to /api/schedules' do
    assert_no_difference 'Schedule.count' do
      post '/api/schedules', headers: authenticated_header,
        params:{schedule: { appointmentStartDate: '',
                            patient_id: '',
                            reason: '',
                            notes: 0,
                            location: ''} }
    end
    assert_response :error
    assert JSON.parse(response.body)['errors'].count > 0
  end

  test 'posting a valid schedule to /api/schedules' do
    post '/api/schedules', headers: authenticated_header,
      params: {schedule: { appointmentStartDate: '1489077477',
                           patient_id: @patient_id.to_s,
                           reason: 'bitey dog',
                           notes: '',
                           location: '1234 fake st',
                           appointmentEndDate: '1489083859'}}

      assert_response 201
  end

  test 'Schedule respond to successful GET /id' do
    good_id = @schedule.id.to_s
    get '/api/schedules/' + good_id, headers: authenticated_header

    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  test 'Schedule respond to failed GET' do
    bad_id = Schedule.last.id + 1
    get '/api/schedules/' + bad_id.to_s, headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'Schedule respond to GET all' do
    get '/api/schedules', headers: authenticated_header
    assert_response :success
  end

  test 'respond to successful PUT' do
    id = @schedule.id.to_s
    put '/api/schedules/' + id, params: @scheduleBody, headers: authenticated_header
    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  test 'respond to unsuccessful PUT because of bad ID' do
    id = @schedule.id + 1
    put '/api/schedules/' + id.to_s, params: @scheduleBody, headers: authenticated_header
    assert_response 404
  end

  test 'respond to unsuccessful PUT because of bad input' do
    id = @schedule.id.to_s
    put '/api/schedules/'+ id,
    params: {"schedule":{patient_id:1,
                                 reason:"foaming at mouth",
                                 notes:"really bitey",
                                 location:"1234 Fake St.",
                                 appointmentStartDate: "ABCD",
                                 appointmentEndDate:1490790191}},
                                 headers: authenticated_header

    assert_response :error
    assert JSON.parse(response.body)['errors'].count > 0
  end

  test 'respond to successful DELETE' do
    id = @schedule.id.to_s
    delete '/api/schedules/' + id, params: @scheduleBody, headers: authenticated_header
    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  test 'respond to DELETE of bad ID' do
    id = @schedule2.id + 1
    delete '/api/schedules/' + id.to_s, params: @scheduleBody, headers: authenticated_header
    assert_response 404
  end
end
