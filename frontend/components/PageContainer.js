import { connect } from 'react-redux';

import { fetchPage } from '../actions/PageActions';
import { selectPage, selectAllWidgets } from '../reducers/selectors';
import Page from './Page';

const mapStateToProps = (state, { pageId }) => {
    const pageIdInt = parseInt(pageId);
    const page = selectPage(state.entities, pageIdInt);
    const widgets = selectAllWidgets(state.entities);

    return {
        pageId: pageIdInt,
        page,
        widgets
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPage: id => dispatch(fetchPage(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page);