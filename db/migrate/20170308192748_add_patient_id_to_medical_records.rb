class AddPatientIdToMedicalRecords < ActiveRecord::Migration[5.0]
  def change
    add_column :medical_records, :patient_id, :integer, index: true, null: false
  end
end
