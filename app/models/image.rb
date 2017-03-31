# == Schema Information
#
# Table name: images
#
#  id           :integer          not null, primary key
#  data         :text
#  picture_type :string
#  patient_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  name         :string
#  date         :integer
#

class Image < ApplicationRecord
  belongs_to :patient

  validates :name, presence: true
  
  validates :date, presence: true, allow_blank: false, numericality: { only_integer: true }
  
  validates :data, presence: true, allow_blank: false
  
  validates :data_type, presence: true, allow_blank: false

  validates :picture_type, inclusion: { in: ['radiograph', 'lab result', 'portrait'],
                                        message: "%{value} is not in the list of valid types" }
end
