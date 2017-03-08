class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.text :body
      t.string :initials
      t.references :medical_record, null: false, index: true
      t.timestamps
    end
  end
end
