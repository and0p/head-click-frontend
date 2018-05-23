import React from 'react';
import { render } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
    root: {
        float: 'right',
        marginRight: theme.spacing.unit * 2
    },
    icon: {
        "&:hover": {
            color: '#FFFFFF'
        },
        transition: "all ease .3s",
        color: '#888888'
    }
})

const EditIcon = props =>
{
    const { classes, theme } = props
    return (
        <div className= {classes.root} onClick={props.onClick}>
            <Icon className={classes.icon}>create</Icon>
        </div>
    )
}

export default withStyles(styles)(EditIcon)