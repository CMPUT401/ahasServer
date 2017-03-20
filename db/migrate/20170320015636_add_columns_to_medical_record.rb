class AddColumnsToMedicalRecord < ActiveRecord::Migration[5.0]
  def change
    rename_column :medical_records, :urogentialA, :urogenitalA
    rename_column :medical_records, :urogentialN, :urogenitalN
    rename_column :medical_records, :urogential, :urogenital
    add_column :medical_records, :oralA, :boolean
    add_column :medical_records, :oralN, :boolean
  end
end
