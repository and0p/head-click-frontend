import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReactFitText from 'react-fittext'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import classNames from 'classnames'
import * as Symbols from '../../../redux/HcSymbols'

const styles = theme => ({
    root: {
        maxWidth: '784px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    container: {
        marginBottom: theme.spacing.unit * 2
    },
    descriptionArea: {
        minHeight: "85px",
        color: theme.palette.custom.subtle
    },
    buttonGroup: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    button: {
        minWidth: "100px"
    },
    selected: {
        backgroundColor: theme.palette.custom.purple
    },
    leftButton: {
        borderRadius: "4px 0 0 4px",
    },
    middleButton: {
        borderRadius: "0",
    },
    rightButton: {
        borderRadius: "0 4px 4px 0",
    }
})

class MiscSelect extends React.Component {
    render() {
        const { classes, theme } = this.props;
        console.log(this.props.profile.settings)
        return (
            <div className={classes.root}>
                <ReactFitText minFontSize={24} maxFontSize={36}>
                    <Typography variant="display2" gutterBottom>And a few more things...</Typography>
                </ReactFitText>
                <Grid container spacing={8} className={classes.container}>
                    <Grid item xs={12} lg={6}>
                        {/* GAME SPEED */}
                        <Typography variant="title" gutterBottom>Typical game style</Typography>
                        <div className={classes.descriptionArea}>
                            <Typography gutterBottom style={{color:"#bbb"}}>
                                You need to consider the style of games you play when determining your ideal mouse sensitivity.
                            </Typography>
                            <Typography style={{color:"#bbb"}}>
                                {this.props.profile.settings.typicalGamePace == "tactical" && 'Long-distance, narrow engagements. Tactical games include Counter-Strike and PUBG.'}
                                {this.props.profile.settings.typicalGamePace == "average" && 'Mix of distance and close-quarters. Average paced games include Fortnite, Team Fortress 2, and Overwatch.'}
                                {this.props.profile.settings.typicalGamePace == "twitchy" && 'Fast enemies in all directions. Twitchy games include arena shooters like Quake and Unreal.'}
                            </Typography>
                        </div>
                        <div className={classes.buttonGroup}>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.leftButton, this.props.profile.settings.typicalGamePace == "tactical" ? classes.selected : null)}
                            onClick={() => this.props.selectGamePace("tactical")}
                            >Tactical</Button>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.middleButton, this.props.profile.settings.typicalGamePace == "average" ? classes.selected : null)}
                            onClick={() => this.props.selectGamePace("average")}
                            >Average</Button>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.rightButton, this.props.profile.settings.typicalGamePace == "twitchy" ? classes.selected : null)}
                            onClick={() => this.props.selectGamePace("twitchy")}
                            >Twitchy</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        aaaa
                    </Grid>
                    {/* MOUSEPAD SIZE */}
                    <Grid item xs={12} lg={6}>
                        <Typography variant="title" gutterBottom>Mousepad size</Typography>
                        <div className={classes.descriptionArea}>
                            <Typography gutterBottom style={{color:"#bbb"}}>
                                The size of your mousepad is a limiting factor in how <i>insensitive</i> your mouse can be while staying competitive.
                            </Typography>
                            <Typography style={{color:"#bbb"}}>
                                {this.props.profile.settings.mousePadSize == "small" && 'Small assumes less than 12" wide, which is smaller than ideal.'}
                                {this.props.profile.settings.mousePadSize == "medium" && 'Medium assumes 12-16" wide, and is adequate enough for most play styles.'}
                                {this.props.profile.settings.mousePadSize == "wide" && 'Wide assumes 16-36" wide, and is ideal for competitive gaming.'}
                            </Typography>
                        </div>
                        <div className={classes.buttonGroup}>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.leftButton, this.props.profile.settings.mousePadSize == "small" ? classes.selected : null)}
                            onClick={() => this.props.selectMousePad("small")}
                            >Small</Button>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.middleButton, this.props.profile.settings.mousePadSize == "medium" ? classes.selected : null)}
                            onClick={() => this.props.selectMousePad("medium")}
                            >Medium</Button>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.rightButton, this.props.profile.settings.mousePadSize == "wide" ? classes.selected : null)}
                            onClick={() => this.props.selectMousePad("wide")}
                            >Wide</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        aaaa
                    </Grid>
                    {/* TRYHARD FACTOR */}
                    <Grid item xs={12} lg={6}>
                        <Typography variant="title" gutterBottom>Tryhard Factor</Typography>
                        <div className={classes.descriptionArea}>
                            <Typography gutterBottom style={{color:"#bbb"}}>
                                Can't think of any other way to phrase this right now. How much do you feel like moving your arm?
                            </Typography>
                            <Typography style={{color:"#bbb"}}>
                                {this.props.profile.settings.tryhardFactor == "casual" && 'Limited range of motion. More comfortable but loss of accuracy.'}
                                {this.props.profile.settings.tryhardFactor == "pro" && 'Average range of motion. Good balance of comfort and accuracy.'}
                                {this.props.profile.settings.tryhardFactor == "tryhard" && 'Extreme range of motion. Precise but exhausting.'}
                            </Typography>
                        </div>
                        <div className={classes.buttonGroup}>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.leftButton, this.props.profile.settings.tryhardFactor == "casual" ? classes.selected : null)}
                            onClick={() => this.props.selectTryhardFactor("casual")}
                            >Casual</Button>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.middleButton, this.props.profile.settings.tryhardFactor == "pro" ? classes.selected : null)}
                            onClick={() => this.props.selectTryhardFactor("pro")}
                            >Pro</Button>
                            <Button 
                            variant="outlined"
                            className={classNames(classes.button, classes.rightButton, this.props.profile.settings.tryhardFactor == "tryhard" ? classes.selected : null)}
                            onClick={() => this.props.selectTryhardFactor("tryhard")}
                            >Tryhard</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        aaaa
                    </Grid>
                </Grid>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        selectTryhardFactor: value => dispatch({
            type: Symbols.SELECT_TRYHARD_FACTOR,
            value: value
        }),
        selectMousePad: value => dispatch({
            type: Symbols.SELECT_MOUSEPAD_SIZE,
            value: value
        }),
        selectGamePace: value => dispatch({
            type: Symbols.SELECT_GAME_PACE,
            value: value
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MiscSelect))