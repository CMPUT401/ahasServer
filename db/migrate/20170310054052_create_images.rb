class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.text :base64
      t.string :location
      t.string :picture_type
      t.belongs_to :patient, index: true
      t.timestamps
    end
  end
end
