# The patient class is a record of identifying information for a clients
# pet or animal.

class Patient < ApplicationRecord
  validates :species, presence: true

  validates :name, presence: true

  validates :colour, presence: true

  validates :reproductive_status, presence: true

  validates :tattoo, numericality: {only_integer: true}

  validates :age, numericality: { only_integer: true}

  validates :microchip, numericality: {only_integer: true}
end
