import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
import { gradients } from "../../../theme"
import classNames from 'classnames'

const styles = theme => ({
    root: {
        width: "100%",
        height: "75px",
        //padding: theme.spacing.unit,
        border: "1px solid " + theme.palette.custom.yellow
    },
    innerRoot: {
        padding: theme.spacing.unit
    },
    yellowText: {
        color: theme.palette.custom.yellow
    },
})

class VerificationBox extends React.Component {

    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.innerRoot}>
                        <Typography variant="subheading" component="h3" gutterBottom>
                            Account Verification
                        </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(VerificationBox)
