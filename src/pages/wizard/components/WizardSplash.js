import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { defaultPageCSS } from '../../../theme'
import { Link } from "react-router-dom";
import copy from '../../../copy'
import ReactFitText from 'react-fittext'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import * as Symbols from '../../../redux/HcSymbols'

const styles = theme => ({
    ...defaultPageCSS,
    headline: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: theme.spacing.unit * 4
    },
    buttonContainer: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing.unit * 4
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing.unit * 8
        },
        textAlign: "center"
    },
    button: {
        marginBottom: theme.spacing.unit,
        minWidth: "220px"
    },
});

class WizardSplash extends React.Component {
    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.wizardPageRoot}>
                <div className={classes.innerRoot}>
                    <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                        <Typography variant="display2" className={classes.headline}>{copy["en"].wizard.intro.headline}</Typography>
                    </ReactFitText>
                    <p><Typography variant="subheading" className={classes.informationSection}>{copy["en"].wizard.intro.subheader}</Typography></p>
                    <Typography variant="subheading">
                        <span className={classes.informationSection}>{copy["en"].wizard.intro.questionOpening}</span>
                        <ul>
                            <li>{copy["en"].wizard.intro.question1}</li>
                            <li>{copy["en"].wizard.intro.question2}</li>
                        </ul>
                        {/* {copy["en"].wizard.intro.questionLink} */}
                    </Typography>
                    <div className={classes.buttonContainer}>
                        <Button onClick={() => this.props.nextPage(this.props.profile, this.props.activePage)} className={classes.button} variant="contained" color="primary">Start the wizard</Button>
                        <Typography variant="caption" className={classes.manualText}>or <Link to="/manual-configuration">enter details manually</Link></Typography>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        profile: state.profile,
        activePage: state.wizard.activePage
    }
)

const mapDispatchToProps = dispatch => {
    return {
        nextPage: (profile, currentPage) => dispatch({
            type: Symbols.WIZARD_NEXT,
            value: { currentPage: currentPage, profile: profile }
        }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(WizardSplash))