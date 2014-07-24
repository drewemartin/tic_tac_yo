class GamesController < ApplicationController
  def show
    @inviter = User.find(params[:inviter_id])
    @invitee = User.find(params[:invitee_id])
    if current_user.id != @inviter.id || current_user != @invitee.id 
      redirect_to users_path
    end
  end
end
