import { connect } from 'react-redux';

import Widget from './Widget';
import { openWidgetForEditing } from '../actions/edit_page_ui_actions'

const mapStateToProps = (state, { widget }) => {
    const fields = widget.fields.slice().sort(function(a, b) {
        return a.id - b.id;
    })
    return {
        widget,
        fields
    };
};

const mapDispatchToProps = dispatch => ({
    startEditingWidget: widgetId => (dispatch(openWidgetForEditing(widgetId)))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Widget);