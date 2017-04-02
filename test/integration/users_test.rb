require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:justin)
  end

  test 'getting a user' do
    token = SecureRandom.uuid
    @user.invite_token = token
    @user.save
    get "/api/users/#{token}", headers: authenticated_header

    assert_response 200
    assert JSON.parse(response.body)['success']
    assert JSON.parse(response.body)['user'].keys.length > 0
  end

  test 'getting a non existant user' do
    token = SecureRandom.uuid
    get "/api/users/#{token}", headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'creating a user with a valid token' do
    token = SecureRandom.uuid
    @user.invite_token = token
    @user.save
    post "/api/signup/", params: { user:
                                     {
                                       name: 'Justin Barclay',
                                       email: 'justincbarclay@gmail.com',
                                       password: 'foobarbaz',
                                       password_confirmation: 'foobarbaz',
                                       invite_token: token
                                     },
                                   
                                 }
    assert_response 201
    assert JSON.parse(response.body)['success']
  end

  test 'creating a user with an invalid confirmation password' do
    token = SecureRandom.uuid
    @user.invite_token = token
    @user.save
    post "/api/signup/", params: { user:
                                     {
                                       name: 'Justin Barclay',
                                       email: 'justincbarclay@gmail.com',
                                       password: 'foobarbaz',
                                       password_confirmation: 'foobarbiz',
                                       invite_token: token
                                     }
                                   
                                 }
    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end

  test 'creating a user with an invalid invite token' do
    token = SecureRandom.uuid
    @user.invite_token = token
    @user.save
    post "/api/signup/", params: { user:
                                     {
                                       name: 'Justin Barclay',
                                       email: 'justincbarclay@gmail.com',
                                       password: 'foobarbaz',
                                       password_confirmation: 'foobarbiz',
                                       invite_token: SecureRandom.uuid
                                     }
                                   
                                 }
    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

    test 'resetting a password with a valid token' do
    token = SecureRandom.uuid
    @user.reset_token = token
    @user.save
    post "/api/reset_password/", params: { user:
                                     {
                                       password: 'foobarbaz',
                                       password_confirmation: 'foobarbaz',
                                       reset_token: token
                                     },
                                   
                                 }
    assert_response 201
    assert JSON.parse(response.body)['success']
  end

  test 'resetting a password with an invalid confirmation password' do
    token = SecureRandom.uuid
    @user.reset_token = token
    @user.save
    post "/api/reset_password/", params: { user:
                                     {
                                       password: 'foobarbaz',
                                       password_confirmation: 'foobarbiz',
                                       reset_token: token
                                     }
                                   
                                 }
    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end

  test 'resetting a password with an invalid reset token' do
    token = SecureRandom.uuid
    @user.reset_token = token
    @user.save
    post "/api/reset_password/", params: { user:
                                     {
                                       password: 'foobarbaz',
                                       password_confirmation: 'foobarbiz',
                                       reset_token: SecureRandom.uuid
                                     }
                                   
                                 }
    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

   test 'reset token handles null' do
    token = SecureRandom.uuid
    @user.reset_token = token
    @user.save
    post "/api/reset_password/", params: { user:
                                     {
                                       password: 'foobarbaz',
                                       password_confirmation: 'foobarbiz',
                                       reset_token: nil
                                     }
                                   
                                 }
    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end
end
