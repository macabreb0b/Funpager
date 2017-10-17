import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import configureStore from './store/store';
import PageContainer from './components/PageContainer'


const Root = ({ store, pageId }) => (
    <Provider store={store}>
        <PageContainer pageId={ pageId }/>
    </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();

    const root = document.getElementById('root');
    const pageId = $(root).data('page-id');

    ReactDOM.render(<Root store={store} pageId={pageId} />, root);
});