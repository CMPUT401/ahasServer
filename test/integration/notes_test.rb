require 'test_helper'

class NotesTest < ActionDispatch::IntegrationTest
  def setup
    @good = notes(:one)
    @medical_record = medical_records(:one)
  end

  test 'posting a valid note' do
    post "/api/patients/#{@medical_record.patient_id}/medical_records/#{@medical_record.id}/notes", headers: authenticated_header, params: { note: {
                                                                                                                                               medical_record_id: @medical_record.id,
                                                                                                                                               body: 'hello',
                                                                                                                                               initials: 'jk rowling'
                                                                                                                                             }
                                                                                                                                           }
    
    assert_response 201
    assert JSON.parse(response.body)['success']
  end

  test 'posting a invalid note' do
    post "/api/patients/#{@medical_record.patient_id}/medical_records/#{@medical_record.id}/notes", headers: authenticated_header, params: { note: {
                                                                                                                                               medical_record_id: @medical_record.id,
                                                                                                                                               body: '',
                                                                                                                                               initials: 'jk rowling'
                                                                                                                                             }
                                                                                                                                           }
    
    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end
  
end
