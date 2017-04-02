require 'test_helper'

class AdminsTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:justin)
  end

  test "Test inviting a user sends an email" do
    post '/api/admin/invite', headers: authenticated_admin_header, params: { user: {
                                                                               name: 'Justin Barclay',
                                                                               email: 'justincbarclay@gmail.com'
                                                                             }
                                                                           }
    invite_email = ActionMailer::Base.deliveries.last
    assert_equal invite_email.to[0], 'justincbarclay@gmail.com'
    assert JSON.parse(response.body)['success']
  end

  test "Test inviting a user with invalid credentials" do
    post '/api/admin/invite', headers: authenticated_header, params: { user: {
                                                                         name: 'Justin Barclay',
                                                                         email: 'justincbarclay@gmail.com'
                                                                       }
                                                                     }
    assert_response 401
  end

  test "Test reseting a user password sends an email" do
    post '/api/admin/reset_password', headers: authenticated_admin_header, params: { user: @user.attributes }
    
    invite_email = ActionMailer::Base.deliveries.last
    assert_equal invite_email.to[0], 'justincbarclay@gmail.com'
    assert JSON.parse(response.body)['success']
  end

  test "Test resetting a user password with invalid credentials" do
    post '/api/admin/reset_password', headers: authenticated_header, params: { user: @user.attributes }
    assert_response 401
  end

   test 'getting index of users as a user' do
    get '/api/admin/users', headers: authenticated_header

    assert_response 401
  end

   test 'getting a user as a user' do
    get "/api/admin/users/#{@user.id}", headers: authenticated_header

    assert_response 401
  end
   
  test 'getting a user' do
    get "/api/admin/users/#{@user.id}", headers: authenticated_admin_header

    assert_response 200
    assert JSON.parse(response.body)['success']
    assert JSON.parse(response.body)['user'].keys.length > 0
  end

  test 'getting a non existant user' do
    bad_id = @user.id + 1
    get "/api/admin/users/#{bad_id}", headers: authenticated_admin_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'deleting a non existant user as a user' do
    bad_id = @user.id + 1
    delete "/api/admin/users/#{bad_id}", headers: authenticated_header
  
    assert_response 401

  end

  test 'deleting a user as a user' do
    delete "/api/admin/users/#{@user.id}", headers: authenticated_header

    assert_response 401
  end

    test 'deleting a non existant user as an admin' do
    bad_id = @user.id + 1
    delete "/api/admin/users/#{bad_id}", headers: authenticated_admin_header
  
    assert_response 404
  end

  test 'deleting a user as an admin' do
    delete "/api/admin/users/#{@user.id}", headers: authenticated_admin_header

    assert_response 200
  end

  test 'getting index of users returns more than one user' do
    get '/api/admin/users', headers: authenticated_admin_header

    assert_response 200
  end
end
