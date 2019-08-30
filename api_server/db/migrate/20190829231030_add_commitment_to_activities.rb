class AddCommitmentToActivities < ActiveRecord::Migration[5.2]
  def change
    add_reference :activities, :commitment, foreign_key: true
  end
end
