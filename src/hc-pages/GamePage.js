import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import HcModel from '../hc-model/HcModel';
import { getSettingForDCm } from '../util'
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  });

class GamePage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let gameAlias = this.props.match.params.name
        // See if we have this game
        if(HcModel.games.hasOwnProperty(gameAlias)) {
            let game = HcModel.games[gameAlias]
            return (
                <div className={this.props.classes.root}>
                    <Typography variant="display3" gutterBottom>
                        {game.name}
                    </Typography>
                    {/* Sensitivity card */}
                    <Paper className={this.props.classes.paper}>
                        <Typography variant="headline" component="h3">
                        Settings
                        </Typography>
                        <Typography variant="body2">
                            {getSettingForDCm(game, this.props.profile, this.props.profile.sensitivity).toFixed(2)}
                        </Typography>
                    </Paper>
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
)(withStyles(styles, { withTheme: true })(GamePage))