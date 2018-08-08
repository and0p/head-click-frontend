import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { monitors } from '../../../model/HcModel'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Radio, { RadioGroup } from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider'
import * as Symbols from '../../../redux/HcSymbols'
import { isValid } from '../../../util' 
import ReactFitText from 'react-fittext'

const styles = theme => ({
    root: {
        maxWidth: '784px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    gridRoot : {
        flexGrow: 1,
    },
    ratioText: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1
    },
    section: {
        //marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 2
    },
    monitorButton: {
        width: '100%',
        height: '50px',
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.background.paper
    },
    monitorButtonSelected: {
        width: '100%',
        height: '50px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.primary.main
    },
    resolutionAxisInput: {
        marginTop: '-2px',
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
    <Grid item xs={4} sm={3}>
        <Button 
            onClick={props.selectMonitor}
            key={props.monitor.name}
            className={props.selected ? props.classes.monitorButtonSelected : props.classes.monitorButton }
        >
            <Typography variant="subheading">{props.hasOwnProperty("nameOverride") ? props.nameOverride : props.monitor.name}</Typography>
        </Button>
    </Grid>
)

class MonitorSelect extends React.Component {

    handleRefreshRatePick = event => {
        this.props.selectRefreshRate(parseInt(event.target.value))
    }

    updateCustomSize = axis => event => {
        if(this.props.selectedMonitor === this.props.customMonitor) {
          if(axis == "width")
            this.props.updateCustomWidth(event.target.value)
          if(axis == "height")
            this.props.updateCustomHeight(event.target.value)
          //this.setState({  })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("update")
    }

    render() {
        const { classes, theme } = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.section}>
                    <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                        <Typography variant="display2" gutterBottom>Select your monitor resolution:</Typography>
                    </ReactFitText>
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
                                {/*this.props.expanded[key] ? null : <ShowMoreButton classes={classes} func={() => this.props.expandCategory(key)} /> */}
                            </Grid>
                        </div>
                    ))}
                    <Typography variant="body2" className={classes.ratioText}>Custom</Typography>
                    <Grid container spacing={16} className={classes.gridRoot}>
                        <MonitorButton
                            selectMonitor={() => this.props.selectMonitor(this.props.customMonitor)}
                            classes={classes}
                            monitor={this.props.customMonitor}
                            selected={this.props.selectedMonitor == this.props.customMonitor}
                            nameOverride="Custom"
                        />
                        <Grid item xs={3}>
                            <TextField
                            value={isValid(this.props.selectedMonitor) ? this.props.selectedMonitor.width : "-"}
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
                            disabled={this.props.selectedMonitor !== this.props.customMonitor}
                            onChange={this.updateCustomSize("width")}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                            value={isValid(this.props.selectedMonitor) ? this.props.selectedMonitor.height : "-"}
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
                            disabled={this.props.selectedMonitor !== this.props.customMonitor}
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
        selectedMonitor: state.profile.settings.monitor,
        selectedRefreshRate: state.profile.settings.refreshRate,
        customMonitor: state.profile.customMonitor,
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