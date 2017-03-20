class Image < ApplicationRecord
  belongs_to :patient
  
  validates :date, presence: true, allow_blank: false
  
  validates :data, presence: true, allow_blank: false
  
  validates :picture_type, inclusion: { in: ['radiograph', 'lab result'],
                                           message: "%{value} is not in the list of valid types" }
end
