import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
    subtle: {
        color: '#888888'
    }
})

const activeStyle = theme => ({
    borderLeft: 'solid 4px #8B41B0',
    paddingLeft: '20px'
})

class SidebarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, theme } = this.props;
        let icon = <ListItemIcon><Icon>{this.props.icon}</Icon></ListItemIcon>
        if(this.props.link.startsWith("http"))
        {
            return(
                <ListItem component={this.props.enabled ? 'a' : 'ul'} href={this.props.link} target="_blank" button>
                    {this.props.hasOwnProperty("image") ? this.props.image : icon}
                    <ListItemText className={classes.subtle} primary={this.props.text} />
                </ListItem>
            )
        }
        else
        {
            return(
                <ListItem component={this.props.enabled ? NavLink : 'ul'} exact activeStyle={activeStyle(theme)} to={this.props.link} button onClick={this.props.innerClick}>
                    {this.props.hasOwnProperty("image") ? this.props.image : icon}
                    <ListItemText className={classes.subtle} primary={this.props.text} />
                </ListItem>
            )
        }
    }
}

const mapStateToProps = state => {
    return { }
}

const mapDispatchToProps = dispatch => {
    return { }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(SidebarButton))