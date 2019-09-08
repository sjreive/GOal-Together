class Member < ApplicationRecord
  belongs_to :user
  belongs_to :commitment

  def send_email_invitation
    puts user_id
  end
end
