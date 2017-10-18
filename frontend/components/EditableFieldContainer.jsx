import { connect } from 'react-redux';

import EditableField from './EditableField';

const mapStateToProps = (state, { field, updateFieldContent }) => {
    return {
        field,
        updateFieldContent,
    };
};

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditableField);