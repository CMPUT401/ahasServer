require 'test_helper'

class PicturesTest < ActionDispatch::IntegrationTest
  def setup
    @patient = patients(:one)
    @picture = pictures(:one)
  end
  test 'show picture should return a link and type' do
    get "/api/patient/#{@patient.id}/image/radiograph}"

    response_header 200
    assert_equal JSON.parse(response.body)['pictures'],
  end

  test 'index of image type returns nothing but images of those types' do
    get '/api/patient/#{@patient.id}'
  end
end
