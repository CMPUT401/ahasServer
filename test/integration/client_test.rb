require 'test_helper'

class Clients_test < ActionDispatch::IntegrationTest 
  test "respond to successful POST" do
      post '/api/client',
      params: {client: {name:  "Leeroy Jenkins", address: "1234 Fake St, Edmonton, Alberta",\
                       phoneNumber: "7809519085", email: "leeroyjenkins@gmail.com", licos: "40210.00",\
                       socialAssistance: "78000", pets: "123"}}, headers: authenticated_header

    assert_response 201
  end

  test "respond to failed POST" do
    post '/api/client',
    params: {client: {name:  "Leeroy Jenkins", address: "1234 Fake St, Edmonton, Alberta",\
                       phoneNumber: "7809519085", email: "leeroyjenkingmail.com", licos: "00",\
                       socialAssistance: "PINGPING", pets: "-123"}}, headers: authenticated_header

    assert_response :error
    assert JSON.parse(response.body)['errors'].count > 0
  end
end
