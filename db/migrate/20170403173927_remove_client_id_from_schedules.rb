class RemoveClientIdFromSchedules < ActiveRecord::Migration[5.0]
  def change
    remove_column :schedules, :clientId
  end
end
