# == Schema Information
#
# Table name: schedules
#
#  id                   :integer          not null, primary key
#  clientId             :string
#  reason               :string
#  notes                :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  location             :string
#  appointmentStartDate :integer
#  appointmentEndDate   :integer
#

class Schedule < ApplicationRecord
  belongs_to :patient

  validates :patient_id, presence: true, allow_bank: false

  validates :appointmentStartDate, presence: true, allow_blank: false, numericality: {only_integer: true}
  validates :appointmentEndDate, presence: true, allow_blank: false
  validates :reason, presence:true
  validates :notes, presence: true, allow_blank: true
  validates :location, presence: true
end
