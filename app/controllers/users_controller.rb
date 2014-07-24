class UsersController < ApplicationController
  def index
    @user = User.all
    @user5 = User.all.limit(5)
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
  end

  def edit
  end

  def update
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :biography, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth)
  end
end
