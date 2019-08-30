class Commitment < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :activities
end
