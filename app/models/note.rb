# == Schema Information
#
# Table name: notes
#
#  id                :integer          not null, primary key
#  body              :text
#  initials          :string
#  medical_record_id :integer          not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  is_alert          :boolean
#

class Note < ApplicationRecord
  belongs_to :medical_record

  validates :is_alert, inclusion: { in: [true, false], message: "%{value} is not a boolean" }

  validates :body, presence: true, allow_blank: false

  validates :initials, presence: true, allow_blank: false

  validates :medical_record_id, presence: true, allow_blank: false
end
