class AddNameToImages < ActiveRecord::Migration[5.0]
  def change
    add_column :images, :name, :string
  end
end
