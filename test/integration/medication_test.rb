require 'test_helper'

class MedicationTest < ActionDispatch::IntegrationTest
  def setup
    @patient = patients(:one)
    @medical_record = medical_records(:one)
    @medicine = medicines(:one)
  end

  test 'get medicine' do
    get "/api/patients/#{@patient.id}/medicine/#{@medicine.id}", headers: authenticated_header

    assert_response 200
    assert JSON.parse(response.body)['success']
  end

  test 'get medicine id that doesn\'t exist' do
    bad_id = Medicine.last.id + 1

    get "/api/patients/#{@patient.id}/medicine/#{bad_id}", headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'get medicine index' do
    get "/api/patients/#{@patient.id}/medicine/", headers: authenticated_header
    assert_response 200
    assert JSON.parse(response.body)['medicine'].length > 0
  end
  
end
