class AddFollowUpInstructionsToMedicalRecords < ActiveRecord::Migration[5.0]
  def change
    add_column :medical_records, :follow_up_instructions, :text
  end
end
