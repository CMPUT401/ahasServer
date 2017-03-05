class AddAlternativeContact2ndPhoneToClients < ActiveRecord::Migration[5.0]
  def change
    add_column :clients, :alternativeContact2ndPhone, :string
  end
end
