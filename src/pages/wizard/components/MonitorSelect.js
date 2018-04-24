import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { monitors, customMonitor } from '../../../model/HcModel'
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
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
        width: '100%',
        height: '80px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.background.paper
    },
    monitorButtonSelected: {
        width: '100%',
        height: '80px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.primary.main
    },
    showMoreButton: {
        width: '100%',
        height: '80px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: '#888888',
        verticalAlign: 'middle',
        backgroundColor: theme.palette.background.light
    },
    resolutionAxisInput: {
        marginTop: theme.spacing.unit,
        maxWidth: '117px',
        width: '100%'
      },
    resolutionAxisInputBox: {
        border: '1px solid #888888',
        paddingLeft: theme.spacing.unit,
        width: '100%'
      },
    subtle: {
        color: "#888888"
    }
});

const MonitorButton = (props) => (
    <Grid item xs={3}>
        <Button 
            onClick={props.selectMonitor}
            key={props.monitor.name}
            className={props.selected ? props.classes.monitorButtonSelected : props.classes.monitorButton }
        >
            <Typography variant="subheading">{props.monitor.name}</Typography>
        </Button>
    </Grid>
)

const ShowMoreButton = props => (
    <Grid item xs={3}>
        <Button 
            onClick={props.func}
            className={props.classes.showMoreButton}
        >
            <Typography variant="subheading">Show More</Typography>
        </Button>
    </Grid>
)

class MonitorSelect extends React.Component {

    handleRefreshRatePick = event => {
        this.props.selectRefreshRate(parseInt(event.target.value))
    }

    updateCustomSize = axis => event => {
        if(this.props.selectedMonitor === customMonitor) {
          if(axis == "width")
            this.props.updateCustomWidth(event.target.value)
          if(axis == "height")
            this.props.updateCustomHeight(event.target.value)
          this.setState({  })
        }
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
                            <Grid container className={classes.gridRoot}>
                                {Object.values(monitors[key]).map((monitor) => {
                                    if(monitor.common || this.props.expanded[key])
                                        return(
                                        <MonitorButton
                                            key= {monitor.name}
                                            selectMonitor={() => this.props.selectMonitor(monitor)}
                                            classes={classes}
                                            monitor={monitor}
                                            selected={this.props.selectedMonitor === monitor}
                                        />
                                        )
                                    else
                                        return(null)
                                })}
                                {this.props.expanded[key] ? null : <ShowMoreButton classes={classes} func={() => this.props.expandCategory(key)} /> }
                            </Grid>
                        </div>
                    ))}
                    <Typography variant="body2" className={classes.ratioText}>Custom</Typography>
                    <Grid container className={classes.gridRoot}>
                        <MonitorButton
                            selectMonitor={() => this.props.selectMonitor(customMonitor)}
                            classes={classes}
                            monitor={customMonitor}
                            selected={this.props.selectedMonitor === customMonitor}
                        />
                        <Grid item xs={3}>
                            <TextField
                            value={this.props.selectedMonitor.width}
                            label="Width"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                root: classes.resolutionAxisInputBox
                                }
                            }}
                            className={classes.resolutionAxisInput}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.textFieldFormLabel,
                            }}
                            disabled={this.props.selectedMonitor !== customMonitor}
                            onChange={this.updateCustomSize("width")}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                            value={this.props.selectedMonitor.height}
                            label="Height"
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                root: classes.resolutionAxisInputBox
                                }
                            }}
                            className={classes.resolutionAxisInput}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.textFieldFormLabel,
                            }}
                            disabled={this.props.selectedMonitor !== customMonitor}
                            fullWidth
                            onChange={this.updateCustomSize("height")}
                            />
                        </Grid> 
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedMonitor: state.profile.monitor,
        selectedRefreshRate: state.profile.refreshRate,
        expanded: state.wizard.monitorsExpanded
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
        }),
        expandCategory: category => dispatch({
            type: Symbols.EXPAND_MONITOR_SECTION,
            value: category
        }),
        updateCustomWidth: value => dispatch({
          type: Symbols.SET_CUSTOM_MONITOR_WIDTH,
          value: value
        }),
        updateCustomHeight: value => dispatch({
          type: Symbols.SET_CUSTOM_MONITOR_HEIGHT,
          value: value
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MonitorSelect))