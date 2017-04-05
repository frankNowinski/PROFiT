class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :find_user, only: :update

  def update
    if @user.update_attribute('email', user_params)
      render json: @user
    else
      render json: @user.errors
    end
  end

  private

  def user_params
    params.require(:email)
  end

  def find_user
    @user = User.find(params[:id])
  end
end


