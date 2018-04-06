import React from 'react';
import { withStyles } from 'material-ui/styles';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import * as Symbols from '../../redux/HcSymbols'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

const styles = theme => ({
  });

function Transition(props) {
return <Slide direction="up" {...props} />;
}

class DpiAlert extends React.Component {

    render() {
        return (
            <Dialog
            open={this.props.ui.alert == Symbols.DPI_ASSIGN_ALERT ? true : false}
            transition={Transition}
            keepMounted
            onClose={this.props.close}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Placeholder title
                </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        We've assigned you a mouse DPI of {this.props.profile.dPI} based on your screen size.
                        You can change this at any time from the dashboard.
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button variant="raised" onClick={this.props.close} color="primary">
                        Got it
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
        close: () => dispatch({
            type: Symbols.CLOSE_ALERT
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DpiAlert))