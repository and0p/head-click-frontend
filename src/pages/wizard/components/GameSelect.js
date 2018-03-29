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

const styles = theme => ({
    gridRoot : {
        flexGrow: 1
    },
    gameButton: {
        width: '120px',
        height: '60px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.background.paper
    },
    gameButtonSelected: {
        width: '120px',
        height: '60px',
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        verticalAlign: 'middle',
        backgroundColor: theme.palette.primary.main
    },
});

const GameButton = (props) => (
    <Grid item>
        <ButtonBase
            onClick={props.click}
            key={props.game.name}
            className={props.selected ? props.classes.gameButtonSelected : props.classes.gameButton }
        >
            <Typography variant="subheading">{props.game.name}</Typography>
        </ButtonBase>
    </Grid>
)

class GameSelect extends React.Component {
    render() {
        const { classes, theme } = this.props;
        return (
            <div>
                <Typography variant="display1" gutterBottom>Select games you play:</Typography>
                <Grid container spacing={16} className={classes.gridRoot}>
                    {gamesByPopularity.map((game) => (
                        <GameButton 
                            key={game.name}
                            game={game} 
                            selected={false} 
                            classes={classes}
                            click={() => this.props.toggleGame(game)}
                        />
                    ))}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ownedGames: state.profile.ownedGames
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
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(GameSelect))