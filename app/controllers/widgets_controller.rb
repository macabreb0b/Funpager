class WidgetsController < ApplicationController
  def index
    @page = Page.find(params[:page_id])
    @widgets = @page.widgets

    render json: @widgets.to_json(include: :fields)
  end

  def update
    @widget = Widget.find(params[:id])

    if @widget.update_attributes(widget_params)
      render json: @widget.to_json(include: :fields)
    else
      flash[:errors] = @widget.errors.full_messages
    end
  end

  def show
  end

  def destroy
  end

  private
    def widget_params
      params.require(:widget).permit(:rank, :name, fields_attributes: [:label, :content, :content_type])
    end
end
