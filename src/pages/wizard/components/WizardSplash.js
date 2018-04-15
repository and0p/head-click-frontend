import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import InfoCard from '../../../components/InfoCard'
import Grid from 'material-ui/Grid'

const styles = theme => ({

});

class WizardSplash extends React.Component {

    render() {
        return(
            <div>
                <Typography variant="headline">Welcome!</Typography>
            </div>
        )
    }
}

export default withStyles(styles)(WizardSplash)