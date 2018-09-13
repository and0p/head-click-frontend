import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { games, gamesWithOutputFunctions } from '../model/HcModel'
import * as Symbols from '../redux/HcSymbols'

const styles = theme => ({
    root: {
    },
    gameSelect: {
        minWidth: '400px'
    },
    input: {
        marginBottom: theme.spacing.unit * 2,
        minWidth: '250px'
    },
})

class CalculationDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dpi: props.dpi,
            sensitivitySetting: null,
            cm360: null,
            selectedGame: null,
            options: null
        }
    }

    selectGame = event => {
        this.setState({
            selectedGame: games[event.target.value]
        })
    }

    updateDPI = event => {
        if(event.target.value > 0)
            this.setState({
                dpi: event.target.value
            })
    }

    render() {
        const { classes, theme, fullScreen } = this.props
        console.log(this.state.selectedGame)
        return(
            <Dialog
                fullScreen={fullScreen}
                open={this.props.open}
                aria-labelledby="edit-profile"
                className={classes.root}
                //onEnter={this.reopened}
            >
                <DialogTitle>Calculate sensitivity via game settings</DialogTitle>
                <DialogContent>
                    {/* GAME SELECT */}
                    <FormControl className={classes.input}>
                        <InputLabel htmlFor="game-select">Select a game</InputLabel>
                        <Select
                            value={this.state.selectedGame ? this.state.selectedGame.alias : null }
                            onChange={this.selectGame}
                            inputProps={{
                                name: 'game-select',
                                id: 'game-select',
                            }}
                            className={classes.gameSelect}
                        >
                            {gamesWithOutputFunctions.map(game => (<MenuItem value={game.alias}>{game.name}</MenuItem>))}
                        </Select>
                    </FormControl>
                    {/* DPI SELECT */}
                    <TextField
                        value={this.state.dpi}
                        label="DPI"
                        className={classes.input}
                        type="number"
                        onChange={this.updateDPI}
                    />
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