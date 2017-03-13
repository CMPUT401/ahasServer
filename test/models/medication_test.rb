require 'test_helper'

class MedicationTest < ActiveSupport::TestCase
  def setup
    @medicine = medications(:one)
  end

  test 'medicine is valid' do
    assert @medicine.valid?
  end
end
