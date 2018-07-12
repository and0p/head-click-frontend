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
import Button from '@material-ui/core/Button'
import * as Symbols from '../../redux/HcSymbols'

const styles = theme => ({
    root: {
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing.unit * 4
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing.unit * 2
      },
    },
    centered: {
      textAlign: 'center'
    },
    imageContainer: {
      marginTop: theme.spacing.unit * 4
    },
    feature: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing.unit * 4,
        padding: theme.spacing.unit * 4,
        borderRight: "1px solid #444444"
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
      }
    },
    featureLast: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing.unit * 4,
        padding: theme.spacing.unit * 4,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
      }
    },
    featureText: {
      [theme.breakpoints.up('md')]: {
        width: '250px',
      },
      maxWidth: '75%',
      margin: 'auto'
    },
    padGrid: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
    },
    buttonSection: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing.unit * 4
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing.unit * 2
      },
      textAlign: 'center'
    },
    button: {
      width: '250px',
      maxWidth: '100%',
    },
    buttonCaption: {
      color: theme.palette.custom.subtle
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
          <Grid container spacing={16}>
            <Grid item xs={12} className={classes.centered}>
              <ReactFitText minFontSize={36} maxFontSize={42}>
                <Typography variant="display2">{copy.en.splash.tagline}</Typography>
              </ReactFitText>
              <div className={classes.imageContainer}>
                <img style={splashImage} src="http://placehold.it/600x300&text=splash_placeholder" />
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid item sm={12} md={4} className={classes.feature}>
                <Typography variant="subheading" className={classes.featureText}><Hidden mdUp>• </Hidden>{copy.en.splash.feature1.verbose}</Typography>
              </Grid>
              <Grid item sm={12} md={4} className={classes.feature}>
                <Typography variant="subheading" className={classes.featureText}><Hidden mdUp>• </Hidden>{copy.en.splash.feature2.verbose}</Typography>
              </Grid>
              <Grid item sm={12} md={4} className={classes.featureLast}>
                <Typography variant="subheading" className={classes.featureText}><Hidden mdUp>• </Hidden>{copy.en.splash.feature3.verbose}</Typography>
              </Grid>
            </Hidden>
            <Grid item xs={0} sm={0} md={3} className={classes.padGrid}/>
            <Grid item xs={12} sm={6} md={3} className={classes.buttonSection}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                component={Link}
                to="/wizard"
                style={linkStyle}
              >
                Make a Profile
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.buttonSection}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.props.openIdentityDialog}
              >
                Log In
              </Button>
              {/*<Typography className={classes.buttonCaption} variant="caption">Feature not available in alpha.</Typography>*/}
            </Grid>
            <Grid item xs={0} sm={0} md={3} className={classes.padGrid}/>
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