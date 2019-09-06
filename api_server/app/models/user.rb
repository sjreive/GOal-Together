class User < ApplicationRecord
  has_secure_password

  has_many :members
  has_many :commitments, through: :members
  has_many :votes_cast, class_name: 'Vote', foreign_key: :voter_id
  has_many :votes_received, class_name: 'Vote', foreign_key: :attendee_id

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive:false }

  def to_token_payload
    {
      sub: id,
      firstName: first_name
    }
  end
end
