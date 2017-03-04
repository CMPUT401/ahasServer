require 'test_helper'

class Clients_test < ActionDispatch::IntegrationTest
  test "respond to successful POST" do
      post '/api/client',
      params: {client: {firstName:  "Leeroy", lastName: "Jenkins", address: "1234 Fake St, Edmonton, Alberta",\
                       phoneNumber: "7809519085", email: "leeroyjenkins@gmail.com", licos: "40210.00",\
                       socialAssistance: "78000", pets: "123",
                       alternativeContactPhoneNumber: "7809999999", alternativeContactAddress: "484 fake st, Canada",\
                       notes: "Client is angry", alternativeContact2ndPhone: "7809519084",\
                       alternateContactEmail: "jimmy@jim.com"}}, headers: authenticated_header
    assert_response :success
  end

  test "respond to failed POST" do
    post '/api/client',
    params: {client: {firstName:  "Leeroy", AddLastName: "Jenkins", address: "1234 Fake St, Edmonton, Alberta",\
                       phoneNumber: "7809519085", email: "leeroyjenkingmail.com", licos: "00",\
                       socialAssistance: "PINGPING", pets: "-123"}}, headers: authenticated_header

    assert_response :error
    assert JSON.parse(response.body)['errors'].count > 0
  end
end
