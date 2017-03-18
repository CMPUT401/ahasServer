class Medication < ApplicationRecord
  belongs_to :medical_record
  belongs_to :patient

  validates :med_type, presence: true, allow_blank: false
  validates :name, presence: true, allow_blank: false
  validates :reminder, presence: true, allow_blank: true
end
