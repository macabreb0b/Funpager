class StaticPagesController < ApplicationController
  before_action :check_logged_in, only: [:root]

  def root
    @user = current_user
    render 'root'
  end

  def splash
    @top_pages_by_hit_count = Page.where('hit_count > 0').order('hit_count').limit(10)
    render 'splash'
  end
end
