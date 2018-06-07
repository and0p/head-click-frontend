import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
      flexGrow: 1
    }
})

const Stats = props => {
    return(
      <div>
        <Typography variant="display1" gutterBottom>Stats</Typography>
        <Typography variant="headline">Coming Soon</Typography>
      </div>
    )
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
  )(withStyles(styles)(Stats))