require 'test_helper'

class ImagesTest < ActionDispatch::IntegrationTest
  def setup
    @patient = patients(:one)
    @radiograph = images(:one)
    @lab_result = images(:two)
    @portrait = images(:three)
    @new_image = {
      picture_type: 'portrait',
      name: 'three.jpg',
      patient_id: @patient.id,
      date: 111111,
      data_type: 'jpg',
      data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAKL0lEQVR4nO2bfVAU9xnHadIk7SRt+jbT6TSdSfCd293b3TtANFFMzJtNM82MtE0yTTCJJsFaRQPeOwdoFHkRVOCOe9vdu+PVWHWUtKKoIMi9H/g2jprEmBhfEj0OfIuN3/5xB4Iv1STc7ZjkM/PMwrG7z+f72+f24ICEhB/4ge8dOTZ6zLxVo+8T20MUlAIzVcEz08X2EAWFjU5XcUy12B6ioOKYJ1QCc0hRRf5SbJe4o+GZ6Ro7c0nJs8+J7RJ3NJz0KY2dvayvk60X2yXuDITXOtjeBTb6F2L7xBUVzzyrc7K9WqfsS6VAzxDbJ66oeOZZXS0TKtksv6x10A1i+8QVpUDPyKtlek3tE6Fx0qcWGxMfFNspbqgF6k+6Ojbk9E1BfgMdUgnSp8V2ihtKjno+r5btbQg+gZJm4qLWydSJ7RQ3lHb6z3m1bG9Tz9OobiOgcTIn5q0a/XOxveKCmpe+kFfL9q7bOwPmLiIy+nb6SbG94oKSZ2bm1bK96/c9B6ubRGkzeVHroO1ie8UFtUBn5NWxvRsPvACrm4KhnYTWwXyWaxn3M7HdYs5A+E0HM2DzSWF2EdDX0yGNQD0utlvMUQnU3/Lq2N73D78E3kvD6iZQ3Exc0DloTmy3mDMQfsuRv0PwM7B6SFS3E9A6mM+yKiUPiO0XU9R2+mV9Hdu79YNZsAdksLoJWNzR0bfR6WL7xZSB8K0fzYEzmAyrh4TVQ6K4mbygc9JWsf1iitpBv5rfwIZ3HH0bdd2pkfBeEoZdJLRO5tN3iqn7xXaMGVqBzsxvYMNtx/6Bxr2TYPOQsHnJ6OgzIaWNekxsx5ihcjCv5TfIwu2fzEfTvsdg85KDVdxMXtA56BqxHWOGRmBeL2iQhTs/XYj39k+DzUcOlmEXCa2D/iS77KGfiu0ZEzQC83pBoyzceXwRNhx8cvCqc77IjU9fz4SUHD1ZbM+YoLGzbxY0ysJdJ3Kx6dCzsPkiwQe2JZup81rHd/R9fbXAvFXYKAu7TirQfOT5YWPPRUdf56CPxX30FTb2GSU//tex7KF20FkFjWyf+6Qa//lwJrihV94f2erqmVCujZoYS4/rUDqYmTon2691MPtj9XqrEei5BY1sn+eUDluPvgjOT15XxZuo8xoHvSYW/W+K0sHMzK9nwwDg6Mr4SutkOjP0kntHsofGTs8vaJT1+U7rsf3Yq8NCD73raxzSjzNtD/9kJHv/XwbC7z6uQPBsPvaFi2He8cfLWiezMUGfcNdI9NDY6fmFTbI+/+f5aDs+G7yfBBcgwQ+Gp8D5Kejq6FAuL00ZiZ63hdLBzNTXs+Hdx5VoOz4bQpBC67FXsD9cgsqW6V/q7FLzt+2hdtALCptkfYHPC9F5Yi64QPTKB6Lf7Pik4Pw0VmyizqkFacVI5LoVP5q3avR9kfCycMenC7Hp8AzwARJ8ICK285NZ2BcuRtnmqRe1DqbwmzbSCMyiJU3yvsCZJXCdyh7swUcXweKVwuZjYOigoLbTH8XlDxkyGhPu1tXL3s6rZ/paj85Bw97UYWJ8kAIfINF+fDb29hZj2fpJFzQCPffr9tHY6ZzCtfK+4Jl34TmdO7xHgITFI4XVy4L3M9DW0qFcCyGPRd7rUHHSv+jrmP6mPTPA+ykI14gJ0QXgAyQ6Pnsb3WeWY0lj6nm1QGfcbg+Nk1m8dK28v/vMMvi/UEPolg7rYfWSsHhk4IJyFG2izqkEaVksMw9DxTGv5DcyfZyXhc1Hw+qLhBaCFPgh24HaffKf8J9egvx6eb/Ceuv34dQORrH0PXl/99llCJ7Vwx4NP9CD85EwuxlYfckwdNJQ8tIPR/oV55aoBGZRfiPdywXlsHgZWLzkdcGHLobrVDZcJ/TQ18rCOVaKvdl51QKjWbpW3t9zdjm6Q4Vw9jDDFpcPUjC7aZg9yeADcqid0lCO8ebniylqni5e8p40zAeSI1ckughC9w0qSMFzOgftHyugc7JnFWbJ6GvPp7Iz2qVr5f17QsXY0/suaveyw47ngxQsbgomdzK4YCqKNkrPqXhqhRjZr0oLFL9sg7SfD6bC5IouQlTafoNF8H6hwLbDi6B2MCcWGCf8buA8SoHRLV0r79/TW4J94RWo2yOPHB+8eqzNS8LkksHqTYWhg4FCkB6ZY0y4R8z8CQn6hLsUPN1c1Cy9wAXSYOpiIveEa8Lbh2z9ZzTYfCDrikqgP1hsTHxQxdP6pWuT+/eGS7G/rwQN+1Jgv2YB+SAFk4uB2Z0CPpgKpZ0K5dRIaHHDR8nQS+5V2Kiu0n/Tlzh/Gmq6GNh85NUAPdRgIHs3BcceKYJn87HWn3llMUedXNIk698bLsOB/pVoPDAR9uj+Q48zuyiYXCngg2l4dwN1LtdKLhc79zCyKiUP5FjI/au2yv5r9aXB2EnDFp2EgTBCNwX74FaKj8+vxwCnLu3CuoOPRvbrGTIxPRQsXhLGLjksnjQYdrF4x0IcEn/0b8Ac49jfZNcQR9fslF8xeyahupO+7unAD/nY0UPj2PmNOH5pC/51MH34PtHnPhcgYehkULN7IvhAGnKtRGh+FUGJnfWmZFUSf1hUQ5w0dKTC5EpDdUdkEfieSLBry7GHwbqD6ZHPb7CPoZNEdWcKbIFHUbCOPJdtTFoqdsZbklVJTFhoJM4YutJg7EpDVTsFi58E102CC14tPlqDj13z9Ro3gaqOZJhck7CmjUW2SXIoXZ/wY7Hz3RZZ5WOTs41JYZNrMgydE7GmjYLFS8AWIG+rLF4Cle0MqjtSwfknI7tmQvitigmE2Lm+Flll459aYJjQb/Y8hqpdqVi9k4TJS8DiJ2Hxk7BeU0MfX9NOorItBTbfFOgaki7Mq5rwjX+iFJW3Vo17eb5h/HmLdyrW7ExBxQ4SNR4CZh8Bky+yNfuj22hVdkiweoccht2TULGduTKvetzhO2b0b8Sc8rGLFprHX7D6pmH1jmSUbydgdEtQ4yWuq2oXgYpWBqt3psLim4K5q8f1zyoZnSR2hm/NnLJxK7ItEy5ZfY+jolWO8lYCBrcExoHyEDB6CJRvJ1HRmgyrLx0Kx/hLb5aPuzNH/0a8UTbansNLLlu801C+TYaybRJUdUlQ7YpU+Y4klG+TobpjMkpaWLxRNuZIRkbC3WJ7jxz6hLveKB2zRemUfGV2p2PlVhnKtiahcncSVu1KQlkLjYrWZJg8UzG7dNT5F/UPjxdbecSRzUm45/WSUX5tE3WlpmsKylpYlLQkobSFxMoWGSyeacg2j72cWZSoF9s1Zjz1zm/vzyxKPFy4gb1i6HgUpVsYlG5hUdU+CcvfZzGr6JHv2OjfgAz9Q7/KLHrkRFFzCirbJmFliwwmdzpeWzHqYobmkXFi+8WFDPVDv89cnhgq2zoZnH865ptGf/Xq8kSd2F5x5a/6xLGZK0adU9VL8FrpqCMj9ZukO4qXCkbJMpePCr9UmDhGbBfRyNQ//P36J6UfuEP5H4UQYZJJu+KeAAAAAElFTkSuQmCC'
    }
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

  test 'can get one image' do
    get "/api/patients/#{@patient.id}/images/#{@radiograph.id}/", headers: authenticated_header

    image = JSON.parse(response.body)['image']
    assert_response 200
    assert image['name'] == 'one.jpg'
  end

  test 'can\'t get an image with a bad id' do
    get "/api/patients/#{@patient.id}/images/#{@radiograph.id+1}/", headers: authenticated_header
    
    assert_response 404
  end

  test 'can post a new image' do
    @patient.save
    post "/api/patients/#{@patient.id}/images", headers: authenticated_header, params: { image: @new_image }

    patient = Patient.find(@patient.id)
    assert_response 201
    assert_not patient.portrait_id.nil?
    assert JSON.parse(response.body)['success']
  end
end

