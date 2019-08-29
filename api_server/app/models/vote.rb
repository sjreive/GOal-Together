class Vote < ApplicationRecord
  belongs_to :activities
  belongs_to :voter, class_name: 'User'
  belongs_to :attendee, class_name: 'User'
end
