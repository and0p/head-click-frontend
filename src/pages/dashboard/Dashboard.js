import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import InfoCard from '../../components/InfoCard'
import EditIcon from '../../components/EditIcon'
import ProfileEditDialog from '../../components/ProfileEditDialog'
import ComingSoon from '../../components/ComingSoon'
import constants from '../../constants'
import MessageBox from '../../components/MessageBox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListSubheader from '@material-ui/core/ListSubheader'
import Icon from '@material-ui/core/Icon'
import copy from '../../copy'
import axios from 'axios'
import * as Symbols from '../../redux/HcSymbols'

const spacing = 8

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    rootGridContainer: {
        [theme.breakpoints.down('lg')]: {
            maxWidth: '784px',
            margin: 'auto'
        }
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
        marginLeft: theme.spacing.unit * 2,
        float: 'left'
    },
    profileCard: {
        //paddingBottom: theme.spacing.unit
    },
    messageBoxContainer: {
        margin: -spacing
    }
});

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state= { blogContent: <div/>}
        axios.get('https://blog.head.click/ghost/api/v0.1/posts/', {
            params: {
                client_id: 'ghost-frontend',
                client_secret: 'f8dee5ed9d9d',
                limit: '5'
            }})
            .then(response => {console.log(response); this.populateBlogContent(response)})
            .catch(error => console.log("blog request bad"))
    }

    populateBlogContent = response => {
        let blogContent = (
            <List subheader={<li />}>
            {response.data.posts.map(post => (
                <ListItem key={post.id}>
                    <ListItemText primary={post.title} secondary={post.custom_excerpt} />
                </ListItem>
            ))}
            </List>
        )
        this.setState({blogContent: blogContent})
    }

    render() {
        const { classes, theme } = this.props;
        if(this.props.profile.ready)
        return(
            <div className={classes.root}>
                <Typography variant="display1" className={classes.pageHeader}>
                     Dashboard
                </Typography>
                <Grid container spacing={spacing}>
                    {/* Profile card */}
                    <Grid item xs={12} className={classes.profileCard}>
                        <Typography variant="subheading" component="h3" className={classes.sectionHeaderOpen} gutterBottom>
                            Profile
                        </Typography>
                        <EditIcon onClick={this.props.editProfile}/>
                        <Grid container spacing={spacing}>
                            <Grid item xs={12} lg={4}>
                                <InfoCard name={constants.cm360Text} value={this.props.profile.settings.sensitivity.actual} icon='settings_ethernet' color="purple"/>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InfoCard name="DPI" value={this.props.profile.settings.dpi.actual} icon='mouse' color="blue"/>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InfoCard name="Resolution" value={this.props.profile.settings.monitor.name} icon='settings_overscan' color="teal"/>
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
                    <Grid item xs={12} xl={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="subheading" component="h3" gutterBottom>
                                Blog
                            </Typography>
                            {this.state.blogContent}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <div className={classes.messageBoxContainer}>
                            <MessageBox>{copy["en"].misc.versionWarning}</MessageBox>
                        </div>
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
        editProfile: () => dispatch({
            type: Symbols.START_EDIT_PROFILE
        })
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard))