class AddActivityToVotes < ActiveRecord::Migration[5.2]
  def change
    add_reference :votes, :activity, foreign_key: true
  end
end
