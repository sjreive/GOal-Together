class Vote < ApplicationRecord
  belongs_to :activity, required: false
  belongs_to :voter, class_name: 'User'
  belongs_to :attendee, class_name: 'User'

  # def voter
  #   User.find(voter_id)
  # end

end
