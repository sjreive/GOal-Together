class User < ApplicationRecord
  has_secure_password validations: false

  has_many :members
  has_many :commitments, through: :members
  has_many :votes_cast, class_name: 'Vote', foreign_key: :voter_id
  has_many :votes_received, class_name: 'Vote', foreign_key: :attendee_id

  validates :email, presence: true, uniqueness: { case_sensitive:false }

end
