import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { connect } from 'react-redux'

class SidebarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ListItem component={Link} to={this.props.link} button onClick={this.props.innerClick}>
                <ListItemIcon>
                    {this.props.icon}
                </ListItemIcon>
                <ListItemText primary={this.props.text} secondary={this.props.subtext} />
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
  )(SidebarButton)