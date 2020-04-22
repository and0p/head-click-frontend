import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles'

import * as Symbols from '../../../redux/HcSymbols'

const styles = theme => ({
  button: {
    marginTop: '8px'
  },
  icon: {
    marginTop: '8px',
    marginRight: '8px',
    fontSize: 32
  }
})

export const FavoriteButton = props => {
  const { profile, game, toggleGame, classes } = props
  const isFavorite = profile.ownedGames.includes(game.alias)
  return (
    <React.Fragment>
      <Hidden mdUp>
        <Icon
          className={classes.icon}
          onClick={() => toggleGame(game)}
          color={isFavorite ? 'primary' : 'default'}
        >
          {isFavorite ? 'star' : 'star_outline'}
        </Icon>
      </Hidden>
      <Hidden smDown>
        <Button
          color={isFavorite ? "default" : "primary"}
          onClick={() => toggleGame(game)}
          variant={isFavorite ? "outlined" : "contained"}
          className={classes.button}
        >
          {isFavorite ? "Remove from library" : "Add to library"}
        </Button>
      </Hidden>
    </React.Fragment>
  )
}

FavoriteButton.propTypes = {
  game: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleGame: game => dispatch({
      type: Symbols.TOGGLE_GAME,
      value: game
    }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FavoriteButton))