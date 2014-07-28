class PrivateMessagesController < ApplicationController
  
  def new
  	@user = User.find(params[:user_id])
  	@private_message = @user.private_messages.build
  end

  def create
  	@user = User.find(params[:user_id])
  	@private_message = PrivateMessage.new(private_message_params)
  	@private_message.sender = current_user
  	@private_message.recipient = @user
  	if @private_message.save
  		str_notice = "private message sent to " +  @user.first_name + " " + @user.last_name
  		redirect_to user_path(@user), notice: str_notice
  	else
  		flash.now[:alert] = "failed to send private message to " +  @user.first_name + " " + @user.last_name
  		render :new
  	end
  end

  def index
  	@user = User.find(params[:user_id])
    @received_messages = @user.obtained_messages.excluding_by_senders(@user.blocked_users)
  end

  def destroy
  	private_message_to_destroy = PrivateMessage.find(params[:id])
  	p private_message_to_destroy
  	private_message_to_destroy.destroy
  	respond_to do |format|
  			format.json{render json:{action_status: "success"}}
  	end
  end

  private
  def private_message_params
  	params.require(:private_message).permit(:message)
  end
end
