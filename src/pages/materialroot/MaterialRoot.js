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
import MenuIcon from 'material-ui-icons/Menu';
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
import DesktopWindows from 'material-ui-icons/DesktopWindows'
import MouseIcon from 'material-ui-icons/Mouse'
import CompareArrows from 'material-ui-icons/CompareArrows'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'

const drawerWidth = 240;

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
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: '100%',
    maxWidth: '100%',
    boxSizing: 'inherit'
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

    // Games list HTML
    const sidebarGamesList = (
      this.props.profile.ownedGames.map((game) =>
        <SidebarButton
          link={"/game/" + game.alias}
          icon={<DesktopWindows/>}
          text={game.name}
          innerClick={() => { this.props.selectSidebarItem(0) }}
          />
      )
    );

    // Drawer HTML, used in both responsive and static
    const drawer = (
      <div>
        <div className={classes.toolbar} />
          <SidebarButton 
            link="/"
            icon={<DesktopWindows/>}
            text={this.props.profile.monitor.name}
            subtext={this.props.profile.refreshRate + "hz"}
            innerClick={() => { this.props.selectSidebarItem(0) }}
            />
          <SidebarButton 
            link="/test"
            icon={<MouseIcon/>}
            text={this.props.profile.dPI + " dpi"}
            subtext={this.props.profile.mouse.name}
            innerClick={() => { this.props.selectSidebarItem(0) }}
            />
          <SidebarButton 
            link="/mouse"
            icon={<CompareArrows/>}
            text={this.props.profile.sensitivity + " cm/360°"}
            innerClick={() => { this.props.selectSidebarItem(0) }}
            />
          <Divider />
          {sidebarGamesList}
          <ListItem button>
            <ListItemIcon>
              <AddCircleOutline />
            </ListItemIcon>
            <ListItemText primary="Add Game" />
          </ListItem>
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
            <Typography variant="title" color="inherit" noWrap className={classes.title}>
              Head.Click
            </Typography>
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