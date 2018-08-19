import React from 'react';
import { render } from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
    root: {
        float: 'right',
        //marginRight: theme.spacing.unit * 2
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
            <Typography style={{float:"left", marginRight: "8px", marginTop: "2px", color: "#888888", cursor: "pointer" }} variant="button">EDIT</Typography><Icon className={classes.icon}>create</Icon>
        </div>
    )
}

export default withStyles(styles)(EditIcon)