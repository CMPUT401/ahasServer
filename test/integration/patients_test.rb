require 'test_helper'

class PatientsTest < ActionDispatch::IntegrationTest
  test "posting to /api/patients should succeed" do
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
    #        put(response.body)
    # I should get a list of errors back
    assert JSON.parse(response.body)['errors'].count > 0
  end
end
