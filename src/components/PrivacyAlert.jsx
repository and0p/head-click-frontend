import React from 'react';
import { render } from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux'
import copy from '../copy'
import * as Symbols from '../redux/HcSymbols'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

})  

class PrivacyAlert extends React.Component {

    render() {
        const { classes } = this.props
        return(
            <Snackbar
                anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
                open={!this.props.accepted}
                message={<span id="message-id">{copy["en"].common.privacy}</span>}
                autoHideDuration={0}
                action={<Button color="primary" variant="contained" size="small" onClick={this.props.accept}>{copy["en"].common.personalAccept}</Button>}
            >
            </Snackbar>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      accepted: state.identity.acceptedPrivacyPolicy
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      accept: () => dispatch({
        type: Symbols.ACCEPT_PRIVACY_POLICY
      })
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(
      withStyles(styles, { withTheme: true })(PrivacyAlert));