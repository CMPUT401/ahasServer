# == Schema Information
#
# Table name: clients
#
#  id                            :integer          not null, primary key
#  firstName                     :string
#  addressLine1                       :string
#  phoneNumber                   :string
#  email                         :string
#  licos                         :float
#  aish                          :float
#  socialAssistance              :float
#  pets                          :string
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  alternativeContactEmail       :string
#  lastName                      :string
#  alternativeContactLastName    :string
#  alternativeContactFirstName   :string
#  alternativeContactPhoneNumber :string
#  alternativeContactAddressLine1     :string
#  notes                         :string
#  alternativeContact2ndPhone    :string
#

require 'test_helper'

class ClientTest < ActiveSupport::TestCase

  def setup
    firstName = "Leeroy"
    lastName = "Jenkins"
    addressLine1 = "1234 Fake St, Edmonton, Alberta"
    phone = "780-951-9085"
    email = "leeroyjenkins@gmail.com"
    licos = 40210.00
    aish = 91231.00
    socialAssistance = 1231.00
    pets = 1
    alternativeContactPhoneNumber = "7809999999"
    alternativeContactAddressLine1 = "484 fake st, Canada"
    notes = "Client is angry"
    alternativeContact2ndPhone = "7809519084"
    alternativeContactEmail = "jimmy@jim.com"

    @client = Client.new(firstName: firstName, lastName: lastName, addressLine1: addressLine1, phoneNumber: phone, email: email, \
                        licos: licos, aish: aish ,socialAssistance: socialAssistance,\
                        pets: pets, alternativeContactPhoneNumber: alternativeContactPhoneNumber, alternativeContactAddressLine1: alternativeContactAddressLine1, notes: notes, alternativeContact2ndPhone: alternativeContact2ndPhone,alternativeContactEmail: alternativeContactEmail)
  end

  test "create client with good input" do
    assert @client.valid?
  end

  test "client first name should be present" do
      @client.firstName = "      "
      assert_not @client.valid?
  end

  test "client first name should not be too long" do
        @client.firstName = "a" * 51
        assert_not @client.valid?
    end

  test "client last should be present" do
      @client.lastName = "      "
      assert_not @client.valid?
  end

  test "client name should not be too long" do
        @client.lastName = "a" * 51
        assert_not @client.valid?
    end

  test "email should not be too long" do
      @client.email = "a" * 244 + "@example.com"
      assert_not @client.valid?
  end

  test "email validation should accept valid addressLine1es" do
      valid_addressLine1es = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org first.last@foo.jp alice+bob@baz.cn]
      valid_addressLine1es.each do |valid_addressLine1|
          @client.email = valid_addressLine1
          assert @client.valid?, "#{valid_addressLine1.inspect} should be valid"
      end
  end

  test "email validation should reject invalid addressLine1es" do
      invalid_addressLine1es = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
      invalid_addressLine1es.each do |invalid_addressLine1|
          @client.email = invalid_addressLine1
          assert_not @client.valid?, "#{invalid_addressLine1.inspect} should be invalid"
      end
  end


  test "client licos should be able to be empty"do
    @client.licos = nil
    assert @client.valid?
  end

    test "client aish  should be able to be empty"do
    @client.socialAssistance = ""
    assert @client.valid?
  end

  test "client socialAssistance should be able to be empty"do
    @client.licos = " "
    assert @client.valid?
  end
end
