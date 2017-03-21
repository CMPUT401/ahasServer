class AddIsAlertToNote < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :is_alert, :boolean
  end
end
