class WidgetsController < ApplicationController
  def index # gets called by page/edit widgets/index.json.jbuilder
    @page = Page.find(params[:page_id])
    @widgets = @page.widgets
    # 3.times {puts "in widgets#index"}
    # render :json => @widgets.to_json(include: :fields)
  end

  def new # for testing paperclip
    @widget = Widget.new
    @widget.fields << Field.new_title_field
    @widget.fields << Field.new_photo_field
    render 'new'
  end

  def show # for testing paperclip / jbuilder
    @widget = Widget.find(params[:id])
    3.times {puts 'in widgets#show'}
  end

  def update
    @widget = Widget.find(params[:id])

    if @widget.update_attributes(widget_params)

      render json: @widget.to_json(include: :fields)
    else
      render json: @widget.errors.full_messages, status: 422
    end
  end

  def create
    @widget = Widget.new(widget_params)

    if @widget.save
      render 'show'
    else
      render json: @widget.errors.full_messages, status: 422
    end
  end

  def destroy
    widget = Widget.find(params[:id])
    widget.destroy
    render json: {}
  end

  private
    def widget_params
      params.require(:widget)
        .permit(:rank, :name, :page_id, fields_attributes: [:id, :label, :content, :content_type, :image, :placeholder])
    end
end
