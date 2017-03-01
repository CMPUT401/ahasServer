require 'test_helper'

class Clients_test < ActionDispatch::IntegrationTest
  def setup
    @client = clients(:Justin)
    @client.save
  end

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

  test 'respond to successful GET' do
    good_id = @client.id.to_s
    get '/api/client/' + good_id, headers: authenticated_header

    assert_response :success
    assert JSON.parse(response.body)['success']
    
    # This is kind of convolutes but I'm lazy and this is the easiest way to ensure that a parsed JSON string matches a client
    assert_equal JSON.parse(@client.to_json), JSON.parse(response.body)['client']
  end

  test 'respond to failed GET' do
    bad_id = Client.last.id + 1
    get '/api/client/' + bad_id.to_s, headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end
end
