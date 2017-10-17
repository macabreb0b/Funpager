class WidgetsController < ApplicationController

    def index # gets called by page/edit widgets/index.json.jbuilder
        @page = Page.find(params[:page_id])
        check_permissions(@page)
        @widgets = @page.widgets

        render json: @widgets.to_json(include: :fields)
    end

    # def new # for testing paperclip
    #   @widget = Widget.new
    #   @widget.fields << Field.new_title_field
    #   @widget.fields << Field.new_photo_field
    #   render 'new'
    # end

    # def show # for testing paperclip / jbuilder
    #   @widget = Widget.find(params[:id])
    #   3.times {puts 'in widgets#show'}
    # end

    def update
        @widget = Widget.find(params[:id])
        check_permissions(@widget)


        if @widget.update_attributes(widget_update_params)
            render json: @widget.to_json(include: :fields)
        else
            render json: @widget.errors.full_messages, status: 422
        end
    end

    def create
        widget_params = params.require(:widget).permit(:rank_after, :name, :page_id)
        rank = Page.find(
            widget_params[:page_id]
        ).get_next_widget_rank(
            widget_params[:rank_after]
        )

        @widget = case widget_params[:name]
        when 'Text'
            Widget.new_text_widget(
                widget_params[:page_id], 
                rank,
            )
        when 'Image'
            Widget.new_photo_widget(
                widget_params[:page_id], 
                rank,
            )
        when 'Button'
            Widget.new_link_widget(
                widget_params[:page_id], 
                rank,
            )
        else
            fail
        end

        check_permissions(@widget)

        if @widget.save
            render 'show'
        else
            render json: @widget.errors.full_messages, status: 422
        end
    end

    def destroy
        widget = Widget.find(params[:id])
        check_permissions(widget)
        widget.destroy
        render json: {}
    end

    private
    def widget_update_params
        params.require(:widget).permit(
            :rank, 
            :name, 
            :page_id, 
            fields_attributes: [
                :id, 
                :label, 
                :content, 
                :content_type, 
                :image, 
                :placeholder
            ]
        )
    end
end
