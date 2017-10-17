import * as APIUtil from '../util/widget_api_util';

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
    APIUtil.createWidget(pageId, widgetType, rankAfter).done(widget => (
      dispatch(receiveWidget(widget))
    ))
);
