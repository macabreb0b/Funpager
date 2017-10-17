import { connect } from 'react-redux';

import PhotoField from './PhotoField';

const mapStateToProps = (state, { field }) => {
    return {
        field,
    };
};

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoField);