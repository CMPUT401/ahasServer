require 'test_helper'

class ImagesTest < ActionDispatch::IntegrationTest
  def setup
    @patient = patients(:one)
    @image = images(:one)
  end
  test 'getting an image should return all images of that type' do
    get "/api/patients/#{@patient.id}/images/radiograph", headers: authenticated_header

    assert_response 200
#    assert JSON.parse(response.body)['images'] > 0
  end

  # test 'index of image type returns nothing but images of those types' do
  #   get '/api/patient/#{@patient.id}'
  # end
end
