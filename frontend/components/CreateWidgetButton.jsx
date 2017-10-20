import React, {Component} from 'react';

export const WidgetTypes = {
    BUTTON: 'Button',
    PHOTO: 'Image',
    TEXT: 'Text',
    SEPARATOR: 'Separator',
}

const WIDGET_TYPE_TO_BUTTON_TEXT = {
    [WidgetTypes.BUTTON]: "Add Link",
    [WidgetTypes.PHOTO]: "Add Image",
    [WidgetTypes.TEXT]: "Add Text",
    [WidgetTypes.SEPARATOR]: "Add Separator",
}    

const WIDGET_TYPE_TO_ICON_CLASS = {
    [WidgetTypes.BUTTON]: "glyphicon glyphicon-unchecked",
    [WidgetTypes.PHOTO]: "glyphicon glyphicon-picture",
    [WidgetTypes.TEXT]: "glyphicon glyphicon-font",
    [WidgetTypes.SEPARATOR]: "glyphicon glyphicon-resize-horizontal",
}    


export class CreateWidgetButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault()

        this.props.createWidget(
            this.props.pageId, 
            this.props.widgetType, 
            this.props.rankAfter,
        )
        this.props.closeFormAfterCreate();
    }

    render() {
        return (
            <a href="javascript:;"
                className='btn btn-default btn-sm btn-add-widget'
                onClick={ this.handleClick }>
                <span className={ WIDGET_TYPE_TO_ICON_CLASS[this.props.widgetType] }></span><br />
                { WIDGET_TYPE_TO_BUTTON_TEXT[this.props.widgetType] }
            </a>
        )
    }
} 


