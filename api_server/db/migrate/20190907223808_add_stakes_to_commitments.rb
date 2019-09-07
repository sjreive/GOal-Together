class AddStakesToCommitments < ActiveRecord::Migration[5.2]
  def change
    add_column :commitments, :stakes, :string
  end
end
