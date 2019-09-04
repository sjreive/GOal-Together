class RemoveQuestionmarkFromVotesTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :votes, :attended?, :attended
  end
end
