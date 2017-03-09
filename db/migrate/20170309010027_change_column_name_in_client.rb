class ChangeColumnNameInClient < ActiveRecord::Migration[5.0]
  def change
    rename_column :clients, :alternateContactEmail, :alternativeContactEmail
  end
end
