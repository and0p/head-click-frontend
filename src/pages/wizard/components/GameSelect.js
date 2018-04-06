import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { gamesByPopularity } from '../../../model/HcModel'
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import ButtonBase from 'material-ui/ButtonBase';
import * as Symbols from '../../../redux/HcSymbols'

const gamesPerPage = 12

const styles = theme => ({
    pageRoot: {
        marginBottom: theme.spacing.unit * 6
    },
    gridRoot: {
        flexGrow: 1,
        maxWidth: 800
    },
    gameButton: {
        width: '100%',
        height: '120px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.background.paper
    },
    gameButtonSelected: {
        width: '100%',
        height: '120px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.primary.main
    },
    buttonIcon: {
        width: '75px',
        height: '75px',
        position: 'absolute'
    },
    loadMoreButton: {
        margin: '8px',
        backgroundColor: theme.palette.background.paper
    }
});

const LoadMoreButton = (props) => {
    if(gamesPerPage * props.gamePagesRevealed <= gamesByPopularity.length)
        return(
            <Button fullWidth={true} className={props.classes.loadMoreButton} onClick={props.click}>
                Show more...
            </Button>
        )
    else
        return(
            <Button fullWidth={true} className={props.classes.loadMoreButton} onClick={props.click} disabled={true}>
                More games coming soon...
            </Button>
        )
}

const ButtonIcon = (props) => {
    console.log(props.game.hasLogo)
    console.log(props.game.getAssetPath() + 'logo@half.png')
    if(props.game.hasLogo)
        return (
            <img classname={props.classes.buttonIcon} src={'http://placehold.it/75x75&text=logo'} />
        )
    else
        return (<div/>)
}

const GameButton = (props) => (
    <Grid item xs={4} md={3}>
        <ButtonBase
            onClick={props.click}
            key={props.game.name}
            className={props.selected ? props.classes.gameButtonSelected : props.classes.gameButton }
            fullWidth={true}
        >
            <ButtonIcon game={props.game} classes={props.classes}/>
            <Typography variant="subheading">{props.game.shortName}</Typography>
        </ButtonBase>
    </Grid>
)

class GameSelect extends React.Component {
    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.pageRoot}>
                <Typography variant="display1" gutterBottom>Select games you play:</Typography>
                <Grid container spacing={16} className={classes.gridRoot}>
                    {gamesByPopularity.slice(0, this.props.gamePagesRevealed * gamesPerPage).map((game) => (
                        <GameButton 
                            key={game.name}
                            game={game} 
                            selected={false} 
                            classes={classes}
                            click={() => this.props.toggleGame(game)}
                        />
                    ))}
                    <LoadMoreButton classes={classes} click={this.props.showMoreGames} gamePagesRevealed={this.props.gamePagesRevealed}/>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ownedGames: state.profile.ownedGames,
        gamePagesRevealed: state.wizard.gamePagesRevealed
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        addGame: game => dispatch({
            type: Symbols.ADD_GAME,
            value: game
        }),
        toggleGame: game => dispatch({
            type: Symbols.TOGGLE_GAME,
            value: game
        }),
        showMoreGames: () => dispatch({
            type: Symbols.SHOW_MORE_GAMES
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(GameSelect))