import { connect } from 'react-redux';

// import { selectPage, selectAllWidgets } from '../reducers/selectors';
import Widget from './Widget';

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
    openWidget: widgetId => dispatch(showWidgetForm(widgetId))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Widget);