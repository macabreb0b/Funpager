class StaticPagesController < ApplicationController
  def root
    @user = current_user
    @pages = @user.pages
    render 'root'
  end
end
