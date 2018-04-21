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
    borderRight: '0px',
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
  drawerContent: {
  },
  logo: {

    [theme.breakpoints.up('sm')]: {
      marginTop: '12px',
      height: '40px'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
      height: '36px'
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
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 1,
    },
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    width: '100%'
  },
  contentWrap: {
    maxWidth: '1639px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title: {
    paddingLeft: theme.spacing.unit * 3
  },
  drawerCategory: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    color: "#888888",
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  gameLogo: {
    width: '24px'
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
          image={<ResponsiveAsset category={game.alias} asset="logo_mini" className={classes.gameLogo} />}
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
            <ResponsiveAsset category="headclick" asset="logo" className={classes.logo} />
          </Paper>
          <div className={classes.drawerContent}>
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
            <div className={classes.drawerCategory}>GAMES</div>
            {sidebarGamesList}
            <SidebarButton 
              link="/add_game"
              icon="add_circle_outline"
              text="Add Game"
              enabled={this.props.profile.ready}
              innerClick={() => { this.props.selectSidebarItem(0) }}
            />
          </div>
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
            <div className={classes.barLogo}><Hidden mdUp><ResponsiveAsset category="headclick" asset="logo" className={classes.logo} /></Hidden></div>
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