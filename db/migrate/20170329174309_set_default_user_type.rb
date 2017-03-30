class SetDefaultUserType < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :type, :string, default: :User
  end
end
