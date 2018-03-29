import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { monitors, refreshRates } from '../../../model/HcModel'
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Divider from 'material-ui/Divider'
import * as Symbols from '../../../redux/HcSymbols'

const styles = theme => ({
    gridRoot : {
        flexGrow: 1
    },
    ratioText: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1
    },
    section: {
        //marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3
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

    handleRefreshRatePick = event => {
        this.props.selectRefreshRate(parseInt(event.target.value))
    }

    render() {
        const { classes, theme } = this.props;
        return(
            <div>
                <div className={classes.section}>
                    <Typography variant="display1" gutterBottom>Select your resolution:</Typography>
                    {Object.keys(monitors).map((key) => (
                        <div key={key}>
                            <Typography variant="body2" className={classes.ratioText}>{key}</Typography>
                            <Grid container spacing={16} className={classes.gridRoot}>
                                {Object.values(monitors[key]).map((monitor) => (
                                        <MonitorButton
                                            key= {monitor.name}
                                            selectMonitor={() => this.props.selectMonitor(monitor)}
                                            classes={classes}
                                            monitor={monitor}
                                            selected={this.props.selectedMonitor === monitor}
                                        />
                                ))}
                            </Grid>
                        </div>
                    ))}
                </div>
                {/*<div className={classes.section}>
                    <Typography variant="display1" gutterBottom>Select your refresh rate:</Typography>
                    <RadioGroup
                        aria-label="Refresh Rate"
                        name="refresh rate"
                        value={String(this.props.selectedRefreshRate)}
                        onChange={this.handleRefreshRatePick}
                        row
                    >
                        {refreshRates.map((refreshRate) => {
                            let rr = String(refreshRate)
                            return(<FormControlLabel key={refreshRate} value={rr} control={<Radio />} label={rr} />)
                        })}
                    </RadioGroup>
                </div>*/}
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        selectedMonitor: state.profile.monitor,
        selectedRefreshRate: state.profile.refreshRate
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        selectMonitor: monitor => dispatch({
            type: Symbols.SELECT_MONITOR,
            value: monitor
        }),
        selectRefreshRate: refreshRate => dispatch({
            type: Symbols.SELECT_REFRESH_RATE,
            value: refreshRate
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MonitorSelect))