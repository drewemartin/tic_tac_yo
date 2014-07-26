class FavoritesController < ApplicationController
  def create

  	user_to_add = User.find(params[:tobe_added_user_id])
  	@favorite = current_user.favorites.build(favorited: user_to_add)
  	respond_to do |format|
  		if @favorite.save
  			favorited_user = @favorite.favorited
        #if the favorited_user is on the block list, remove it from the block list
        Block.where(:blocker => current_user, :blocked => favorited_user).destroy_all
  			format.json{render json: {first_name: favorited_user.first_name, last_name: favorited_user.last_name}}
  		end
  	end
  end

  def destroy
    favorite_to_delete = Favorite.find(params[:id])
    favorited_user = favorite_to_delete.favorited
    respond_to do |format|
      if favorite_to_delete.destroy
        format.json{render json:{first_name: favorited_user.first_name, last_name: favorited_user.last_name}}
      end
    end
  end
end
