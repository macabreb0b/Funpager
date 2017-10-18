import { connect } from 'react-redux';

import EditableField from './EditableField';

const mapStateToProps = (state, { field, updateField }) => {
    return {
        field,
        updateField,
    };
};

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditableField);