import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon'
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/List';
import { withRouter } from "react-router-dom";
// Component imports
import SidebarButton from './components/SidebarButton'
// Redux imports
import { connect } from 'react-redux'
import * as Symbols from '../../redux/HcSymbols'
// Utility imports
import theme from '../../theme.js'
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
    color: '#333333',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
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
    [theme.breakpoints.up('sm')]: {
      marginTop: '12px',
      height: '40px'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '12px',
      height: '32px'
    }
  },
  logo_mobile: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '4px',
      height: '40px'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '5px',
      height: '32px'
    }
  },
  barLogo: {
    //marginTop: '-6px',
    marginLeft: theme.spacing.unit
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
    width: '24px',
    marginRight: theme.spacing.unit * 2
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
            <ResponsiveAsset category="headclick" asset="logo_dark" className={classes.logo} />
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
            <div className={classes.drawerCategory}>LIBRARY</div>
            {sidebarGamesList}
            <SidebarButton 
              link="/select_games"
              icon="add_circle_outline"
              text="Add Games"
              enabled={this.props.profile.ready}
              innerClick={() => { this.props.selectSidebarItem(0) }}
            />
          </div>
      </div>
    );

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
            <div className={classes.barLogo}><Hidden mdUp><ResponsiveAsset category="headclick" asset="logo_white" className={classes.logo_mobile} /></Hidden></div>
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
        <Hidden smDown>
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