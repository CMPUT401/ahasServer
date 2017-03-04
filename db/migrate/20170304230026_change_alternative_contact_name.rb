class ChangeAlternativeContactName < ActiveRecord::Migration[5.0]
  def change
    rename_column :clients, :alternativeContactName, :alternativeContactFirstName
  end
end
