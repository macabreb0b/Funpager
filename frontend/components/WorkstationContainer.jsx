import { connect } from 'react-redux';

import Workstation from './Workstation';
import { updatePageTheme } from '../actions/page_actions';

const mapStateToProps = (state, { pageId }) => {
    return {
        pageId
    };
};

const mapDispatchToProps = dispatch => ({
    setTheme: (pageId, theme) => dispatch(updatePageTheme(pageId, theme))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Workstation);