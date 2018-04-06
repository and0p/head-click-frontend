import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import BigValue from '../../../components/BigValue'

const styles = theme => ({

});

class WizardSplash extends React.Component {

    render() {
        return(
            <div>
                <Typography variant="headline">Welcome!</Typography>
                <BigValue name='d/cm' value={34.5} />
            </div>
        )
    }
}

export default withStyles(styles)(WizardSplash)