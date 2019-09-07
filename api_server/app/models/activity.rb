class Activity < ApplicationRecord
  belongs_to :commitments, required: false
  has_many :votes

  after_create do |activity|
    HardWorker.perform_at(activity.date, 'bob', 5)
  end
end
  