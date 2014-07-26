class UsersController < ApplicationController
  #before_filter :require_login, :except => [:create, :new, :index]
  skip_before_filter :require_login, only: [:index, :new, :create]
  def index

    @users = User.all
    @users5 = User.all.limit(5)
    @user10 = User.all.limit(10)

  end

  def show
    @user = User.find(params[:id])
    @favorite = Favorite.where("favoriter_id = ? AND favorited_id = ?",current_user.id, @user.id).first
    @block = Block.where("blocker_id = ? AND blocked_id =?", current_user.id, @user.id).first
    if current_user.id == @user.id
      @favorite_users = current_user.favorite_users
      p @favorite_users
      @blocked_users = current_user.blocked_users
      p @blocked_users
    else
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_back_or_to(:users, notice: 'User was successfully created')
    else
      render :new
    end
  end

  private
  def user_params

    params.require(:user).permit(:email, :password, :password_confirmation, :biography, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth)

  end

end
