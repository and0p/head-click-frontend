import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Game from '../../../model/Game'
import * as Symbols from '../../../redux/HcSymbols'
import Typography from '@material-ui/core/Typography'
import Tabs, { Tab } from '@material-ui/core/Tabs'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    root: {
        //width: '100%',
        //paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        height: '40px'
    },
    optionName: {
        padding: theme.spacing.unit,
        float: 'left'
    },
    optionButtons: {
        float: 'right',
        align: 'right',
        color: "#777777"
    },
    button: {
        marginLeft: theme.spacing.unit
    },
    selectedColor: {
        color: "#FFFFFF",
        backgroundColor: "#444444",
        borderColor: "#AA00BB"
    },
    unselectedColor: {
        color: theme.palette.custom.subtle
    }
  });

class GameOption extends React.Component {

    handleButtonChange = value => {
        this.props.setOption(
            this.props.gameAlias,
            this.props.option.name,
            value
        )
    }

    handleTabChange = (event, value) => {
        this.props.setOption(
            this.props.gameAlias,
            this.props.option.name,
            this.props.option.values[value]
        )
    }

    render() {
        const { classes, theme } = this.props;
        let option = this.props.option
        let index = this.props.option.values.indexOf(this.props.value)
        let dependancyPass = true;
        console.log(option)
        if(option.hasOwnProperty("dependant") && this.props.userOptions[option.dependant.name] != option.dependant.value)
            dependancyPass = false
        if(dependancyPass) {  // TODO: add dependant check
            switch(this.props.option.type) {
                case "buttons":
                    return (
                        <div className={classes.root}>
                            <div className={classes.optionName}>
                                <Typography variant="button">{this.props.option.name}</Typography>
                            </div>
                            <div className={classes.optionButtons}>
                                {this.props.option.values.map(value =>
                                    <Button
                                    variant="outlined"
                                    className={value == this.props.value ? classes.selectedColor : classes.unselectedColor }
                                    color={value == this.props.value ? "default" : "inherit"}
                                    className={classes.button}
                                    onClick={() => this.handleButtonChange(value)}
                                    >
                                        {value}
                                    </Button>
                            )}
                            </div>
                        </div>
                    )
                case "slider":
                    return (
                        <div className={classes.root}>

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
