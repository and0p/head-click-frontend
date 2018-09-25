import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade';
import { logout } from '../../../identity'
import * as Symbols from '../../../redux/HcSymbols'

const styles = theme => ({
    root: {
        float: 'right'
    }
})


class AccountMenu extends React.Component {
    state = {
        anchorEl: null,
    }

    anchorAndOpen = event => {
        // Anchor menu to self and open
        this.setState({ anchorEl: event.currentTarget })
        this.props.openMenu()
    };

    deanchorAndClose = event => {
        // Anchor menu to self and open
        this.setState({ anchorEl: null })
        this.props.closeMenu()
    };

    render() {
        const { classes, theme } = this.props;
        return (
        <div className={classes.root}>
            <IconButton
            aria-label="Menu"
            aria-owns={'menu'}
            aria-haspopup="true"
            onClick={this.anchorAndOpen}
            >
                <Icon>more_vert</Icon>
            </IconButton>
            <Menu
            id="menu"
            anchorEl={this.state.anchorEl}
            open={this.props.userMenuOpen}
            onClose={this.deanchorAndClose}
            >
                {/*this.props.identity.lastModified > this.props.identity.lastSaveAttempt && <MenuItem onClick={this.props.deanchorAndClose}>Revert</MenuItem>*/}
                <MenuItem onClick={logout}>{this.props.identity.loggedIn ? "Log Out" : "Reset"}</MenuItem>
            </Menu>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userMenuOpen: state.ui.userMenuOpen,
        identity: state.identity
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        openMenu : () => dispatch({
            type: Symbols.OPEN_USER_MENU
        }),
        closeMenu : () => dispatch({
            type: Symbols.CLOSE_USER_MENU
        }),
        logout : () => dispatch({
            type: Symbols.LOGOUT
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(AccountMenu))