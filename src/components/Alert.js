import React from 'react';
import { render } from 'react-dom';
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import * as Symbols from '../redux/HcSymbols'
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
})

class Alert extends React.Component {
    render() {
        return(
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
                open={this.props.alertInfo.open}
                onClose={this.props.closeAlert}
                SnackbarContentProps={{
                'aria-describedby': 'message-id',
                }}
                message={<span>Test</span>}
                autoHideDuration={3000}
            >
            <Button key="undo" color="secondary" size="small" onClick={this.props.closeAlert}>
                {this.props.alertInfo.text}
            </Button>
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