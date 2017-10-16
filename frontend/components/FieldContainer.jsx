import { connect } from 'react-redux';

import Field from './Field';

const mapStateToProps = (state, { field, isOpen, index }) => {
    return {
        field,
        isOpen, 
        index
    };
};

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Field);