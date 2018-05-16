import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { monitors, refreshRates, mice } from '../../model/HcModel';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import WizardStepper from './components/WizardStepper'
import WizardSplash from './components/WizardSplash'
import MonitorSelect from './components/MonitorSelect'
import DpiAssignment from './components/DpiAssignment'
import GameSelect from '../../components/GameSelect'
import SensitivityAssignment from './components/SensitivityAssignment'
import * as Symbols from '../../redux/HcSymbols'

const desktopStepperHeight = '150px' 

const styles = theme => ({
    root: {
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: theme.spacing.unit * 6,
        [theme.breakpoints.up('md')]: {
            marginBottom: desktopStepperHeight
        }
    }
});

class Wizard extends React.Component {

    render() {
        const { classes, theme } = this.props;

        let page = <div />
        switch(this.props.activePage) {
            case 0:
                page = <WizardSplash />
                break
            case 1:
                page = <MonitorSelect />
                break
            case 2:
                page = <DpiAssignment />
                break
            case 3:
                page = <div><Typography variant="display1" gutterBottom>Select games you play:</Typography><GameSelect /></div>
                break
            case 4:
                page = <SensitivityAssignment />
                break
            default:
                page = <div />
                break
        }
        return (
            <div className={classes.root}>
                {page}
                <WizardStepper theme={theme} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile,
      activePage: state.wizard.activePage
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Wizard))