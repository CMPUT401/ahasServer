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

  test 'Respiratory rate must be an integer' do
    @good.respiratory_rate = 13.5
    assert_not @good.valid?

    @good.respiratory_rate = 'Eleventeen'
    assert_not @good.valid?

    @good.respiratory_rate = 13
    assert @good.valid?
  end

  test 'Heart rate must be an integer' do
    @good.heart_rate = 13.5
    assert_not @good.valid?

    @good.heart_rate = 'Eleventeen'
    assert_not @good.valid?

    @good.heart_rate = 13
    assert @good.valid?
  end

  test 'Temperature must be a number' do
    @good.temperature = 13
    assert @good.valid?

    @good.temperature = 13.5
    assert @good.valid?

    @good.termperature = 'Flimteeen'
    assert_not @good.valid?
  end
end
