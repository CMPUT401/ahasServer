class UsersController < ApplicationController
    skip_before_action :authenticate, only: [:create]
    
    def create
     @user = User.new(user_params)
     if @user.save
        response.status :created
     else
     end
  end

  private
  def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
  end
end
