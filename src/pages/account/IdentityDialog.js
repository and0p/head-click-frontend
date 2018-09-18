import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
// Material imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
// Misc imports
import copy from '../../copy'
import { login, register, requestResetToken, resetPassword } from '../../identity'
import * as Symbols from '../../redux/HcSymbols'

const styles = theme => ({
    root: {
      minWidth: '300px'
    },
    customBarBackground: {
      backgroundColor: theme.palette.background.paper
    },
    errorText: {
      height: '20px',
      color: theme.palette.custom.red
    },
    successText: {
      height: '20px',
      color: theme.palette.custom.teal
    },
    resetInfo: {
      marginBottom: theme.spacing.unit * 2
    },
    emailConsent: {
      marginTop: theme.spacing.unit * 2
    }
})

class IdentityDialog extends React.Component {

  render() {
    const { classes, theme, fullScreen } = this.props
    
    // LOGIN
    if(this.props.ui.identity.dialogFunction == "LOGIN") {
      return (
        <Dialog
          fullScreen={fullScreen}
          open={this.props.ui.identity.dialogOpen}
          aria-labelledby="log-in-or-sign-up"
          onBackdropClick={this.props.closeDialog}
          //onEnter={}
        >
          <DialogTitle>Log In</DialogTitle>
          <DialogContent className={classes.root}>
              <TextField
                value={this.props.ui.identity.email}
                label="Email"
                fullWidth
                onChange={event => {this.props.updateField("email", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.email
                }}
                disabled={this.props.ui.identity.actionPending}
              />
              <TextField
                value={this.props.ui.identity.password}
                label="Password"
                fullWidth
                onChange={event => {this.props.updateField("password", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.password
                }}
                type="password"
                disabled={this.props.ui.identity.actionPending}
                helperText={this.props.ui.identity.error == "Password reset successfully." ? "" : <a href="#" onClick={this.props.openForgottenPasswordReset}>Forgot password?</a>}
              />
            <Typography variant="body1" className={this.props.ui.identity.error == "Password reset successfully." ? classes.successText : classes.errorText}>{this.props.ui.identity.error}</Typography>
          </DialogContent>
          {this.props.ui.identity.dialogFunction == "RESET" && <div/>}
          <DialogActions>
            <Button onClick={this.props.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => login(this.props.ui.identity.email, this.props.ui.identity.password)} variant="contained" color="secondary" autoFocus>
              Log In
            </Button>
          </DialogActions>
          <LinearProgress value={0} variant={this.props.ui.identity.actionPending ? "indeterminate" : "determinate" } classes={{ colorPrimary: classes.customBarBackground }} />
        </Dialog>
      )
    }
    // REGISTER
    else if(this.props.ui.identity.dialogFunction == "REGISTER") {
      return (
        <Dialog
          fullScreen={fullScreen}
          open={this.props.ui.identity.dialogOpen}
          aria-labelledby="log-in-or-sign-up"
          onBackdropClick={this.props.closeDialog}
          //onEnter={}
        >
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent className={classes.root}>
              <TextField
                value={this.props.ui.identity.email}
                label="Email"
                fullWidth
                onChange={event => {this.props.updateField("email", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.email
                }}
                disabled={this.props.ui.identity.actionPending}
              />
              <TextField
                value={this.props.ui.identity.password}
                label="Password"
                fullWidth
                onChange={event => {this.props.updateField("password", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.password
                }}
                type="password"
                helperText={this.props.ui.identity.password != "" ? this.props.ui.identity.passwordComplex : null}
                disabled={this.props.ui.identity.actionPending}
              />
              <TextField
                value={this.props.ui.identity.passwordConfirmation}
                label="Confirm Password"
                fullWidth
                onChange={event => {this.props.updateField("passwordConfirmation", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.passwordConfirmation
                }}
                type="password"
                disabled={this.props.ui.identity.actionPending}
              />
              {this.props.ui.identity.error != "" && <Typography variant="body1" className={classes.errorText}>{this.props.ui.identity.error}</Typography>}
              <FormGroup row className={classes.emailConsent}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.props.emailConsent}
                      onChange={(event) => this.props.toggleEmailConsent()}
                      value="emailConsent"
                    />
                  }
                  label={copy["en"].common.emailConsent}
                />
              </FormGroup>
            <Typography>{copy["en"].common.termsOfService}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => register()} variant="contained" color="secondary" autoFocus disabled={!this.props.ui.identity.ready}>
              Sign Up
            </Button>
          </DialogActions>
          <LinearProgress value={0} variant={this.props.ui.identity.actionPending ? "indeterminate" : "determinate" } classes={{ colorPrimary: classes.customBarBackground }} />
        </Dialog>
      )
    }
    // CHANGE KNOWN PASSWORD
    else if(this.props.ui.identity.dialogFunction == "CHANGE_KNOWN_PASSWORD") {
      return (
        <Dialog
          fullScreen={fullScreen}
          open={this.props.ui.identity.dialogOpen}
          aria-labelledby="change-password"
          onBackdropClick={this.props.closeDialog}
          //onEnter={}
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent className={classes.root}>
            <div>
              <TextField
                value={this.props.ui.identity.oldPassword}
                label="Old Password"
                fullWidth
                onChange={event => {this.props.updateField("oldPassword", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.oldPassword
                }}
                disabled={this.props.ui.identity.actionPending}
              />
              <TextField
                value={this.props.ui.identity.password}
                label="New Password"
                fullWidth
                onChange={event => {this.props.updateField("password", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.password
                }}
                type="password"
                disabled={this.props.ui.identity.actionPending}
              />
              <TextField
                value={this.props.ui.identity.passwordConfirmation}
                label="Confirm New Password"
                fullWidth
                onChange={event => {this.props.updateField("passwordConfirmation", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.passwordConfirmation
                }}
                type="password"
                disabled={this.props.ui.identity.actionPending}
              />
            </div>
            <Typography variant="body1" className={classes.errorText}>{this.props.ui.identity.error}</Typography>
          </DialogContent>
          {this.props.ui.identity.dialogFunction == "RESET" && <div/>}
          <DialogActions>
            <Button onClick={this.props.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => register()} variant="contained" color="primary" autoFocus disabled={!this.props.ui.identity.ready}>
              Sign Up
            </Button>
          </DialogActions>
          <LinearProgress value={0} variant={this.props.ui.identity.actionPending ? "indeterminate" : "determinate" } classes={{ colorPrimary: classes.customBarBackground }} />
        </Dialog>
      )
    }
    // SEND RESET_TOKEN
    else if(this.props.ui.identity.dialogFunction == "RESET_PASSWORD_1") {
      return (
        <Dialog
          fullScreen={fullScreen}
          open={this.props.ui.identity.dialogOpen}
          aria-labelledby="reset-password"
          onBackdropClick={this.props.closeDialog}
          //onEnter={}
        >
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent className={classes.root}>
            <div>
              <TextField
                value={this.props.ui.identity.email}
                label="Email"
                fullWidth
                onChange={event => {this.props.updateField("email", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.email
                }}
                disabled={this.props.ui.identity.actionPending}
              />
            </div>
            <Typography variant="body1" className={classes.errorText}>{this.props.ui.identity.error}</Typography>
          </DialogContent>
          {this.props.ui.identity.dialogFunction == "RESET" && <div/>}
          <DialogActions>
            <Button onClick={this.props.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => requestResetToken()} variant="contained" color="primary" autoFocus disabled={!this.props.ui.identity.ready}>
              Next
            </Button>
          </DialogActions>
          <LinearProgress value={0} variant={this.props.ui.identity.actionPending ? "indeterminate" : "determinate" } classes={{ colorPrimary: classes.customBarBackground }} />
        </Dialog>
      )
    }
    // RESET PASSWORD
    else if(this.props.ui.identity.dialogFunction == "RESET_PASSWORD_2") {
      return (
        <Dialog
          fullScreen={fullScreen}
          open={this.props.ui.identity.dialogOpen}
          aria-labelledby="reset-password"
          onBackdropClick={this.props.closeDialog}
          //onEnter={}
        >
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent className={classes.root}>
            <div>
              <Typography className={classes.resetInfo}>Please check your email for a password reset token and enter it below.</Typography>
            <TextField
                value={this.props.ui.identity.email}
                label="Email"
                fullWidth
                onChange={event => {this.props.updateField("email", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.email
                }}
                disabled
              />
              <TextField
                value={this.props.ui.identity.resetToken}
                label="Reset Token"
                fullWidth
                onChange={event => {this.props.updateField("resetToken", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.resetToken
                }}
                disabled={this.props.ui.identity.actionPending}
              />
              <TextField
                value={this.props.ui.identity.password}
                label="New Password"
                fullWidth
                onChange={event => {this.props.updateField("password", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.password
                }}
                type="password"
                disabled={this.props.ui.identity.actionPending}
                helperText={this.props.ui.identity.password != "" ? this.props.ui.identity.passwordComplex : null}
              />
              <TextField
                value={this.props.ui.identity.passwordConfirmation}
                label="Confirm Password"
                fullWidth
                onChange={event => {this.props.updateField("passwordConfirmation", event.target.value)}}
                InputLabelProps={{
                  shrink: this.props.ui.identity.passwordConfirmation
                }}
                type="password"
                disabled={this.props.ui.identity.actionPending}
              />
            </div>
            <Typography variant="body1" className={classes.errorText}>{this.props.ui.identity.error}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => resetPassword()} variant="contained" color="primary" autoFocus disabled={!this.props.ui.identity.ready}>
              Reset
            </Button>
          </DialogActions>
          <LinearProgress value={0} variant={this.props.ui.identity.actionPending ? "indeterminate" : "determinate" } classes={{ colorPrimary: classes.customBarBackground }} />
        </Dialog>
      )
    }
    else {
      return <div/>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    identity: state.identity,
    ui: state.ui,
    emailConsent: state.identity.emailConsent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: value => dispatch({
      type: Symbols.CLOSE_ID_DIALOG
    }),
    updateField: (field, value) => dispatch({
      type: Symbols.SET_ID_FIELD,
      value: { field: field, value: value }
    }),
    openKnownPasswordReset: () => dispatch({
      type: Symbols.SET_ID_FUNCTION,
      value: "CHANGE_PASSWORD"
    }),
    openForgottenPasswordReset: () => dispatch({
        type: Symbols.SET_ID_FUNCTION,
        value: "RESET_PASSWORD_1"
    }),
    toggleEmailConsent: () => dispatch({
      type: Symbols.TOGGLE_EMAIL_CONSENT
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withMobileDialog()(IdentityDialog)))