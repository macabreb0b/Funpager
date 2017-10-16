import merge from 'lodash/merge';

import {
    RECEIVE_WIDGETS,
    RECEIVE_WIDGET
} from '../actions/WidgetActions';

const widgetsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_WIDGETS:
            const widgetMap = {};
            action.widgets.forEach(function(widget) {
                widgetMap[widget.id] = widget;
            })
            debugger
            return merge({}, state, widgetMap);

        case RECEIVE_WIDGET:
            const widget = action.widget;

            return merge({}, state, { [widget.id]: widget });

        default:
            return state;
    }
};

export default widgetsReducer;