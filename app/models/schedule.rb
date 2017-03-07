class Schedule < ApplicationRecord
  validates :appointmentDate, presence: true, allow_blank: false
  validates :reason, presence:true
  validates :notes, presence: true, allow_blank: true
  validates :location, presence: true
end