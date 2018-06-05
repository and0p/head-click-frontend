import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { gamesAlphabetically, gamesByPopularity } from '../model/HcModel'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase';
import ResponsiveAsset from '../assets'
import * as Symbols from '../redux/HcSymbols'

const gamesPerPage = 12

const styles = theme => ({
    pageRoot: {
        marginBottom: theme.spacing.unit * 6,
        maxWidth: '784px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
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

const ButtonIcon = (props) => (
    <ResponsiveAsset category={props.game.alias} asset="logo" className={props.classes.logo} />
)

const GameButton = (props) => (
    <Grid item xs={4} sm={3}>
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

    handleSortChange = () => event => {
        this.props.setGameSort( event.target.value )
    }

    handleFilterChange = () => event => {
        this.props.setGameFilter( event.target.value )
    }

    filterFunction = game => {
        let f = this.props.filter.toLowerCase()
        return (game.alias.toLowerCase().startsWith(f) || game.name.toLowerCase().startsWith(f))
    }

    render() {
        const { classes, theme } = this.props;
        let gameArray = gamesAlphabetically
        if(this.props.sort == "popularity")
            gameArray = gamesByPopularity
        return (
            <div className={classes.pageRoot}>
                
                <Grid container spacing={16} className={classes.gridRoot}>
                    <Grid item xs={8} sm={9} >
                        <TextField
                            value={this.props.filter}
                            onChange={this.handleFilterChange()}
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
                                    value={this.props.sort}
                                    onChange={this.handleSortChange()}
                                    inputProps={{
                                    name: 'sort'
                                    }}
                                >
                                    <MenuItem value="popularity">Popularity</MenuItem>
                                    <MenuItem value="alphabetical">Alphabetical</MenuItem>
                                </Select>
                        </FormControl>
                    </Grid>
                    {
                        gameArray.filter(this.filterFunction).slice(0, this.props.gamePagesRevealed * gamesPerPage).map((game) => (
                        <GameButton 
                            key={game.name}
                            game={game}
                            selected={this.props.ownedGames.includes(game)}
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
        gamePagesRevealed: state.wizard.gamePagesRevealed,
        sort: state.ui.gameSelect.sort,
        filter: state.ui.gameSelect.filterQuery
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
        }),
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
)(withStyles(styles)(GameSelect))