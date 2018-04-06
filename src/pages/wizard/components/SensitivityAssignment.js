import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography';

const styles = theme => ({
});

const SensitivityAssignment = props => (
    <div>
        We've assigned you a sensitivity of {props.sensitivity} based on your screen size.
        You can change this at any time from the dashboard.
    </div>
)

const mapStateToProps = (state) => {
    return {
        dpiAssigned: state.profile.sensitivity
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SensitivityAssignment))