class CreateMedicalRecords < ActiveRecord::Migration[5.0]
  def change
    create_table :medical_records do |t|
      t.integer :temperature
      t.text :notes
      t.text :medications
      t.string :eyesText
      t.string :oral
      t.string :ears
      t.string :glands
      t.string :skin
      t.string :abdomen
      t.string :urogential
      t.string :nervousSystem
      t.string :musculoskeletal
      t.string :cardiovascular
      t.integer :heart_rate
      t.text :respiratory
      t.integer :respiratory_rate
      t.boolean :attitudeBAR
      t.boolean :attitudeQAR
      t.boolean :attitudeDepressed
      t.boolean :eyesN
      t.boolean :eyesA
      t.boolean :mmN
      t.boolean :mmPale
      t.boolean :mmJaundiced
      t.boolean :mmTacky
      t.boolean :earsN
      t.boolean :earsA
      t.boolean :earsEarMites
      t.boolean :earsAU
      t.boolean :earsAD
      t.boolean :earsAS
      t.boolean :glandsN
      t.boolean :glandsA
      t.boolean :skinN
      t.boolean :skinA
      t.boolean :abdomenN
      t.boolean :abdomenA
      t.boolean :urogentialN
      t.boolean :urogentialA
      t.boolean :nervousSystemN
      t.boolean :nervousSystemA
      t.boolean :musculoskeletalN
      t.boolean :musculoskeletalA
      t.boolean :cardiovascularN
      t.boolean :cardiovascularA
      t.boolean :respiratoryN
      t.boolean :respiratoryA
      t.timestamps
    end
  end
end
