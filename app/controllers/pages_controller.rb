class PagesController < ApplicationController
  def new
    @page = Page.new
    @page.widgets << Widget.new_headline_widget
    @page.widgets << Widget.new_text_widget
    @page.widgets << Widget.new_text_widget

    render 'new'
  end

  def create
    @page = Page.new(page_params)
    @page.user_id = current_user.id


    if @page.save
      redirect_to page_url(@page)
    else
      flash[:errors] = @page.errors.full_messages
      render 'new'
    end
  end

  def show
    @page = Page.find(params[:id])
    render json: @page.to_json(include: :widgets)
  end

  def update
  end

  def index
    @pages = current_user.pages
    render json: @pages.to_json(include: :widgets)
  end

  def destroy
    page = Page.find(params[:id])
    page.destroy
    redirect_to dashboard_url
  end

  private

    def page_params
      params.require(:page).permit(:title, widgets_attributes: [:name, fields_attributes: [:label, :content, :content_type]])
    end
end
