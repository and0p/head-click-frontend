import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
//import InfoOutline from 'material-ui-icons/InfoOutline'
import ReactFitText from 'react-fittext'

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        height: '100px',
        //marginBottom: theme.spacing.unit * 2
    },
    name: {
        lineHeight: '90%',
        color: "#888888"
    },
    infoDiv: {
        float: 'right',
        width: '75%',
        backgroundColor: theme.palette.background.paper,
        textAlign: 'right'
    },
    infoDivInner: {
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit
    },
    yellowIcon: {
        backgroundColor: theme.palette.custom.yellow,
        float: 'left',
        width: '25%',
        color: '#FFFFFF',
        height: '100%',
        textAlign: 'center'
    },
    blueIcon: {
        backgroundColor: theme.palette.custom.blue,
        float: 'left',
        width: '25%',
        color: '#FFFFFF',
        height: '100%',
        textAlign: 'center'
    },
    redIcon: {
        backgroundColor: theme.palette.custom.red,
        float: 'left',
        width: '25%',
        color: '#FFFFFF',
        height: '100%',
        textAlign: 'center'
    },
    tealIcon: {
        backgroundColor: theme.palette.custom.teal,
        float: 'left',
        width: '25%',
        color: '#FFFFFF',
        height: '100%',
        textAlign: 'center'
    },
    purpleIcon: {
        backgroundColor: theme.palette.custom.purple,
        float: 'left',
        width: '25%',
        color: '#FFFFFF',
        height: '100%',
        textAlign: 'center'
    },
    defaultIcon: {
        backgroundColor: '#FFFFFF',
        float: 'left',
        width: '25%',
        color: '#FFFFFF',
        height: '100%',
        textAlign: 'center'
    },
    icon: {
        color: "#FFFFFF",
        lineHeight: '2.5em',
        fontSize: '2.5em',
        overflow: 'visible'
    }
});

class InfoCard extends React.Component {
    render() {
        const { classes, theme } = this.props;
        // Determine info color
        let iconClass = classes.defaultIcon
        switch(this.props.color) {
            case 'yellow':
                iconClass = classes.yellowIcon
                break
            case 'red':
                iconClass = classes.redIcon
                break
            case 'blue':
                iconClass = classes.blueIcon
                break
            case 'teal':
                iconClass = classes.tealIcon
                break
            case 'purple':
                iconClass = classes.purpleIcon
                break
            default:
                iconClass= classes.defaultIcon
                break
        }
        // See if we were given an icon to render and if not render default
        return (
            <Paper className={classes.root}>
                <div className={iconClass}>
                    <Icon className={classes.icon}>{this.props.icon}</Icon>
                </div>
                <div className={classes.infoDiv}>
                    <div className={classes.infoDivInner}>
                        {/*<ReactFitText minFontSize={28} maxFontSize={36}>*/}
                            <Typography variant="display1">{this.props.value}</Typography>
                        {/*</ReactFitText>*/}
                        <Typography variant="headline" className={classes.name}>{this.props.name}</Typography>
                    </div>
                </div>
            </Paper>
        )
    }
}

InfoCard.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default withStyles(styles)(InfoCard)