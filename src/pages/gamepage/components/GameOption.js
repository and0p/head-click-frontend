import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Game from '../../../model/Game'
import * as Symbols from '../../../redux/HcSymbols'
import Typography from 'material-ui/Typography'
import Tabs, { Tab }  from 'material-ui/Tabs'
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        width: '100%',
        margin: theme.spacing.unit
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
    },
    optionName: {
        float: 'left'
    },
    options: {
        float: 'right'
    },
    button: {
        margin: theme.spacing.unit
    }
  });

class GameOption extends React.Component {

    handleTabChange = (event, value) => {
        this.props.setOption(
            this.props.gameAlias,
            this.props.option.name,
            this.props.option.values[value]
        )
    }

    render() {
        const { classes, theme } = this.props;
        let index = this.props.option.values.indexOf(this.props.value)
        if(true) {  // TODO: add dependant check
            switch(this.props.option.type) {
                case "buttons":
                    return (
                        <div className={classes.root}>
                            <div className={classes.optionName}>
                                <Typography variant="body2">{this.props.option.name}</Typography>
                            </div>
                            <div className={classes.optionButtons}>
                                {this.props.option.values.map(value =>
                                <Button variant="outlined" className={classes.button}>
                                    Default
                                </Button>
                            )}
                            </div>
                        </div>
                    )
                case "tab":
                    return (
                        <div className={classes.root}>
                            <Tabs
                                value={index}
                                onChange={this.handleTabChange} 
                                indicatorColor="primary"
                                fullWidth
                            >
                                {this.props.option.values.map(value =>
                                    <Tab classes={{root: classes.tabRoot }} label={value} />
                                )}
                            </Tabs>
                        </div>
                    )
                default:
                 return <div/>
            }
        }
        else
        {
            return <div/>
        }
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        setOption: (gameAlias, optionName, value) => dispatch({
            type: Symbols.UPDATE_GAME_OPTION,
            value: {
                gameAlias: gameAlias,
                optionName: optionName,
                value: value
            }
        }),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(GameOption))
