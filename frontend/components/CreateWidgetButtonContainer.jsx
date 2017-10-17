import { connect } from 'react-redux';

import { CreateWidgetButton } from './CreateWidgetButton';
import { createWidget } from '../actions/widget_actions';
import { currentPageId } from '../reducers/selectors';

const mapStateToProps = (state, { widgetType, rankAfter, closeForm }) => {
    return {
        pageId: currentPageId(state.entities),
        widgetType,
        rankAfter,
        closeForm,
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