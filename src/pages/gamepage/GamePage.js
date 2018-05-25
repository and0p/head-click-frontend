import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { render } from 'react-dom';
import { connect } from 'react-redux';
// Material imports
import TextField from '@material-ui/core/TextField';
import Input, { InputLabel, InputAdornment } from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch'
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// Headclick imports
import { games } from '../../model/HcModel';
import * as Symbols from '../../redux/HcSymbols'
import Game from '../../model/Game'
import { isInArray, getRounded, replaceSettingsArrows } from '../../util'
import SettingCategory from './components/SettingCategory'
import GameOption from './components/GameOption'
import BigValue from '../../components/BigValue'
import InfoCard from '../../components/InfoCard'
import ComingSoon from '../../components/ComingSoon'
import * as Copy from '../../copy'

const styles = theme => ({
    root: {
      flexGrow: 1,
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   boxSizing: 'border-box'
    },
    paper: {
      padding: theme.spacing.unit,
      textAlign: 'left',
      //color: theme.palette.text.secondary,
    },
    openPaper: {
        marginTop: theme.spacing.unit
        //padding: theme.spacing.unit * 2,
        //paddingBottom: 0
    },
    subsection: {
        clear: 'both',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    overrideSwitch: {
        marginTop: -theme.spacing.unit * 1.5,
        float: 'right',
        marginBottom: -theme.spacing.unit - 1,
        marginRight: -theme.spacing.unit * 1.5
    },
    overrideText: {
        float: 'left',
        color: '#888888',
        marginTop: '4px'
    },
    floatLeft: {
        float: 'left'
    },
    floatRight: {
        float: 'right'
    },
    collapse: {
        width: '100%',
    },
    innerCollapse: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    setting: {
        paddingLeft: theme.spacing.unit,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        minHeight: '48px'
    },
    settingName: {
        float: 'left',
        maxWidth: '60%'
    },
    settingDescription: {
        lineHeight: '1em',
        color: theme.palette.custom.subtle,
    },
    settingText: {
        fontWeight: 300
    },
    settingValue: {
        float: 'right'
    },
    outputValue: {
        overflow: 'hidden',
        textAlign: 'right'
    },
    clear: {
        clear: 'both'
    }
});

const spacing = 16

class GamePage extends React.Component {

    toggleOverride = gameName => event => {
        this.props.setOverride(event.target.checked, gameName)
      };

    handleOverrideChange = (override, gameName) => event => {
        this.props.updateOverride(override, event.target.value, gameName)
    };
   
    render() {
        const { classes, theme } = this.props;

        let gameAlias = this.props.match.params.name
        // See if we have this game
        if(games.hasOwnProperty(gameAlias)) {
            // Grab Game object
            let game = new Game(games[gameAlias])
            // See if we're overriding the profile at all and use overrides if so
            let settings = null
            if(isInArray(this.props.profile.gamesOverriden, gameAlias))
                settings = this.props.profile.overrides[gameAlias]
            else
                settings = this.props.profile.settings
            let gameInfo = game.infoFunction(settings, this.props.profile.options[gameAlias])
            return (
                <div className={classes.root}>
                    <Typography variant="display1" gutterBottom>
                        {game.name}
                    </Typography>
                    <Grid container spacing={spacing}>
                        <Grid item xs={12} lg={6}> {/* LEFT DIVISION */}
                            <Paper className={classes.paper}>{/* AIM SETTINGS */}
                                <div className={classes.paper}>
                                    <Typography variant="title" className={classes.floatLeft} gutterBottom paragraph>
                                        Aim Settings
                                    </Typography>
                                    <div className={classes.floatRight}>
                                        <Typography variant="button" className={classes.overrideText}>Override</Typography>
                                        <Switch
                                            checked={isInArray(this.props.profile.gamesOverriden, game.alias)}
                                            onChange={this.toggleOverride(game.alias)}
                                            className={classes.overrideSwitch}
                                        />
                                    </div>
                                    {/* OVERRIDE SECTION */}
                                    <Collapse 
                                    in={isInArray(this.props.profile.gamesOverriden, game.alias)} 
                                    timeout="auto" 
                                    className={classes.collapse}
                                    unmountOnExit>
                                        <div className={classes.subsection}>
                                            <Typography variant="subheading">
                                                Overrides
                                            </Typography>
                                            <Grid item xs={12} className={classes.innerCollapse}>
                                                    <Grid container spacing={spacing}>
                                                        <Grid item xs={6} md={3}>
                                                            <TextField
                                                                id="name"
                                                                label="Desired cm/360"
                                                                //className={classes.textField}
                                                                value={settings.sensitivity.actual}
                                                                onChange={this.handleOverrideChange('cm360', game.alias)}
                                                                margin="dense"
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} md={3}>
                                                            <TextField
                                                                id="name"
                                                                label="DPI"
                                                                //className={classes.textField}
                                                                value={settings.dpi.actual}
                                                                onChange={this.handleOverrideChange('dpi', game.alias)}
                                                                margin="dense"
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                    </Grid>
                                            </Grid>
                                        </div>
                                        <Divider/>
                                    </Collapse>
                                    {/* OPTIONS SECTION */}
                                    {game.hasOwnProperty("options") && game["options"].length > 0 && [
                                    <div className={classes.subsection}>
                                        <Typography variant="subheading">
                                            Options
                                        </Typography>
                                        {game.options.map(option =>
                                            <Grid item xs={12}>
                                                <GameOption 
                                                gameAlias={gameAlias} 
                                                option={option} 
                                                value={this.props.profile.options[gameAlias][option.name]}
                                                />
                                            </Grid>
                                        )
                                        }
                                    </div>,
                                    <Divider/>]
                                    }
                                    {/* IN-GAME SETTINGS */}
                                    <div className={classes.subsection}>
                                        <Typography variant="subheading">
                                            In-Game Settings
                                        </Typography>
                                        {gameInfo.settings.map(item => ([
                                            <div className={classes.clear}>
                                                <div className={classes.setting}>
                                                    <div className={classes.settingName}>
                                                        <Typography variant="headline" className={classes.settingText}>{item.name}</Typography>
                                                        <Typography variant="caption" className={classes.settingDescription}>{replaceSettingsArrows(item.subtext)}</Typography>
                                                    </div>
                                                    <div className={classes.settingValue}>
                                                        <Typography variant="display1" className={classes.settingText}>{item.value}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        ]))}
                                    </div>
                                    <Divider />
                                    {/* OUTPUT SETTINGS */}
                                    <div className={classes.subsection}>
                                        <Typography variant="subheading">
                                            Output
                                        </Typography>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell padding="dense">View</TableCell>
                                                    <TableCell padding="dense">Zoom</TableCell>
                                                    <TableCell padding="dense">FOV</TableCell>
                                                    <TableCell padding="dense">{Copy.cm360}</TableCell>
                                                    <TableCell padding="dense">Ideal</TableCell>
                                                    <TableCell padding="dense">Variance</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {gameInfo.output.map(output => (
                                                <TableRow>
                                                    <TableCell padding="dense">{output.name}</TableCell>
                                                    <TableCell padding="dense">{getRounded(output.zoom, 2)}</TableCell>
                                                    <TableCell padding="dense">{output.fov}</TableCell>
                                                    <TableCell padding="dense">{output.cm360}</TableCell>
                                                    <TableCell padding="dense">{output.ideal}</TableCell>
                                                    <TableCell padding="dense">{output.variance}%</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>




                        {/* Stats */}
                        <Grid item xs={12} lg={6}> {/* RIGHT DIVISION */}
                                <Paper className={classes.paper}>{/* STATS */}
                                    <div className={classes.paper}>
                                        <Typography variant="title" className={classes.floatLeft} gutterBottom paragraph>
                                            Stats
                                        </Typography>
                                        <div className={classes.subsection}>
                                            <ComingSoon />
                                        </div>
                                    </div>
                                </Paper>
                        </Grid>
                    </Grid>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    Game not found!
                </div>
            )
        }

    }
}

GamePage.propTypes = {
    
};

const mapStateToProps = (state) => {
    return {
      profile: state.profile
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        setOverride: (overriden, gameName) => dispatch({
            type: Symbols.SET_GAME_OVERRIDE,
            value: {
                set: overriden,
                gameName: gameName
            }
        }),
        updateOverride: (override, value, gameName) => dispatch({
            type: Symbols.UPDATE_GAME_OVERRIDE,
            value: {
                override: override,
                value: value,
                gameName: gameName
            }
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(GamePage))