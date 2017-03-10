class Picture < ApplicationRecord
  belongs_to :patient
  
  validates :picture_type, inclusion: { in: ['radiograph', 'lab result'],
                                           message: "%{value} is not in the list of valid types" }
end
