# == Schema Information
#
# Table name: patients
#
#  id                  :integer          not null, primary key
#  species             :string
#  first_name          :string
#  age                 :integer
#  colour              :string
#  tattoo              :integer
#  microchip           :integer
#  reproductive_status :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  client_id           :integer
#  gender              :string
#  last_name           :string
#

# The patient class is a record of identifying information for a clients
# pet or animal.

class Patient < ApplicationRecord
  belongs_to :client

  has_many :medical_records
  
  has_many :medications

  has_many :images
  
  validates :species, presence: true

  validates :first_name, presence: true

  validates :last_name, presence: true
  
  validates :colour, presence: true

  validates :reproductive_status, presence: true

  validates :tattoo, numericality: { only_integer: true }, allow_blank: true

  validates :age, numericality: { only_integer: true }, allow_blank: true

  validates :microchip, numericality: { only_integer: true }, allow_blank: true
  validates :client_id, presence: true, allow_blank: false, numericality: true

  validates :gender, presence: true
end
