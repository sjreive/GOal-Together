class MemberMailer < ApplicationMailer
  default from: 'kendall.rowe312@gmail.com'

  def invite_member
    @user = params[:user]
    @commitment = params[:commitment]
    @inviting_user = params[:inviting_user]
    @url = 'http://localhost:3000/'
    mail(to: @user.email, subject: 'Welcome to GOal Together!')
  end
end
