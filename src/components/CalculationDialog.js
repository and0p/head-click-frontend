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
import * as Symbols from '../redux/HcSymbols'

const styles = theme => ({
    root: {
  
    },
})

class CalculationDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dpi: props.dpi,
            sensitivitySetting: null,
            cm360: null,
        }
    }

    render() {
        const { classes, theme, fullScreen } = this.props
        return(
            <Dialog
                fullScreen={fullScreen}
                open={this.props.ui.editingProfile}
                aria-labelledby="edit-profile"
                //onEnter={this.reopened}
            >

            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dpi: state.profile.dpi.actual,
        open: state.ui.calculator.open,
        selectedGame: state.ui.calculator.selectedGame
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(withMobileDialog()(CalculationDialog)))