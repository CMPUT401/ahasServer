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

  test 'appointmentDate must be present' do
    @one.appointmentDate = nil
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
