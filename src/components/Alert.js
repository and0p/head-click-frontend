import React from 'react';
import { render } from 'react-dom';
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon'
import { connect } from 'react-redux'
import * as Symbols from '../redux/HcSymbols'
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
})

class Alert extends React.Component {
    render() {
        const { classes } = this.props
        return(
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
                open={this.props.alertInfo.open}
                onClose={this.props.closeAlert}
                SnackbarContentProps={{
                'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.alertInfo.text}</span>}
                autoHideDuration={1000}
                // action={
                //     <IconButton
                //     key="close"
                //     aria-label="Close"
                //     color="inherit"
                //     onClick={this.props.closeAlert}
                //   >
                //     <Icon>close</Icon>
                //   </IconButton>
                // }
            >
            </Snackbar>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
      alertInfo: state.ui.alert
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      closeAlert: () => dispatch({
        type: Symbols.CLOSE_ALERT
      })
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(
      withStyles(styles, { withTheme: true })(Alert));