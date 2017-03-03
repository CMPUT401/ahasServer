class Contact < ApplicationRecord
  before_save { email.downcase! }
  
  validates :first_name, presence: { message: 'First Name is required' },
                         length: { maximum: 25, message: 'Name is too long' }

  validates :last_name, presence: { message: 'Last Name is required' },
                        length: { maximum: 25, message: 'Name is too long' }

  validates :address, presence: { message: 'Address is required' },
                      length: { maximum: 100, message: 'Address is too long' }

  validates :phone_number, presence: true, allow_blank: true

  validates :fax_number, presence: true, allow_blank: true

  validates :contact_type, presence: true

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX,
                              message: 'Email is invalid format' },
                    allow_blank: true
end
