class PagesController < ApplicationController
  # def new # for testing accepts_nested_attributes_for
  #   @page = Page.new
  #   @page.widgets << Widget.new_headline_widget
  #   @page.widgets << Widget.new_text_widget
  #
  #   render 'new'
  # end

    def edit
        @page_id = params[:id]
        render 'edit'
    end


  def create
    @page = Page.new_starting_page
    @page.user_id = current_user.id
    check_logged_in
    
    if @page.save
      redirect_to :show, id: @page.id
    else
      flash[:errors] = @page.errors.full_messages
      render 'new'
    end
  end

  def show
    @page = Page.friendly.find(params[:id])
    @widgets = @page.widgets.sort_by(&:rank)

    respond_to do |format|
      format.json do # only render JSON if it's your page
        check_permissions(@page)
        render json: @page.to_json(include: {
          :widgets => {:include => :fields},
        })
      end

      format.html do # render RUBY whenever
        increment_page_count
        render 'show'
      end
    end

    rescue ActiveRecord::RecordNotFound
      redirect_to root_url
  end

  def update
    @page = Page.find(params[:id])
    check_permissions(@page)

    if @page.update_attributes(page_params)
      render :json => @page.to_json(include: :widgets, :methods => :time_ago)
    else
      render :json => @page.errors.full_messages, status: 422
    end
  end

  def index
    check_logged_in
    @pages = current_user.pages.sort_by(&:created_at)
    render json: @pages.to_json(include: :widgets, :methods => :time_ago)
  end

  def destroy
    page = Page.find(params[:id])
    check_permissions(page)
    page.destroy
    render json: {}
  end

  private
    def page_params
      params.require(:page).permit(:title, :theme, :handle, :company,
        widgets_attributes: [:name, :rank,
        fields_attributes: [:id, :label, :content, :content_type, :image, :placeholder]])
    end

    def increment_page_count
      unless current_user && @page.owner.id == current_user.id
        @page.hit_count ||= 0
        @page.hit_count += 1
        @page.save
      end
    end
end
