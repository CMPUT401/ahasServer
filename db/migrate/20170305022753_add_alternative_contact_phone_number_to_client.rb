class AddAlternativeContactPhoneNumberToClient < ActiveRecord::Migration[5.0]
  def change
    add_column :clients, :alternativeContactPhoneNumber, :string
  end
end
