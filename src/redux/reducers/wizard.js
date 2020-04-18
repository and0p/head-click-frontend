import * as Symbols from '../HcSymbols'
import { games, mice, monitors, monitorsFlat, customMonitor } from '../../model/HcModel'
import { isValid, isInArray, getRecommendedDpi, getOverrideFromSettings, recommendSensitivity, getTypicalGameStyle, checkPassword } from '../../util'
import { clamp } from '../../math'
import update from 'immutability-helper'

const initialState = {
  wizardCompleted: false,
  activePage: 0,
  pagesReady: [true, false, true, false, true, true, true],
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
    case Symbols.SELECT_MONITOR_WIZARD:
      return update(state, {
        pagesReady: {
          1: { $set: value && value != "undefined" }
        }
      })
      return state
    case Symbols.SET_CUSTOM_MONITOR_WIDTH:
      return update(state, {
        pagesReady: {
          1: {
            $set: (value.profile.settings.monitor != "undefined"
              && value.profile.customMonitor.height > 0
              && value.width > 0)
          }
        }
      })
      return state
    case Symbols.SET_CUSTOM_MONITOR_HEIGHT:
      return update(state, {
        pagesReady: {
          1: {
            $set: (value.profile.settings.monitor != "undefined"
              && value.profile.customMonitor.width > 0
              && value.width > 0)
          }
        }
      })
    case Symbols.WIZARD_NEXT:
      if (state.pagesReady[state.activePage]) {
        // Set the next page
        return update(state, {
          activePage: { $set: state.activePage === 5 ? 0 : state.activePage + 1 },
          gamePagesRevealed: { $set: 1 },
          pagesReady: {
            1: {
              $set: isValid(value.profile.settings.monitor)
                && (value.profile.settings.monitor != "custom" || value.profile.settings.monitor.usable)
            },
            3: { $set: value.profile.ownedGames.length > 0 }
          },
          wizardCompleted: { $set: state.activePage === 5 }
        })
      }
      else
        return state
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