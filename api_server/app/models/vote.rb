class Vote < ApplicationRecord
  belongs_to :activities
  has :voter, class_name: 'User'
  has :attendee, class_name: 'User'
end
