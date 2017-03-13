require 'test_helper'

class MedicationTest < ActiveSupport::TestCase
  def setup
    @medicine = medicines(:one)
  end

  test 'medicine is valid' do
    assert @medicine.valid?
  end
end
