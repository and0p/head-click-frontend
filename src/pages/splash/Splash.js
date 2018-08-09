import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from "react-router-dom";
import copy from '../../copy'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import ReactFitText from 'react-fittext'
import ResponsiveAsset from '../../assets'
import Button from '@material-ui/core/Button'
import * as Symbols from '../../redux/HcSymbols'

const drawerWidth = 240;
const mobileAppBarHeight = '56px'
const desktopAppBarHeight = '64px'

const styles = theme => ({
    root: {
      flexGrow: 1,
      [theme.breakpoints.up('lg')]: {
        background: 'url("https://s3.amazonaws.com/head-click/public/splash/splash@2x.png")',
      },
      [theme.breakpoints.down('lg')]: {
        backgroundSize: "auto 130%",
        background: 'url("https://s3.amazonaws.com/head-click/public/splash/splash_mono@2x.png")',
      },
      [theme.breakpoints.up('md')]: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "100% 50%",
      },
      [theme.breakpoints.down('md')]: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%",
      },
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100vh - ' + desktopAppBarHeight + ')'
      },
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100vh - ' + mobileAppBarHeight + ')'
      },
<<<<<<< HEAD
      maxWidth: '75%',
      margin: 'auto',
      textAlign: 'center'
=======
      marginTop: 0,
      marginBottom: 0
>>>>>>> identity
    },
    innerRoot: {
      height: "calc(100%)",
      textAlign: "center"
    },
    header: {
      marginBottom: theme.spacing.unit * 4
    },
    textSide: {
      position: "relative",
      top: "45%",
      left: "0",
      [theme.breakpoints.up('sm')]: {
        //left: theme.spacing.unit * 3 + drawerWidth
      }
    },
    button: {
      width: '250px',
      maxWidth: '100%',
      marginTop: theme.spacing.unit * 2
    }
})

class Splash extends React.Component {
    render() {
      const { classes, theme } = this.props;
      const splashImage = {
        width: '90%',
        maxWidth: '600px',
        margin: 'auto',
      }
      const linkStyle = {
        color: "#FFFFFF",
        fontWeight: 400
      }
      return (
        <div className={classes.root}>
          <Grid container spacing={16} className={classes.innerRoot}>
            <Grid item xs={12} xl={6}>
              <div className={classes.textSide}>
              <ReactFitText minFontSize={36} maxFontSize={42}>
                <Typography variant="display2" className={classes.header}>{copy.en.splash.tagline}</Typography>
              </ReactFitText>
<<<<<<< HEAD
              <div className={classes.imageContainer}>
                <img style={splashImage} src="https://s3.amazonaws.com/head-click/public/placeholder_image.png" />
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={12} md={4} className={classes.feature}>
                <Typography variant="subheading" className={classes.featureText}><Hidden mdUp>• </Hidden>{copy.en.splash.feature1.verbose}</Typography>
              </Grid>
              <Grid item sm={12} md={4} className={classes.feature}>
                <Typography variant="subheading" className={classes.featureText}><Hidden mdUp>• </Hidden>{copy.en.splash.feature2.verbose}</Typography>
=======
              <Grid container spacing={16}>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    component={Link}
                    to="/wizard"
                    style={linkStyle}
                  >
                    Try it
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={this.props.openIdentityDialog}
                  >
                    Log In
                  </Button>
                </Grid>
>>>>>>> identity
              </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
    return {
      profile: state.profile
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      openIdentityDialog : () => dispatch({
        type: Symbols.OPEN_ID_DIALOG
      })
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Splash))