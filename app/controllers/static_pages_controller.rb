class StaticPagesController < ApplicationController
  before_action :check_logged_in, only: [:root]

  def root
    @user = current_user
    # @pages = @user.pages
    render 'root'
  end

  def splash
    render 'splash'
  end
end
