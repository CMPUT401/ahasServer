class Change < ActiveRecord::Migration[5.0]
  def change
    rename_column :schedules, :appointmentDate, :appointmentStartDate
    add_column :schedules, :appointmentEndDate, :datetime
    remove_column :schedules, :duration
    change_column :schedules, :appointmentEndDate, :datetime
  end
end
