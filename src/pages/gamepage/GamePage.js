import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { games } from '../../model/HcModel';
import Game from '../../model/Game'
import SettingCategory from './components/SettingCategory'
//import SettingListItem from './components/SettingListItem'
// Material imports
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
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
        //padding: theme.spacing.unit * 2,
        //paddingBottom: 0
    },
    primaryListItem: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        backgroundColor: theme.palette.primary
    },
    sectionHeaderOpen: {
        marginLeft: theme.spacing.unit * 2
    }
  });

class GamePage extends React.Component {
   
    render() {
        const { classes, theme } = this.props;

        let gameAlias = this.props.match.params.name
        // See if we have this game
        if(games.hasOwnProperty(gameAlias)) {
            // Grab Game object
            let game = new Game(games[gameAlias])
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
                                    <Grid container>
                                            <Grid item xs={12}>
                                                <InfoCard 
                                                    name="Sensitivity"
                                                    value={game.getSettingForDCm(this.props.profile).toFixed(2)}
                                                    color="purple"
                                                    icon='settings_ethernet'
                                                /> 
                                            </Grid>
                                            <Grid item xs={12}>
                                            <InfoCard
                                                name="FOV"
                                                value={game.getIdealFOV(this.props.profile)} 
                                                color="blue"
                                                icon='videocam'
                                            />
                                            </Grid>
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

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(GamePage))