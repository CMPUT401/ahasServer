class ChangeColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :clients, :name, :firstName
  end
end
