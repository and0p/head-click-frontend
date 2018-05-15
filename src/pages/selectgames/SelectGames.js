import React from 'react'
import { render } from 'react-dom'
import Typography from 'material-ui/Typography'
import GameSelect from '../../components/GameSelect'

const SelectGames = props => {
    return([
        <Typography variant="display1">Select games you play:</Typography>,
        <GameSelect />
    ])
}

export default SelectGames