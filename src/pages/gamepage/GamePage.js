import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { render } from 'react-dom';
import { connect } from 'react-redux';
// Material imports
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse'
// Headclick imports
import { games } from '../../model/HcModel';
import * as Symbols from '../../redux/HcSymbols'
import Game from '../../model/Game'
import { isInArray } from '../../util'
import SettingCategory from './components/SettingCategory'
import GameOption from './components/GameOption'
import BigValue from '../../components/BigValue'
import InfoCard from '../../components/InfoCard'
import ComingSoon from '../../components/ComingSoon'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    openPaper: {
        marginTop: theme.spacing.unit
        //padding: theme.spacing.unit * 2,
        //paddingBottom: 0
    },
    subsection: {
        clear: 'both'
    },
    primaryListItem: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        backgroundColor: theme.palette.primary
    },
    sectionHeaderOpen: {
        marginLeft: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
        float: 'left'
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
        padding: theme.spacing.unit
    },
    outputValue: {
        overflow: 'hidden',
        textAlign: 'right'
    }
});

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
            let gameInfo = game.infoFunction(settings)
            return (
                <div className={classes.root}>
                    <Typography variant="display1" gutterBottom>
                        {game.name}
                    </Typography>
                    <Grid container spacing={16}>
                        <Grid item xs={12} lg={6}>
                            <Grid container>
                                <Grid item xs={12} component={Paper}>
                                    <div className={classes.paper}>
                                        {/* MAIN SETTINGS */}
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
                                        <div className={classes.subsection}>
                                            <Collapse 
                                                in={isInArray(this.props.profile.gamesOverriden, game.alias)} 
                                                timeout="auto" 
                                                className={classes.collapse}
                                                unmountOnExit>
                                                <Typography variant="subheading">
                                                    Overrides
                                                </Typography>
                                                <Grid item xs={12} className={classes.innerCollapse}>
                                                        <Grid container>
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
                                            </Collapse>
                                        </div>
                                        {/* OPTIONS SECTION */}
                                        {game.hasOwnProperty("options") &&
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
                                        </div>
                                        }
                                    </div>
                                </Grid>



                                <Grid item xs={12} className={classes.openPaper}>
                                    {/* Main settings */}
                                    <Typography variant="subheading" className={classes.sectionHeaderOpen} gutterBottom>
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
                                    <Grid container>

                                        {
                                            // game.options.map(option =>
                                            //     <Grid item xs={12}>
                                            //         <GameOption 
                                            //         gameAlias={gameAlias} 
                                            //         option={option} 
                                            //         value={this.props.profile.options[gameAlias][option.name]}
                                            //     />
                                            //     </Grid>
                                            // )
                                        }
                                        
                                        {
                                            gameInfo.settings.map(props => 
                                                <Grid item xs={12}>
                                                    <InfoCard
                                                        {...props}
                                                    />
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                            <Typography variant="subheading" gutterBottom>
                                                Output
                                            </Typography>
                                            <Grid container>
                                            {
                                                gameInfo.output.map(item => ([
                                                        <Grid item xs={3}>
                                                            <Typography variant="title">
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>,
                                                        <Grid item xs={3}  className={classes.outputValue}>
                                                            <div className={classes.floatRight}>
                                                                <Typography variant="title">
                                                                    {item.value}
                                                                </Typography>
                                                                <Typography variant="caption" className={classes.floatRight}>
                                                                    {item.valueDescription}
                                                                </Typography>
                                                            </div>
                                                        </Grid>,
                                                        <Grid item xs={3} className={classes.outputValue}>
                                                            <div className={classes.floatRight}>
                                                                <Typography variant="title">
                                                                    {item.desired}
                                                                </Typography>
                                                                <Typography variant="caption" className={classes.floatRight}>
                                                                    desired
                                                                </Typography>
                                                            </div>
                                                        </Grid>,
                                                        <Grid item xs={3} className={classes.outputValue}>
                                                            <div className={classes.floatRight}>
                                                                <Typography variant="title">
                                                                    {item.variance}
                                                                </Typography>
                                                                <Typography variant="caption" className={classes.floatRight}>
                                                                    variance
                                                                </Typography>
                                                            </div>
                                                        </Grid>
                                                ]))
                                            }
                                            </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>   
                                    {/* Other settings */}
                                    <div>
                                        <Paper className={classes.paper}>
                                            <Typography variant="subheading" gutterBottom>
                                                Other Settings
                                            </Typography>
                                            <List subheader={<li />}>
                                                <SettingCategory
                                                    name="Optimization"
                                                    open
                                                    color="neutral"
                                                    settings={game.settings.optimization}
                                                />
                                                <SettingCategory
                                                    name="Gameplay"
                                                    open
                                                    color="neutral"
                                                    settings={game.settings.gameplay}
                                                />
                                            </List>
                                        </Paper>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Stats */}
                        <Grid item xs={12} lg={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="subheading" gutterBottom>
                                    Stats
                                </Typography>
                                <ComingSoon />
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