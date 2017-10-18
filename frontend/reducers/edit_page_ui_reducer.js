import merge from 'lodash/merge';

import { OPEN_WIDGET_FOR_EDITING } from '../actions/edit_page_ui_actions';

const defaultEditPageState = Object.freeze({
    openWidgetId: null,
});

const EditPageUIReducer = (state = defaultEditPageState, action) => {
    Object.freeze(state);
    if (action.type === OPEN_WIDGET_FOR_EDITING) {

        return merge({}, state, { openWidgetId: action.widgetId });
    } else {
        return state;
    }
};

export default EditPageUIReducer;