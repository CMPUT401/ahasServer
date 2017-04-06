class ChangeLicosAishsocialAssistanceToStrings < ActiveRecord::Migration[5.0]
  def change
    change_column :clients,:licos , :string
    change_column :clients,:aish , :string
    change_column :clients,:socialAssistance , :string
  end
end
