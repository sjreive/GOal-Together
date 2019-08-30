class Activity < ApplicationRecord
  belongs_to :commitments, required: false
  has_many :votes
end
