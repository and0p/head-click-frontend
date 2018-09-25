import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button'
import copy from '../copy'

const styles = theme => ({
    root: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    content: {
        paddingBottom: 0
    },
    button: {
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
})

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class WelcomePopup extends React.Component {
    render() {
        const { classes, fullScreen } = this.props
        let text = copy["en"].dashboard.tutorial
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                classes={{
                    paper: classes.root
                }}
            >
                <DialogTitle>{text.header}</DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText>
                        {text.intro}<br/>
                        <ul>
                            {text.tips.map(t => {
                                return(<li>{t}</li>)
                            })}
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} onClick={this.props.dismissFunction} color="primary" variant="contained" autoFocus>
                        {text.acceptButton}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

//export default withStyles(styles)(withMobileDialog({breakpoint: 'xs'})(WelcomePopup))
export default withStyles(styles)((WelcomePopup))