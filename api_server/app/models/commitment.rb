class Commitment < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :activities

  def add_members_and_invite member_emails_array
    member_emails_array.each do |email|
      @user = User.where('lower(email) = ?', email.downcase).first 
      if !@user
        @user = User.create!(
          email: email
        )
      end
      @member = Member.create!(
        commitment_id: id,
        user_id: @user.id,
        joined: false
      )
      MemberMailer.with(user: @user).invite_member.deliver_now
    end
  end
end
