import React from 'react'
import { render } from 'react-dom'
import Typography from '@material-ui/core/Typography'
import GameSelect from '../../components/GameSelect'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {
      flexGrow: 1,
      maxWidth: '784px',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: theme.spacing.unit * 6,
    }
})

const SelectGames = props => {
    const { classes, theme } = props
    return(
        <div className={classes.root}>
            <GameSelect />
        </div>
    )
}

export default withStyles(styles)(SelectGames)