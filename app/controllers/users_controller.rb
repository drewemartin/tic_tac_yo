class UsersController < ApplicationController
  def index

    @users = User.all
    @users5 = User.all.limit(5)
    @user10 = User.all.limit(10)

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

  def create
    @user = User.new(user_params)
    p @user
    if @user.save
      redirect_to user_path(@user)
    else
      render :new
    end
  end

  def new
    @user = User.new
  end

  private
  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth, :password, :password_confirmation)
  end
end
