require 'test_helper'

class PatientsTest < ActionDispatch::IntegrationTest

  def setup
    @client = clients(:Justin)
    @client.save
  end
  
  test 'posting invalid info to /api/patients' do
    assert_no_difference 'Patient.count' do
      post '/api/patients', params: { patient: { name: '',
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

  test 'posting a valid patient to /api/patients should' do

    post '/api/patients', params: { patient: { name: 'Chairman Meow',
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
end
