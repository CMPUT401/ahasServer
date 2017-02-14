class Client < ApplicationRecord
  #Ensure client's email is unique
  before_save {email.downcase!}
 
  #Data validations
  validates :name, presence: true, length: {maximum: 50}
  validates :address, presence: true, length: {maximum: 50}
  validates :phoneNumber, presence: true
  validates :name, presence: true, length: {maximum: 50}


  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255}, format: {with: VALID_EMAIL_REGEX}, uniqueness: { case_sensitive: false}

end
