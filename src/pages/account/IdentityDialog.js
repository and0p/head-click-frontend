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
// Misc imports
import { login } from '../../identity'
import * as Symbols from '../../redux/HcSymbols'

const styles = theme => ({
    root: {
      minWidth: '300px'
    },
    customBarBackground: {
      backgroundColor: theme.palette.background.paper
    },
    errorText: {
      color: theme.palette.custom.red
    }
})

class IdentityDialog extends React.Component {
  state = { email: "", password: "" }


  
  render() {
    const { classes, theme, fullScreen } = this.props
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.identity.idDialogOpen}
        aria-labelledby="log-in-or-sign-up"
        onBackdropClick={this.props.closeDialog}
        //onEnter={}
      >
        <DialogTitle>Log In</DialogTitle>
        <DialogContent className={classes.root}>
        {this.props.identity.idDialogFunction == "LOGIN" &&
        <div>
          <TextField
            value={this.state.email}
            label="Email"
            fullWidth
            onChange={event => {this.setState({email: event.target.value})}}
            InputLabelProps={{
              shrink: this.state.email != "",
            }}
          />
          <TextField
            value={this.state.password}
            label="Password"
            fullWidth
            onChange={event => {this.setState({password: event.target.value})}}
            InputLabelProps={{
              shrink: this.state.password != "",
            }}
            type="password"
          />
        </div>
        }
        {this.props.identity.error != "" && <Typography variant="body1" className={classes.errorText}>{this.props.identity.error}</Typography>}
        </DialogContent>
        {this.props.identity.idDialogFunction == "RESET" && <div/>}
        <DialogActions>
          <Button onClick={this.props.closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => login(this.state.email, this.state.password)} variant="contained" color="primary" autoFocus>
            Log In
          </Button>
        </DialogActions>
        <LinearProgress value={0} variant={this.props.identity.idActionPending ? "indeterminate" : "determinate" } classes={{ colorPrimary: classes.customBarBackground }} />
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    identity: state.identity
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: value => dispatch({
      type: Symbols.CLOSE_ID_DIALOG
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withMobileDialog()(IdentityDialog)))