import merge from 'lodash/merge';

import {
    RECEIVE_WIDGETS,
    RECEIVE_WIDGET,
    REMOVE_WIDGET_FROM_LIST
} from '../actions/widget_actions';

const widgetsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_WIDGETS:
            const widgetMap = {};

            action.widgets.forEach(function(widget) {
                widgetMap[widget.id] = widget;
            })
            return merge({}, state, widgetMap);

        case RECEIVE_WIDGET:
            const widget = action.widget;

            return merge({}, state, { [widget.id]: widget });

        case REMOVE_WIDGET_FROM_LIST:
            const newState = merge({}, state)
            delete newState[action.widgetId];

            return newState;
            
        default:
            return state;
    }
};

export default widgetsReducer;