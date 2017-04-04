class RemovePatientIndexFromSchedules < ActiveRecord::Migration[5.0]
  def change
    remove_index(:schedules, :name => 'index_schedules_on_patientId')
  end
end
