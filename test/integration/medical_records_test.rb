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
  end

   test 'Posting a valid medical record' do
    post '/api/medical_records', headers: authenticated_header, params: { medical_record: @medical_record }

    assert_response :created
  end
  
  test 'Posting invalid medical record fails' do
    @medical_record['heart_rate'] = 'blue'
    post '/api/medical_records', headers: authenticated_header, params: { medical_record: @medical_record }

    assert_response :error
  end
end
