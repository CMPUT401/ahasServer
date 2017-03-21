require 'test_helper'

class MedicationsTest < ActionDispatch::IntegrationTest
  def setup
    @patient = patients(:one)
    @medical_record1 = medical_records(:one)
    @medication = medications(:one)
    @medication.patient_id = @patient.id
    @medication.medical_record_id = @medical_record1.id
    @medication.save

    @medication1 = { patient_id: @patient.id, name: 'Hydrogen Dioxide', med_type: "Medicine" }
    @medication2 = { patient_id: @patient.id, name: 'Sulfur Dioxide', med_type: "Other" }
    @medication3 = { patient_id: @patient.id, name: 'Nitrogen Dioxide', med_type: "Vaccine" }

    @medical_record = {
      patient_id: @patient.id,
      temperature: 38.5,
      exam_notes: 'No new notes',
      eyes: 'All good',
      oral: 'Speaks wonderfully',
      ears: 'Little bit deaf',
      glands: 'normal',
      skin: 'Covered in fur',
      abdomen: 'great abs',
      urogenital: 'normal',
      nervousSystem: 'Like Woody Allen',
      musculoskeletal: 'Titanium',
      cardiovascular: 'Like molasses',
      heart_rate: 88,
      respiratory: 'good',
      respiratory_rate: 31,
      attitudeBAR: true,
      attitudeQAR: true,
      attitudeDepressed: true,
      eyesN: true,
      eyesA: true,
      mmN: true,
      mmPale: true,
      mmJaundiced: true,
      mmTacky: true,
      earsN: true,
      earsA: true,
      earsEarMites: true,
      earsAU: true,
      earsAD: true,
      earsAS: true,
      glandsN: true,
      glandsA: true,
      skinN: true,
      skinA: true,
      abdomenN: true,
      abdomenA: true,
      urogenitalN: true,
      urogenitalA: true,
      nervousSystemN: true,
      nervousSystemA: true,
      musculoskeletalN: true,
      musculoskeletalA: true,
      cardiovascularN: true,
      cardiovascularA: true,
      respiratoryN: true,
      respiratoryA: true,
      oralA: true,
      oralN: true,
      mcsMod: true,
      mcsN: true,
      mcsMild: true,
      mcsSevere: true,
      weight: 100,
      weightUnit: "kg",
      bcsVal: 18
    }
  end

  test 'get medicine' do
    get "/api/patients/#{@patient.id}/medications/#{@medication.id}", headers: authenticated_header

    assert_response 200
    assert JSON.parse(response.body)['success']
  end

  test 'get medicine id that doesn\'t exist' do
    bad_id = Medication.last.id + 1

    get "/api/patients/#{@patient.id}/medications/#{bad_id}", headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'get medicine index' do
    get "/api/patients/#{@patient.id}/medications", headers: authenticated_header
    assert_response 200
    assert JSON.parse(response.body)['medications'].length > 0
  end

  test 'posting to medical records, with medications as one of the parameters succeeds' do
    before = Medication.count
    medications = { '0' => @medication1, '1' => @medication2, '2' => @medication2 }
    
    post "/api/patients/#{@patient.id}/medical_records", headers: authenticated_header,
                                                         params: {
                                                           medical_record: @medical_record,
                                                           medications: medications
                                                         }
    after = Medication.count
    assert after > before
    assert_response 201
    assert JSON.parse(response.body)['success']
  end

    test 'putting to medical records, with medications as one of the parameters succeeds' do
    old_id = @medication.id  
    old_name = @medication.name
    @medication.name = 'Hello Hello'
    medications = { '0' => @medication.attributes }
    put "/api/patients/#{@patient.id}/medical_records/#{@medical_record1.id}", headers: authenticated_header,
                                                         params: {
                                                           medical_record: @medical_record,
                                                           medications: medications
                                                         }
    saved_med = Medication.find(old_id)
    assert old_name != saved_med.name
    assert_response 201
    assert JSON.parse(response.body)['success']
  end
end
