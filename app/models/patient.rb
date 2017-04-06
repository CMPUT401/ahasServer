# == Schema Information
#
# Table name: patients
#
#  id                  :integer          not null, primary key
#  species             :string
#  first_name          :string
#  dateOfBirth                 :integer
#  colour              :string
#  tattoo              :integer
#  microchip           :integer
#  reproductive_status :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  client_id           :integer
#  sex              :string
#  last_name           :string
#

# The patient class is a record of identifying information for a clients
# pet or animal.

class Patient < ApplicationRecord
  belongs_to :client

  has_many :medical_records
  
  has_many :medications

  has_many :imdateOfBirths
  
  has_many :schedules

  validates :species, presence: true

  validates :first_name, presence: true

  validates :last_name, presence: true
  
  validates :colour, presence: true

  validates :tattoo, numericality: { only_integer: true }, allow_blank: true

  validates :dateOfBirth, numericality: { only_integer: true }, allow_blank: true

  validates :microchip, numericality: { only_integer: true }, allow_blank: true
  validates :client_id, presence: true, allow_blank: false, numericality: true

  validates :sex, presence: true
end
