import React from 'react';

export const WidgetTypes = {
    BUTTON: 'Button',
    PHOTO: 'Image',
    TEXT: 'Text',
}

const WIDGET_TYPE_TO_BUTTON_TEXT = {
    [WidgetTypes.BUTTON]: "Add Link",
    [WidgetTypes.PHOTO]: "Add Image",
    [WidgetTypes.TEXT]: "Add Text",
}    

const WIDGET_TYPE_TO_ICON_CLASS = {
    [WidgetTypes.BUTTON]: "glyphicon glyphicon-unchecked",
    [WidgetTypes.PHOTO]: "glyphicon glyphicon-picture",
    [WidgetTypes.TEXT]: "glyphicon glyphicon-font",
}    


export const CreateWidgetButton = ({ pageId, widgetType, rankAfter, createWidget}) => (
    <a href="javascript:;"
        className='btn btn-default btn-sm btn-add-widget'
        onClick={ createWidget.bind(null, pageId, widgetType, rankAfter) }>
        <span className={ WIDGET_TYPE_TO_ICON_CLASS[widgetType] }></span><br />
        { WIDGET_TYPE_TO_BUTTON_TEXT[widgetType] }
    </a>
)