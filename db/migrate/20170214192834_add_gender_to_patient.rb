class AddGenderToPatient < ActiveRecord::Migration[5.0]
  def change
    add_column :patients, :gender, :string
  end
end
