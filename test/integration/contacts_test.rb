require 'test_helper'

class ContactsTest < ActionDispatch::IntegrationTest
  def setup
    @good = contacts(:one)
    @bad = contacts(:two)
  end

  test 'should be able to post a valid, new contact' do
    post '/api/contacts/', headers: authenticated_header, params:
                                                            { contact:
                                                                {
                                                                  first_name: :Justin,
                                                                  last_name: :Barclay,
                                                                  address: :something,
                                                                  phone_number: '555-5555',
                                                                  fax_number: ' ',
                                                                  email: 'valid@example.com',
                                                                  contact_type: 'Veterinarian'
                                                                } }
    assert_response 201
    assert JSON.parse(response.body)['success']
  end

  test 'should get errors when posting invalid contact' do
    assert_no_difference 'Contact.count' do
      post '/api/contacts/', headers: authenticated_header, params: { contact:
                                                                        {
                                                                          first_name: '',
                                                                          last_name: '',
                                                                          address: '',
                                                                          phone_number: '',
                                                                          fax_number: ' ',
                                                                          email: '',
                                                                          contact_type: 'Vetrinarian'
                                                                        } }
    end
    
    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end
end
