class PagesController < ApplicationController
  def new
    @page = Page.new
    3.times do
      widget = @page.widgets.build
      2.times { widget.fields.build }
    end

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
    render 'show'
  end

  def update
  end

  def index
    @pages = current_user.pages
    render json: @pages
  end

  def destroy
    page = Page.find(params[:id])
    page.destroy
    redirect_to dashboard_url
  end

  private

    def page_params
      params.require(:page).permit(:title, widgets_attributes: [:name, fields_attributes: [:label, :content]])
    end
end
