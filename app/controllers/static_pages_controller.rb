class StaticPagesController < ApplicationController
  def root
    render 'root'
  end

  def dashboard
    @user = current_user
    @pages = @user.pages
    render 'dashboard'
  end
end
