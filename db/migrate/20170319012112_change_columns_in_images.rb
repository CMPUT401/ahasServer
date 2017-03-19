class ChangeColumnsInImages < ActiveRecord::Migration[5.0]
  def change
    remove_column :images, :location
    add_column :images, :date, :integer
    rename_column :images, :base64, :data
  end
end
