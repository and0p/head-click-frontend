import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { defaultPageCSS } from '../../../theme'
import classNames from 'classnames'
import ReactFitText from 'react-fittext'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import copy from '../../../copy'
import constants from '../../../constants'
import * as Symbols from '../../../redux/HcSymbols'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    ...defaultPageCSS,
    subheader: {
        color: '#CCCCCC',
        fontSize: '1.25rem',
        lineHeight: '1.25em',
        marginBottom: theme.spacing.unit
    },
    hookSection: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2,
        maxWidth: '550px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    hook: {
        marginBottom: theme.spacing.unit * 2,
        textAlign: "center"
    },
    imageContainerDPI: {
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit * 3,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
        },
        background: "url('https://s3.amazonaws.com/head-click/public/wizard/dpi_assignment%401x.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", 
        width: "100%",
        maxWidth: "600px",
        //backgroundSize: "100% auto",
        position: "relative",
        display: "table",
        // MAKE THIS VARIABLE
        height: "300px",
    },
    imageContainerSensitivity: {
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit * 3,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
        },
        background: "url('https://s3.amazonaws.com/head-click/public/wizard/sensitivity_assignment%401x.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", 
        width: "100%",
        maxWidth: "600px",
        //backgroundSize: "100% auto",
        position: "relative",
        display: "table",
        // MAKE THIS VARIABLE
        height: "300px",
    },
    assignmentValue: {
        zIndex: 100,
        display: "table-cell",
        verticalAlign: "middle"
    },
    button: {
        marginTop: theme.spacing.unit * 2
    }
});

const Assignment = props => {
    const { classes, theme, version } = props
    let thisCopy = version == "dpi" ? copy["en"].wizard.assignment.dpi : copy["en"].wizard.assignment.sensitivity
    let assignment = version == "dpi" ? props.profile.settings.dpi.recommended : props.profile.settings.sensitivity.recommended
    return (
    <div className={classes.wizardPageRoot}>
        <div className={classes.innerRoot}>
            <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                <Typography variant="display2" className={classNames(classes.headline, classes.center)} gutterBottom>
                    {thisCopy.headline}
                </Typography>
            </ReactFitText>
            <div className={props.version == "dpi" ? classes.imageContainerDPI : classes.imageContainerSensitivity}>
                    <span className={classes.assignmentValue}>
                    <ReactFitText minFontSize={64} maxFontSize={64} compressor={1}>
                        <Typography variant="display2" className={classes.wizardHeadline}>
                            {assignment}
                        </Typography>
                    </ReactFitText>
                    </span>
            </div>
            {/* <Typography variant="body1" className={classNames(classes.subtle, classes.center)} gutterBottom>
                (You can change this at any time from the dashboard.)
            </Typography> */}
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
        openCalculator: () => dispatch({
            type: Symbols.OPEN_CALCULATOR,
          }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Assignment))