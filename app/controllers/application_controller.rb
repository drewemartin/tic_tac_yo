class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :require_login

  helper_method :current_users_list
  
  protected
    def current_users_list
      current_users
    end

  private
  def not_authenticated
    redirect_to login_path, alert: 'Please login first'
  end

end
