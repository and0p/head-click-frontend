import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon'
import { checkAlias, changeAlias } from '../identity'
import { monitors } from '../model/HcModel'
import * as Symbols from '../redux/HcSymbols'
import { clamp } from '../math'

const styles = theme => ({
  root: {

  },
  input: {
    marginBottom: theme.spacing.unit * 2,
    minWidth: '250px'
  },
  resolutionAxisInput: {
    marginBottom: theme.spacing.unit * 2,
    maxWidth: '117px',
    marginRight: theme.spacing.unit
  },
  resolutionAxisInputBox: {
    border: '1px solid #888888',
    paddingLeft: theme.spacing.unit
  },
  subtle: {
    color: '#888888'
  },
  good: {
    color: theme.palette.custom.blue
  },
  error: {
    color: theme.palette.custom.red
  }
})

class ProfileEditDialog extends React.Component {
  constructor(props) {
    super(props)
    let cmonitor = Object.assign({}, this.props.profile.customMonitor)
    this.state = {
      alias: this.props.identity.alias,
      aliasError: false,
      lastAliasChange: Date.now(),
      aliasResponseText: "",
      sensitivity: this.props.profile.settings.sensitivity.actual,
      dpi: this.props.profile.settings.dpi.actual,
      monitor: this.props.profile.settings.usingCustomMonitor ? cmonitor : this.props.profile.settings.monitor,
      customMonitor: cmonitor,
      profileError: false,
      ready: true
    }
  }

  reopened = () => {
    let cmonitor = Object.assign({}, this.props.profile.customMonitor)
    this.setState({
      sensitivity: this.props.profile.settings.sensitivity.actual,
      dpi: this.props.profile.settings.dpi.actual,
      monitor: this.props.profile.settings.usingCustomMonitor ? cmonitor : this.props.profile.settings.monitor,
      customMonitor: cmonitor
    })
  }

  submit = () => {
    // See if we need to change alias
    if(this.state.alias != this.props.identity.alias)
      changeAlias(this.state.alias)
    this.props.saveProfile(this.state)
  }

  cancel = () => {
    this.setState({
      alias: this.props.identity.alias,
      aliasError: false,
      aliasResponseText: "",
      sensitivity: this.props.profile.settings.sensitivity.actual,
      dpi: this.props.profile.settings.dpi.actual,
      monitor: this.props.profile.settings.monitor,
      customMonitor: this.props.profile.customMonitor
    })
    // Cancel UI in redux
    this.props.cancel()
  }
  
  getReturnJson() {
    return {
      dpi: this.state.dpi,
      sensitivity: this.state.sensitivity,
      monitor: this.state.monitor,
      customMonitor: this.state.customMonitor
    }
  }

  handleChange = prop => event => {
    let newState = {}
      if(prop == "alias")
      {
        let newAlias = event.target.value
        if(newAlias.length <= 12) {
          let valid = newAlias.length <= 12 && newAlias.length > 0 // TODO check for bad characters, etc
          if(newAlias !== this.props.identity.alias && valid) {
            newState = { alias: newAlias, aliasError: !valid, aliasResponseText: "Checking availability..." }
            checkAlias(newAlias, this.nameCheckCallback)
          }
          else {
            newState = { alias: newAlias, aliasError: !valid, aliasResponseText: "" }
            checkAlias(null, null)
          }
        }
      }
      else
      {
        newState[prop] = event.target.value
      }
      // Combine new and old state to check if we're ready
      let combinedState = Object.assign({}, this.state, newState)
      if(
        combinedState.sensitivity < 1 || combinedState.sensitivity == "undefined" || combinedState.sensitivity == null ||
        combinedState.dpi < 1 || combinedState.dpi == "undefined" || combinedState.dpi == null ||
        combinedState.aliasError || (combinedState.aliasResponseText != "" && combinedState.aliasResponseText != "Available")        
      )
        combinedState.ready = false
      else
        combinedState.ready = true
      this.setState(combinedState)
  };

  nameCheckCallback = (alias, result) => {
    if(this.state.alias === alias && !this.state.aliasError)
    {
      if(
        this.state.sensitivity < 1 || this.state.sensitivity == "undefined" || this.state.sensitivity == null ||
        this.state.dpi < 1 || this.state.dpi == "undefined" || this.state.dpi == null ||
        this.state.aliasError || (result != "" && result != "Available")        
      )
        this.setState({ aliasResponseText: result, ready: false })
      else
        this.setState({ aliasResponseText: result, ready: true })
    }
  }

  updateCustomSize = axis => event => {
      if(axis == "width")
        this.setState({
          customMonitor: Object.assign(this.state.customMonitor, 
            { name: event.target.value + "x" + this.state.customMonitor.height,
              width: event.target.value,
              recommendedDpi: clamp(400 * Math.ceil(((this.state.customMonitor.height - 600) / 400)), 400, 6400),
              usable: this.state.customMonitor.width > 0 && this.state.customMonitor.height > 0
            })})
      else if(axis == "height")
        this.setState({
          customMonitor: Object.assign(this.state.customMonitor, 
            { name: this.state.customMonitor.width + "x" + event.target.value,
              height: event.target.value,
              recommendedDpi: clamp(400 * Math.ceil(((this.state.customMonitor.height - 600) / 400)), 400, 6400),
              usable: this.state.customMonitor.width > 0 && event.target.value > 0
            })})
    }

  render() {
    const { classes, theme, fullScreen } = this.props
    let responseClass = classes.subtle
    if(this.state.aliasResponseText == "Available")
      responseClass = classes.good
    else if (this.state.aliasResponseText === "Unavailable")
      responseClass = classes.error
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.ui.editingProfile}
        aria-labelledby="edit-profile"
        onEnter={this.reopened}
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <FormControl className={classes.input}>
            <FormHelperText>Profile Name</FormHelperText>
            <Input
                autoFocus
                margin="dense"
                id="alias"
                label="Alias"
                value={this.state.alias}
                error={this.state.aliasError}
                onChange={this.handleChange('alias')}
                endAdornment={<InputAdornment position="end"><Icon>person</Icon></InputAdornment>}
                inputProps={{
                  'aria-label': 'Sensitivity',
                }}
              />
              <FormHelperText id="profile-name-helper" className={responseClass}>{this.state.aliasResponseText}</FormHelperText>
            </FormControl><br/>
          {/* SENSITIVITY */}
            <FormControl className={classes.input}>
            <FormHelperText>Sensitivity</FormHelperText>
            <Input
                autoFocus
                margin="dense"
                id="sensitivity"
                label="Sensitivity"
                value={this.state.sensitivity}
                onChange={this.handleChange('sensitivity')}
                endAdornment={<InputAdornment position="end">cm/360</InputAdornment>}
                type="number"
                inputProps={{
                  'aria-label': 'Sensitivity',
                }}
              />
            </FormControl><br/>
            {/* DPI */}
            <FormControl className={classes.input}>
              <FormHelperText>Mouse DPI</FormHelperText>
            <Input
                margin="dense"
                id="dpi"
                label="Mouse DPI"
                endAdornment={<InputAdornment position="end">DPI</InputAdornment>}
                value={this.state.dpi}
                onChange={this.handleChange('dpi')}
                type="number"
                inputProps={{
                  'aria-label': 'DPI',
                }}
              />
              <FormHelperText className={classes.subtle}>Recommended: {this.state.monitor.recommendedDpi}</FormHelperText>
            </FormControl><br/>
            {/* MONITOR */}
            <FormControl className={classes.input}>
              <InputLabel>Desktop Resolution</InputLabel>
              <Select
                value={this.state.monitor}
                onChange={this.handleChange('monitor')}
              >
                {Object.keys(monitors).map((key) => (
                  Object.values(monitors[key]).map((monitor) => (
                    <MenuItem value={monitor}>{monitor.name}</MenuItem>
                  ))))}
                <MenuItem value={this.state.customMonitor}>Custom..</MenuItem>
              </Select>
            </FormControl><br/>
            {/* RESOLUTIONS */}
            <TextField
              value={this.state.monitor.width}
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
              disabled={this.state.monitor != this.state.customMonitor}
              type="number"
              onChange={this.updateCustomSize("width")}
            />
            <TextField
              value={this.state.monitor.height}
              label="Height"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.resolutionAxisInputBox
                }
              }}
              className={classes.resolutionAxisInput}
              type="number"
              InputLabelProps={{
                shrink: true,
                className: classes.textFieldFormLabel,
              }}
              disabled={this.state.monitor != this.state.customMonitor}
              onChange={this.updateCustomSize("height")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submit} color="secondary" variant="contained" disabled={!this.state.ready} autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    ui: state.ui,
    identity: state.identity
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfile: value => dispatch({
      type: Symbols.SAVE_PROFILE,
      value: value
    }),
    cancel: () => dispatch({
      type: Symbols.CANCEL_EDIT_PROFILE
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
)(withStyles(styles)(withMobileDialog()(ProfileEditDialog)))