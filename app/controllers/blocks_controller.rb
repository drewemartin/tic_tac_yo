class BlocksController < ApplicationController
  def create
  	user_to_add = User.find(params[:tobe_added_user_id])
  	p user_to_add
  	@block = current_user.blocks.build(blocked: user_to_add)
  	respond_to do |format|
  		if @block.save
  			blocked_user = @block.blocked
  			#if the blocked_user is on the favorite list, remove it from the favorite list
  			Favorite.where(:favoriter => current_user, :favorited => blocked_user).destroy_all
  			format.json{render json: {first_name: blocked_user.first_name, last_name: blocked_user.last_name}}
  		end
  	end
  end

  def destroy
  	block_to_delete = Block.find(params[:id])
    blocked_user = block_to_delete.blocked
    respond_to do |format|
      if block_to_delete.destroy
        format.json{render json:{first_name: blocked_user.first_name, last_name: blocked_user.last_name}}
      end
    end
  end
end
