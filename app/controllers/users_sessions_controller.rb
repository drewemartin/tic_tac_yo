class UsersSessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]
  def new
  	@user = User.new
  end

  def create
  	if @user = login(params[:email], params[:password])
      redirect_back_or_to(:users, notice: 'login successful')
    else
      flash.now[:alert]= 'login failed'
      render 'new'
    end
  end

  def destroy
    logout
    redirect_to(:users, notice: 'logged out')
  end
end
