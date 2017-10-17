import { connect } from 'react-redux';

import EditableWidget from './EditableWidget';
import { updateWidget } from '../actions/widget_actions';
import { openWidgetForEditing } from '../actions/edit_page_ui_actions';

const mapStateToProps = (state, { widget }) => {
    const fields = widget.fields.slice().sort(function(a, b) {
        return a.id - b.id;
    })
    return {
        widget,
        fields
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateWidget: (fields) => (
        dispatch(updateWidget(
            ownProps.widget.id, 
            fields,
        ))
    ),
    cancelEditing: () => (dispatch(openWidgetForEditing(null))),
    destroyWidget: () => (
        dispatch(destroyWidget(ownProps.widget.id))
    )
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditableWidget);