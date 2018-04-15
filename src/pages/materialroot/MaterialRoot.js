import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withRouter } from "react-router-dom";
// Component imports
import SidebarButton from './components/SidebarButton'
// Redux imports
import { connect } from 'react-redux'
import * as Symbols from '../../redux/HcSymbols'
// Utility imports
import theme from '../../theme.js'
// Icons
import MenuIcon from 'material-ui-icons/Menu'
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
    backgroundColor: theme.palette.background.paper
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
    borderRight: '0px'
  },
  drawerHeader: {
    color: '#333333',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    fontSize: '1.5em',
    lineHeight: '1.5em',
    [theme.breakpoints.up('sm')]: {
      height: desktopAppBarHeight
    },
    [theme.breakpoints.down('xs')]: {
      height: mobileAppBarHeight
    }
  },
  logo: {
    height: '40px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '12px'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '8px'
    }
  },
  barLogo: {
    marginTop: '-6px',
    marginLeft: '24px'
  },
  content: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    width: '100%'
  },
  title: {
    paddingLeft: theme.spacing.unit * 3
  }
});

class MaterialRoot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, theme } = this.props;
    console.log(theme.mixins.toolbar);
    // Games list HTML
    const sidebarGamesList = (
      this.props.profile.ownedGames.map((game) =>
        <SidebarButton
          link={"/game/" + game.alias}
          icon="videogame_asset"
          text={game.shortName}
          innerClick={() => { this.props.profile.ready ? this.props.selectSidebarItem(0) : {} }}
          enabled={ this.props.profile.ready }
          />
      )
    );

    // Drawer HTML, used in both responsive and static
    const drawer = (
      <div>
          <Paper elevation={4} className={classes.drawerHeader}>
            <ResponsiveAsset asset="logo" className={classes.logo} />
          </Paper>
          <SidebarButton 
            link="/"
            icon="home"
            text="Dashboard"
            enabled={true}
            innerClick={() => { this.props.selectSidebarItem(0) }}
            />
          <SidebarButton 
            link="/"
            icon="insert_chart"
            text="Stats"
            enabled={this.props.profile.ready}
            innerClick={() => { this.props.selectSidebarItem(0) }}
          />
          <Divider />
          {sidebarGamesList}
          <SidebarButton 
            link="/add_game"
            icon="add_circle_outline"
            text="Add Game"
            enabled={this.props.profile.ready}
            innerClick={() => { this.props.selectSidebarItem(0) }}
          />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.openSidebar}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.barLogo}><Hidden mdUp><ResponsiveAsset asset="logo" className={classes.logo} /></Hidden></div>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.props.closeSidebar}
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
          {this.props.children}
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
  console.log(state)
  return {
    open: state.sidebar.mobileMenuOpen,
    profile: state.profile
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
    })
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles, { withTheme: true })(MaterialRoot)));