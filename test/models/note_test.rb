require 'test_helper'

class NoteTest < ActiveSupport::TestCase
  def setup
    @note = notes(:one)
  end

  test 'Notes can be saved' do
    assert @note.save
  end

  test 'Notes with blank body are not valid' do
    @note.body = ''
    assert_not @note.valid?
  end

  test 'Notes with blank is_alert are not valid' do
    @note.is_alert = ''
    assert_not @note.valid?
    @note.is_alert = true
    assert @note.valid?
  end

  test 'is_alert has to be true or false' do
    @note.is_alert = true
    assert @note.valid?
    @note.is_alert = false
    assert @note.valid?
    @note.is_alert = ""
    assert_not @note.valid?
  end
  test 'Notes with blank initial are not valid' do
    assert @note.valid?
    @note.initials = ''
    assert_not @note.valid?
  end

  test 'Notes with blank medical_record_ids are not valid' do
    assert @note.valid?
    @note.medical_record_id = nil
    assert_not @note.valid?
  end
end
