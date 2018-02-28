import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
// Icons
import DesktopWindows from 'material-ui-icons/DesktopWindows'
import MouseIcon from 'material-ui-icons/Mouse'
import CompareArrows from 'material-ui-icons/CompareArrows'
import AddCircleOutline from 'material-ui-icons/AddCircleOutline'
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7500e8',
      main: '#3f00b5',
      dark: '#000084',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
const drawerWidth = 240;



const styles = theme => ({
  root: {
    width: '100%',
    //height: '100%',
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

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    // Drawer HTML, used in both responsive and static
    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <div>
          <ListItem button>
            <ListItemIcon>
              <DesktopWindows />
            </ListItemIcon>
            <ListItemText primary="1080 x 1920" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MouseIcon />
            </ListItemIcon>
            <ListItemText primary="Logitch G502" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CompareArrows />
            </ListItemIcon>
            <ListItemText primary="5.0" />
          </ListItem>
        </div>
        <Divider />
        <div>
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
                onClick={this.handleDrawerToggle}
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
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
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
            <Typography noWrap>test: {this.props.model.model2}</Typography>
          </main>
        </div>
      </div>
    );
  }
}

HcRoot.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(HcRoot);