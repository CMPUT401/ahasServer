class AddClientToPatient < ActiveRecord::Migration[5.0]
  def change
    add_reference :patients, :client, foreign_key: true
  end
end
