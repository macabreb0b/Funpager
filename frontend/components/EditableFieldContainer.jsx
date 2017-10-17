import { connect } from 'react-redux';

import EditableField from './EditableField';

const mapStateToProps = (state, { field }) => {
    return {
        field
    };
};

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditableField);