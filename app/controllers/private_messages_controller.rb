class PrivateMessagesController < ApplicationController
  
  def new
  	@user = User.find(params[:user_id])
    @source = params[:source]
    if @user.id == current_user.id
      @favorite_users = @user.favorite_users
    end
  	@private_message = @user.private_messages.build
  end

  def create
  	@user = User.find(params[:user_id])
  	@private_message = PrivateMessage.new(private_message_params)
  	@private_message.sender = current_user
  	@recipient = @private_message.recipient
    @source = params[:source]
  	if @private_message.save
  		str_notice = "private message sent to " +  @recipient.first_name + " " + @recipient.last_name
      if @user.id == current_user.id
        redirect_to @source, notice: str_notice
      else
        redirect_to @source, notice: str_notice
      end
  	else
  		flash.now[:alert] = "failed to send private message to " +  @recipient.first_name + " " + @recipient.last_name
  		render :new
  	end
  end

  def index
  	@user = User.find(params[:user_id])
    @received_messages = @user.obtained_messages.excluding_by_senders(@user.blocked_users).page(params[:page])
  end

  def show
    @private_message = PrivateMessage.find(params[:id])
    #@received_messages = @user.obtained_messages.excluding_by_senders(@user.blocked_users)
  end

  def destroy
  	private_message_to_destroy = PrivateMessage.find(params[:id])
    recipient = private_message_to_destroy.recipient
  	private_message_to_destroy.destroy
  	respond_to do |format|
  			format.json{render json:{action_status: "success"}}
        format.html{ redirect_to user_private_messages_path(recipient) }
  	end
  end

  private
  def private_message_params
  	params.require(:private_message).permit(:message, :recipient_id)
  end
end
