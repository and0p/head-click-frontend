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
import GameSelect from '../../components/GameSelect'
import ReactFitText from 'react-fittext'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { defaultPageCSS } from '../../theme'
import * as Symbols from '../../redux/HcSymbols'

const styles = theme => ({
  ...defaultPageCSS
})

const BrowseGames = props => {
  const { classes, theme } = props
  return (
    <div className={classes.root}>
      <Typography variant="display1" className={classes.headline} gutterBottom>
        Game Library
      </Typography>
      <div className={classes.innerRoot}>
        <div className={classes.wizardPageRoot}>
          <Grid container spacing={16} className={classes.gridRoot}>
            <Grid item xs={8} sm={9} >
              <TextField
                value={props.filter}
                onChange={event => props.setGameFilter(event.target.value)}
                id="search"
                label="Search"
                type="search"
                className={classes.textField}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <FormControl className={classes.formControl} margin='dense' fullWidth>
                <InputLabel>Sort</InputLabel>
                <Select
                  value={props.sort}
                  onChange={event => props.setGameSort(event.target.value)}
                  inputProps={{
                    name: 'sort'
                  }}
                >
                  <MenuItem value="popularity">Popularity</MenuItem>
                  <MenuItem value="alphabetical">Alphabetical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <GameSelect link />
          </Grid>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ownedGames: state.profile.ownedGames,
    gamePagesRevealed: state.wizard.gamePagesRevealed,
    sort: state.ui.gameSelect.sort,
    filter: state.ui.gameSelect.filterQuery
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGameSort: value => dispatch({
      type: Symbols.SET_GAMEPAGE_SORT,
      value: value
    }),
    setGameFilter: value => dispatch({
      type: Symbols.SET_GAMEPAGE_FILTER,
      value: value
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BrowseGames))