import { connect } from 'react-redux';

import Field from './Field';

const mapStateToProps = (state, { field }) => {
    return {
        field
    };
};

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Field);