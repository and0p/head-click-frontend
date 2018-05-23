import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import Icon from '@material-ui/core/Icon'

const styles = theme => {
    subtle: {
        color: '#888888'
    }
}

class SidebarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, theme } = this.props;
        let icon = <ListItemIcon><Icon>{this.props.icon}</Icon></ListItemIcon>
        return(
            <ListItem component={this.props.enabled ? Link : 'ul'} to={this.props.link} button onClick={this.props.innerClick}>
                {this.props.hasOwnProperty("image") ? this.props.image : icon}
                <ListItemText className={classes.subtle} primary={this.props.text} />
            </ListItem>
        );
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