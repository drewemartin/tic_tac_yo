class GamesController < ApplicationController
  def show
    @inviter = User.find(params[:inviter_id])
    @invitee = User.find(params[:invitee_id])
    if (current_user.id != @inviter.id && current_user.id != @invitee.id) 
      redirect_to users_path
    end
  end
end
