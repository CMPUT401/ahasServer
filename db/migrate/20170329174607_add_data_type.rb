class AddDataType < ActiveRecord::Migration[5.0]
  def change
    add_column :images, :data_type, :string
  end
end
