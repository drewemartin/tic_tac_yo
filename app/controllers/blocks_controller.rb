class BlocksController < ApplicationController
  def create
  	user_to_add = User.find(params[:tobe_added_user_id])
  	p user_to_add
  	@block = current_user.blocks.build(blocked: user_to_add)
  	respond_to do |format|
  		if @block.save
  			@user = @block.blocked
  			#if the @user is on the favorite list, remove it from the favorite list
  			Favorite.where(:favoriter => current_user, :favorited => @user).destroy_all
  			# format.json{render json: {first_name: blocked_user.first_name, last_name: blocked_user.last_name}}
        format.js{render partial: "blocks/destroy_block"}
  		end
  	end
  end

  def destroy
  	block_to_delete = Block.find(params[:id])
    @user = block_to_delete.blocked
    block_to_delete.destroy
    respond_to do |format|
        # format.json{render json:{first_name: @user.first_name, last_name: @user.last_name}}
        format.js{render partial: "blocks/block"}
    end
  end
end
