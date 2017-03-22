
require 'test_helper'

class MedicalRecordsTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @patient_id = patients(:one).id.to_s
    @medication = medications(:one)
    @medication.medical_record_id = ''
    @medical_record = {
      patient_id: @patient_id,
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

    @show_record = medical_records(:one)
    @finalized_record = medical_records(:two)
    @show_record2 = medical_records(:two)
  end

  test 'Posting a valid medical record' do
    post "/api/patients/#{@patient_id}/medical_records", headers: authenticated_header, params: { medical_record: @medical_record }

    assert JSON.parse(response.body)['success']
    assert_response :created
  end

  test 'Posting invalid medical record fails' do
    @medical_record['heart_rate'] = 'blue'
    post "/api/patients/#{@patient_id}/medical_records", headers: authenticated_header, params: { medical_record: @medical_record }

    assert_response :error
    assert_not JSON.parse(response.body)['success']
    assert JSON.parse(response.body)['errors'].length > 0
  end

  test 'Get medical_record' do
    good_id = @show_record.id.to_s

    get "/api/patients/#{@patient_id}/medical_records/#{good_id}", headers: authenticated_header

    assert_response :success
    assert JSON.parse(response.body)['medical_record']['id'].to_s == good_id
  end

  test 'Get invalid medical_record' do
    bad_id = @show_record.id + 1

    get "/api/patients/#{@patient_id}/medical_records/#{bad_id}", headers: authenticated_header

    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end

  test 'get medical record index' do
    @show_record2[:created_at] = Date.yesterday
    @show_record2.save
    get "/api/patients/#{@patient_id}/medical_records", headers: authenticated_header

    assert_response 200
    assert JSON.parse(response.body)['success']
    assert JSON.parse(response.body)['medical_records'].length > 0
  end

  test 'post medical record with json' do
    @medical_record['medicine'] = @medicine.to_json
    post "/api/patients/#{@patient_id}/medical_records", headers: authenticated_header, params: { medical_record: @medical_record }

    assert JSON.parse(response.body)['success']
    assert_response :created
  end

  test 'PUT a current medical record with invalid input' do
    id = @show_record.id.to_s
    @medical_record['heart_rate'] = "potato"
    put "/api/patients/#{@patient_id.to_s}/medical_records/" + id,
    headers: authenticated_header,
    params: {medical_record: @medical_record}

    assert_response :error
  end

  test 'PATCH a current medical record with invalid input' do
    id = @show_record.id.to_s
    @medical_record['heart_rate'] = "potato"
    patch "/api/patients/#{@patient_id.to_s}/medical_records/" + id,
    headers: authenticated_header,
    params: {medical_record: @medical_record}

    assert_response :error
  end

  test 'PUT a current medical record' do
    id = @show_record.id.to_s

    put "/api/patients/#{@patient_id.to_s}/medical_records/" + id,
    headers: authenticated_header,
    params: { medical_record: @medical_record }

    assert_response :success

  end

  test 'PUT a current medical record with medication that is not in database' do
    id = @show_record.id.to_s
    
    put "/api/patients/#{@patient_id.to_s}/medical_records/" + id,
    headers: authenticated_header,
    params: { medical_record: @show_record.attributes}
    assert_response :success

  end

  test 'PUT out dated medical record fails' do
    id = @show_record.id.to_s

    @show_record.created_at = 1.day.ago
    @show_record.save()
    put "/api/patients/#{@patient_id}/medical_records/" + id, headers: authenticated_header, params: { medical_record: @medical_record }

    assert_response :error
    assert_not JSON.parse(response.body)['success']
    @show_record.created_at = 0.day.ago
  end

  test 'patch a current medical record' do
    id = @show_record.id.to_s
    patch "/api/patients/#{@patient_id.to_s}/medical_records/" + id,
    headers: authenticated_header,
    params: {medical_record: @medical_record}

    assert_response :success
  end

  test 'patch out dated medical record fails' do
    id = @show_record.id.to_s

    @show_record.created_at = 1.day.ago
    @show_record.save()
    patch "/api/patients/#{@patient_id}/medical_records/" + id, headers: authenticated_header, params: { medical_record: @medical_record }

    assert_response :error
    assert_not JSON.parse(response.body)['success']
    @show_record.created_at = 0.day.ago
  end

end
