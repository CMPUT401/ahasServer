# == Schema Information
#
# Table name: contacts
#
#  id           :integer          not null, primary key
#  first_name   :string
#  last_name    :string
#  phone_number :string
#  fax_number   :string
#  email        :string
#  address      :string
#  contact_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class ContactTest < ActiveSupport::TestCase
  def setup
    @contact = contacts(:one)
    @contact.save
  end

  test 'contact is valid' do
    assert @contact.valid?
  end

  test 'contact should have a first name' do
    @contact.first_name = ' '
    assert_not @contact.valid?
  end

  test 'contact should have a last name' do
    @contact.last_name = ' '
    assert_not @contact.valid?
  end

  test 'contact should have email' do
    @contact.email = ' '
    assert_not @contact.valid?
  end

  test 'contact should have a valid email' do
    @contact.email = 'fake@email'
    assert_not @contact.valid?
  end
  
  test 'contact does not need a phone number' do
    @contact.phone_number = ' '
    assert @contact.valid?
  end

  test 'contact does not need a fax number' do
    @contact.fax_number = ' '
    assert @contact.valid?
  end

  test 'contacts have valid types' do
    types = ['Veterinarian', 'Volunteer', 'Laboratory']
    types.each do |type|
      @contact.contact_type = type
      assert @contact.valid?
    end
  end

  test 'contacts can not have non validated types' do
    wrong_types = ['Bad thing 1', 'bad thing 2', 'bad thing 3']
    wrong_types.each do |wrong|
      @contact.contact_type = wrong
      assert_not @contact.valid?
    end
  end
end
