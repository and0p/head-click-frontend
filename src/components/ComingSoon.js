import React from 'react'
import { render } from 'react-dom'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = theme => ({
    root: {
        width: '100%'
    },
    text: {
        textAlign: 'center',
        color: '#888888'
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