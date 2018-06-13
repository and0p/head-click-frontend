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
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing.unit * 2
        },
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit
        },
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
    },
    featuredImage: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        [theme.breakpoints.up('sm')]: {
            marginLeft: -theme.spacing.unit * 2,
            marginRight: -theme.spacing.unit * 2,
            height: '240px'
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: -theme.spacing.unit,
            marginRight: -theme.spacing.unit,
            height: '180px'
        },
        textShadow: "4px 4px 4px #000000",
        paddingBottom: theme.spacing.unit * 2
    },
    featuredHeadline: {
        display: "table-cell",
        verticalAlign: "bottom",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing.unit * 2,
            height: '240px',
        },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing.unit,
            height: '180px'
        },
    },
    featuredExcerpt: {
        marginTop: theme.spacing.unit * 2,
    }
});

let blogRequested = false
let blogResponse = null
let blogFeaturedResponse = null
let allPosts = null
let featuredPost = null

const featuredBlogSection = props => {
    if(featuredPost != null) {
        return (
            <Grid item xs={12}>
                <Paper className={props.classes.paper}>
                    <Typography variant="subheading" component="h3" gutterBottom>
                        Featured
                    </Typography>
                    <div>
                        <div className={props.classes.featuredImage} style={{backgroundImage: 'url(' + "https://blog.head.click" + featuredPost.feature_image + ")"}}>
                            <div className={props.classes.featuredHeadline}>
                                <a href={"https://blog.head.click/"+ featuredPost.slug} target="_blank">
                                    <Typography variant="headline">{featuredPost.title}</Typography>
                                </a>
                            </div>
                        </div>
                        <div className={props.classes.featuredExcerpt}>
                            <Typography variant="body2">{featuredPost.custom_excerpt} <a href={"https://blog.head.click/"+ featuredPost.slug} target="_blank">Read More...</a></Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>
        )
    }
    else if(featuredPost == "error")
    {
        return (
            <Grid item xs={12}>
                <Paper className={props.classes.paper}>
                    <Typography variant="subheading" component="h3" gutterBottom>
                        Featured
                    </Typography>
                    <Typography variant="body2">Error loading from blog</Typography>
                </Paper>
            </Grid>
        )
    }
    else
    {
        return (
            <Grid item xs={12}>
                <Paper className={props.classes.paper}>
                    <Typography variant="subheading" component="h3" gutterBottom>
                        Featured
                    </Typography>
                    <Typography variant="body2">Loading...</Typography>
                </Paper>
            </Grid>
        )
    }
}

const blogSection = props => {
    if(allPosts != null && allPosts != "error") {
        return (
            <Grid item xs={12}>
                <Paper className={props.classes.paper}>
                    <Typography variant="subheading" component="h3" gutterBottom>
                        Latest Blog Posts
                    </Typography>
                    <List subheader={<li />}>
                        {allPosts.map(post => (
                            <ListItem key={post.id}>
                                <ListItemText
                                primary={post.title}
                                secondary={<span>{post.custom_excerpt} <a href={"https://blog.head.click/"+ post.slug} target="_blank">Read More...</a></span>} 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
        )
    }
    else if (allPosts == "error") {
        return (
            <Grid item xs={12}>
                <Paper className={props.classes.paper}>
                    <Typography variant="subheading" component="h3" gutterBottom>
                        Latest Blog Posts
                    </Typography>
                    <Typography variant="body2">Error loading from blog</Typography>
                </Paper>
            </Grid>
        )
    }
    else
    {
        return (
            <Grid item xs={12}>
                <Paper className={props.classes.paper}>
                    <Typography variant="subheading" component="h3" gutterBottom>
                        Latest Blog Posts
                    </Typography>
                    <Typography variant="body2">Loading...</Typography>
                </Paper>
            </Grid>
        )
    }
}

class Dashboard extends React.Component {
    constructor(props){
        super(props)
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
                .then(response => { blogResponse = response; this.populateBlogContent() })
                .catch(error => console.log(error))
            axios.get('https://blog.head.click/ghost/api/v0.1/posts/', {
                params: {
                    client_id: 'ghost-frontend',
                    client_secret: 'f8dee5ed9d9d',
                    limit: '1',
                    filter: "featured:true",
                    fields: "id, title, slug, feature_image, featured, custom_excerpt"
                }})
                .then(response => { blogFeaturedResponse = response; this.populateBlogContent() })
                .catch(error => console.log(error))
            blogRequested = true
        }
    }

    populateBlogContent = () => {
        // Make sure both have returned
        if(blogResponse != null && blogFeaturedResponse != null) {
            allPosts = blogResponse.data.posts
            // See if we got a featured post back at all
            if(blogFeaturedResponse.data.posts.length > 0)
            {
                featuredPost = blogFeaturedResponse.data.posts[0]
                // Strip that post out of the other post list, and cap total at 5
                allPosts = allPosts.filter(post => post.id != featuredPost.id).slice(0, 4)
            }
            // Set the rest of the blog content
            let blogContent = (
                <List subheader={<li />}>
                {allPosts.map(post => (
                    <ListItem key={post.id}>
                        <ListItemText primary={post.title} secondary={<span>{post.custom_excerpt} <a href={"https://blog.head.click/"+ post.slug} target="_blank">Read More...</a></span>} />
                    </ListItem>
                ))}
                </List>
            )
            // Clear responses from memory
            blogResponse = null
            blogFeaturedResponse = null
            // Update the state
            this.setState({test: 0})
        }
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
                            {/* Featured Blog */}
                            {featuredBlogSection(this.props)}
                            {/* Blog */}
                            {blogSection(this.props)}
                            {/* development warning card */}
                            <Grid item xs={12}>
                                <div className={classes.messageBoxContainer}>
                                    <MessageBox>{copy["en"].misc.versionWarning}</MessageBox>
                                </div>
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