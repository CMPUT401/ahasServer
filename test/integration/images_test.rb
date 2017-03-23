require 'test_helper'

class ImagesTest < ActionDispatch::IntegrationTest
  def setup
    @patient = patients(:one)
    @radiograph = images(:one)
    @lab_result = images(:two)
    @portrait = images(:three)
  end
  test 'getting an image should return all images of that type' do
    get "/api/patients/#{@patient.id}/images/filter/radiograph", headers: authenticated_header

    assert_response 200
    assert JSON.parse(response.body)['images'].length == 1
  end

  test 'index of images returns all images' do
    get "/api/patients/#{@patient.id}/images", headers: authenticated_header
    assert_response 200
    assert JSON.parse(response.body)['images'].length > 0
  end
end
