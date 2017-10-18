import { connect } from 'react-redux';

import WidgetActions from './WidgetActions';
import { adjustRank } from '../actions/widget_actions';

const mapStateToProps = (state, { widgetId, rank }) => {
    return {
    	widgetId,
        rank,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	adjustRank: destination => (dispatch(adjustRank(ownProps.widgetId, destination)))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetActions);