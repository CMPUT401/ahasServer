require 'test_helper'

class PatientTest < ActiveSupport::TestCase
  def setup
    @one = patients(:one)
    @two = patients(:two)
  end
 
  test 'patient one should be valid' do
    assert_kind_of Patient, @one
    @one.save
    assert @one.valid?
  end

  test 'patient two should be invalid' do
    assert_kind_of Patient, @two
    assert_not @two.valid?
  end

  test 'name must be present' do
    @one.name = nil
    assert_not @one.valid?
  end

  test 'patients should belong to a client' do
    @one.client = nil
    assert_not @one.valid?
  end

  test 'patients should have a gender' do
    @one.gender = nil
    assert_not @one.valid?
  end

  test 'patients should have color' do
    @one.gender = nil
    assert_not @one.valid?
  end

  test 'patients should have ' do
    @one.gender = nil
    assert_not @one.valid?
  end

  test 'patients should have a species' do
    @one.species = nil
    assert_not @one.valid?
  end
end
