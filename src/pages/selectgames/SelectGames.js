import React from 'react'
import { render } from 'react-dom'
import Typography from '@material-ui/core/Typography'
import GameSelect from '../../components/GameSelect'
import { withStyles } from '@material-ui/core/styles'
import { defaultPageCSS } from '../../theme'

const styles = theme => ({
    ...defaultPageCSS
})

const SelectGames = props => {
    const { classes, theme } = props
    return(
        <div className={classes.root}><div className={classes.innerRoot}>
            <GameSelect />
        </div></div>
    )
}

export default withStyles(styles)(SelectGames)