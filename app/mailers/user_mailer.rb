class UserMailer < ActionMailer::Base
  default from: 'jbarclay@ualberta.ca'
  
  def welcome_email(user)
    @user = user
    @url  = 'http://testsite.com/login'
    puts mail(to: @user.email, subject: 'Welcome to My Awesome Site').errors
  end

  private
  
  def generate_user_token user
    
  end
end
