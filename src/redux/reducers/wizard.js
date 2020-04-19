import * as Symbols from '../HcSymbols'
import { games, mice, monitors, monitorsFlat, customMonitor } from '../../model/HcModel'
import { isValid, isInArray, getRecommendedDpi, getOverrideFromSettings, recommendSensitivity, getTypicalGameStyle, checkPassword } from '../../util'
import { clamp } from '../../math'
import update from 'immutability-helper'

const initialState = {
  wizardCompleted: false,
  activePage: 0,
  monitorConcern: false,
  monitorSelected: false,
  gamePagesRevealed: 1,
  monitorsExpanded: { "4:3": false, "16:9": false, "16:10": false, "21:9": true },
  manual: false
}

const wizardReducer = (state = initialState, action) => {
  const { type, value } = action
  switch (type) {
    case Symbols.APPLY_CALCULATOR:
      return update(state, {
        activePage: { $set: state.activePage + 1 },
      })
    case Symbols.WIZARD_NEXT:
      // Set the next page
      return update(state, {
        activePage: { $set: state.activePage === 5 ? 0 : state.activePage + 1 },
        gamePagesRevealed: { $set: 1 },
        wizardCompleted: { $set: state.activePage === 5 }
      })
    case Symbols.WIZARD_BACK:
      if (state.activePage > 0) {
        return update(state, {
          activePage: { $set: state.activePage - 1 },
          gamePagesRevealed: { $set: 1 }
        })
      }
    case Symbols.EXPAND_MONITOR_SECTION:
      if (action.value != "undefined") {
        let category = String(action.value)
        return update(state, {
          monitorsExpanded: {
            [category]: { $set: true }
          }
        })
      }
      return state
    case Symbols.SHOW_MORE_GAMES:
      let newValue = state.gamePagesRevealed + 1
      return update(state, {
        gamePagesRevealed: { $set: newValue }
      })
    case Symbols.LOGOUT:
      // Reset the site's state
      return update(initialState, {})
    default:
      return state;
  }
}

export default wizardReducer