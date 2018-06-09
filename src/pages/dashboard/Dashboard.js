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
        [theme.breakpoints.between('md', 'lg')]: {
            maxWidth: '784px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: -theme.spacing.unit,
            paddingRight: theme.spacing.unit
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

let blogRequested = false
let blogContent = <div/>
let featuredBlogContent = <div/>
let blogResponse = null
let blogFeaturedResponse = null

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = { blogContent: blogContent, featuredBlogContent: featuredBlogContent }
        // Grab blog content
        if(!blogRequested) {
            // Grab 6 latest blog posts
            axios.get('https://blog.head.click/ghost/api/v0.1/posts/', {
                params: {
                    client_id: 'ghost-frontend',
                    client_secret: 'f8dee5ed9d9d',
                    limit: '6',
                    fields: "id, title, slug, featured, custom_excerpt"
                }})
                .then(response => { console.log(response); blogResponse = response; this.populateBlogContent(response) })
                .catch(error => console.log(error))
            axios.get('https://blog.head.click/ghost/api/v0.1/posts/', {
                params: {
                    client_id: 'ghost-frontend',
                    client_secret: 'f8dee5ed9d9d',
                    limit: '1',
                    filter: "featured:true",
                    fields: "title, slug, feature_image, featured, custom_excerpt"
                }})
                .then(response => { console.log(response); blogResponse = response; this.populateFeaturedBlogContent(response) })
                .catch(error => console.log(error))
            blogRequested = true
        }
    }

    populateBlogContent = response => {
        blogContent = (
            <List subheader={<li />}>
            {response.data.posts.map(post => (
                <ListItem key={post.id}>
                    <ListItemText primary={post.title} secondary={<span>{post.custom_excerpt} <a href={"https://blog.head.click/"+ post.slug} target="_blank">Read More...</a></span>} />
                </ListItem>
            ))}
            </List>
        )
        this.setState({blogContent: blogContent})
    }

    populateFeaturedBlogContent = response => {
        if(response.data.posts.length > 0) {
            let post = response.data.posts[0]
            featuredBlogContent = (
                <List subheader={<li />}>
                    <ListItem key={post.id}>
                        <ListItemText primary={post.title} secondary={<span>{post.custom_excerpt} <a href={"https://blog.head.click/"+ post.slug} target="_blank">Read More...</a></span>} />
                    </ListItem>
                </List>)
        }
        else {

        }
        this.setState({featuredBlogContent: featuredBlogContent})
    }

    populateBlogError = error => {
        
    }

    render() {
        const { classes, theme } = this.props;
        if(this.props.profile.ready)
        return(
            <div className={classes.root}>
                <Typography variant="display1" className={classes.pageHeader}>
                     Dashboard
                </Typography>
                <Grid container spacing={spacing} className={classes.rootGridContainer}>
                    {/* LEFT COLUMN  */}
                    <Grid item xs={12} xl={6}>
                        <Grid container spacing={spacing}>
                            {/* Profile card */}
                            <Grid item xs={12} className={classes.profileCard}>
                                <Typography variant="subheading" component="h3" className={classes.sectionHeaderOpen} gutterBottom>
                                    Profile
                                </Typography>
                                <EditIcon onClick={this.props.editProfile}/>
                                <Grid container spacing={spacing}>
                                    <Grid item xs={12}>
                                        <InfoCard name={constants.cm360Text} value={this.props.profile.settings.sensitivity.actual} icon='settings_ethernet' color="purple"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InfoCard name="DPI" value={this.props.profile.settings.dpi.actual} icon='mouse' color="blue"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InfoCard name="Resolution" value={this.props.profile.settings.monitor.name} icon='settings_overscan' color="teal"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* Gear card */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography variant="subheading" component="h3" gutterBottom>
                                        Gear
                                    </Typography>
                                    <ComingSoon />
                                </Paper>
                            </Grid>
                            {/* Stats card */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography variant="subheading" component="h3" gutterBottom>
                                        Stats
                                    </Typography>
                                    <ComingSoon />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* RIGHT COLUMN  */}
                    <Grid item xs={12} xl={6}>
                        <Grid container spacing={spacing}>
                            {/* development warning card */}
                            <Grid item xs={12}>
                                <div className={classes.messageBoxContainer}>
                                    <MessageBox>{copy["en"].misc.versionWarning}</MessageBox>
                                </div>
                            </Grid>
                            {/* Featured Blog */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography variant="subheading" component="h3" gutterBottom>
                                        Featured
                                    </Typography>
                                    {this.state.featuredBlogContent}
                                </Paper>
                            </Grid>
                            {/* Blog */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography variant="subheading" component="h3" gutterBottom>
                                        Latest Blog Posts
                                    </Typography>
                                    {this.state.blogContent}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <ProfileEditDialog />
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