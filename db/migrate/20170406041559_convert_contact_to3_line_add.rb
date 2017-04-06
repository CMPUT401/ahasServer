class ConvertContactTo3LineAdd < ActiveRecord::Migration[5.0]
  def change
    rename_column :contacts, :address, :addressLine1
    add_column :contacts, :addressLine2, :string
    add_column :contacts, :addressLine3, :string
  end
end
