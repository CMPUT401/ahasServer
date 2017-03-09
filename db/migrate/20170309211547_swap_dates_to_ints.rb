class SwapDatesToInts < ActiveRecord::Migration[5.0]
  def change
    remove_column :schedules, :appointmentStartDate
    remove_column :schedules, :appointmentEndDate
    add_column :schedules, :appointmentStartDate, :integer
    add_column :schedules, :appointmentEndDate, :integer
  end
end
