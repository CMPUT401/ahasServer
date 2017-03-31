class AddPatientIdToSchedules < ActiveRecord::Migration[5.0]
  def change
    add_column :schedules, :patientId, :integer
  end
end
