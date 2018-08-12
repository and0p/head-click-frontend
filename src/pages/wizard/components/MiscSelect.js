import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReactFitText from 'react-fittext'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import ResponsiveAsset from '../../../assets'
import Divider from '@material-ui/core/Divider'
import classNames from 'classnames'
import * as Symbols from '../../../redux/HcSymbols'
import { defaultPageCSS } from '../../../theme'

const styles = theme => ({
    ...defaultPageCSS,
    container: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        // [theme.breakpoints.down('md')]: {
        //     marginLeft: theme.spacing.unit,
        //     marginRight: theme.spacing.unit,
        // },
    },
    section: {
        [theme.breakpoints.down('md')]: {
            textAlign: "center"
        },
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
    },
    illustrationDiv: {
        textAlign: "center"
    },
    illustration: {
        width: '360px',
        height: '180px'
    }
})

class MiscSelect extends React.Component {
    render() {
        const { classes, theme } = this.props;
        console.log(this.props.profile.settings)
        return (
            <div className={classes.wizardPageRoot}><div className={classes.innerRoot}>
                <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                    <Typography variant="display2" className={classNames(classes.headline, classes.center)} gutterBottom>And a few more things...</Typography>
                </ReactFitText>
                <Grid container spacing={8} className={classes.container}>
                    <Grid item xs={12} lg={6} className={classes.section}>
                        {/* GAME SPEED */}
                        <Typography variant="title" gutterBottom>Typical game style</Typography>
                        <div className={classes.descriptionArea}>
                            <Typography gutterBottom style={{color:"#bbb"}}>
                                You need to consider the style of games you play when determining your ideal mouse sensitivity.
                            </Typography>
                            <Hidden lgUp>
                                {this.props.profile.settings.typicalGamePace == "tactical" && <ResponsiveAsset category="wizard" asset="game_pace_tactical" className={classes.illustration} />}
                                {this.props.profile.settings.typicalGamePace == "average" && <ResponsiveAsset category="wizard" asset="game_pace_average" className={classes.illustration} />}
                                {this.props.profile.settings.typicalGamePace == "twitchy" && <ResponsiveAsset category="wizard" asset="game_pace_twitchy" className={classes.illustration} />}
                            </Hidden>
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
                        <Hidden mdUp><Divider/></Hidden>
                    </Grid>
                    <Hidden mdDown>
                        <Grid item xs={12} lg={6} className={classes.illustrationDiv}>
                            {this.props.profile.settings.typicalGamePace == "tactical" && <ResponsiveAsset category="wizard" asset="game_pace_tactical" className={classes.illustration} />}
                            {this.props.profile.settings.typicalGamePace == "average" && <ResponsiveAsset category="wizard" asset="game_pace_average" className={classes.illustration} />}
                            {this.props.profile.settings.typicalGamePace == "twitchy" && <ResponsiveAsset category="wizard" asset="game_pace_twitchy" className={classes.illustration} />}
                        </Grid>
                    </Hidden>
                    {/* MOUSEPAD SIZE */}
                    <Hidden mdDown>
                        <Grid item xs={12} lg={6} className={classes.illustrationDiv}>
                            {this.props.profile.settings.mousePadSize == "small" && <ResponsiveAsset category="wizard" asset="mousepad_small" className={classes.illustration} />}
                            {this.props.profile.settings.mousePadSize == "medium" && <ResponsiveAsset category="wizard" asset="mousepad_medium" className={classes.illustration} />}
                            {this.props.profile.settings.mousePadSize == "wide" && <ResponsiveAsset category="wizard" asset="mousepad_wide" className={classes.illustration} />}
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} lg={6} className={classes.section}>
                        <Typography variant="title" gutterBottom>Mousepad size</Typography>
                        <div className={classes.descriptionArea}>
                            <Typography gutterBottom style={{color:"#bbb"}}>
                                The size of your mousepad is a limiting factor in how <i>insensitive</i> your mouse can be while staying competitive.
                            </Typography>
                            <Hidden lgUp>
                                {this.props.profile.settings.mousePadSize == "small" && <ResponsiveAsset category="wizard" asset="mousepad_small" className={classes.illustration} />}
                                {this.props.profile.settings.mousePadSize == "medium" && <ResponsiveAsset category="wizard" asset="mousepad_medium" className={classes.illustration} />}
                                {this.props.profile.settings.mousePadSize == "wide" && <ResponsiveAsset category="wizard" asset="mousepad_wide" className={classes.illustration} />}
                            </Hidden>
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
                        <Hidden mdUp><Divider/></Hidden>
                    </Grid>
                    {/* TRYHARD FACTOR */}
                    <Grid item xs={12} lg={6} className={classes.section}>
                        <Typography variant="title" gutterBottom>Comfort Level</Typography>
                        <div className={classes.descriptionArea}>
                            <Typography gutterBottom style={{color:"#bbb"}}>
                                You're more accurate with a less sensitive mouse, but it doesn't feel right for everyone.
                            </Typography>
                            <Hidden lgUp>
                                {this.props.profile.settings.tryhardFactor == "casual" && <ResponsiveAsset category="wizard" asset="mouse_movement_casual" className={classes.illustration} />}
                                {this.props.profile.settings.tryhardFactor == "pro" && <ResponsiveAsset category="wizard" asset="mouse_movement_pro" className={classes.illustration} />}
                                {this.props.profile.settings.tryhardFactor == "tryhard" && <ResponsiveAsset category="wizard" asset="mouse_movement_tryhard" className={classes.illustration} />}
                            </Hidden>
                            <Typography style={{color:"#bbb"}}>
                                {this.props.profile.settings.tryhardFactor == "casual" && 'Limited range of motion. More comfortable but loss of accuracy.'}
                                {this.props.profile.settings.tryhardFactor == "pro" && 'Average range of motion. Good balance of comfort and accuracy.'}
                                {this.props.profile.settings.tryhardFactor == "tryhard" && 'Extreme range of motion. Precise but exhausting after extended gameplay.'}
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
                    <Hidden mdDown>
                        <Grid item xs={12} lg={6} className={classes.illustrationDiv}>
                            {this.props.profile.settings.tryhardFactor == "casual" && <ResponsiveAsset category="wizard" asset="mouse_movement_casual" className={classes.illustration} />}
                            {this.props.profile.settings.tryhardFactor == "pro" && <ResponsiveAsset category="wizard" asset="mouse_movement_pro" className={classes.illustration} />}
                            {this.props.profile.settings.tryhardFactor == "tryhard" && <ResponsiveAsset category="wizard" asset="mouse_movement_tryhard" className={classes.illustration} />}
                        </Grid>
                    </Hidden>
                </Grid>

            </div></div>
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