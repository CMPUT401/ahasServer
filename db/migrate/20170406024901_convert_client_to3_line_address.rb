class ConvertClientTo3LineAddress < ActiveRecord::Migration[5.0]
  def change
    rename_column :clients, :address, :addressLine1
    add_column :clients, :addressLine2, :string
    add_column :clients, :addressLine3, :string

    rename_column :clients, :alternativeContactAddress, :alternativeContactAddressLine1
    add_column :clients, :alternativeContactAddressLine2, :string
    add_column :clients, :alternativeContactAddressLine3, :string
  end
end
