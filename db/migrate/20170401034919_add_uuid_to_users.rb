class AddUuidToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :creation_token, :uuid
    add_column :users, :reset_token, :uuid
  end
end
