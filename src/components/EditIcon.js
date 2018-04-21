import React from 'react';
import { render } from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon'

const styles = theme => ({
    root: {
        float: 'right'
    }
})

const EditIcon = props =>
{
    const { classes, theme } = this.props
    return (
        <div className= {classes.root}>
         hi
        </div>
    )
}

export default withStyles(styles)(EditIcon)