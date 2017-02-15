require 'test_helper'

class ClientTest < ActiveSupport::TestCase

  def setup
    name = "Leeroy Jenkins"
    address = "1234 Fake St, Edmonton, Alberta"
    phone = "780-951-9085"
    email = "leeroyjenkins@gmail.com"
    licos = 40210.00
    aish = 91231.00
    socialAssistance = 1231.00
    pets = 1
    @client = Client.new(name: name, address: address, phoneNumber: phone, email: email, \
                        licos: licos, aish: aish ,socialAssistance: socialAssistance,\
                        pets:pets)
  end

  test "create client with good input" do
    assert @client.valid?
  end

  test "client name should be present" do
      @client.name = "      "
      assert_not @client.valid?
  end

  test "client name should not be too long" do
        @client.name = "a" * 51
        assert_not @client.valid?
    end

  test "email should not be too long" do
      @client.email = "a" * 244 + "@example.com"
      assert_not @client.valid?
  end

  test "email validation should accept valid addresses" do
      valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org first.last@foo.jp alice+bob@baz.cn]
      valid_addresses.each do |valid_address|
          @client.email = valid_address
          assert @client.valid?, "#{valid_address.inspect} should be valid"
      end
  end

  test "email validation should reject invalid addresses" do
      invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
      invalid_addresses.each do |invalid_address|
          @client.email = invalid_address
          assert_not @client.valid?, "#{invalid_address.inspect} should be invalid"
      end
  end

  test "client licos shouldn't accept text" do
    @client.licos = "PING"
    assert_not @client.valid?
  end

  test "client licos should reject numbers less than 0" do
    @client.licos = -12314
    assert_not @client.valid?
  end
  test "client licos should be able to be empty"do
    @client.licos = " "
    assert @client.valid?
  end

  test "client aish shouldn't accept text" do
    @client.aish = "PING"
    assert_not @client.valid?
  end

  test "client aish  should reject numbers less than 0" do
    @client.aish = -12314
    assert_not @client.valid?
  end

  test "client aish  should be able to be empty"do
    @client.socialAssistance = " "
    assert @client.valid?
  end

  test "client socialAssistance shouldn't accept text" do
    @client.socialAssistance = "PING"
    assert_not @client.valid?
  end

  test "client socialAssistance should reject numbers less than 0" do
    @client.licos = -12314
    assert_not @client.valid?
  end

  test "client socialAssistance should be able to be empty"do
    @client.licos = " "
    assert @client.valid?
  end
end
