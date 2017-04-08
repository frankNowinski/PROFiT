class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def downward_trend_email(user, stock)
    @user  = user
    @stock = stock

    mail(to: @user.email, subject: "PROFiT Alert: #{@stock.ticker.upcase} is trending downwards.")
  end
end
