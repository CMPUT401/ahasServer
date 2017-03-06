require 'test_helper'

class Clients_test < ActionDispatch::IntegrationTest
  def setup
    @client = clients(:Justin)
    @client.save
  end

  test "respond to successful POST" do
      post '/api/client',
      params: JSON.parse(@client.to_json), headers: authenticated_header
    assert_response :success
  end

  test "respond to failed POST" do
  
    post '/api/client',
    params: {client: {firstName:  "Leeroy Jenkins", address: "1234 Fake St, Edmonton, Alberta",\
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

  test 'respond to GET all' do

  get '/api/client', headers: authenticated_header

  putc JSON.parse(response.body.to_s)
  end

end
