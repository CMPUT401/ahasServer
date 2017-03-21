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
end
