class User < ApplicationRecord
  has_many :members
  has_many :commitments, through: :members
end
