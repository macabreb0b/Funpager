import { connect } from 'react-redux';

import { fetchPage } from '../actions/page_actions';
import { selectPage, selectAllWidgets } from '../reducers/selectors';
import Page from './Page';

const mapStateToProps = (state, { pageId }) => {
    const pageIdInt = parseInt(pageId);
    const page = selectPage(state.entities, pageIdInt);

    const widgets = selectAllWidgets(state.entities);
    const openWidgetId = state.ui.edit_page_ui.openWidgetId;
    const loadingWidgetId = state.ui.edit_page_ui.loadingWidgetId;
    
    return {
        pageId: pageIdInt,
        page,
        widgets,
        openWidgetId,
        loadingWidgetId,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPage: id => dispatch(fetchPage(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page);