require 'test_helper'

class Clients_test < ActionDispatch::IntegrationTest
  def setup
    @client = {client: { firstName: "Harry", lastName: "Potter",
                        addressLine1: "1234 Fake ave, Edmonton, Alberta",
                        phoneNumber: "7802344444", email: "jeff@geoff.com",
                        aish: "123-4567"
    }}
    @yamlClient = clients(:Justin)
  end

  test "Client responds to successful POST" do
    post '/api/client',
      params: @client, headers: authenticated_header

    assert_response 201
  end

  test "respond to failed POST" do
  
    post '/api/client',
    params: {client: {firstName:  "Leeroy Jenkins", addressLine1: "1234 Fake St, Edmonton, Alberta",\
                       phoneNumber: "7809519085", email: "leeroyjenkingmail.com", licos: "00",\
                       socialAssistance: "PINGPING", pets: "-123"}}, headers: authenticated_header

    assert_response :error
    assert JSON.parse(response.body)['errors'].count > 0

  end

  test 'respond to successful GET' do
    good_id = @yamlClient.id.to_s
    get '/api/client/' + good_id, headers: authenticated_header

    assert_response :success
    assert JSON.parse(response.body)['success']

    # # This is kind of convolutes but I'm lazy and this is the easiest way to ensure that a parsed JSON string matches a client
    # assert_equal JSON.parse(@yamlClient.to_json), JSON.parse(response.body)['client']
  end

  test 'get index of clients' do
    get '/api/client', headers: authenticated_header
    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  test 'respond to failed GET' do
    bad_id = Client.last.id + 1
    get '/api/client/' + bad_id.to_s, headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'respond to GET all' do
    get '/api/client', headers: authenticated_header
    assert_response :success
  end

  test 'respond to successful PUT' do
    id = @yamlClient.id.to_s
    put '/api/client/' + id, params: @client, headers: authenticated_header
    assert_response :success
    assert JSON.parse(response.body)['success']
    get '/api/client/' + id, headers: authenticated_header
    assert_not_equal @yamlClient.to_json.to_s, response.body  
  end

  test 'respond to unsuccessful PUT because of bad ID' do
    id = @yamlClient.id + 1
    put '/api/client/' + id.to_s, params: @client, headers: authenticated_header
    assert_response 404
  end

  test 'respond to unsuccessful PUT because of bad input' do
    id = @yamlClient.id.to_s
    put '/api/client/'+ id,
      params: {client: {firstName:  "Leeroy Jenkins", addressLine1: "1234 Fake St, Edmonton, Alberta",\
                         phoneNumber: "7809519085", email: "leeroyjenkingmail.com", licos: "00",\
                         socialAssistance: "PINGPING", pets: "-123"}}, headers: authenticated_header

      assert_response :error
      assert JSON.parse(response.body)['errors'].count > 0
  end
end
