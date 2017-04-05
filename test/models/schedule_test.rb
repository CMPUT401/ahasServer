# == Schema Information
#
# Table name: schedules
#
#  id                   :integer          not null, primary key
#  clientId             :string
#  reason               :string
#  notes                :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  location             :string
#  appointmentStartDate :integer
#  appointmentEndDate   :integer
#

require 'test_helper'

class ScheduleTest < ActiveSupport::TestCase
  def setup
    @one = schedules(:one) #good data
    @two = schedules(:two) #bad data
  end

  test 'schedule instance on eshould be valid' do
    assert_kind_of Schedule, @one
    assert @one.valid?
  end

  test 'schedule instance two should be invalid' do
    assert_kind_of Schedule, @two
    assert_not @two.valid?
  end

  test 'appointmentStartDate must be present' do
    @one.appointmentStartDate = nil
    assert_not @one.valid?
  end

  test 'schedule instance should have a reason' do
    @one.reason = nil
    assert_not @one.valid?
  end

  test 'schedule instaace must have a location' do
    @one.location = nil
    assert_not @one.valid?
  end

end
