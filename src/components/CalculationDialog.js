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
import Icon from '@material-ui/core/Icon'
import { games, gamesWithOutputFunctions } from '../model/HcModel'
import * as Symbols from '../redux/HcSymbols'
import copy from '../copy'
import { isNumber } from 'util';

const styles = theme => ({
    root: {
    },
    container: {
        //display: 'flex',
        //flexWrap: 'wrap',
    },
    gameSelect: {
        minWidth: '350px'
    },
    input: {
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        //minWidth: '250px'
    },
    descriptionText: {
        marginBottom: theme.spacing.unit * 2
    },
    helperText: {
        color: theme.palette.custom.teal
    },
    outputSection: {
        marginTop: theme.spacing.unit * 2,
        clear: "both"
    },
    outputCaption: { 
        lineHeight: "1.8em"
    },
    comparisonSection: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: "auto",
        marginRight: "auto"
    },
    comparisonInput: {
        width: "150px"
    },
    swapIcon: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit * 2,
        color: "white"
    }
})

class CalculationDialog extends React.Component {
    constructor(props) {
        super(props)
        let game = props.initialGame
        this.state = {
            dpi: props.settings.dpi.actual,
            sensitivity: game != null ? game.defaultSensitivity : "N/A",
            cm360: game != null ? game.getCm360(game, props.dpi, game.options) : "N/A",
            selectedGame: game,
            options: game != null ? game.options : null
        }
    }

    reopened = () => {
        this.setState({
            selectedGame: this.props.initialGame,
            dpi: this.props.settings.dpi.actual
        })
    }

    calculateCm360 = (game, sensitivity, dpi) => {
        if (game != null && sensitivity >= 0 && sensitivity != "" && dpi >= 0 && dpi != "")
            return game.getCm360(sensitivity, dpi, null)
        else
            return "N/A"
    }

    selectGame = event => {
        let game = games[event.target.value]
        let cm360 = this.calculateCm360(game, game.defaultSensitivity, this.state.dpi)
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

    updateCm360 = event => {
        let sensitivity = 0
        let cm360 = parseFloat(event.target.value)
        if(this.state.selectedGame != null && this.state.dpi >= 0 && this.state.dpi != "" && cm360 > 0 && isNumber(cm360))
            sensitivity = this.state.selectedGame.getSensitivity(parseFloat(event.target.value), this.state.dpi, null)
        else
            sensitivity = "N/A"
        this.setState({
            cm360: event.target.value,
            sensitivity: sensitivity
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
                    onClose={this.props.close}
                    disabled={!selectedGame}
                    InputLabelProps= {{
                        shrink: true
                    }}
                />
            </React.Fragment>
        )

        const outputSection = (
            <div className={classes.outputSection}>
                <Typography variant="subheading">Output: {cm360} {!isNaN(cm360) && copy["en"].technical.cm360}</Typography>
                <Typography variant="caption" className={classes.outputCaption}>Recommended: {this.props.recommendedSensitivity} {copy["en"].technical.cm360}</Typography>
            </div>
        )

        const comparisonSection = (
            <div className={classes.comparisonSection}>
                <TextField
                    value={sensitivity}
                    label="In-Game Sensitivity"
                    className={classes.comparisonInput}
                    onChange={this.updateSensitivity}
                    InputLabelProps= {{
                        shrink: true
                    }}
                />
                <Icon className={classes.swapIcon}>swap_horiz</Icon>
                <TextField
                    value={cm360}
                    label="Output cm/360°"
                    className={classes.comparisonInput}
                    onChange={this.updateCm360}
                    InputLabelProps= {{
                        shrink: true
                    }}
                />
            </div>
        )

        return(
            <Dialog
                fullScreen={fullScreen}
                open={this.props.open}
                aria-labelledby="edit-profile"
                className={classes.root}
                onEnter={this.reopened}
            >
                <DialogTitle>Get Sensitivity from Game Settings</DialogTitle>
                <DialogContent>
                    {/* DESCRIPTION */}
                    {/* <DialogContentText>
                        {copy["en"].technical.calculator.description}
                    </DialogContentText> */}
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
                            InputLabelProps= {{
                                shrink: true
                            }}
                        />
                        {/* HIDDEN UNTIL GAME SELECTED */}
                        {selectedGame != null && comparisonSection }
                    </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.close} color="primary">
                    Close
                </Button>
                <Button onClick={() => this.props.apply(cm360, dpi)} color="primary" disabled={isNaN(cm360) || cm360 > 100000}>
                    Apply to profile
                </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.profile.settings,
        open: state.ui.calculator.open,
        recommendedSensitivity: state.profile.settings.sensitivity.recommended,
        initialGame: state.ui.calculator.initialGame,
        ownedGames: state.profile.ownedGames
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        apply: (sensitivity, dpi) => dispatch({
            type: Symbols.APPLY_CALCULATOR,
            value: { sensitivity, dpi }
          }),
        close: () => dispatch({
            type: Symbols.CLOSE_CALCULATOR,
          }),
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(withMobileDialog()(CalculationDialog)))