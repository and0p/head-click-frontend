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
// Component imports
import SidebarButton from './SidebarButton'
// Redux imports
import { connect } from 'react-redux'
import * as Symbols from '../hc-redux/HcSymbols'
// Utility imports
import theme from '../theme.js'
// Icons
import DesktopWindows from 'material-ui-icons/DesktopWindows'
import MouseIcon from 'material-ui-icons/Mouse'
import CompareArrows from 'material-ui-icons/CompareArrows'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    //marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class HcRoot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, theme } = this.props;

    // Games list HTML
    const sidebarGamesList = (
      this.props.ownedGames.map((game) =>
        <SidebarButton
          link={"/game/" + game.alias}
          icon={<DesktopWindows/>}
          text={game.name}
          innerClick={() => { this.props.selectSidebarItem(0) }}
          />
      )
    ) 

    // Drawer HTML, used in both responsive and static
    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <div>
          <SidebarButton 
            link="/"
            icon={<DesktopWindows/>}
            text={this.props.selectedMonitor.name}
            innerClick={() => { this.props.selectSidebarItem(0) }}
            />
          <SidebarButton 
            link="/test"
            icon={<MouseIcon/>}
            text={this.props.selectedMouse.name}
            innerClick={() => { this.props.selectSidebarItem(0) }}
            />
          <SidebarButton 
            link="/mouse"
            icon={<CompareArrows/>}
            text={this.props.selectedSensitivity + "cm"}
            innerClick={() => { this.props.selectSidebarItem(0) }}
            />
        </div>
        <Divider />
        <div>
        {sidebarGamesList}
        <ListItem button>
            <ListItemIcon>
              <AddCircleOutline />
            </ListItemIcon>
            <ListItemText primary="Add Game" />
          </ListItem>
        </div>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.props.openSidebar}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
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
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

HcRoot.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    open: state.sidebarState.mobileMenuOpen,
    selectedItem: state.sidebarState.selectSidebarItem,
    selectedMonitor: state.profileState.monitor,
    selectedMouse: state.profileState.mouse,
    selectedSensitivity: state.profileState.sensitivity,
    ownedGames: state.profileState.ownedGames
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(HcRoot));