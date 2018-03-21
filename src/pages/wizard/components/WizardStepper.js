import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Hidden from 'material-ui/Hidden';

const styles = theme => ({
    desktopRoot: {
      width: '90%',
    },
    mobileRoot: {
      maxWidth: 600,
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

  // function getSteps() {
  //   return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
  // }

  class WizardStepper extends React.Component {

    handleNext = () => {
      
    }

    handleBack = () => {
      
    }
    
    render() {
      const { classes, theme } = this.props;
      console.log("pagenum: " + this.props.pageNum)
      return(
        <div>
          <Hidden smUp>
            <MobileStepper
              variant="dots"
              steps={4}
              position="static"
              activeStep={this.props.pageNum}
              className={classes.mobileRoot}
              nextButton={
                <Button size="small" onClick={this.props.nextFunction} disabled={!this.props.nextEnabled}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={!this.props.backEnabled}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
              />
            </Hidden>
          </div>
      )
    }
  }

  export default withStyles(styles)(WizardStepper)