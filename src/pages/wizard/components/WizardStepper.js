import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Hidden from 'material-ui/Hidden';
import * as Symbols from '../../../redux/HcSymbols'

const drawerWidth = 240;

const styles = theme => ({
    desktopRoot: {
      maxWidth: '1000px',
      width: `calc(100% - ${drawerWidth}px)`,
      flexGrow: 1,
      //left: drawerWidth,
      //right: 0,
      bottom: 0,
      zIndex: 1000,
      position: 'fixed',
      paddingLeft: 0,
      paddingRight: 0,
      //marginLeft: '-24px',
      paddingBottom: theme.spacing.unit * 2,
      backgroundColor: theme.palette.background.default
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
  });

  class WizardStepper extends React.Component {

    isNextEnabled = () => {
      if(this.props.activePage < 5 && this.props.pagesReady[this.props.activePage]) {
        return true
      }
      else {
        return false
      }
    }

    isBackEnabled = () => {
      if(this.props.activePage > 0) {
        return true
      }
      else {
        return false
      }
    }

    handleNext = () => {
      if(this.isNextEnabled()) {
        this.props.nextPage()
      }
    }

    handleBack = () => {
      if(this.isBackEnabled())
        this.props.goBack()
    }

    getNextText = () => {
      if(this.props.activePage === 4)
        return "FINISH"
      else
        return "NEXT"
    }

    getDesktopStep = () => {
      switch(this.props.activePage)
      {
        case 0:
          return 0
          break
        case 1:
          return 1
          break
        case 2:
          return 1
          break
        case 3:
          return 2
          break
        case 4:
          return 2
          break
        default:
          return 0
          break
      }
    }
    
    render() {
      const { classes, theme } = this.props;
      const nextText = "Next" // Will eventually calculate as "finish"
      return(
        <div>
          {/* Mobile stepper */}
          <Hidden mdUp>
            <MobileStepper
              variant="dots"
              steps={5}
              position="bottom"
              activeStep={this.props.activePage}
              className={classes.mobileRoot}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={!this.isNextEnabled()}>
                  {this.getNextText()}
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={!this.isBackEnabled()}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  BACK
                </Button>
              }
              />
          </Hidden>
          {/* Desktop stepper */}
          <Hidden smDown>
              <div className={classes.desktopRoot}>
                <Stepper
                  activeStep = {this.getDesktopStep()}
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
                </Stepper>
                <Button size="small" onClick={this.handleBack} disabled={!this.isBackEnabled()} className={classes.backButton}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    BACK
                </Button>
                <Button size="small" onClick={this.handleNext} disabled={!this.isNextEnabled()} className={classes.nextButton}>
                    {this.getNextText()}
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              </div>
          </Hidden>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      activePage: state.wizard.activePage,
      pagesReady: state.wizard.pagesReady,
      monitorConcern: state.wizard.monitorConcern
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        nextPage: () => dispatch({
            type: Symbols.WIZARD_NEXT,
        }),
        goBack: () => dispatch({
          type: Symbols.WIZARD_BACK
        })
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WizardStepper))