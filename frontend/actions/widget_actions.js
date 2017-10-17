import * as APIUtil from '../util/widget_api_util';
import { openWidgetForEditing } from '../actions/edit_page_ui_actions';

export const RECEIVE_WIDGETS = 'RECEIVE_WIDGETS';
export const RECEIVE_WIDGET = 'RECEIVE_WIDGET';

export const receiveWidgets = widgets => ({
    type: RECEIVE_WIDGETS,
    widgets
});

export const receiveWidget = widget => ({
    type: RECEIVE_WIDGET,
    widget
})

export const createWidget = (pageId, widgetType, rankAfter) => dispatch => (
    APIUtil.createWidget(pageId, widgetType, rankAfter).done(widget => {
        dispatch(receiveWidget(widget))
        return dispatch(openWidgetForEditing(widget.id))
    })
);

export const updateWidget = (widgetId, fields) => dispatch => {
    dispatch(openWidgetForEditing(null));
    // dispatch(showLoading(widget.id)); TODO - show loading widget
    return APIUtil.updateWidget(widgetId, fields).done(widget => (
        dispatch(receiveWidget(widget))
    ))
}

// export const destroyWidget = widget => dispatch => ({}) / TODO - destroy widget