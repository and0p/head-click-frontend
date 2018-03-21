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
import * as Symbols from '../../redux/HcSymbols'

const styles = theme => ({

});

class Wizard extends React.Component {

    handleNext = () => {

    }

    render() {
        const { classes, theme } = this.props;

        let page = <div />
        switch(this.props.wizardPageNum) {
            case 0:
                page = <WizardSplash setReady={this.props.setNextPageReady} />
                break;
            case 1:
                page = <MonitorSelect setReady={this.props.setNextPageReady} />
                break;
            default:
                page = <div />
                break;
        }

        return (
            <div>
                {page}
                <WizardStepper
                    nextEnabled={this.props.nextPageReady}
                    backEnabled={false}
                    nextFunction={() => {console.log("pressed!")}}
                    nextIsFinish={false}
                    nextIsConcern={false}
                    pageNum={this.props.wizardPageNum} 
                    theme={theme}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profileState,
      wizardPageNum: state.wizardState.wizardPageNum,
      nextPageReady: state.wizardState.nextPageReady
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        changePageRelative: pageNum => dispatch({
            type: Symbols.WIZARD_PAGE_CHANGE_RELATIVE,
            value: pageNum
        }),
        setNextPageReady: ready => dispatch({
            type: Symbols.SET_WIZARD_NEXT_READY,
            value: ready
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Wizard))