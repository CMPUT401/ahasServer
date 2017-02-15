require 'test_helper'

class ClientControllerTest < ActionDispatch::IntegrationTest

  test "respond to successful POST" do
      post "/client", 
      params: {client: {name:  "Leeroy Jenkins", address: "1234 Fake St, Edmonton, Alberta",\
                       phone: "7809519085", email: "leeroyjenkins@gmail.com", licos: "40210.00",\
                       socialAssistance: "78000", pets: "123"}}

    assert_response :success
  end
#
#  test "respond to failed POST" do
#    name = "Leeroy Jenkins"
#    address = "1234 Fake St, Edmonton, Alberta"
#    phone = "780951-85"
#    email = "leeroyjenkins.gmail.com"
#    licos = 40123
#    aish =  -10123
#    socialAssistance = -12310.00
#    pets = 1
#    client = Client.new(name, address, phone, email, licos, aish, socialAssistance, pets)
#    client.sendResponse()
#    assert_response :fail
#  end
end
