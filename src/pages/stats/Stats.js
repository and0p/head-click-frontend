import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { defaultPageCSS } from '../../theme'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...defaultPageCSS
})

const Stats = props => {
  const { classes, theme } = props

  return(
    <div className={classes.root}>
      <Typography variant="display1" gutterBottom>Page coming soon.</Typography>
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