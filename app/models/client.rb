class Client < ApplicationRecord
  #Ensure client's email is unique
  before_save {email.downcase!}

  #Data validations
  validates :name, presence: {message: "Name is required"}, length: {maximum: 50, message: "Name is too long"}
  validates :address, presence: {message: "Address is required"}, length: {maximum: 50, message: "Address is too long"}
  validates :phoneNumber, presence: true, allow_blank: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255}, \
    format: {with: VALID_EMAIL_REGEX, message: "Email is invalid format"}, allow_blank: true
  validates :licos, presence: true, allow_blank: true, numericality: {greater_than_or_equal_to: 0}
  validates :aish, presence: true, allow_blank: true,  numericality: {greater_than_or_equal_to: 0}
  validates :socialAssistance, presence: true, allow_blank: true, numericality: {greater_than_or_equal_to: 0}



end
