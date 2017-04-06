# == Schema Information
#
# Table name: patients
#
#  id                  :integer          not null, primary key
#  species             :string
#  first_name          :string
#  dateOfBirth                 :integer
#  colour              :string
#  tattoo              :integer
#  microchip           :integer
#  reproductive_status :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  client_id           :integer
#  sex              :string
#  last_name           :string
#

require 'test_helper'

class PatientTest < ActiveSupport::TestCase
  def setup
    @one = patients(:one) # good data
    @two = patients(:two) # bad data
  end

  test 'patient one should be valid' do
    assert_kind_of Patient, @one
    assert @one.valid?
  end

  test 'patient two should be invalid' do
    assert_kind_of Patient, @two
    assert_not @two.valid?
  end

  test 'first name must be present' do
    @one.first_name = ''
    assert_not @one.valid?
  end

  test 'last name must be present' do
    @one.last_name = nil
    assert_not @one.valid?
  end

  test 'patients should belong to a client' do
    @one.client = nil
    assert_not @one.valid?
  end

  test 'patients should have a sex' do
    @one.sex = nil
    assert_not @one.valid?
  end

  test 'patients should have color' do
    @one.sex = nil
    assert_not @one.valid?
  end

  test 'patients should have ' do
    @one.sex = nil
    assert_not @one.valid?
  end

  test 'patients should have a species' do
    @one.species = nil
    assert_not @one.valid?
  end
end
