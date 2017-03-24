# == Schema Information
#
# Table name: medications
#
#  id                :integer          not null, primary key
#  name              :string
#  medical_record_id :integer
#  patient_id        :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  reminder          :integer
#  med_type          :string
#

require 'test_helper'

class MedicationTest < ActiveSupport::TestCase
  def setup
    @medicine = medications(:one)
  end

  test 'medicine is valid' do
    assert @medicine.valid?
  end
end
