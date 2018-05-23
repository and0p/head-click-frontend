import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import constants from '../../../constants'

const styles = theme => ({
    root: {
        flex: 1,
        textAlign: 'center',
        maxWidth: constants.wizardPageWidth,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    headline: {
        color: '#FFFFFF'
    },
    subheader: {
        color: '#CCCCCC'
    },
    subtle: {
        color: '#999999'
    },
    image: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
});

const DpiAssignment = props => {
    const { classes, theme } = props;
    return (
        <div className={classes.root}>
            <Typography variant="display1" className={classes.headline}>
                We've assigned you a DPI of {props.monitor.recommendedDpi}
            </Typography>
            <Typography variant="body1" className={classes.subtle} gutterBottom>
                (You can change this at any time from the dashboard)
            </Typography>
            <img className={classes.image} src="http://placehold.it/500x300&text=assignment_notification" />
            <Typography variant="headline" className={classes.subheader}>
                We recommend DPI based on desktop resolution.
            </Typography>
            <Typography variant="body1" className={classes.subtle}>
                Due to the way modern mice work, there's no benefit to having a lower DPI over lower in-game sensitivity. And with larger monitor resolutions, lower DPI makes everyday desktop usage and RTS / MOBA games difficult. Read more...
            </Typography>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        monitor: state.profile.settings.monitor
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