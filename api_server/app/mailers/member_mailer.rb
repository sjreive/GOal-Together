class MemberMailer < ApplicationMailer
  default from: 'kendall.rowe312@gmail.com'

  def invite_member
    @user = params[:user]
    @url = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to GOal Together!')
  end
end
