class AddAlternativeContactLastNameToClients < ActiveRecord::Migration[5.0]
  def change
    add_column :clients, :alternativeContactLastName, :string
  end
end
