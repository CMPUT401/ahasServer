class CreatePatients < ActiveRecord::Migration[5.0]
  def change
    create_table :patients do |t|
      t.string :species
      t.string :name
      t.integer :age
      t.string :colour
      t.integer :tattoo
      t.integer :microchip
      t.string :reproductive_status

      t.timestamps
    end
  end
end
