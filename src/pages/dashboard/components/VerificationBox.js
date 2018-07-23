import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import { gradients } from "../../../theme"
import classNames from 'classnames'

const styles = theme => ({
    root: {
        width: "100%",
        minHeight: "75px",
        //padding: theme.spacing.unit,
        border: "1px solid " + theme.palette.custom.yellow
    },
    innerRoot: {
        padding: theme.spacing.unit
    },
    textArea: {
        marginTop: theme.spacing.unit * 2
    },
    submissionArea: {
        float: "right"
    },
    button: {
        margin: theme.spacing.unit,
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
                        <Grid container>
                            <Grid item xs={12} lg={6} className={classes.textArea}>
                                <Typography variant="body2">
                                    Please enter the verification code that was emailed to you:
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Input/>
                                <Button variant="contained" color="primary" className={classes.button}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(VerificationBox)
