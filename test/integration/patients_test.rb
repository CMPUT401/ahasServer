require 'test_helper'

class PatientsTest < ActionDispatch::IntegrationTest
  def setup
    @client = clients(:Justin)
    @client.save
    @patient = patients(:one)
    @patient2 = {patient: {client_id: 443855961, species:"Cat",
                           first_name:"Chairman Meow",last_name:"Barclay",
                           colour:"Red",reproductive_status:"Spade",
                           tattoo:197265, age:17,microchip: 0,
                           gender:"Male"}}
    @patient.save
    @medication = medications(:one)
    @medication2 = medications(:two)
    @show_record = medical_records(:one)
  end

  test 'posting invalid info to /api/patients' do
    assert_no_difference 'Patient.count' do
      post '/api/patients', headers: authenticated_header,
           params: { patient: { first_name: '',
                                last_name: '',
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
                          params: { patient: { first_name: 'Chairman Meow',
                                               last_name: 'Barclay',
                                               species: 'Cat',
                                               gender: 'Female',
                                               colour: 'Red',
                                               tattoo: 18,
                                               microchip: 0,
                                               reproductive_status: 'Spade',
                                               age: 23,
                                               client: @client.id } }

    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  test 'asking for invalid patient id returns a 404' do
    bad_id = Patient.last.id + 1
    get '/api/patients/' + bad_id.to_s, headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'asking for a valid patient id should return the correct patient' do
    good_id = @patient.id

    @medication.reminder = (Date.today + 1.months).to_time.to_i
    @medication2.reminder =  (Date.today + 4.months).to_time.to_i

    @medication.save
    @medication2.save
    get '/api/patients/' + good_id.to_s, headers: authenticated_header
    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  test 'getting an index should return a list of names and IDs' do
    get '/api/patients', headers: authenticated_header

    patients = JSON.parse(response.body)['patients']
    assert filtered_properly patients
    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  test 'a patient can have alerts' do
    good_id = @patient.id

    @medication.reminder = (Date.today + 1.months).to_time.to_i
    @medication2.reminder =  (Date.today + 4.months).to_time.to_i

    @medication.save
    @medication2.save
    get '/api/patients/' + good_id.to_s, headers: authenticated_header
    assert_response :success
    assert JSON.parse(response.body)['success']
    assert JSON.parse(response.body)['generalAlerts'].count > 0
    assert JSON.parse(response.body)['medicationAlerts'].count == 1
  end

  test 'respond to successful PUT' do
    id = @patient.id.to_s
    put '/api/patients/' + id, params: @patient2, headers: authenticated_header
    assert_response :success
    assert JSON.parse(response.body)['success']
  end

 test 'respond to unsuccessful PUT because of bad ID' do
   id = @patient.id + 1
   put '/api/patients/' + id.to_s, params: @patient2, headers: authenticated_header
   assert_response 404
 end

  test 'respond to unsuccessful PUT because of bad input' do
    id = @patient.id.to_s
    put '/api/patients/'+ id,
    params: {patient: {client_id: 443855961, species:"Cat",
                           first_name:"Meow",last_name:"Barclay",
                           colour:"Red",reproductive_status:"Spade",
                           tattoo:197265, age:17,microchip: "ABABA",
                           gender:"Male"}}, headers: authenticated_header

      assert_response :error
      assert JSON.parse(response.body)['errors'].count > 0
  end

  def filtered_properly(patients)
    patients.each do |patient|
      unless ['first_name','last_name', 'id'].uniq.sort == patient.keys.uniq.sort
        return false
      end
    end
  end

end
