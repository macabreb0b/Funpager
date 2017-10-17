import { connect } from 'react-redux';

import TextField from './TextField';

const mapStateToProps = (state, { field }) => {
    return {
        field
    };
};

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextField);