class Commitment < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :activities

  def add_members member_emails_array
    member_emails_array.each do |email|
      @user = User.where('lower(email) = ?', email.downcase).first 
      if !@user
        @user = User.create!(
          email: email
        )
        puts "Created user: #{@user.email}"
      else
        puts "User already existed #{@user.email}"
      end
      Member.create!(
        commitment_id: id,
        user_id: @user.id,
        joined: false
      )
    end
  end
end
