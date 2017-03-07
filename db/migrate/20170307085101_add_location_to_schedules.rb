class AddLocationToSchedules < ActiveRecord::Migration[5.0]
  def change
    add_column :schedules, :location, :string
  end
end
