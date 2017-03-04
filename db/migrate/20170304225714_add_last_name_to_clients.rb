class AddLastNameToClients < ActiveRecord::Migration[5.0]
  def change
    add_column :clients, :lastName, :string
  end
end
