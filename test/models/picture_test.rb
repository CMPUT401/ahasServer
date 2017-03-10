require 'test_helper'

class PictureTest < ActiveSupport::TestCase
  def setup
    @picture = pictures(:one)
    @picture.save
  end

  test 'picture must have a valid type' do
    #assert @picture.valid?
    # puts @picture.errors.full_message
    @picture.picture_type = 'lab result'
    assert @picture.valid?
  end

  test 'picture can not have invalid type' do
    @picture.picture_type = :other_thing
    assert_not @picture.valid?
  end

  test 'picture type can not be blank' do
    @picture.picture_type = ''
    assert_not @picture.valid?
  end
end
