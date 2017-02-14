require 'test_helper'

class PatientTest < ActiveSupport::TestCase
  def setup
    @one = patients(:one)
  end
  
  test 'patient should be valid' do
    assert_kind_of Patient, @one
    @one.save
    puts @one.errors.full_messages
    assert @one.valid?
  end
end
