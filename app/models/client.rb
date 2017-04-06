# == Schema Information
#
# Table name: clients
#
#  id                            :integer          not null, primary key
#  firstName                     :string
#  addressLine1                       :string
#  phoneNumber                   :string
#  email                         :string
#  licos                         :float
#  aish                          :float
#  socialAssistance              :float
#  pets                          :string
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  alternativeContactEmail       :string
#  lastName                      :string
#  alternativeContactLastName    :string
#  alternativeContactFirstName   :string
#  alternativeContactPhoneNumber :string
#  alternativeContactAddressLine1     :string
#  notes                         :string
#  alternativeContact2ndPhone    :string
#

class Client < ApplicationRecord
  #Ensure client's email is unique
  before_save {email.downcase!}

  has_many :patients

  #Data validations
  validates :firstName, presence: {message: "Name is required"}, length: {maximum: 50, message: "Name is too long"}
  validates :lastName, presence: {message: "Name is required"}, length: {maximum: 50, message: "Name is too long"}
  validates :addressLine1, presence: {message: "Address is required"}, length: {maximum: 50, message: "Address is too long"}, allow_blank: true
validates :addressLine2, presence: {message: "Address is required"}, length: {maximum: 50, message: "Address is too long"}, allow_blank: true
validates :addressLine3, presence: {message: "Address is required"}, length: {maximum: 50, message: "Address is too long"}, allow_blank: true

  validates :phoneNumber, presence: true, allow_blank: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 255}, format: {with: VALID_EMAIL_REGEX, message: "Email is invalid format"}, allow_blank: true
  validates :licos, presence: true, allow_blank: true 
  validates :aish, presence: true, allow_blank: true  
  validates :socialAssistance, presence: true, allow_blank: true 
  validates :alternativeContactFirstName, presence: true, length: {maximum: 50, message: "Alternate Name is too long"}, allow_blank: true
  validates :alternativeContactLastName, presence: true, length: {maximum: 50, message: "Alternate Name is too long"}, allow_blank: true
  validates :alternativeContactPhoneNumber, presence: true, allow_blank: true
  validates :alternativeContactAddressLine1, presence: {message: "Address is required"}, length: {maximum: 50, message: "Address is too long"}, allow_blank: true
  validates :alternativeContactAddressLine2, presence: {message: "Address is required"}, length: {maximum: 50, message: "Address is too long"}, allow_blank: true
  validates :alternativeContactAddressLine3, presence: {message: "Address is required"}, length: {maximum: 50, message: "Address is too long"}, allow_blank: true

  validates :notes, presence: true, allow_blank: true
  validates :alternativeContact2ndPhone, presence: true, allow_blank: true
  validates :alternativeContactEmail, presence: true, length: {maximum: 255}, format: {with: VALID_EMAIL_REGEX, message: "Email is invalid format"}, allow_blank: true


end
