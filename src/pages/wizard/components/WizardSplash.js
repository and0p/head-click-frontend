import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { defaultPageCSS } from '../../../theme'
import copy from '../../../copy'
import ReactFitText from 'react-fittext'
import Typography from '@material-ui/core/Typography'
import InfoCard from '../../../components/InfoCard'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    ...defaultPageCSS,
    headline: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: theme.spacing.unit * 4
    },
});

class WizardSplash extends React.Component {
    render() {
        const { classes, theme } = this.props
        return(
            <div className={classes.wizardPageRoot}>
                <div className={classes.innerRoot}>
                    <ReactFitText minFontSize={24} maxFontSize={36} compressor={1.5}>
                        <Typography variant="display2" className={classes.headline}>{copy["en"].wizard.intro.headline}</Typography>
                    </ReactFitText>
                    <Typography variant="subheading" className={classes.informationSection}>{copy["en"].wizard.intro.subheader}</Typography>
                    <Typography>
                        <span className={classes.informationSection}>{copy["en"].wizard.intro.questionOpening}</span>
                        <ul>
                            <li>{copy["en"].wizard.intro.question1}</li>
                            <li>{copy["en"].wizard.intro.question2}</li>
                        </ul>
                        {copy["en"].wizard.intro.questionLink}
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(WizardSplash)