require 'test_helper'

class ClientControllerTest < ActionDispatch::IntegrationTest
  test "check recieve HTTP POST" do
  end

  test "create client with good input" do
    name = "Leeroy Jenkins"
    address = "1234 Fake St, Edmonton, Alberta"
    phone = "780-951-9085"
    email = "leeroyjenkins@gmail.com"
    licos = 40210.00
    aish = 91231.00
    socialAssistance = 1231.00
    pets = 1
    client = Client.new(name, address, phone, email, licos, aish, socialAssistance, pets)
    assert_not_equal client, nil
  end

  test "create client with bad input" do
    name = "Leeroy Jenkins"
    address = "1234 Fake St, Edmonton, Alberta"
    phone = "780951-85"
    email = "leeroyjenkins.gmail.com"
    licos = 40123
    aish =  -10123
    socialAssistance = -12310.00
    pets = 1
    client = Client.new(name, address, phone, email, licos, aish, socialAssistance, pets)
    assert_equal client, nil
  end

  test "respond to successful POST" do
    name = "Leeroy Jenkins"
    address = "1234 Fake St, Edmonton, Alberta"
    phone = "780-951-9085"
    email = "leeroyjenkins@gmail.com"
    licos = 40210.00
    aish = 91231.00
    socialAssistance = 1231.00
    pets = 1
    client = Client.new(name, address, phone, email, licos, aish, socialAssistance, pets)
    client.sendResponse()
    assert_response :success
  end

  test "respond to failed POST" do
    name = "Leeroy Jenkins"
    address = "1234 Fake St, Edmonton, Alberta"
    phone = "780951-85"
    email = "leeroyjenkins.gmail.com"
    licos = 40123
    aish =  -10123
    socialAssistance = -12310.00
    pets = 1
    client = Client.new(name, address, phone, email, licos, aish, socialAssistance, pets)
    client.sendResponse()
    assert_response :fail
  end
end
