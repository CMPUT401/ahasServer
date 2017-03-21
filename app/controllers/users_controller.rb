# coding: utf-8
class UsersController < ApplicationController
  before_action :authenticate_user
  skip_before_action :authenticate_user, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      render status: :created, json: { success: true }
    else
      render status: :error, json: { errors: @user.errors.full_messages }
    end
  end

  # Show a list of all users and name
  def index
    @users = filter_users User.all
    render status: 200, json: { success: true, users: @users }
  end
  
  private
  
  def filter_users(users)
    users.map do |user|
      { email: user.email, name: user.name }
    end
  end
  
  def user_params
    params.require(:user).permit(:name, :email, :password,
                                 :password_confirmation)
  end
end
