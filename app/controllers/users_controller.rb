# coding: utf-8
class UsersController < ApplicationController
  # skip_before_action :authenticate_user, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      response.status = :created
    else
      render status: :error, json: { errors: @user.errors.full_messages }
    end
  end

  private
  
  def user_params
    params.require(:user).permit(:name, :email, :password,
                                 :password_confirmation)
  end
end
