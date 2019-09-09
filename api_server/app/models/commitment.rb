class Commitment < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :activities

  def add_members_and_invite (member_emails_array, inviting_user)
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
      puts @member.as_json
      MemberMailer.with(user: @user, commitment: self, inviting_user: inviting_user).invite_member.deliver_now
    end
  end

  def user_has_joined? user_id

    self.members.each do |member|
      if member.user_id == user_id
        return member.joined
      end
    end
    return false
  end
end
