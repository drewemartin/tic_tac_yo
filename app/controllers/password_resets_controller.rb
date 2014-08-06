class PasswordResetsController < ApplicationController
	skip_before_filter :require_login

  def new
    
  end

	# request password reset.
  def create
  		@user = User.find_by_email(params[:email])

  		#Sends an email to the user with instructions on how to reset their password (a url with a random token)
  		@user.deliver_reset_password_instructions! if @user

  		# Tell the user instructions have been sent
  		redirect_to(root_path, :notice => "Instructions have been sent to your email.")
  end

  def edit
  		@user = User.load_from_reset_password_token(params[:id])
  		@token = params[:id]

  		if @user.blank?
  			not_authenticated
  			return
  		end
  end

  def update
  	@token = params[:token]
  	@user = User.load_from_reset_password_token(param[:token])

  	if @user.blank?
  		not_authenticated
  		return 
  	end

  	#this makes the password confirmation validation work
  	@user.password_confirmation = params[:user][:password_confirmation]
  	#this line clears the temp token and updates the password
  	if @user.change_password!(params[:user][:password])
  		redirect_to(root_path, :notice => 'Password was successfully updated.')
  	else
  		render :action => "edit"
  	end
  end
end
