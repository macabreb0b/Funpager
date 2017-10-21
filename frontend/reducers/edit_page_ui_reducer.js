import merge from 'lodash/merge';

import { 
    OPEN_WIDGET_FOR_EDITING, 
    SHOW_LOADING_FOR_WIDGET,
    HIDE_LOADING
} from '../actions/edit_page_ui_actions';

const defaultEditPageState = Object.freeze({
    openWidgetId: null,
    loadingWidgetId: null,
});

const EditPageUIReducer = (state = defaultEditPageState, action) => {
    Object.freeze(state);
    if (action.type === OPEN_WIDGET_FOR_EDITING) {

        return merge({}, state, { openWidgetId: action.widgetId });
    } else if (action.type === SHOW_LOADING_FOR_WIDGET) {

        return merge({}, state, { loadingWidgetId: action.widgetId });
    } else if (action.type === HIDE_LOADING) {

        return merge({}, state, { loadingWidgetId: null });
    } else {
        return state;
    }
};

export default EditPageUIReducer;