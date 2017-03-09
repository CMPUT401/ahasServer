class RenameNotesColumnInMedicslRecords < ActiveRecord::Migration[5.0]
  def change
    rename_column :medical_records, :notes, :exam_notes
  end
end
