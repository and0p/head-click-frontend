import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Game from '../../../model/Game'
import * as Symbols from '../../../redux/HcSymbols'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/lab/Slider'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    root: {
        //width: '100%',
        //paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        [theme.breakpoints.up('sm')]: {
            height: '40px'
        },
        [theme.breakpoints.down('xs')]: {
            height: '70px'
        }
    },
    optionNameSection: {
        //paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        minHeight: theme.spacing.unit * 2,
        [theme.breakpoints.up('sm')]: {
            float: 'left'
        }
    },
    optionName: {
        [theme.breakpoints.down('xs')]: {
            float: 'left',
            marginRight: theme.spacing.unit
        }
    },
    optionSelectionSection: {
        [theme.breakpoints.up('sm')]: {
            float: 'right',
        },
        [theme.breakpoints.down('xs')]: {
            clear: 'left'
        },
        //textAlign: 'right',
        color: "#777777"
    },
    slider: {
        float: 'right',
        minWidth: '200px',
        marginTop: '4px',
        marginRight: '4px',
        [theme.breakpoints.down('xs')]: {
            width: '80%'
        }
    },
    sliderValue: {
        color: "#FFFFFF",
        float: 'left',
        paddingTop: '10px',
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 2
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
    },
    recommended: {
        color: theme.palette.custom.subtle,
        [theme.breakpoints.down('xs')]: {
            position: 'relative',
            bottom: '-3px'
        }
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

    handleSliderChange = (event, value) => {
        this.props.setOption(
            this.props.gameAlias,
            this.props.option.name,
            value
        )
    }

    render() {
        const { classes, theme } = this.props;
        let option = this.props.option
        let dependancyPass = true;
        if(option.hasOwnProperty("dependant") && this.props.userOptions[option.dependant.name] != option.dependant.value)
            dependancyPass = false
        if(dependancyPass) {  // TODO: add dependant check
            switch(this.props.option.type) {
                case "buttons":
                    let index = this.props.option.values.indexOf(this.props.value)
                    return (
                        <div className={classes.root}>
                            <div className={classes.optionNameSection}>
                                <Typography variant="button" className={classes.optionName}>{this.props.option.name}</Typography>
                                {option.recommended && <Typography variant="caption" className={classes.recommended}>Recommended: {option.recommended}</Typography>}
                            </div>
                            <div className={classes.optionSelectionSection}>
                                {this.props.option.values.map(value =>
                                    <Button
                                    variant="outlined"
                                    className={value == this.props.value ? classes.selectedColor : classes.unselectedColor }
                                    color={value == this.props.value ? "default" : "inherit"}
                                    className={classes.button}
                                    onClick={() => this.handleButtonChange(value)}
                                    key={value}
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
                            <div className={classes.optionNameSection}>
                                <Typography variant="button" className={classes.optionName}>{this.props.option.name}</Typography>
                                {option.recommended && <Typography variant="caption" className={classes.recommended}>Recommended: {option.recommended}</Typography>}
                            </div>
                            <div className={classes.optionSelectionSection}>
                                <div className={classes.sliderValue}>
                                    <Typography variant="label">{this.props.value}</Typography>
                                </div>
                                <div className={classes.slider}>
                                    <Slider 
                                    value={parseInt(this.props.value)}
                                    min={option.min} max={option.max}
                                    onChange={this.handleSliderChange}
                                    step={option.step} 
                                    />
                                </div>
                            </div>
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
    return {}
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
