import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Hidden from '@material-ui/core/Hidden';
import { Link } from "react-router-dom";
import { profileHasValidMonitor } from '../../../util'
import * as Symbols from '../../../redux/HcSymbols'

const drawerWidth = 240
const lastPage = 5

const styles = theme => ({
  desktopRoot: {
    maxWidth: '1000px',
    width: `calc(100% - ${drawerWidth}px)`,
    flexGrow: 1,
    position: 'fixed',
    bottom: 0,
    zIndex: 1000,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.only('md')]: {
      marginLeft: '-8px',
    }
  },
  mobileRoot: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    },
    flexGrow: 1,
  },
  backButton: {
    float: 'left'
  },
  nextButton: {
    float: 'right'
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  desktopStepper: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing.unit
  }
})

class WizardStepper extends React.Component {

  isNextEnabled = () => {
    const { activePage, profile } = this.props
    switch(activePage) {
      case 1:
        return profileHasValidMonitor(profile);
      case 3:
        return profile.ownedGames.length > 0
      default:
        return true;
    }
  }

  isBackEnabled = () => {
    return this.props.activePage > 0
  }

  handleNext = () => {
    this.props.nextPage(this.props.activePage)
  }

  handleBack = () => {
    this.props.goBack(this.props.activePage)
  }

  getNextText = () => {
    if (this.props.activePage == lastPage)
      return "FINISH"
    else
      return "NEXT"
  }

  getDesktopStep = () => {
    switch (this.props.activePage) {
      case 0:
        return 0
      case 1:
        return 1
      case 2:
        return 1
      case 3:
        return 2
      case 4:
        return 3
      case 5:
        return 4
      default:
        return 0
    }
  }

  render() {
    const { classes } = this.props
    const backEnabled = this.isBackEnabled()
    const nextEnabled = this.isNextEnabled()
    return (
      <div>
        {/* Mobile stepper */}
        <Hidden mdUp>
          <MobileStepper
            variant="dots"
            steps={7}
            position="bottom"
            activeStep={this.props.activePage}
            className={classes.mobileRoot}
            nextButton={
              <Button 
                size="small"
                component={this.props.activePage == lastPage ? Link : Button}
                to="/"
                style={this.props.activePage == lastPage ? { fontWeight: 400, color: "#FFFFFF" } : {}}
                color={this.props.activePage == lastPage ? "primary" : "neutral"}
                onClick={this.handleNext} 
                disabled={!nextEnabled}
              >
                {this.getNextText()}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button 
                size="small"
                component={this.props.activePage == 0 ? Link : Button}
                to="/" style={this.props.activePage == 0 ? { fontWeight: 400, color: "#FFFFFF" } : {}}
                onClick={this.handleBack}
                disabled={!this.isBackEnabled()}
              >
                <KeyboardArrowLeft />
                  BACK
                </Button>
            }
          />
        </Hidden>
        {/* Desktop stepper */}
        <Hidden smDown>
          <div className={classes.desktopRoot}>
            <Stepper
              activeStep={this.getDesktopStep()}
              alternativeLabel
              className={classes.desktopStepper}
            >
              <Step>
                <StepLabel>Welcome!</StepLabel>
              </Step>
              <Step>
                <StepLabel>Select a resolution</StepLabel>
              </Step>
              <Step>
                <StepLabel>Select games</StepLabel>
              </Step>
              <Step>
                <StepLabel>Misc Info</StepLabel>
              </Step>
              <Step>
                <StepLabel>Finish!</StepLabel>
              </Step>
            </Stepper>
            <Button 
              size="small"
              component={this.props.activePage == 0 ? Link : Button}
              to="/"
              style={this.props.activePage == 0 ? { fontWeight: 400, color: "#FFFFFF" } : {}}
              onClick={this.handleBack}
              disabled={!backEnabled}
              className={classes.backButton}
            >
              <KeyboardArrowLeft />
              BACK
            </Button>
            <Button 
              size="small"
              component={this.props.activePage == lastPage ? Link : Button}
              to="/" style={this.props.activePage == lastPage ? { fontWeight: 400, color: "#FFFFFF" } : {}}
              onClick={this.handleNext}
              disabled={!nextEnabled}
              className={classes.nextButton}
            >
              {this.getNextText()}
              <KeyboardArrowRight />
            </Button>
          </div>
        </Hidden>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    activePage: state.wizard.activePage,
    pagesReady: state.wizard.pagesReady,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    nextPage: (activePage) => dispatch({
      type: Symbols.WIZARD_NEXT,
      value: activePage
    }),
    goBack: (activePage) => dispatch({
      type: Symbols.WIZARD_BACK,
      value: activePage
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WizardStepper))