import * as APIUtil from '../util/page_api_util'

import { receiveWidgets } from './WidgetActions';

export const RECEIVE_PAGE = 'RECEIVE_PAGE';


export const receivePage = page => ({
    type: RECEIVE_PAGE,
    page
})

export const fetchPage = pageId => dispatch => (
    APIUtil.fetchPage(pageId).then(function(page) {
        const widgets = page.widgets // TODO - return widgets separately? non-nested?
        
        dispatch(receiveWidgets(widgets))
        return dispatch(receivePage(page))
    })
);

export const updatePageTheme = (pageId, themeName) => dispatch => (
    APIUtil.updatePageTheme(pageId, themeName).then(function(pageData) {
        return dispatch(receivePage(pageData))
    })
);