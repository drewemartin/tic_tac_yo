class UsersSessionsController < ApplicationController
  skip_before_filter :require_login, except: [:destroy]
  def new
  	@user = User.new
  end

  def create
  	if @user = login(params[:email], params[:password], params[:remember])
      redirect_back_or_to(:users, notice: 'login successful')
    else
      flash.now[:alert]= 'login failed'
      render 'new'
    end
  end

  def destroy
    logout
    redirect_to(root_path(), notice: 'logged out')
  end
end
