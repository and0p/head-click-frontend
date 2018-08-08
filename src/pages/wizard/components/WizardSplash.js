import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import copy from '../../../copy'
import ReactFitText from 'react-fittext'
import Typography from '@material-ui/core/Typography'
import InfoCard from '../../../components/InfoCard'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
        flex: 1,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px'
    },
    headline: {
        color: '#FFFFFF'
    },
});

class WizardSplash extends React.Component {
    render() {
        const { classes, theme } = this.props
        return(
            <div className={classes.root}>
                <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                    <Typography variant="display2" className={classes.headline} gutterBottom>
                        {copy["en"].wizard.intro.headline}
                    </Typography>
                </ReactFitText>
            </div>
        )
    }
}

export default withStyles(styles)(WizardSplash)