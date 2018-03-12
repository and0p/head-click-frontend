import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import HcModel from '../hc-model/HcModel';
import { getSettingForDCm } from '../util'
// Material imports
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class GamePage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { classes, theme } = this.props;

        let gameAlias = this.props.match.params.name
        // See if we have this game
        if(HcModel.games.hasOwnProperty(gameAlias)) {
            let game = HcModel.games[gameAlias]
            return (
                <div className={classes.root}>
                    <Typography variant="display3" gutterBottom>
                        {game.name}
                    </Typography>
                    <Grid container spacing={24}>
                        {/* Sensitivity card */}
                        <Grid item sm={12} md={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="headline" component="h3">
                                Settings
                                </Typography>
                                <Typography variant="body2">
                                    {getSettingForDCm(game, this.props.profile, this.props.profile.sensitivity).toFixed(2)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Paper className={classes.paper}>
                                <Typography variant="headline" component="h3">
                                Settings
                                </Typography>
                                <Typography variant="body2">
                                    {getSettingForDCm(game, this.props.profile, this.props.profile.sensitivity).toFixed(2)}
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