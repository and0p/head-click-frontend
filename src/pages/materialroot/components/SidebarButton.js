import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux'
import Icon from 'material-ui/Icon'

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