class CreateClients < ActiveRecord::Migration[5.0]
  def change
    create_table :clients do |t|
      t.string :name
      t.string :address
      t.string :phoneNumber
      t.String :email
      t.float :licos
      t.float :aish
      t.float :socialAssistance
      t.int :pets

      t.timestamps
    end
  end
end
