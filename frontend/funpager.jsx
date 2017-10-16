import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import * as WidgetAPIUtil from './util/widget_api_util'
import * as PageAPIUtil from './util/page_api_util'

import { receiveWidgets } from './actions/WidgetActions'
import { fetchPage } from './actions/PageActions'

window.WidgetAPIUtil = WidgetAPIUtil
window.PageAPIUtil = PageAPIUtil

window.fetchPage = fetchPage
window.receiveWidgets = receiveWidgets

import configureStore from './store/store';
import PageContainer from './components/PageContainer'


const Root = ({ store }) => (
    <Provider store={store}>
        <PageContainer pageId="3"/>
    </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();

    window.getState = store.getState
    window.dispatch = store.dispatch

    const root = document.getElementById('root');

    ReactDOM.render(<Root store={store} />, root);
});