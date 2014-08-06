class UsersController < ApplicationController
  #before_filter :require_login, :except => [:create, :new, :index]
  skip_before_filter :require_login, only: [:index, :new, :create]
  def index

    if params[:search]
      age_range = parse_age_range(params[:age])
      @users = User.by_gender(params[:gender]).by_age_range(age_range[0],age_range[1]).by_city(params[:city]).everyone_but_current(current_user).page(params[:page])
      puts User.by_gender(params[:gender]).by_age_range(age_range[0],age_range[1]).by_city(params[:city]).length
    else
      @users = User.order('users.created_at DESC').page(params[:page]).everyone_but_current(current_user) 
      puts User.all.length
    end

      @user10 = @users.everyone_but_current(current_user).limit(10)
      respond_to do |format|
        format.html
        format.js
      end       
    end

  def edit
   @user = User.find(params[:id])
 end

 def update
  @user = User.find(params[:id])
  if @user.update_attributes(user_params)
    redirect_to user_path(@user)
  else
    render :edit
  end
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
    auto_login(@user)
    redirect_back_or_to(:users, notice: 'login successful')
  else
    render :new
  end
end

private
def user_params
  params.require(:user).permit(:email, :password, :password_confirmation, :biography, :first_name, :last_name, :username, :gender, :gender_preference, :address, :date_of_birth, :avatar)
end

def parse_age_range(age_range_str)
  case age_range_str
  when "18-30"
    return [18,30]
  when "31-40"
    return [31,40]
  when "41-50"
    return [41,50]
  when "51-60"
    return [51,60]
  when "61-100"
    return [61,100]
  else
    return [nil, nil]
  end
end
end
