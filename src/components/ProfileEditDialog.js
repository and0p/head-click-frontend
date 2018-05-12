import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { monitors, customMonitor } from '../model/HcModel'
import * as Symbols from '../redux/HcSymbols'

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
  }
})

class ProfileEditDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sensitivity: this.props.profile.settings.sensitivity.actual,
      dpi: this.props.profile.settings.dpi.actual,
      monitor: this.props.profile.settings.monitor,
      usingCustomMonitor: this.props.profile.settings.usingCustomMonitor
    }
  }

  cancel = () => {
    this.setState({
      sensitivity: this.props.profile.settings.sensitivity.actual,
      dpi: this.props.profile.settings.dpi.actual,
      monitor: this.props.profile.settings.monitor
    })
    // Cancel UI in redux
    this.props.cancel()
  }
  
  getReturnJson() {
    return {
      dpi: this.state.dpi,
      sensitivity: this.state.sensitivity,
      monitor: this.state.monitor
    }
  }

  handleChange = prop => event => {
    if(prop == "monitor") {
      if(event.target.value == this.props.profile.customMonitor)
        this.setState({[prop]: event.target.value, usingCustomMonitor: true })
      else
        this.setState({ [prop]: event.target.value })
    }
    else
      this.setState({ [prop]: event.target.value })
  };

  updateCustomSize = axis => event => {
    if(this.state.monitor == this.props.profile.customMonitor) {
      if(axis == "width")
        this.props.updateCustomWidth(event.target.value)
      if(axis == "height")
        this.props.updateCustomHeight(event.target.value)
    }
  }

  render() {
    const { classes, theme, fullScreen } = this.props
    let cMonitor = this.props.profile.customMonitor
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.ui.editingProfile}
        aria-labelledby="edit-profile"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
          {/*<DialogContentText>Text</DialogContentText> */}
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
                <MenuItem value={cMonitor}>Custom..</MenuItem>
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
              disabled={this.state.monitor !== this.props.profile.customMonitor}
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
              InputLabelProps={{
                shrink: true,
                className: classes.textFieldFormLabel,
              }}
              disabled={this.state.monitor !== this.props.profile.customMonitor}
              onChange={this.updateCustomSize("height")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.props.saveProfile(this.state)} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    ui: state.ui
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