require 'test_helper'

class ClientControllerTest < ActionDispatch::IntegrationTest
  def setup
    @good = contacts(:one)
    @bad = contact(:two)
  end

  test 'should be able to create a valid contact' do
    
  end
end
