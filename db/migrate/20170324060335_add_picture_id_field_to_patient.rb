class AddPictureIdFieldToPatient < ActiveRecord::Migration[5.0]
  def change
    add_column :patients, :portrait_id, :integer
  end
end
