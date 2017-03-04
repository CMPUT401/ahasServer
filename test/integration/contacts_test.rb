require 'test_helper'

class ContactsTest < ActionDispatch::IntegrationTest
  def setup
    @good = contacts(:one)
    @good.save
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

  test 'posting a contact incomplete parameters should fail' do
    post '/api/contacts/', headers: authenticated_header, params:
                                                            { contact:
                                                                {
                                                                  first_name: :Justin,
                                                                  last_name: :Barclay,
                                                                  address: :something,
                                                                  phone_number: '555-5555',
                                                                  fax_number: ' ',
                                                                  email: 'valid@example.com',
                                                                  type: 'Veterinarian'
                                                                } }
    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end

  test 'posting a contact with wrong parameters shoud fail' do
    post '/api/contacts/', headers: authenticated_header, params:
                                                            { contacts:
                                                                {
                                                                  first_name: :Justin,
                                                                  last_name: :Barclay,
                                                                  address: :something,
                                                                  phone_number: '555-5555',
                                                                  fax_number: ' ',
                                                                  email: 'valid@example.com',
                                                                  contact_type: 'Veterinarian'
                                                                } }
    assert_response :error
    assert_not JSON.parse(response.body)['success']
  end
  
  test 'asking for invalid client id returns a 404' do
    bad_id = Patient.last.id + 1
    get '/api/patients/' + bad_id.to_s, headers: authenticated_header

    assert_response 404
    assert_not JSON.parse(response.body)['success']
  end

  test 'asking for a valid client id should return the correct patient' do
    good_id = @good.id
    
    get '/api/contacts/' + good_id.to_s, headers: authenticated_header

    assert good_id.to_s == JSON.parse(response.body)['contact']['id'].to_s
    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  test 'getting an index should return a list of contact names and IDs' do
    get '/api/contacts', headers: authenticated_header
    
    contacts = JSON.parse(response.body)['contacts']
    assert filtered_properly contacts

    assert_response :success
    assert JSON.parse(response.body)['success']
  end

  def filtered_properly(contacts)
    contacts.each do |contact|
      unless ['first_name', 'last_name', 'id'].uniq.sort == contact.keys.uniq.sort
        return false
      end
    end
  end

end
