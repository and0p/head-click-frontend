import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { games } from '../../model/HcModel';
import Game from '../../model/Game'
import SettingListItem from './components/SettingListItem'
// Material imports
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    primaryPaper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        backgroundColor: '#8941af'
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
                    <Typography variant="display3" gutterBottom>
                        {game.name}
                    </Typography>
                    <Grid container spacing={24}>
                        {/* Sensitivity card */}
                        <Grid item xs={12} md={6}>
                            <Paper className={classes.paper}>
                                {/* Main settings */}
                                <Typography variant="display1" component="h3" gutterBottom>
                                Settings
                                </Typography>
                                <Divider /><br />
                                <Typography variant="headline">
                                    Sensitivity:{" "}
                                    {game.getSettingForDCm(this.props.profile).toFixed(2)}
                                </Typography>
                                <Typography variant="headline">
                                    Field of View:{" "}
                                    {game.getIdealFOV(this.props.profile)}
                                </Typography><br />
                                {/* Other settings */}
                                <List subheader={<li />}>
                                    {
                                        game.settings.optimization.map((setting) => 
                                            <SettingListItem setting={setting} />
                                        )
                                    }
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="headline" component="h3">
                                Stats
                                </Typography>
                                <Typography variant="body2">
                                    {game.getSettingForDCm(this.props.profile).toFixed(2)}
                                </Typography>
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
      profile: state.profileState
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