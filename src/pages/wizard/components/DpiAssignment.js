import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        flex: 1,
        textAlign: 'center'
    },
    headline: {
        color: '#FFFFFF'
    },
    subheader: {
        color: '#CCCCCC'
    },
    subtle: {
        color: '#999999'
    }
});

const DpiAssignment = props => {
    const { classes, theme } = props;
    return (
    <div className={classes.root}>
        <Typography variant="display1" className={classes.headline}>
            We've assigned you a mouse DPI of {props.dpiAssigned}
        </Typography>
        <Typography variant="body1" className={classes.subtle} gutterBottom>
            (You can change this at any time from the dashboard)
        </Typography>
        <Typography variant="headline" className={classes.subheader} gutterBottom>
            We recommend DPI based on desktop resolution.
        </Typography>
        <Typography variant="body1" className={classes.subtle}>
            Due to the way modern mice work, there's really no benefit to having a lower DPI versus lower in-game sensitivity.<br/>
            And with the increasing resolution of desktop monitors, using 400 DPI becoming harder to use.
        </Typography>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dpiAssigned: state.profile.dpi.recommended
    }
}
  
const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DpiAssignment))