import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux imports
import { connect } from 'react-redux'
import * as Symbols from '../../redux/HcSymbols'
// Utility imports
import { withRouter } from "react-router-dom"
import theme from '../../theme.js'
// HC Imports
import { games } from '../../model/HcModel'
import MessageBox from '../../components/MessageBox'
import SidebarButton from './components/SidebarButton'
import AccountMenu from './components/AccountMenu'
import { save } from '../../identity'
// Assets
import ResponsiveAsset from '../../assets'

const drawerWidth = 240;
const mobileAppBarHeight = '56px'
const desktopAppBarHeight = '64px'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'auto',
    //position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
    borderRight: '0px',
  },
  drawerHeader: {
    color: '#FFFFFF',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    fontSize: '1.5em',
    lineHeight: '1.5em',
    [theme.breakpoints.up('sm')]: {
      height: desktopAppBarHeight
    },
    [theme.breakpoints.down('xs')]: {
      height: mobileAppBarHeight
    },
    paddingLeft: theme.spacing.unit * 2
  },
  drawerContent: {
  },
  logo: {
    float: 'left',
    [theme.breakpoints.up('sm')]: {
      marginTop: '12px',
      height: '40px'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '12px',
      height: '32px'
    }
  },
  logoMobile: {
    float: 'left',
    [theme.breakpoints.up('sm')]: {
      marginTop: '7px',
      height: '40px'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '4px',
      height: '32px'
    }
  },
  barLogoContainer: {
    flex: 1
  },
  // barLogo: {
  //   //marginTop: '-6px',
  //   marginLeft: 'theme.spacing.unit',
  //   float: 'left'
  // },
  versionLight: {
    color: '#FFFFFF',
    //fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      paddingTop: '28px',
      paddingLeft: '104px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '18px',
      paddingLeft: '84px',
    }
  },
  versionDark: {
    color: "#55266e",
    //fontWeight: 600,
    [theme.breakpoints.up('sm')]: {
      paddingTop: '35px',
      paddingLeft: '102px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '28px',
      paddingLeft: '81px',
    }
  },
  barButton: {
    marginRight: theme.spacing.unit
  },
  saveButton: {
    marginTop: '6px',
    marginRight: theme.spacing.unit
  },
  content: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    // [theme.breakpoints.up('sm')]: {
    //   padding: theme.spacing.unit * 1,
    // },
    // [theme.breakpoints.down('sm')]: {
    //   padding: theme.spacing.unit * 1,
    // },
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
    // padding: theme.spacing.unit
    //width: '100%'
  },
  contentWrap: {
    // maxWidth: '1639px',
  },
  title: {
    paddingLeft: theme.spacing.unit * 3
  },
  drawerCategory: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2
  },
  gameLogo: {
    width: '24px',
    marginRight: theme.spacing.unit * 2
  },
  messageBox: {
    marginTop: theme.spacing.unit * 2
  },
  saveProgress: {
    color: theme.palette.custom.purple,
    position: 'absolute',
    //top: -6,
    //left: -6,
    zIndex: 1,
  },
});

class MaterialRoot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, theme } = this.props;
    let canSave = false
    if((!this.props.ui.actionPending && this.props.identity.lastModified > this.props.identity.lastSaveAttempt) ||
        this.props.profile.ready && !this.props.identity.loggedIn)
      canSave = true
    // Games list HTML
    const sidebarGamesList = () => (
      <div>
        <div className={classes.drawerCategory}><Typography variant="button">LIBRARY</Typography></div>
        {this.props.profile.ownedGames.map((gameAlias) =>
          <SidebarButton
            link={"/game/" + gameAlias}
            image={<ResponsiveAsset category={gameAlias} asset="logo_mini" className={classes.gameLogo} />}
            text={games[gameAlias].shortName}
            innerClick={() => { this.props.profile.ready ? this.props.selectSidebarItem(0) : {} }}
            enabled={ this.props.profile.ready }
            key={gameAlias}
            />
        )}
        <SidebarButton 
        link="/browse_games"
        icon="add_circle_outline"
        text="Browse Games"
        enabled={this.props.profile.ready}
        innerClick={() => { this.props.selectSidebarItem(0) }}
        />
      </div>
    )

    // Drawer HTML, used in both responsive and static
    const drawer = (
      <div>
          <Paper elevation={4} className={classes.drawerHeader} onClick={this.props.closeSidebar}>
            <ResponsiveAsset category="headclick" asset="logo_white" className={classes.logo} />
            <Typography variant="body1" className={classes.versionLight}>beta</Typography>
          </Paper>
          <div className={classes.drawerContent}>
            <SidebarButton 
              link="/"
              icon="home"
              text={this.props.profile.ready ? "Dashboard" : "Welcome"}
              enabled={true}
              innerClick={() => { this.props.selectSidebarItem(0) }}
              />
            <SidebarButton 
              link="/stats"
              icon="insert_chart"
              text="Stats"
              enabled
              innerClick={() => { this.props.selectSidebarItem(0) }}
            />
            <SidebarButton 
              link="http://blog.head.click"
              icon="subject"
              text="Blog"
              enabled={true}
              //innerClick={() => { this.props.selectSidebarItem(0) }}
            />
            <Divider />
            {this.props.profile.ready ? sidebarGamesList() : <div className={classes.messageBox}><MessageBox>Create a profile or log in to access the rest of the site.</MessageBox></div>}
          </div>
      </div>
    )
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} color="default">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.openSidebar}
              className={classes.navIconHide}
            >
              <Icon>menu</Icon>
            </IconButton>
            <div className={classes.barLogoContainer}>
            <Hidden mdUp>
                <ResponsiveAsset category="headclick" asset="logo_white" className={classes.logoMobile} />
                <Typography variant="body2" className={classes.versionLight}>beta</Typography>
            </Hidden>
            </div>
            {(!this.props.identity.loggedIn && !this.props.profile.ready) && 
              <Button className={classes.barButton} variant="contained" color="secondary" onClick={this.props.openLoginDialog}>Log in</Button>
            }
            {this.props.profile.ready &&
              <div>
                <Button 
                disabled={!canSave}
                className={classes.saveButton}
                variant="contained"
                color="secondary"
                onClick={save}>
                  { this.props.ui.identity.actionPending ? <CircularProgress size={24} className={classes.saveProgress} /> : "Save" }
                </Button>
                <AccountMenu />
              </div>
            }
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.props.open}
            onClose={this.props.closeSidebar}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <div className={classes.contentWrap}>
              {this.props.children}
            </div>
        </main>
      </div>
    );
  }
}

MaterialRoot.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    open: state.ui.mobileMenuOpen,
    profile: state.profile,
    identity: state.identity,
    ui: state.ui
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectSidebarItem : itemID => dispatch({
      type: Symbols.SELECT_SIDEBAR_ITEM,
      value: itemID
    }),
    openSidebar : () => dispatch({
      type: Symbols.OPEN_SIDEBAR
    }),
    closeSidebar : () => dispatch({
      type: Symbols.CLOSE_SIDEBAR
    }),
    openLoginDialog : () => dispatch({
      type: Symbols.OPEN_ID_DIALOG,
      value: "LOGIN"
    })
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles, { withTheme: true })(MaterialRoot)));