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
import BigValue from '../../components/BigValue'
import InfoCard from '../../components/InfoCard'
import ComingSoon from '../../components/ComingSoon'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    openPaper: {
        marginTop: theme.spacing.unit
        //padding: theme.spacing.unit * 2,
        //paddingBottom: 0
    },
    primaryListItem: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        backgroundColor: theme.palette.primary
    },
    sectionHeaderOpen: {
        marginLeft: theme.spacing.unit * 2,
        float: 'left'
    },
    overrideSwitch: {
        marginTop: -theme.spacing.unit * 1.5,
        float: 'right',
    },
    overrideText: {
        float: 'left',
        color: '#888888',
        marginTop: '4px'
    },
    floatRight: {
        float: 'right'
    },
    collapse: {
        width: '100%',
    },
    innerCollapse: {
        padding: theme.spacing.unit
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
            return (
                <div className={classes.root}>
                    <Typography variant="title" gutterBottom>
                        {game.name}
                    </Typography>
                    <Grid container spacing={16}>
                        <Grid item xs={12} lg={6}>
                            <Grid container>
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
                                        <Collapse 
                                            in={isInArray(this.props.profile.gamesOverriden, game.alias)} 
                                            timeout="auto" 
                                            className={classes.collapse}
                                            unmountOnExit>
                                            <Grid item xs={12} className={classes.innerCollapse}>
                                                <Paper className={classes.paper}>
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
                                                </Paper>
                                            </Grid>
                                        </Collapse>
                                        {
                                            game.infoFunction(settings).map(props => 
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