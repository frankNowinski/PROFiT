class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])

    @user.save unless @user.persisted?
    sign_in(:user, @user)
    redirect_to users_show_path(@user)
  end

  def failure
    redirect_to root_path
  end
end
