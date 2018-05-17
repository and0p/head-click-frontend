import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Game from '../../../model/Game'
import Tabs, { Tab }  from 'material-ui/Tabs'

const styles = theme => ({
    root: {
        width: '100%',
        marginBottom: theme.spacing.unit
    },
    tabRoot: {
        maxWidth: '100%',
        color: "#FFFFFF",
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        }
    },
    tabSelected: {
        backgroundColor: theme.palette.background.paper
    },
    tabIndicator: {
        backgroundColor: "#FFFFFF"
    }
  });

class GameOption extends React.Component {
    handleChange = () => event => {

    }

    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>
                <Tabs
                    value={0}
                    onChange={this.handleChange()} 
                    indicatorColor="primary"
                    fullWidth
                >
                    <Tab classes={{root: classes.tabRoot, selected: classes.tabSelected}} label="First Person"/>
                    <Tab classes={{root: classes.tabRoot}} label="Third Person"/>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
  
const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(GameOption))
