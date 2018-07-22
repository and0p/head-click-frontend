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
        height: "80px",
        backgroundColor: "#8B41B0",
        padding: theme.spacing.unit,
        paddingTop: theme.spacing.unit * 2.5
    },
    purple: gradients.purple,
    blue: gradients.blue,
    teal: gradients.teal,
    leftDiv: {
        [theme.breakpoints.down('md')]: {
            width:"20%",
        },
        [theme.breakpoints.up('xl')]: {
            width: "30%"
        },
        float: "left",
        textAlign: "center",
        marginLeft: -theme.spacing.unit
    },
    rightDiv: {
        color: "#FFFFFF",
        overflow: "hidden",
        whiteSpace: "nowrap",
        [theme.breakpoints.down('md')]: {
            float: "right",
            textAlign: "right",
            paddingRight: theme.spacing.unit
        },
    },
    icon: {
        color: "#FFFFFF",
        lineHeight: '2em',
        fontSize: '2em',
        overflow: 'visible'
    }
})

class Dashboard extends React.Component {

    render() {
        const { classes, theme } = this.props
        // Find the desired color gradient, using purple if not specified
        var gradientClass = classes.purple
        if(classes.hasOwnProperty(this.props.color))
            gradientClass = classes[this.props.color]
        return (
            <Paper className={classNames(classes.root, gradientClass)}>
                    <div className={classes.leftDiv}>
                        <Icon className={classes.icon}>{this.props.icon}</Icon>
                    </div>
                    <div className={classes.rightDiv}>
                        <Typography variant="display1" style={{color:"#FFFFFF"}}>{this.props.value}</Typography>
                        <Typography variant="title">{this.props.name}</Typography>
                    </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(Dashboard)
