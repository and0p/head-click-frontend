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
            <Link to={this.props.link} onClick={this.props.innerClick}>
                <ListItem button>
                <ListItemIcon>
                   {this.props.icon}
                </ListItemIcon>
                <ListItemText primary={this.props.text} secondary={this.props.subtext} />
                </ListItem>
            </Link>
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