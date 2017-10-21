import { connect } from 'react-redux';

import LoadingWidget from './LoadingWidget';

const mapStateToProps = (state, { widget }) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingWidget);