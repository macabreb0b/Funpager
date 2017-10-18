import { connect } from 'react-redux';

import PhotoField from './PhotoField';

const mapStateToProps = (state, { src, caption }) => {
    return {
        src,
        caption,
    };
};

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoField);