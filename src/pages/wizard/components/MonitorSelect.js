import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { monitors } from '../../../model/HcModel'
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Radio from 'material-ui/Radio';
import * as Symbols from '../../../redux/HcSymbols'

const styles = theme => ({
    gridRoot : {
        flexGrow: 1
    },
    monitorButton: {
        width: '120px',
        height: '60px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.background.paper
    },
    monitorButtonSelected: {
        width: '120px',
        height: '60px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.primary.main
    },
    subtle: {
        color: "#888888"
    }
});

const MonitorButton = (props) => (
    <Grid item>
        <Button 
            onClick={props.selectMonitor}
            key={props.monitor.name}
            className={props.selected ? props.classes.monitorButtonSelected : props.classes.monitorButton }
        >
            <Typography variant="subheading">{props.monitor.name}</Typography>
        </Button>
    </Grid>
)

class MonitorSelect extends React.Component {

    render() {
        const { classes, theme } = this.props;
        return(
            <div>
                <Typography variant="display1" gutterBottom>Select your resolution:</Typography>
                {Object.keys(monitors).map((key) => (
                    <div key={key} >
                    <Typography variant="headline" gutterBottom>{key}</Typography>
                    <Grid container spacing={16} className={classes.gridRoot}>
                        {Object.values(monitors[key]).map((monitor) => (
                                <MonitorButton
                                    selectMonitor={() => this.props.selectMonitor(monitor)}
                                    classes={classes}
                                    monitor={monitor}
                                    selected={this.props.selectedMonitor === monitor}
                                />
                        ))}
                    </Grid>
                    </div>
                ))}
                <Typography variant="display1" gutterBottom>Select your refresh rate:</Typography>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        selectedMonitor: state.profileState.monitor,
        selectedRefreshRate: state.profileState.refreshRate
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        selectMonitor: monitor => dispatch({
            type: Symbols.SELECT_MONITOR,
            value: monitor
        }),
        setReady: () => dispatch({
            type: Symbols.SET_WIZARD_READY,
            value: 1
        }),
        setNotReady: () => dispatch({
            type: Symbols.SET_WIZARD_NOT_READY,
            value: 1
        }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MonitorSelect))