import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import BigValue from '../../components/BigValue'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }
});

class Dashboard extends React.Component {

    render() {
        const { classes, theme } = this.props;
        return(
            <div className={classes.root}>
                <Typography variant="display3" gutterBottom>Dashboard</Typography>
                <Grid container spacing={24}>
                    {/* Profile card */}
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="subheading" component="h3" gutterBottom>
                                Profile
                            </Typography>
                            <BigValue name="cm/360" color="purple" value={this.props.profile.sensitivity.actual} />
                            <BigValue name="DPI" color="blue" value={this.props.profile.dpi.actual} />
                        </Paper>
                    </Grid>
                    {/* Gear card */}
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="subheading" component="h3" gutterBottom>
                                Gear
                            </Typography>
                        </Paper>
                    </Grid>
                    {/* Stats card */}
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="subheading" component="h3" gutterBottom>
                                Stats
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div> 
        )
    }
}

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
)(withStyles(styles)(Dashboard))