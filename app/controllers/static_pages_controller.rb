class StaticPagesController < ApplicationController
  before_action :check_logged_in, only: [:root]

  def root
    @user = current_user
    @pages = current_user.pages
    render 'root'
  end

  def splash
    @top_pages_by_hit_count = Page.where('hit_count > 0').order('hit_count').limit(10).reverse
    render 'splash'
  end
end
