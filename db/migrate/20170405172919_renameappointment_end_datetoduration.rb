class RenameappointmentEndDatetoduration < ActiveRecord::Migration[5.0]
  def change
    rename_column :schedules, :appointmentEndDate, :duration
  end
end
