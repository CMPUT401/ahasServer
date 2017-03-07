class AddIndexToClients < ActiveRecord::Migration[5.0]
  def change
    add_index :clients, [:lastName, :firstName]
  end
end
