class CreateSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :schedules do |t|
      t.datetime :appointmentDate
      t.integer :clientId
      t.string :reason
      t.string :notes

      t.timestamps
    end
  end
end
