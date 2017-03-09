require 'test_helper'

class NotesTest < ActionDispatch::IntegrationTest
  def setup
    @good = notes(:one)
    @good.save
    @medical_record = medical_records(:one)
    @note = {
      medical_record_id: @medical_record.id,
      body: 'hello',
      initials: 'jk rowling'
    }
  end

  test 'posting a valid note' do
    post "/api/patients/#{@medical_record.patient_id}/medical_records/#{@medical_record.id}/notes", headers: authenticated_header, params: { note: @note }
    
    assert_response 201
    assert JSON.parse(response.body)['success']
  end

  test 'posting a invalid note' do
    @note['body'] = ''
    assert_no_difference 'Note.count' do
      post "/api/patients/#{@medical_record.patient_id}/medical_records/#{@medical_record.id}/notes", headers: authenticated_header, params: { note: @note }
      
      assert_response :error
      assert_not JSON.parse(response.body)['success']
    end
  end

  test 'asking for a valid client' do
    get "/api/patients/#{@medical_record.patient_id}/medical_records/#{@medical_record.id}/notes/#{@good.id}", headers: authenticated_header

    assert_response :success
    assert JSON.parse(response.body)['note']['id'] == @good.id
  end

  test 'asking for an invalid client' do
    @bad_id = Note.last.id + 1
    get "/api/patients/#{@medical_record.patient_id}/medical_records/#{@medical_record.id}/notes/#{@bad_id}", headers: authenticated_header

    assert_response 404
    assert !JSON.parse(response.body)['error'].nil?
  end

  test 'get index of notes for medical records' do
    get "/api/patients/#{@medical_record.patient_id}/medical_records/#{@medical_record.id}/notes", headers: authenticated_header

    assert_response 200
    assert JSON.parse(response.body)['notes'].length > 0
  end
end
