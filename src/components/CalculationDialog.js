import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import GameOption from '../pages/gamepage/components/GameOption'
import { games, gamesWithOutputFunctions } from '../model/HcModel'
import * as Symbols from '../redux/HcSymbols'
import { isNumber } from 'util';

const styles = theme => ({
    root: {
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    gameSelect: {
        minWidth: '350px'
    },
    input: {
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        //minWidth: '250px'
    },
    helperText: {
        color: theme.palette.custom.teal
    },
    outputSection: {
        marginTop: theme.spacing.unit * 2,
        clear: "both"
    }
})

class CalculationDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dpi: props.dpi,
            sensitivity: 1,
            cm360: null,
            selectedGame: null,
            options: null
        }
    }

    calculateCm360 = (game, sensitivity, dpi) => {
        if (game != null && sensitivity >= 0 && dpi >= 0)
            return game.outputFunction(sensitivity, dpi, [])
        else
            return "N/A"
    }

    selectGame = event => {
        let game = games[event.target.value]
        let cm360 = this.calculateCm360(game, this.state.sensitivity, this.state.dpi)
        this.setState({
            selectedGame: game,
            sensitivity: game.defaultSensitivity,
            cm360: cm360
        })
    }

    updateDPI = event => {
        let cm360 = this.calculateCm360(this.state.selectedGame, this.state.sensitivity, event.target.value)
        this.setState({
            dpi: event.target.value,
            cm360: cm360
        })
    }

    updateSensitivity = event => {
        let cm360 = this.calculateCm360(this.state.selectedGame, event.target.value, this.state.dpi)
        this.setState({
            sensitivity: event.target.value,
            cm360: cm360
        })
    }

    render() {
        const { classes, theme, fullScreen } = this.props
        const { selectedGame, dpi, sensitivity, cm360 } = this.state 

        const gameFormSection = (
            <React.Fragment>
                {/* Sensitivity SELECT */}
                <TextField
                    value={sensitivity}
                    label="In-Game Sensitivity"
                    className={classes.input}
                    onChange={this.updateSensitivity}
                    disabled={!selectedGame}
                    InputLabelProps= {{
                        shrink: true
                    }}
                />
            </React.Fragment>
        )

        const outputSection = (
            <div className={classes.outputSection}>
                <Typography variant="title">Output: {cm360}</Typography>                
            </div>
        )

        return(
            <Dialog
                fullScreen={fullScreen}
                open={this.props.open}
                aria-labelledby="edit-profile"
                className={classes.root}
                //onEnter={this.reopened}
            >
                <DialogTitle>Get Sensitivity from Game Settings</DialogTitle>
                <DialogContent>
                    {/* DESCRIPTION */}

                    <form className={classes.container}>
                    {/* GAME SELECT */}
                        <FormControl className={classes.input}>
                            <InputLabel shrink={selectedGame != null}>Select a game</InputLabel>
                            <Select
                                value={selectedGame ? selectedGame.alias : null }
                                onChange={this.selectGame}
                                className={classes.gameSelect}
                            >
                                {gamesWithOutputFunctions.map(game => (<MenuItem value={game.alias}>{game.name}</MenuItem>))}
                            </Select>
                            {!selectedGame && <FormHelperText className={classes.helperText}>Select a game to get started.</FormHelperText>}
                        </FormControl>
                        {/* DPI SELECT */}
                        <TextField
                            value={dpi}
                            label="DPI"
                            className={classes.input}
                            onChange={this.updateDPI}
                        />
                        {/* HIDDEN UNTIL GAME SELECTED */}
                        {selectedGame != null && gameFormSection }
                        {selectedGame != null && outputSection }
                    </form>
                </DialogContent>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dpi: state.profile.settings.dpi.actual,
        open: state.ui.calculator.open,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(withMobileDialog()(CalculationDialog)))