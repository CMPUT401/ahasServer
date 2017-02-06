class User < ApplicationRecord
    #Ensure that the users email is unique by making all emails lowercase
    before_save { email.downcase! }

    validates :name, presence: true, length: {maximum: 50}

    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: {maximum: 255}, format: {with: VALID_EMAIL_REGEX}, uniqueness: { case_sensitive: false}
    
    validates :password, presence: true, length: { minimum: 7 }

    has_secure_password

    private
    #digest user password with specific Bcrypt parameters
    def User.digest(string)
       cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
       BCrypt::Password.create(string, cost: cost)
    end 
end
