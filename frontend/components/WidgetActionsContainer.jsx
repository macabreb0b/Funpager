import { connect } from 'react-redux';

import WidgetActions from './WidgetActions';

const mapStateToProps = (state, { rankAfter }) => {
    return {
        rankAfter,
    };
};

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetActions);