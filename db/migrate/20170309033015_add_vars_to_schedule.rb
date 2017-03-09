class AddVarsToSchedule < ActiveRecord::Migration[5.0]
  def change
    add_column :schedules, :duration, :float
  end
end
