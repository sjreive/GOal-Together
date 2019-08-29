class User < ApplicationRecord
  has_many :members
  has_many :commitments, through: :members
  has_many :votes_cast, foreign_key: :attendee_id, class_name: 'Vote'
  has_many :attendees, through: :votes_cast
  has_many :votes_received, foreign_key: :voter_id, class_name: 'Vote'
  has_many :voters, through: :votes_received 
end
