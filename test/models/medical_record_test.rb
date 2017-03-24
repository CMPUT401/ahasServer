# == Schema Information
#
# Table name: medical_records
#
#  id                     :integer          not null, primary key
#  temperature            :float
#  exam_notes             :text
#  medications            :text
#  eyes                   :string
#  oral                   :string
#  ears                   :string
#  glands                 :string
#  skin                   :string
#  abdomen                :string
#  urogenital             :string
#  nervousSystem          :string
#  musculoskeletal        :string
#  cardiovascular         :string
#  heart_rate             :integer
#  respiratory            :string
#  respiratory_rate       :integer
#  attitudeBAR            :boolean
#  attitudeQAR            :boolean
#  attitudeDepressed      :boolean
#  eyesN                  :boolean
#  eyesA                  :boolean
#  mmN                    :boolean
#  mmPale                 :boolean
#  mmJaundiced            :boolean
#  mmTacky                :boolean
#  earsN                  :boolean
#  earsA                  :boolean
#  earsEarMites           :boolean
#  earsAU                 :boolean
#  earsAD                 :boolean
#  earsAS                 :boolean
#  glandsN                :boolean
#  glandsA                :boolean
#  skinN                  :boolean
#  skinA                  :boolean
#  abdomenN               :boolean
#  abdomenA               :boolean
#  urogenitalN            :boolean
#  urogenitalA            :boolean
#  nervousSystemN         :boolean
#  nervousSystemA         :boolean
#  musculoskeletalN       :boolean
#  musculoskeletalA       :boolean
#  cardiovascularN        :boolean
#  cardiovascularA        :boolean
#  respiratoryN           :boolean
#  respiratoryA           :boolean
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  patient_id             :integer          not null
#  summary                :string
#  signature              :text
#  date                   :integer
#  follow_up_instructions :text
#  mcsN                   :boolean
#  mcsMild                :boolean
#  mcsMod                 :boolean
#  mcsSevere              :boolean
#  weight                 :integer
#  weightUnit             :string
#  bcsVal                 :integer
#  oralA                  :boolean
#  oralN                  :boolean
#

require 'test_helper'

class MedicalRecordTest < ActiveSupport::TestCase
  def setup
    @good = medical_records(:one)
  end
  # It is very hard to test this model, as I have not found a good way to test
  # for booleans. And all but heart rate, respiratory rate, and temperature

  test 'Can save a valid medical_record' do
    assert @good.save
  end

  test 'Unable to save an invalid record' do
    @good.heart_rate = 'twelve'
    assert_not @good.valid?
    assert_not @good.save
  end

  # test 'Respiratory rate must be an integer' do
  #   @good.respiratory_rate = 13.5
  #   assert_not @good.valid?

  #   @good.respiratory_rate = 'Eleventeen'
  #   assert_not @good.valid?

  #   @good.respiratory_rate = 13
  #   assert @good.valid?
  # end

  # test 'Heart rate must be an integer' do
  #   @good.heart_rate = 13.5
  #   assert_not @good.valid?

  #   @good.heart_rate = 'Eleventeen'
  #   assert_not @good.valid?

  #   @good.heart_rate = 13
  #   assert @good.valid?
  # end

  test 'Temperature must be a number' do
    @good.temperature = 13
    assert @good.valid?

    @good.temperature = 13.5
    assert @good.valid?

    @good.temperature = 'Flimteen'
    assert_not @good.valid?
  end
end
