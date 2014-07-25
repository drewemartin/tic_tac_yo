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

    if @user.save
      redirect_to(:users, notice: 'User was successfully created')
    else
      render :new
    end
  end

  private
  def user_params
<<<<<<< HEAD
<<<<<<< HEAD

    params.require(:user).permit(:email, :password, :password_confirmation, :biography, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth)

=======
    params.require(:user).permit(:email, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth, :password, :password_confirmation)
>>>>>>> tictacyo_ui
=======
    params.require(:user).permit(:email, :password, :password_confirmation, :biography, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth)
>>>>>>> c9f64c7f020aa2432d9b0fdd3d8585cda9c7e638
  end
end
