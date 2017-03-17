class AddReminderAndTypeToMedications < ActiveRecord::Migration[5.0]
  def change
    add_column :medications, :reminder, :integer
    add_column :medications, :med_type, :string
  end
end
