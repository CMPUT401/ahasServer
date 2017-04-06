class RenameGenderToSexAndDeleteReproductiveStatus < ActiveRecord::Migration[5.0]
  def change
    remove_column :patients, :reproductive_status
    rename_column :patients, :gender, :sex 
    rename_column :patients, :age, :dateOfBirth
  end
end
