class AddJoinedToMembers < ActiveRecord::Migration[5.2]
  def change
    add_column :members, :joined, :boolean
  end
end
