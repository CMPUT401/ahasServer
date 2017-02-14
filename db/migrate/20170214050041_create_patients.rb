class CreatePatients < ActiveRecord::Migration[5.0]
  def change
    create_table :patients do |t|
      t.string :species
      t.string :name
      t.int :age
      t.string :colour
      t.int :tattoo
      t.int :microchip
      t.string :reproductive_status

      t.timestamps
    end
  end
end
