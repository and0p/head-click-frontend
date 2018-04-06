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

const styles = theme => ({
    desktopRoot: {
      width: '90%',
    },
    mobileRoot: {
      //maxWidth: 600,
      flexGrow: 1,
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
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
    
    render() {
      const { classes, theme } = this.props;
      const nextText = "Next" // Will eventually calculate as "finish"
      return(
        <div>
          {/*<Hidden mdUp>*/}
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
            {/*</Hidden>*/}
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