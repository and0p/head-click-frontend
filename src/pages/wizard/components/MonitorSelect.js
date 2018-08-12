import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { monitors, monitorsFlat } from '../../../model/HcModel'
import { defaultPageCSS } from '../../../theme'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ResponsiveAsset from '../../../assets'
import TextField from '@material-ui/core/TextField'
import * as Symbols from '../../../redux/HcSymbols'
import { isValid } from '../../../util' 
import ReactFitText from 'react-fittext'

const styles = theme => ({
    ...defaultPageCSS,
    gridRoot : {
        flexGrow: 1,
    },
    image: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        maxWidth: "100%"
    },
    selectionArea: {
        marginTop: theme.spacing.unit * 4,
    },
    selectionSide: {
      
    },
    dropdown: {
        width: "350px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    resolutionAxisInput: {
        marginTop: '-2px',
        width: "calc(100% - 8px)"
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
    constructor(props) {
        super(props)
        if(this.props.selectedMonitor == this.props.customMonitor)
            this.state = {
                aspectRatio: "custom"
            }
        else
            this.state = { 
                aspectRatio: this.props.selectedMonitor ? this.props.selectedMonitor.aspectRatio : "All"
            }
    }

    updateMonitor = event => {
        this.props.selectMonitor(monitorsFlat[event.target.value])
    }

    updateAspectRatio = event => {
        // Check if we're switching to custom, and select the custom monitor,
        // otherwise set the selected monitor to the first in that range, because why not?
        if(event.target.value == "custom")
            this.props.selectMonitor(this.props.customMonitor)
        else if (monitors.hasOwnProperty(event.target.value))
            this.props.selectMonitor(monitors[event.target.value][Object.keys(monitors[event.target.value])[0]])
        // else
        //     this.props.selectMonitor(monitorsFlat["1080p"])
        this.setState({ aspectRatio: event.target.value })
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

    render() {
        const { classes, theme } = this.props;
        return(
            <div className={classes.wizardPageRoot}><div className={classes.innerRoot}>
                <div className={classes.section}>
                    {/* HEADLINE */}
                    <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                        <Typography variant="display2" className={classNames(classes.headline, classes.center)} gutterBottom>
                            Select your monitor resolution:
                        </Typography>
                    </ReactFitText>
                    {/* IMAGE */}
                    <ResponsiveAsset category='wizard' asset='monitor_select' className={classNames(classes.centerImage, classes.image)} />
                    {/* DROPDOWNS */}
                    <Grid container spacing={16} className={classes.selectionArea}>
                        {/* ASPECT RATIO SIDE */}
                        <Grid item xs={12} sm={6}>
                            <FormControl className={classes.dropdown}>
                                <InputLabel htmlFor="aspect-ratio">Aspect Ratio</InputLabel>
                                <Select
                                    value={this.state.aspectRatio}
                                    onChange={this.updateAspectRatio}
                                    inputProps={{
                                    name: 'aspect-ratio',
                                    id: 'aspect-ratio',
                                    }}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    {Object.keys(monitors).map((ratio) => (
                                        <MenuItem value={ratio}>{ratio}</MenuItem>
                                    ))}
                                    <MenuItem value="custom">Custom</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* RESOLUTION / CUSTOM SIDE */}
                        {this.state.aspectRatio != "custom" && (this.state.aspectRatio == "all" || monitors.hasOwnProperty(this.state.aspectRatio)) &&
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.dropdown}>
                                    <InputLabel htmlFor="resolution">Resolution</InputLabel>
                                    <Select
                                        value={this.props.selectedMonitor ? this.props.selectedMonitor.name : ""}
                                        onChange={this.updateMonitor}
                                        inputProps={{
                                        name: 'resolution',
                                        id: 'resolution',
                                        }}
                                    >   
                                        {/* "ALL" selected */}
                                        {this.state.aspectRatio == "all" &&
                                        Object.keys(monitors).map((ratio) => (
                                            Object.keys(monitors[ratio]).map((monitor) => (
                                                <MenuItem value={monitor}>{monitor}</MenuItem>
                                            ))
                                        ))}
                                        {/* SPECIFIC ASPECT RATIO */}
                                        {monitors.hasOwnProperty(this.state.aspectRatio) && 
                                        Object.keys(monitors[this.state.aspectRatio]).map(monitor => (
                                            <MenuItem value={monitor}>{monitor}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        }
                        {/* CUSTOM RESOLUTION */}
                        {this.state.aspectRatio == "custom" && [
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                    value={isValid(this.props.selectedMonitor) ? this.props.selectedMonitor.width : "-"}
                                    label="Width"
                                    InputProps={{
                                        disableUnderline: true,
                                        classes: {
                                        root: classes.resolutionAxisInputBox
                                        }
                                    }}
                                    fullWidth
                                    className={classes.resolutionAxisInput}
                                    InputLabelProps={{
                                        shrink: true,
                                        className: classes.textFieldFormLabel,
                                    }}
                                    disabled={this.props.selectedMonitor !== this.props.customMonitor}
                                    onChange={this.updateCustomSize("width")}
                                    />
                                </Grid>,
                                <Grid item xs={6} sm={3}>
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
                                </Grid>]
                        }
                    </Grid>
                </div>
            </div></div>
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