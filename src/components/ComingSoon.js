import React from 'react'
import { render } from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        width: '100%'
    },
    text: {
        textAlign: 'center',
        color: theme.palette.custom.subtle
    }
});

const ComingSoon = props => {
    const { classes, theme } = props;
    return(
        <div className= {classes.root}>
            <Typography variant="body2" className={classes.text}>
                COMING SOON
            </Typography>
        </div>
    )
}

export default withStyles(styles)(ComingSoon)