import React from 'react'
import { render } from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        border: '1px solid ' + theme.palette.custom.subtle,
        textAlign: 'center',
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit,
    },
    alignCenter: {
        textAlign: 'center',
        color: theme.palette.custom.subtle
    },
    alignLeft: {
        textAlign: 'left',
        color: theme.palette.custom.subtle
    }
});

const MessageBox = props => {
    const { classes, theme } = props;
    return(
        <div className={classes.root}>
            <Typography variant="body1" className={props.align == "center" ? classes.alignCenter : classes.alignLeft}>
                {props.children}
            </Typography>
        </div>
    )
}

export default withStyles(styles)(MessageBox)