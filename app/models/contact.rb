# == Schema Information
#
# Table name: contacts
#
#  id           :integer          not null, primary key
#  first_name   :string
#  last_name    :string
#  phone_number :string
#  fax_number   :string
#  email        :string
#  addressLine1      :string
#  contact_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Contact < ApplicationRecord
  before_save { email.downcase! }
  
  validates :first_name, presence: { message: 'First Name is required' },
                         length: { maximum: 25, message: 'Name is too long' }

  validates :last_name, presence: { message: 'Last Name is required' },
                        length: { maximum: 25, message: 'Name is too long' }

  validates :addressLine1, presence: true, 
                      length: { maximum: 100, message: 'Address line 1 is too long' }

  validates :addressLine2, presence: true,  
                      length: { maximum: 100, message: 'Address is too long' },
                      allow_blank: true

  validates :addressLine3, presence: { message: 'Address is required' },
                      length: { maximum: 100, message: 'Address is too long' },
                      allow_blank: true

  validates :phone_number, presence: true, allow_blank: true

  validates :fax_number, presence: true, allow_blank: true

  validates :contact_type, presence: true
  validate  :valid_type_string
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX,
                              message: 'Email is invalid'}

  def valid_type_string
    # contact_type must be one of three type
    unless ['Veterinarian', 'Volunteer', 'Laboratory', 'Technician'].include? contact_type

      errors.add(:contact_type, ' must be either Veterinarian, Volunteer, Labratory or Technician')
    end
  end
end
