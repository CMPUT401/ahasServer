class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :fax_number
      t.string :email
      t.string :address
      t.string :contact_type

      t.timestamps
    end
  end
end
