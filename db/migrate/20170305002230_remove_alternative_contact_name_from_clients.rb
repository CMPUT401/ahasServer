class RemoveAlternativeContactNameFromClients < ActiveRecord::Migration[5.0]
  def change
    remove_column :clients, :alternativeContactName
  end
end
