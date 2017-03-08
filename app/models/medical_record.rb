class MedicalRecord < ApplicationRecord
  validates :temperature, presence: true, allow_blank: true

  validates :notes, presence: true, allow_blank: true

  validates :medications, presence: true, allow_blank: true

  validates :eyes, presence: true, allow_blank: true

  validates :oral, presence: true, allow_blank: true

  validates :ears, presence: true, allow_blank: true

  validates :glands, presence: true, allow_blank: true

  validates :skin, presence: true, allow_blank: true

  validates :abdomen, presence: true, allow_blank: true

  validates :urogential, presence: true, allow_blank: true

  validates :nervousSystem, presence: true, allow_blank: true

  validates :musculoskeletal, presence: true, allow_blank: true

  validates :cardiovascular, presence: true, allow_blank: true

  validates :heart_rate, presence: true, allow_blank: true, numericality: { only_integer: true }

  validates :respiratory, presence: true, allow_blank: true

  validates :respiratory_rate, presence: true, allow_blank: true, numericality: { only_integer: true }

  validates :attitudeBAR, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :attitudeQAR, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :attitudeDepressed, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :eyesN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :eyesA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :mmN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :mmPale, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :mmJaundiced, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :mmTacky, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :earsN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :earsA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :earsEarMites, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :earsAU, presence: true, allow_blank: true, inclusion: { in: [true, false]}

  validates :earsAD, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :earsAS, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :glandsN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :glandsA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :skinN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :skinA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :abdomenN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :abdomenA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :urogentialN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :urogentialA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :nervousSystemN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :nervousSystemA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :musculoskeletalN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :musculoskeletalA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :cardiovascularN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :cardiovascularA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :respiratoryN, presence: true, allow_blank: true, inclusion: { in: [true, false] }

  validates :respiratoryA, presence: true, allow_blank: true, inclusion: { in: [true, false] }

end
