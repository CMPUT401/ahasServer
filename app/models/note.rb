class Note < ApplicationRecord
  belongs_to :medical_record

  validates :body, presence: true, allow_blank: false

  validates :initials, presence: true, allow_blank: false

  validates :medical_record_id, presence: true, allow_blank: false
end
