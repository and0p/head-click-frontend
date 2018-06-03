import React from 'react'
import { render } from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        border: '1px solid ' + theme.palette.custom.subtle,
        textAlign: 'center',
        padding: theme.spacing.unit * 2
    }
});

const MessageBox = props => {
    const { classes, theme } = props;
    return(
        <div className= {classes.root}>
            <Typography variant="body2" className={classes.text}>
                {props.children}
            </Typography>
        </div>
    )
}

export default withStyles(styles)(MessageBox)