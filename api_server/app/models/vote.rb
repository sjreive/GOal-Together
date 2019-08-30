class Vote < ApplicationRecord
  belongs_to :activities, required: false
  has_many :voter, class_name: 'User'
  has_many :attendee, class_name: 'User'
end
