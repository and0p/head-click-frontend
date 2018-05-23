import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import constants from '../../../constants'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
        flex: 1,
        textAlign: 'center',
        //maxWidth: constants.wizardPageWidth,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    headline: {
        color: '#FFFFFF'
    },
    subheader: {
        color: '#CCCCCC',
        fontSize: '1.25rem',
        lineHeight: '1.25rem',
        marginBottom: theme.spacing.unit
    },
    subtle: {
        color: '#999999'
    },
    hookSection: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
        maxWidth: '550px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    hook: {
        marginBottom: theme.spacing.unit * 2
    },
    image: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
});

const SensitivityAssignment = props => {
    const { classes, theme } = props;
    return (
    <div className={classes.root}>
        <Typography variant="display1" className={classes.headline}>
            We've assigned you a {constants.cm360Text} of {props.sensitivityAssigned}
        </Typography>
        <Typography variant="body1" className={classes.subtle} gutterBottom>
            (You can change this at any time from the dashboard.)
        </Typography>
        <img className={classes.image} src="http://placehold.it/500x300&text=assignment_notification" />
        <div className={classes.hookSection}>
            <div className={classes.hook}>
                <Typography variant="subheading" className={classes.subheader} gutterBottom>
                    Your {constants.cm360Text} is your sensitivity across all your games.
                </Typography>
                <Typography variant="body1" className={classes.subtle}>
                    It's a mapping of mouse movement in real-life centimeters to a full in-game rotation. This is the only consistent measurement we can use between various games, resolutions, aspect ratios, field of views, etc.
                </Typography>
            </div>
            <div className={classes.hook}>
                <Typography variant="subheading" className={classes.subheader} gutterBottom>
                    We recommend {constants.cm360Text} based on what games / roles you play
                </Typography>
                <Typography variant="body1" className={classes.subtle}>
                    Read more...
                </Typography>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sensitivityAssigned: state.profile.settings.sensitivity.recommended
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