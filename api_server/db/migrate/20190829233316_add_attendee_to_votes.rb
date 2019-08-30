class AddAttendeeToVotes < ActiveRecord::Migration[5.2]
  def change
    add_reference :votes, :attendee, foreign_key: { to_table: :users }
    add_reference :votes, :voter, foreign_key: { to_table: :users }
  end
end
