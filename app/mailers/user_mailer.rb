class UserMailer < ActionMailer::Base
  default from: 'jbarclay@ualberta.ca'

  # Handles emailing of invite token to new users
  def invite_user(user)
    @user = user
    token = SecureRandom.uuid
    @user.invite_token = token
    @url = Rails.application.config.domain.to_s + "/new-user/#{token}"
    if @user.save
      mail(to: @user.email, subject: 'Welcome to AHAS')
    else
      puts @user.errors.full_messages
    end
  end

  # Handles emailing of reset token to users
  def reset_password_email(user)
    @user = user
    token = SecureRandom.uuid
    @user.reset_token = token
    @url = Rails.application.config.domain.to_s + "/reset-password/#{token}"
    if @user.save
      mail(to: @user.email, subject: 'AHAS Password Reset')
    else
      puts "Error"
    end
  end  
end
