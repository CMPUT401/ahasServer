class AddEmailforAlternateToClient < ActiveRecord::Migration[5.0]
  def change
    add_column :clients, :alternateContactEmail, :string
  end
end
