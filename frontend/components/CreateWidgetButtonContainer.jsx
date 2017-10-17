import { connect } from 'react-redux';

import { CreateWidgetButton } from './CreateWidgetButton';
import { createWidget } from '../actions/WidgetActions';
import { currentPageId } from '../reducers/selectors';

const mapStateToProps = (state, { widgetType, rankAfter }) => {
    return {
        pageId: currentPageId(state.entities),
        widgetType,
        rankAfter,
    };
};

const mapDispatchToProps = dispatch => ({
    createWidget: (pageId, widgetType, rankAfter) => (
        dispatch(createWidget(pageId, widgetType, rankAfter))
    ),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateWidgetButton);