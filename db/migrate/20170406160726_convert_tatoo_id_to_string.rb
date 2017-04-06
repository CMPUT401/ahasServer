class ConvertTatooIdToString < ActiveRecord::Migration[5.0]
  def change
    change_column :patients, :tattoo, :string
  end
end
