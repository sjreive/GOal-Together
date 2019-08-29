class Activity < ApplicationRecord
  belongs_to :commitments
  has_many :votes
end
