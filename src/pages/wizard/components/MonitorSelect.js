import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { monitors } from '../../../model/HcModel'
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
        marginBottom: theme.spacing.unit * 2
    },
    dropdown: {
        width: "200px",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
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
    constructor(props) {
        super(props)
        this.state = { 
            aspectRatio: "16:9"
        }
    }

    updateMonitor = event => {
        this.props.selectMonitor(monitors[this.state.aspectRatio][event.target.value])
    }

    updateAspectRatio = event => {
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
                    <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                        <Typography variant="display2" className={classNames(classes.headline, classes.center)} gutterBottom>
                            Select your monitor resolution:
                        </Typography>
                    </ReactFitText>
                    <ResponsiveAsset category='wizard' asset='monitor_select' className={classNames(classes.centerImage, classes.image)} />
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
                            {Object.keys(monitors).map((ratio) => (
                                <MenuItem value={ratio}>{ratio}</MenuItem>
                            ))}
                            <MenuItem value="custom">Custom...</MenuItem>
                        </Select>
                    </FormControl>
                    {this.state.aspectRatio != "custom" && monitors.hasOwnProperty(this.state.aspectRatio) &&
                    <FormControl className={classes.dropdown}>
                        <InputLabel htmlFor="resolution">Resolution</InputLabel>
                        <Select
                            value={this.props.selectedMonitor ? this.state.profile.monitor.name : ""}
                            onChange={this.props.selectMonitor}
                            inputProps={{
                            name: 'resolution',
                            id: 'resolution',
                            }}
                        >
                            {Object.keys(monitors[this.state.aspectRatio]).map((monitor) => (
                                <MenuItem value={monitor.name}>{monitor.name}</MenuItem>
                            ))}
                            <MenuItem value="custom">Custom...</MenuItem>
                        </Select>
                    </FormControl>
                    }

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