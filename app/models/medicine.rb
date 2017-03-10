class Medicine < ApplicationRecord
  belongs_to :medical_record
  belongs_to :patient

  validates :name, presence: true, allow_blank: false

end
