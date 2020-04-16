import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { gamesAlphabetically, gamesByPopularity } from '../model/HcModel'
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase';
import ResponsiveAsset from '../assets'
import { defaultPageCSS } from '../theme'
import { push } from 'connected-react-router'
import classNames from 'classnames'
import * as Symbols from '../redux/HcSymbols'

const gamesPerPage = 12

const styles = theme => ({
  ...defaultPageCSS,
  gridRoot: {
    flexGrow: 1,
    //maxWidth: 800
  },
  gameButton: {
    width: '100%',
    height: '120px',
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    display: 'block'
  },
  gameButtonSelected: {
    width: '100%',
    height: '120px',
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.main,
    display: 'block'
  },
  buttonIcon: {
    width: '75px',
    height: '75px',
    position: 'absolute'
  },
  loadMoreButton: {
    margin: '8px',
    backgroundColor: theme.palette.background.paper
  },
  logo: {
    maxWidth: '100%',
    height: '60px',
    float: 'none',
    marginTop: '5px'
  },
  sortSection: {
    width: '100%',
    padding: theme.spacing.unit
  },
  subtle: {
    color: theme.palette.custom.subtle
  },
  textField: {
  }
});

const LoadMoreButton = (props) => {
  if (gamesPerPage * props.gamePagesRevealed <= gamesByPopularity.length)
    return (
      <Button fullWidth={true} className={props.classes.loadMoreButton} onClick={props.click}>
        Show more...
      </Button>
    )
  else
    return (
      <Button fullWidth={true} className={props.classes.loadMoreButton} onClick={props.click} disabled={true}>
        More games coming soon...
      </Button>
    )
}

const ButtonIcon = (props) => (
  <ResponsiveAsset category={props.game.alias} asset="logo" className={props.classes.logo} />
)

class GameSelect extends React.Component {

  filterFunction = game => {
    let f = this.props.filter.toLowerCase()
    return (game.alias.toLowerCase().startsWith(f) || game.name.toLowerCase().startsWith(f))
  }

  renderGameButton = game => {
    const { classes, link, push, ownedGames } = this.props
    console.log(push)
    return (
      <Grid item xs={4} sm={3}>
        <ButtonBase
          to={'/wizard'}
          onClick={link ? () => push('/game/' + game.alias) : () => this.props.toggleGame(game)}
          key={game.name}
          className={ownedGames.includes(game.alias) ? classes.gameButtonSelected : classes.gameButton}
          fullWidth={true}
        >
          <ButtonIcon game={game} classes={classes} />
          <Typography variant="subheading">{game.shortName}</Typography>
        </ButtonBase>
      </Grid >
    )
  }

  render() {
    const { classes, sort } = this.props;
    let gameArray = gamesAlphabetically
    if (sort === "popularity")
      gameArray = gamesByPopularity
    return (
      <React.Fragment>
        {
          gameArray.filter(this.filterFunction).slice(0, this.props.gamePagesRevealed * gamesPerPage).map((game) => (
            this.renderGameButton(game)
          ))}
        <LoadMoreButton classes={classes} click={this.props.showMoreGames} gamePagesRevealed={this.props.gamePagesRevealed} />
      </React.Fragment>
    )
  }
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
    toggleGame: game => dispatch({
      type: Symbols.TOGGLE_GAME,
      value: game
    }),
    showMoreGames: () => dispatch({
      type: Symbols.SHOW_MORE_GAMES
    }),
    setGameSort: value => dispatch({
      type: Symbols.SET_GAMEPAGE_SORT,
      value: value
    }),
    setGameFilter: value => dispatch({
      type: Symbols.SET_GAMEPAGE_FILTER,
      value: value
    }),
    push: push
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GameSelect))