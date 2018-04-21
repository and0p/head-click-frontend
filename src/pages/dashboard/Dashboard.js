import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import InfoCard from '../../components/InfoCard'
import ProfileEditDialog from '../../components/ProfileEditDialog'
import ComingSoon from '../../components/ComingSoon'
import constants from '../../constants'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    pageHeader: {
        marginBottom: theme.spacing.unit * 2
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    sectionHeaderOpen: {
        marginLeft: theme.spacing.unit * 2
    },
    profileCard: {
        //paddingBottom: theme.spacing.unit
    }
});

class Dashboard extends React.Component {

    render() {
        const { classes, theme } = this.props;
        if(this.props.profile.ready)
        return(
            <div className={classes.root}>
                <Typography variant="title" className={classes.pageHeader}>Dashboard</Typography>
                <Grid container spacing={16}>
                    {/* Profile card */}
                    <Grid item xs={12} className={classes.profileCard}>
                        <Typography variant="subheading" component="h3" className={classes.sectionHeaderOpen} gutterBottom>
                            Profile
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} lg={4}>
                                <InfoCard name={constants.cm360Text} value={this.props.profile.sensitivity.actual} icon='settings_ethernet' color="purple"/>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InfoCard name="DPI" value={this.props.profile.dpi.actual} icon='mouse' color="blue"/>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InfoCard name="Resolution" value={this.props.profile.monitor.name} icon='settings_overscan' color="teal"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* Edit profile dialog */}
                    <ProfileEditDialog />
                    {/* Gear card */}
                    <Grid item xs={12} xl={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="subheading" component="h3" gutterBottom>
                                Gear
                            </Typography>
                            <ComingSoon />
                        </Paper>
                    </Grid>
                    {/* Stats card */}
                    <Grid item xs={12} xl={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="subheading" component="h3" gutterBottom>
                                Stats
                            </Typography>
                            <ComingSoon />
                        </Paper>
                    </Grid>
                </Grid>
            </div> 
        )
        else
        return(
            <div />
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