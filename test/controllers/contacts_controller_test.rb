require 'test_helper'

class ContactsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @good_contact = contacts(:one)
    @bad_contact = contact(:two)
  end

  
end
