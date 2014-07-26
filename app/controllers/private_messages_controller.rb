class PrivateMessagesController < ApplicationController
  
  def new
  	@private = PrivateMessage.new
  end


  def create
  	@private = PrivateMessage.new
  end
end
