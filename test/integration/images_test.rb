require 'test_helper'

class ImagesTest < ActionDispatch::IntegrationTest
  def setup
    @patient = patients(:one)
    @radiograph = images(:one)
    @lab_result = images(:two)
    @portrait = images(:three)
  end

  test 'getting an image with a filter of portrait should return the proper type' do
    get "/api/patients/#{@patient.id}/images/filter/portrait", headers: authenticated_header

    images = JSON.parse(response.body)['images']
    assert_response 200
    assert images.length == 1
    assert images[0]['picture_type'] == 'portrait'
  end

  test 'getting an image with a filter of lab_result should return the proper type' do
    get "/api/patients/#{@patient.id}/images/filter/lab_result", headers: authenticated_header

    images = JSON.parse(response.body)['images']
    assert_response 200
    assert images.length == 1
    assert images[0]['picture_type'] == 'lab_result'
  end
  
  test 'getting an image with a filter of radiograph should return the proper type' do
    get "/api/patients/#{@patient.id}/images/filter/radiograph", headers: authenticated_header

    images = JSON.parse(response.body)['images']
    assert_response 200
    assert images.length == 1
    assert images[0]['picture_type'] == 'radiograph'
  end
  
  test 'index of images returns all images' do
    get "/api/patients/#{@patient.id}/images", headers: authenticated_header
    assert_response 200
    assert JSON.parse(response.body)['images'].length > 0
  end

  test 'can of images returns all images' do
    get "/api/patients/#{@patient.id}/images", headers: authenticated_header
    assert_response 200
    assert JSON.parse(response.body)['images'].length > 0
  end
end
