class AddAlternativeContactAddressToClients < ActiveRecord::Migration[5.0]
  def change
    add_column :clients, :alternativeContactAddress, :string
  end
end
