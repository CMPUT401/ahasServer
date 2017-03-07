class Schedule < ApplicationRecord
  validates :appointmentDate, presence: true
  validates :reason, presence:true
  validates :notes, presence: true, allow_blank: true
  validates :location, presence: true
end
