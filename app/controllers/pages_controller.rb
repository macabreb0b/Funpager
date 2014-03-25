class PagesController < ApplicationController
  def new
    @page = Page.new
    @page.widgets << Widget.new_headline_widget
    @page.widgets << Widget.new_text_widget
    @page.widgets << Widget.new_text_widget

    render 'new'
  end

  def create
    # @page = Page.new(page_params)

    @page = Page.new_starting_page

    @page.user_id = current_user.id

    if @page.save
      render :json => @page.to_json(include: :widgets)
    else
      flash[:errors] = @page.errors.full_messages
      render 'new'
    end
  end

  def show
    @page = Page.friendly.find(params[:id])
    @widgets = @page.widgets.sort_by(&:rank)
    respond_to do |format|
      format.json { render json: @page.to_json(include: :widgets) }
      format.html { render 'show' }
    end
  end

  def update
    @page = Page.find(params[:id])
    if @page.update_attributes(page_params)
      render :json => @page.to_json()
    else
      render :json => @page.errors.full_messages
    end
  end

  def index
    @pages = current_user.pages
    render json: @pages.to_json(include: :widgets, :methods => :time_ago)
  end

  def destroy
    page = Page.find(params[:id])
    page.destroy
    render json: {}
  end

  private

    def page_params
      params.require(:page).permit(:title, :theme,
            widgets_attributes: [:name, :rank,
            fields_attributes: [:id, :label, :content, :content_type, :image, :placeholder]])
    end
end
