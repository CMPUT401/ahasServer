class AddAlternativeContactLastNameToClients < ActiveRecord::Migration[5.0]
  def change
    add_column :clients, :alternativeContactLastName, :string
    add_column :clients, :alternativeContactFirstName, :string
  end
end
