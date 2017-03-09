class ChangeDateColumnType < ActiveRecord::Migration[5.0]
  def change
    remove_column :medical_records, :date
    add_column :medical_records, :date, :integer
  end
end
