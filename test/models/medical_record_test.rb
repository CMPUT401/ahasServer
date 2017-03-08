require 'test_helper'

class MedicalRecordTest < ActiveSupport::TestCase
  def setup
    @good = medical_records(:one)
  end

  test 'Can save a valid medical_record' do
    assert @good.save
  end

  test 'Unable to save an invalid record' do
    @good.heart_rate = 'twelve'
    assert_not @good.valid?
    assert_not @good.save
  end
end
