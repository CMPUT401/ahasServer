# Controller for interacting with Administrative duties including User creation and Deletion
# This is a protected class and requires the user to login before it can access any of the functions
#
#
# @author Justin Barclay & Mackenzie Bligh
# @see https://github.com/CMPUT401/vettr_server/wiki/API-Documentation#user_authentication
class UsersController < ApplicationController
  # before_action :authenticate_user
  # skip_before_action :authenticate_user, only: [:create]
  
  # Handles POST request to create a new user, route /api/signup
  # This is an unprotected route.
  # @example
  #   {
  #     "user": 
  #      { 
  #        "name": "User McUser",
  #        "email": "user@example.com",
  #        "password": "bazfoobar",
  #        "password_confirmation": "bazfoobar" 
  #      }
  #   }
  # @example success
  #   {
  #     "success": true
  #   }
  # @example failure
  #   {
  #     "success": false
  #     "errors": [....]
  #   }
  # @return HTTP 201 JSON, on success
  # @return HTTP 500 JSON, on failure
  def create
    updated_user = user_params
    # validate token
    @user = User.find_by(invite_token: updated_user[:invite_token])
    if updated_user[:invite_token].nil?
      render status: :error, json: { success: false, error: 'Invalid token' }
      return
    end
    if @user.nil?
      render status: 404, json: { success: false, error: 'Unable to find user' }
      return
    end
    # Ensure matching passwords
    
    if updated_user[:password] == updated_user[:password_confirmation]
      @user.password = updated_user[:password]
      @user.invite_token = nil
    else
      render status: :error, json: { success: false, error: 'Passwords don\'t match' }
      return
    end
    # Update password and make sure if matches our standards
    if @user.save
      render status: :created, json: { success: true }
    else
      render status: :error, json: { success: false, errors: @user.errors.full_messages }
    end
  end

  def show
    # Display a user based on an invite token
    # This might need to be refactored based on being able to update a user
    user = User.find_by(invite_token: params[:token])
    if user
      render status: 200, json: { success: true, user: filter_user(user) }
    else
      render status: 404, json: { success: false, error: 'Unable to find user' }
    end
  end

  def reset_password
    updated_password = password_params

    # validate token
    if updated_password[:reset_token].nil?
      render status: :error, json: { success: false, error: 'Invalid token' }
      return
    end
    @user = User.find_by(reset_token: updated_password[:reset_token])
    if @user.nil?
      render status: 404, json: { success: false, error: 'Unable to find user' }
      return
    end
    # Ensure matching passwords
    if updated_password[:password] == updated_password[:password_confirmation]
      @user.password = updated_password[:password]
      @user.reset_token = nil
    else
      render status: :error, json: { success: false, error: 'Passwords don\'t match' }
      return
    end
    # Update password and make sure if matches our standards
    if @user.save
      render status: :created, json: { success: true }
    else
      render status: :error, json: { success: false, errors: @user.errors.full_messages }
    end
  end
  
  private

  def filter_users(users)
    users.map do |user|
      { id: user.id, email: user.email, name: user.name }
    end
  end

  def filter_user(user)
    { email: user.email, name: user.name }
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation, :reset_token)
  end
  def user_params
    params.require(:user).permit(:name, :email, :password,
                                 :password_confirmation, :invite_token)
  end
end
