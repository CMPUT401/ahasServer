class UserMailer < ActionMailer::Base
  default from: 'jbarclay@ualberta.ca'
  
  def invite_user(user)
    @user = user
    token = SecureRandom.uuid
    @user.invite_token = token
    @url = "http://localhost:4200/create-user/#{token}"
    if @user.save
      mail(to: @user.email, subject: 'Welcome to AHAS')
    else
      puts @user.errors.full_messages
    end
  end

  def reset_password_email(user)
    @user = user
    token = SecureRandom.uuid
    @user.reset_token = token
    @url = "http://localhost:4200/reset-password/#{token}"
    if @user.save
      mail(to: @user.email, subject: 'AHAS Password Reset')
    else
      puts "Error"
    end
  end  
end
