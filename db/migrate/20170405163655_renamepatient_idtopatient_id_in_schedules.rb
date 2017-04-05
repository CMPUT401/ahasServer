class RenamepatientIdtopatientIdInSchedules < ActiveRecord::Migration[5.0]
  def change
    rename_column :schedules, :patientId, :patient_id
  end
end
