
require 'test_helper'

class MedicalRecordsTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @medical_record = {
      temperature: 38.5,
      notes: 'No new notes',
      medications: 'This might need to be removed',
      eyes: 'All good',
      oral: 'Speaks wonderfully',
      ears: 'Little bit deaf',
      glands: 'normal',
      skin: 'Covered in fur',
      abdomen: 'great abs',
      urogential: 'normal',
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
      urogentialN: true,
      urogentialA: true,
      nervousSystemN: true,
      nervousSystemA: true,
      musculoskeletalN: true,
      musculoskeletalA: true,
      cardiovascularN: true,
      cardiovascularA: true,
      respiratoryN: true,
      respiratoryA: true
    }

    @show_record = medical_records(:one)
    
    unless @show_record.save
      throw Error
    end
  end

  test 'Posting a valid medical record' do
    post '/api/medical_records', headers: authenticated_header, params: { medical_record: @medical_record }

    assert JSON.parse(response.body)['success']
    assert_response :created
  end

  test 'Posting invalid medical record fails' do
    @medical_record['heart_rate'] = 'blue'
    post '/api/medical_records', headers: authenticated_header, params: { medical_record: @medical_record }

    assert_response :error
    assert_not JSON.parse(response.body)['success']
    assert JSON.parse(response.body)['errors'].length > 0
  end
  
  test 'Get medical_record' do
    good_id = @show_record.id.to_s

    get '/api/medical_records/' + good_id, headers: authenticated_header

    assert_response :success
    assert JSON.parse(response.body)['medical_record']['id'].to_s == good_id
  end

  test 'Get invalid medical_record' do
    bad_id = @show_record.id + 1

    get '/api/medical_records/' + bad_id.to_s, headers: authenticated_header

    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end
end
