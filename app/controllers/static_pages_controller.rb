class StaticPagesController < ApplicationController
  before_action :check_logged_in

  def root
    @user = current_user
    @pages = @user.pages
    render 'root'
  end
end
