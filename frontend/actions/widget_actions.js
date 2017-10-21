import * as APIUtil from '../util/widget_api_util';
import { 
    openWidgetForEditing, 
    showLoadingForWidget,
    hideLoading
} from '../actions/edit_page_ui_actions';

export const RECEIVE_WIDGETS = 'RECEIVE_WIDGETS';
export const RECEIVE_WIDGET = 'RECEIVE_WIDGET';
export const REMOVE_WIDGET_FROM_LIST = 'REMOVE_WIDGET_FROM_LIST';

export const receiveWidgets = widgets => ({
    type: RECEIVE_WIDGETS,
    widgets
});

export const receiveWidget = widget => ({
    type: RECEIVE_WIDGET,
    widget
})

export const removeWidgetFromList = widgetId => ({
    type: REMOVE_WIDGET_FROM_LIST,
    widgetId
})

export const createWidget = (pageId, widgetType, rankAfter) => dispatch => (
    APIUtil.createWidget(pageId, widgetType, rankAfter).done(widget => {
        dispatch(receiveWidget(widget))
        return dispatch(openWidgetForEditing(widget.id))
    })
);

export const updateWidget = (widgetId, fields) => dispatch => {
    dispatch(openWidgetForEditing(null));
    dispatch(showLoadingForWidget(widgetId));

    return APIUtil.updateWidget(widgetId, fields).done(widget => {
        dispatch(hideLoading())
        return dispatch(receiveWidget(widget))
    })
};

export const adjustRank = (widgetId, destination) => dispatch => (
    APIUtil.adjustRank(widgetId, destination).done(widget => (
        dispatch(receiveWidget(widget))
    ))
);

export const destroyWidget = widgetId => dispatch => (
    APIUtil.destroyWidget(widgetId).then(() => (
        dispatch(removeWidgetFromList(widgetId))
    ))
);

