import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { defaultPageCSS } from '../../theme'
import { monitors, monitorsFlat, monitorsTechnical } from '../../model/HcModel'
import copy from '../../copy'
import ReactFitText from 'react-fittext'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Paper from '@material-ui/core/Paper'
import { isValid } from '../../util'
import { push } from 'connected-react-router'
import CalculationDialog from '../../components/CalculationDialog'
import { getRounded } from '../../math'
import * as Symbols from '../../redux/HcSymbols'

const styles = theme => ({
    ...defaultPageCSS,
    headline: {
        color: '#FFFFFF',
        marginBottom: theme.spacing.unit * 4
    },
    paper: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing.unit * 2
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: -theme.spacing.unit,
            marginRight: -theme.spacing.unit,
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit
        },
        textAlign: 'left',
        marginBottom: theme.spacing.unit * 2
    },
    section: {
        marginTop: theme.spacing.unit * 2
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
    input: {
        width: "250px"
    },
    subtle: {
        color: "#888888"
    },
    selectionArea: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    acceptButton: {
        float: "right"
    }
});

class ManualConfiguration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sensitivity: 35,
            dpi: 800,
            monitor: monitors["16:9"]["1080p"],
            aspectRatio: "all",
            customWidth: 1920,
            customHeight: 1080,
            calculatorOpen: false,
            valid: {
                sensitivity: true,
                dpi: true,
                monitor: true,
                aspectRatio: true,
                customWidth: true,
                customHeight: true,
                overall: true
            }
        }
    }
    
    handleChange = field => event => {
        let value = event.target.value, valid = true
        // Make sure the new state is acceptable
        if((field == "sensitivity" || field == "dpi" || field == "customWidth" || field == "customHeight") && parseFloat(value) == NaN || value <= 0)
            valid = false
            let allValid = { ...this.state.valid, [field]: valid }
        if((field == "aspectRatio" && value != "custom") || this.state.aspectRatio != "custom")
        allValid.overall = allValid.sensitivity && allValid.dpi
        else
            allValid.overall = allValid.sensitivity && allValid.dpi && this.state.allValid.customWidth && allValid.customHeight
            this.setState({ [field]: value, valid: allValid })
    }
    
    createProfile = () => {
        this.props.createProfile(this.state)
    }
    
    applyCalculation = (sensitivity, dpi) => {
        this.setState({
            sensitivity: sensitivity,
            dpi: dpi,
            calculatorOpen: false
        })
    }

    openCalculator = () => {
        this.setState({
            calculatorOpen: true
        })
    }

    closeCalculator = () => {
        this.setState({
            calculatorOpen: false
        })
    }

    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.wizardPageRoot}>
                <div className={classes.innerRoot}>
                    <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                        <Typography variant="display2" className={classes.headline}>{copy["en"].manualConfiguration.headline}</Typography>
                    </ReactFitText>
                    {/* MONITOR RESOLUTION */}
                    <Paper className={classes.paper}>
                        <Typography variant="title" gutterBottom>{copy["en"].manualConfiguration.resolution.header}</Typography>
                        <Typography>{copy["en"].manualConfiguration.resolution.info}</Typography>
                        {/* DROPDOWNS */}
                        <Grid container spacing={16} className={classes.selectionArea}>
                            {/* ASPECT RATIO SIDE */}
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.dropdown}>
                                    <InputLabel htmlFor="aspect-ratio">Aspect Ratio</InputLabel>
                                    <Select
                                        value={this.state.aspectRatio}
                                        onChange={this.handleChange("aspectRatio")}
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
                                    {/* STANDARD RESOLUTION */}
                                    <FormControl className={classes.dropdown}>
                                        <InputLabel htmlFor="resolution">Resolution</InputLabel>
                                        <Select
                                            value={this.state.monitor.name}
                                            onChange={this.handleChange("monitor")}
                                            inputProps={{
                                            name: 'resolution',
                                            id: 'resolution',
                                            }}
                                        >   
                                            {/* "ALL" selected */}
                                            {this.state.aspectRatio == "all" &&
                                                Object.keys(monitorsTechnical).map(key => (
                                                        <MenuItem value={monitorsTechnical[key].name}>{key}</MenuItem>
                                                ))}
                                            {/* SPECIFIC ASPECT RATIO */}
                                            {monitors.hasOwnProperty(this.state.aspectRatio) && 
                                            Object.keys(monitors[this.state.aspectRatio]).map(monitor => (
                                                <MenuItem value={monitor}>{monitors[this.state.aspectRatio][monitor].technicalName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }
                            {/* CUSTOM RESOLUTION */}
                            {this.state.aspectRatio == "custom" && [
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                        value={this.state.customWidth}
                                        label="Width"
                                        InputProps={{
                                            disableUnderline: true,
                                            classes: {
                                            root: classes.resolutionAxisInputBox
                                            }
                                        }}
                                        error={!this.state.valid.customWidth}
                                        fullWidth
                                        className={classes.resolutionAxisInput}
                                        InputLabelProps={{
                                            shrink: true,
                                            className: classes.textFieldFormLabel,
                                        }}
                                        onChange={this.handleChange("customWidth")}
                                        />
                                    </Grid>,
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                        value={this.state.customHeight}
                                        label="Height"
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
                                        error={!this.state.valid.customHeight}
                                        onChange={this.handleChange("customHeight")}
                                        />
                                    </Grid>]
                            }
                        </Grid>
                    </Paper>
                    {/* DPI */}
                    <Paper className={classes.paper}>
                        <Typography variant="title" gutterBottom>{copy["en"].manualConfiguration.dpi.header}</Typography>
                        <Typography>{copy["en"].manualConfiguration.dpi.info}</Typography>
                        <div className={classes.selectionArea}>
                            <TextField
                                value={this.state.dpi}
                                label="DPI"
                                className={classes.input}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={this.handleChange("dpi")}
                                error={!this.state.valid.dpi}
                            />
                        </div>
                    </Paper>
                    {/* SENSITIVITY */}
                    <Paper className={classes.paper}>
                        <Typography variant="title" gutterBottom>{copy["en"].manualConfiguration.sensitivity.header}</Typography>
                        <Typography>{copy["en"].manualConfiguration.sensitivity.info}</Typography>
                        <div className={classes.selectionArea}>
                            <TextField
                                value={this.state.sensitivity}
                                label="Sensitivity"
                                className={classes.input}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                helperText={getRounded(this.state.sensitivity / 2.54, 1) + " inches"}
                                onChange={this.handleChange("sensitivity")}
                                error={!this.state.valid.sensitivity}
                            />
                            <Button color="primary" onClick={this.openCalculator}>Find my current sensitivity</Button>
                        </div>
                    </Paper>
                    <Grid container spacing={16} className={classes.selectionArea}>
                            {/* ASPECT RATIO SIDE */}
                            <Grid item xs={12} sm={6}>
                                <Button component={Link} to="/wizard" className={classes.button} variant="outlined">Back to Wizard</Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button className={classes.acceptButton} variant="contained" color="primary" onClick={this.createProfile} disabled={!this.state.valid.overall}>
                                    Create Profile
                                </Button>
                            </Grid>
                    </Grid>

                </div>
                <CalculationDialog open={this.state.calculatorOpen} acceptFunction={this.applyCalculation} closeFunction={this.closeCalculator} dpi={parseFloat(this.state.dpi)} />
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
        createProfile: value => {
            dispatch({type: Symbols.CREATE_PROFILE_MANUALLY,payload: value})
            dispatch(push('/'))
        }
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ManualConfiguration))