require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:justin)
  end

  test 'getting index of users returns more than one user' do
    get '/api/users', headers: authenticated_header

    assert_response 200
    assert JSON.parse(response.body)['success']
    assert JSON.parse(response.body)['users'].length > 0
  end

  test 'getting a user' do
    get "/api/users/#{@user.id}", headers: authenticated_header

    assert_response 200
    assert JSON.parse(response.body)['success']
    assert JSON.parse(response.body)['user'].keys.length > 0
  end

  test 'getting a non existant user' do
    bad_id = @user.id + 1
    get "/api/users/#{bad_id}", headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'deleting a non existant user' do
    bad_id = @user.id + 1
    delete "/api/users/#{bad_id}", headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'deleting a user' do
    before = User.count
    delete "/api/users/#{@user.id}", headers: authenticated_header
    after = User.count
    assert_response 200
    assert before > after
    assert JSON.parse(response.body)['success']
  end
end
