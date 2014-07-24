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
<<<<<<< HEAD
    params.require(:user).permit(:email, :password, :password_confirmation, :biography, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth)
=======
    params.require(:user).permit(:email, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth, :password, :password_confirmation)
>>>>>>> 9e0d678cad4f650aa13d7f8d33116f7f9a8f82bb
  end
end
