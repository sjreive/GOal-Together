class CreateCommitments < ActiveRecord::Migration[5.2]
  def change
    create_table :commitments do |t|
      t.string :name
      t.string :description
      t.datetime :start_date
      t.datetime :end_date
      t.integer :buy_in_cents
      t.string :activity_type
      t.string :thumbnail

      t.timestamps
    end
  end
end
