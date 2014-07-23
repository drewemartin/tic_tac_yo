class UsersController < ApplicationController
  def index
  end

  def show
  end

  def edit
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

  def update
  end

  def new
    @user = User.new
  end

  private
  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth, :password, :password_confirmation)
  end
end
