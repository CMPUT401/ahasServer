class AddNewFieldsToMedicalRecord < ActiveRecord::Migration[5.0]
  def change
    add_column :medical_records, :mcsN, :boolean
    add_column :medical_records, :mcsMild, :boolean
    add_column :medical_records, :mcsMod, :boolean
    add_column :medical_records, :mcsSevere, :boolean
    add_column :medical_records, :weight, :integer
    add_column :medical_records, :weightUnit, :string
    add_column :medical_records, :bcsVal, :integer
  end
end
