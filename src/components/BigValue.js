import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit
    },
    name: {
        lineHeight: '60%',
        color: "#888888"
    },
    yellowText: {
        color: theme.palette.custom.yellow
    },
    blueText: {
        color: theme.palette.custom.blue
    },
    redText: {
        color: theme.palette.custom.red
    },
    tealText: {
        color: theme.palette.custom.teal
    },
    purpleText: {
        color: theme.palette.custom.purple
    },
    defaultText: {
        color: '#FFFFFF' 
    }
});

class BigValue extends React.Component {
    render() {
        const { classes, theme } = this.props;
        let textClass = classes.defaultText
        switch(this.props.color) {
            case 'yellow':
                textClass = classes.yellowText
                break
            case 'red':
                textClass = classes.redText
                break
            case 'blue':
                textClass = classes.blueText
                break
            case 'teal':
                textClass = classes.tealText
                break
            case 'purple':
                textClass = classes.purpleText
                break
            default:
                textClass= classes.defaultText
                break
        }
        return (
            <div className={classes.root}>
                <Typography variant="display2" className={textClass}>{this.props.value}</Typography>
                <Typography variant="headline" className={classes.name}>{this.props.name}</Typography>
            </div>
        )
    }
}

BigValue.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default withStyles(styles)(BigValue)