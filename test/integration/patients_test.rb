require 'test_helper'

class PatientsTest < ActionDispatch::IntegrationTest
  def setup
    @client = clients(:Justin)
    @client.save
    @patient = patients(:one)
    @patient.save
  end

  test 'posting invalid info to /api/patients' do
    assert_no_difference 'Patient.count' do
      post '/api/patients', headers: authenticated_header,
           params: { patient: { name: '',
                                gender: '',
                                colour: '',
                                tattoo: 'hi',
                                reproductive_status: nil,
                                age: '',
                                client: 0 } }
    end
    assert_response :error
    assert JSON.parse(response.body)['errors'].count > 0
  end

  test 'posting a valid patient' do

    post '/api/patients', headers: authenticated_header,
                          params: { patient: { name: 'Chairman Meow',
                              species: 'Cat',
                              gender: 'Female',
                              colour: 'Red',
                              tattoo: 18,
                              microchip: 0,
                              reproductive_status: 'Spade',
                             age: 23,
                              client: @client.id } }

    assert_response :success
  end

  test 'asking for invalid patient id returns a 404' do
    bad_id = Patient.last.id + 1
    get "/api/patients/" + bad_id.to_s, headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'asking for a valid patient id should return the correct patient' do
    good_id = @patient.id
    
    get '/api/patients/' + good_id.to_s, headers: authenticated_header

    assert_response :success
    assert JSON.parse(response.body)['success']
  end
end
