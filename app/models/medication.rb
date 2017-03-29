# == Schema Information
#
# Table name: medications
#
#  id                :integer          not null, primary key
#  name              :string
#  medical_record_id :integer
#  patient_id        :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  reminder          :integer
#  med_type          :string
#

class Medication < ApplicationRecord
  belongs_to :medical_record
  belongs_to :patient

  validates :med_type, presence: true, allow_blank: false
  validates :name, presence: true, allow_blank: false
  validates :reminder, presence: true, allow_blank: true
end
