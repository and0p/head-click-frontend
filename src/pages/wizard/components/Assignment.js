import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import ReactFitText from 'react-fittext'
import Typography from '@material-ui/core/Typography';
import copy from '../../../copy'
import constants from '../../../constants'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
        flex: 1,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px'
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
        marginBottom: theme.spacing.unit * 2,
        maxWidth: '80%'
    }
});

const Assignment = props => {
    const { classes, theme } = props;
    const image = {
        width: '90%',
        maxWidth: '600px',
        margin: 'auto',
    }
    let thisCopy = props.version == "dpi" ? copy["en"].assignment.dpi : copy["en"].assignment.sensitivity
    let assignment = props.version == "dpi" ? props.profile.settings.dpi.recommended : props.profile.settings.sensitivity.recommended
    return (
    <div className={classes.root}>
        <ReactFitText minFontSize={24} maxFontSize={36}>
            <Typography variant="display2" className={classes.headline}>
                {thisCopy.headline + assignment}
            </Typography>
        </ReactFitText>
        <Typography variant="body1" className={classes.subtle} gutterBottom>
            (You can change this at any time from the dashboard.)
        </Typography>
        <div className={classes.imageContainer}>
                <img style={image} src="https://s3.amazonaws.com/head-click/public/placeholder_image.png" />
        </div>
        <div className={classes.hookSection}>
            {thisCopy.points.map(point => 
            <div className={classes.hook}>
                <Typography variant="subheading" className={classes.subheader} gutterBottom>
                    {point.primary}
                </Typography>
                <Typography variant="body1" className={classes.subtle}>
                    {point.secondary}
                </Typography>
            </div>
            )}
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Assignment))