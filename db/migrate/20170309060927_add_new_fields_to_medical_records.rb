class AddNewFieldsToMedicalRecords < ActiveRecord::Migration[5.0]
  def change
    add_column :medical_records, :summary, :string
    add_column :medical_records, :signature, :text
    add_column :medical_records, :date, :datetime
  end
end
