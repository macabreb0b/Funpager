class WidgetsController < ApplicationController
  def index
    @page = Page.find(params[:page_id])
    @widgets = @page.widgets

    render json: @widgets.to_json(include: :fields)
  end

end
