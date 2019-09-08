class RemoveBuyInCentsFromCommitments < ActiveRecord::Migration[5.2]
  def change
    remove_column :commitments, :buy_in_cents, :integer
  end
end
