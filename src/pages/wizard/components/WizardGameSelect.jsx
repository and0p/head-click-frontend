import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import GameSelect from '../../../components/GameSelect'
import ReactFitText from 'react-fittext'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { defaultPageCSS } from '../../../theme'
import * as Symbols from '../../../redux/HcSymbols'
import Game from '../../../model/Game';

const styles = theme => ({
  ...defaultPageCSS,
  container: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    // [theme.breakpoints.down('md')]: {
    //     marginLeft: theme.spacing.unit,
    //     marginRight: theme.spacing.unit,
    // },
  },
  section: {
    [theme.breakpoints.down('md')]: {
      textAlign: "center"
    },
  }
})

const WizardGameSelect = props => {
  const { classes, profile } = props
  return (
    <div className={classes.wizardPageRoot}>
      <div className={classes.innerRoot}>
        <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
          <Typography variant="display2" className={classNames(classes.headline, classes.center)} gutterBottom>
            Select one or more games you play regularly.
          </Typography>
        </ReactFitText>
        <Grid container spacing={16} className={classes.gridRoot}>
          <GameSelect />
        </Grid>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WizardGameSelect))