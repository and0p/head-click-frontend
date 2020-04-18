import * as Symbols from '../HcSymbols'
import { games, mice, monitors, monitorsFlat, customMonitor } from '../../model/HcModel'
import { isValid, isInArray, getRecommendedDpi, getOverrideFromSettings, recommendSensitivity, getTypicalGameStyle, checkPassword } from '../../util'
import { clamp } from '../../math'
import update from 'immutability-helper'

const initialState = {
  email: null,
  alias: null,
  verified: false,
  loggedIn: false,
  jwt: "",
  lastModified: 0,
  lastSaveAttempt: 0,
  lastSaveSuccess: 0,
  acceptedPrivacyPolicy: false,
  emailConsent: true,
  hasSeenTutorial: false
}

const identityReducer = (state = initialState, action) => {
  switch (action.type) {
    // Update modified state based on profile changes
    case Symbols.SELECT_SENSITIVITY: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SELECT_DPI: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SELECT_MONITOR: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SELECT_MOUSE: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SELECT_REFRESH_RATE: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SAVE_PROFILE: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SET_CUSTOM_MONITOR_WIDTH: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SET_CUSTOM_MONITOR_HEIGHT: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.ADD_GAME: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.REMOVE_GAME: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.TOGGLE_GAME: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SET_GAMEPAGE_SORT: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SET_GAMEPAGE_FILTER: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.UPDATE_GAME_OPTION: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.SET_GAME_OVERRIDE: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.UPDATE_GAME_OVERRIDE: return update(state, { lastModified: { $set: Date.now() } })
    case Symbols.DISMISS_TUTORIAL:
      return update(state, {
        hasSeenTutorial: { $set: true }
      })
    case Symbols.LOGIN_SUCCESS:
      return update(state, {
        email: { $set: action.value.email },
        verified: { $set: action.value.verified },
        alias: { $set: action.value.alias },
        jwt: { $set: action.value.jwt },
        loggedIn: { $set: true },
        lastSaveSuccess: { $set: Date.now() },
        lastModified: { $set: 0 },
        hasSeenTutorial: { $set: true }
      })
    case Symbols.SAVE_SUCCESS:
      return update(state, {
        lastSaveSuccess: { $set: Date.now() }
      })
    case Symbols.SAVE_FAIL:
      return update(state, {
        lastSaveAttempt: { $set: 0 },
      })
    case Symbols.ID_ACTION_STARTED:
      if (action.value && action.value.type == "SAVE")
        return update(state, {
          lastSaveAttempt: { $set: Date.now() }
        })
      else
        return state
    case Symbols.VERIFY_SUCCESS:
      return update(state, {
        verified: { $set: true }
      })
    case Symbols.CHANGE_ALIAS_SUCCESS:
      return update(state, {
        alias: { $set: action.value }
      })
    case Symbols.ACCEPT_PRIVACY_POLICY:
      return update(state, {
        acceptedPrivacyPolicy: { $set: true }
      })
    case Symbols.TOGGLE_EMAIL_CONSENT:
      return update(state, {
        emailConsent: { $set: !state.emailConsent }
      })
    case Symbols.LOGOUT:
      // Reset the site's state, except for privacy policy acceptance
      return update(initialState, {
        acceptedPrivacyPolicy: { $set: state.acceptedPrivacyPolicy },
        hasSeenTutorial: { $set: false }
      })
    default:
      return state
  }
}

export default identityReducer