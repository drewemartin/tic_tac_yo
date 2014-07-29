class FavoritesController < ApplicationController
  def create

  	user_to_add = User.find(params[:tobe_added_user_id])
  	@favorite = current_user.favorites.build(favorited: user_to_add)
  	respond_to do |format|
  		if @favorite.save
  			@user = @favorite.favorited
        #if the user is on the block list, remove it from the block list
        Block.where(:blocker => current_user, :blocked => @user).destroy_all
        format.js { render partial: "favorites/destroy_favorite" }
  		end
  	end
  end

  def destroy
    favorite_to_delete = Favorite.find(params[:id])
    @user = favorite_to_delete.favorited
    respond_to do |format|
      if favorite_to_delete.destroy
        format.json{render json:{first_name: @user.first_name, last_name: @user.last_name}}
        format.js { render partial: "favorites/favorite" }

      end
    end
  end
end
