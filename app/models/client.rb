class Client < ApplicationRecord
  #Ensure client's email is unique
  before_save {email.downcase!}

  validates :name, {maximum: 50}

end
