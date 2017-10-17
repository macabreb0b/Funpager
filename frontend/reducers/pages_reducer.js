import merge from 'lodash/merge';

import {
    RECEIVE_PAGE
} from '../actions/page_actions';

const pagesReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_PAGE:
            const page = action.page;

            return merge({}, state, { [page.id]: page });
        default:
            return state;
    }
};

export default pagesReducer;
