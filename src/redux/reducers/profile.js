import * as Symbols from '../HcSymbols'
import { games, mice, monitors, monitorsFlat, customMonitor } from '../../model/HcModel'
import { isValid, isInArray, getRecommendedDpi, getOverrideFromSettings, recommendSensitivity, getTypicalGameStyle, checkPassword } from '../../util'
import { clamp } from '../../math'
import update from 'immutability-helper'
import { Validator } from 'jsonschema'

const initialState = {
  settings: {
    monitor: null,
    refreshRate: 60,
    dpi: {
      actual: null,
      recommended: null
    },
    sensitivity: {
      actual: null,
      recommended: null
    },
    toggle: {
      actual: 0,
      recommended: 0
    },
    usingCustomMonitor: false,
    tryhardFactor: "pro",
    mousePadSize: "medium",
    typicalGamePace: "average"
  },
  customMonitor: {
    name: "1920x1080",
    width: 1920,
    height: 1080,
    aspectRatio: "16:9",
    recommendedDpi: 800,
    nonDescriptiveName: false,
    common: true,
    usable: true
  },
  ownedGames: [],
  ready: false,
  gamesOverriden: [],
  overrides: {},
  options: {}
}

export const profileReducer = (state = initialState, action) => {
  const { value } = action
  switch (action.type) {
    case Symbols.CREATE_PROFILE_MANUALLY:
      let customMonitor = {
        width: action.payload.customWidth,
        height: action.payload.customHeight,
        name: action.payload.customWidth + "x" + action.payload.customHeight,
        recommendedDpi: clamp(400 * Math.ceil(((action.payload.customHeight - 600) / 400)), 400, 6400)
      }
      let usingCustomMonitor = action.payload.aspectRatio === "custom"
      let monitor = usingCustomMonitor ? customMonitor : action.payload.monitor
      return update(state, {
        settings: {
          sensitivity: {
            actual: { $set: action.payload.sensitivity },
            recommended: { $set: 35 }
          },
          dpi: {
            actual: { $set: action.payload.dpi },
            recommended: { $set: monitor.recommendedDpi }
          },
          monitor: { $set: monitor },
          usingCustomMonitor: { $set: action.payload.aspectRatio === "custom" },
          customMonitor: { $set: customMonitor }
        },
        ready: { $set: true }
      })
    case Symbols.SELECT_MOUSEPAD_SIZE: {
      return update(state, {
        settings: {
          mousePadSize: { $set: action.value }
        },
      })
    }
    case Symbols.SELECT_TRYHARD_FACTOR: {
      return update(state, {
        settings: {
          tryhardFactor: { $set: action.value }
        },
      })
    }
    case Symbols.SELECT_GAME_PACE: {
      return update(state, {
        settings: {
          typicalGamePace: { $set: action.value }
        },
      })
    }
    case Symbols.SELECT_MONITOR_WIZARD:
      if (action.value != null) {
        return update(state, {
          settings: {
            monitor: { $set: action.value },
            dpi: {
              actual: { $set: action.value.recommendedDpi },
              recommended: { $set: action.value.recommendedDpi }
            },
            usingCustomMonitor: { $set: action.value === state.customMonitor }
          },
        })
      }
      else {
        return state;
      }
    case Symbols.SELECT_MONITOR:
      if (action.value != null) {
        // Update dpi if still doing wizard
        let newMouseDpi = state.settings.dpi
        if (!state.wizard.wizardCompleted) {
          newMouseDpi = action.value.recommendedDpi
        }
        return update(state, {
          settings: {
            monitor: { $set: action.value },
            dpi: {
              actual: { $set: newMouseDpi },
              recommended: { $set: newMouseDpi }
            },
            usingCustomMonitor: { $set: action.value === state.customMonitor }
          },
        })
      }
      else {
        return state;
      }
    case Symbols.SELECT_REFRESH_RATE:
      if (action.value != null)
        return update(state, {
          refreshRate: { $set: action.value },
        })
      else return state
    case Symbols.TOGGLE_GAME:
      if (isValid(action.value) && games.hasOwnProperty(action.value.alias)) {
        // See if we have this game already
        let index = state.ownedGames.indexOf(action.value.alias)
        if (index > -1) {
          // Remove game
          return update(state, {
            ownedGames: { $splice: [[index, 1]] },
          })
        }
        else {
          // Add game
          return update(state, {
            ownedGames: { $push: [action.value.alias] },
            options: {
              [action.value.alias]: { $set: action.value.getDefaultOptions() }
            },
          })
        }
      }
      else return state
    case Symbols.WIZARD_NEXT:
      if (value == 4) {
        let recommendedSensitivity = recommendSensitivity(state)
        return update(state, {
          settings: {
            sensitivity: {
              actual: { $set: recommendedSensitivity },
              recommended: { $set: recommendedSensitivity }
            }
          },
          overrides: { $set: {} },
          gamesOverriden: { $set: [] }
        })
      }
      else if (value == 3) {
        let recommendedGamePace = getTypicalGameStyle(state)
        return update(state, {
          settings: {
            typicalGamePace: { $set: recommendedGamePace }
          },
        })
      }
      else if (value == 5)
        return update(state, {
          ready: { $set: true }
        })
      return state
    case Symbols.SAVE_PROFILE:
      if (action.value != "undefined") {
        return update(state, {
          settings: {
            sensitivity: {
              actual: { $set: parseInt(action.value.sensitivity) }
            },
            dpi: {
              actual: { $set: action.value.dpi }
            },
            monitor: { $set: action.value.monitor },
            usingCustomMonitor: { $set: action.value.monitor == action.value.customMonitor }
          },
          customMonitor: { $set: action.value.customMonitor },
        })
      }
      return state
    case Symbols.SET_CUSTOM_MONITOR_WIDTH:
      if (action.value != "undefined") {
        let cMonitor = {
          ...state.customMonitor,
          name: action.value + "x" + state.customMonitor.height,
          recommendedDpi: clamp(400 * Math.ceil(((state.customMonitor.height - 600) / 400)), 400, 6400),
          width: action.value,
          usable: action.value > 0 && state.customMonitor.height > 0
        }
        return update(state, {
          customMonitor: { $set: cMonitor },
          settings: {
            monitor: { $set: state.settings.usingCustomMonitor ? cMonitor : state.settings.monitor }
          },
        })
      }
      else
        return state
    case Symbols.SET_CUSTOM_MONITOR_HEIGHT:
      if (action.value != "undefined") {
        let cMonitor = {
          ...state.customMonitor,
          name: state.customMonitor.width + "x" + action.value,
          recommendedDpi: clamp(400 * Math.ceil(((state.customMonitor.height - 600) / 400)), 400, 6400),
          height: action.value,
          usable: action.value > 0 && state.customMonitor.width > 0
        }
        return update(state, {
          customMonitor: { $set: cMonitor },
          settings: {
            monitor: { $set: state.settings.usingCustomMonitor ? cMonitor : state.settings.monitor }
          },
        })
      }
      else
        return state
    case Symbols.APPLY_CALCULATOR:
      // {sensitivity, dpi}
      let sensitivity = action.value.sensitivity, dpi = action.value.dpi
      if (!isNaN(sensitivity) && sensitivity > 0 && !isNaN(dpi) && dpi > 0)
        return update(state, {
          settings: {
            sensitivity: {
              actual: { $set: sensitivity }
            },
            dpi: {
              actual: { $set: dpi }
            }
          },
        })
      else
        return state
    case Symbols.SET_GAME_OVERRIDE:
      if (isValid(action.value.gameName)) {
        if (action.value.set) {
          // If we haven't overriden game yet, give new overrides from current settings
          if (!state.overrides.hasOwnProperty(action.value.gameName)) {
            // See if a profile exists, and use a generic one otherwise
            let overrides = {}
            if (state.ready)
              overrides = getOverrideFromSettings(state.settings)
            else
              overrides = getOverrideFromSettings(null)
            return update(state, {
              gamesOverriden: { $push: [action.value.gameName] },
              overrides: {
                [action.value.gameName]: { $set: overrides }
              },
            })
          }
          else
            return update(state, {
              gamesOverriden: { $push: [action.value.gameName] },
            })
        }
        else {
          // Find the index of that game
          return update(state, {
            gamesOverriden: { $set: state.gamesOverriden.filter((item) => item !== action.value.gameName) },
          })
        }
      }
      else
        return state
    case Symbols.UPDATE_GAME_OVERRIDE:
      if (isValid(action.value.gameName)) {
        if (action.value.override == 'cm360')
          return update(state, {
            overrides: {
              [action.value.gameName]: {
                sensitivity: {
                  actual: { $set: action.value.value }
                }
              }
            },
          })
        else if (action.value.override == 'dpi')
          return update(state, {
            overrides: {
              [action.value.gameName]: {
                dpi: {
                  actual: { $set: action.value.value }
                }
              }
            },
          })
        else if (action.value.override == 'resolutionx')
          return update(state, {
            overrides: {
              [action.value.gameName]: {
                monitor: {
                  width: { $set: action.value.value }
                }
              }
            },
          })
        else if (action.value.override == 'resolutiony')
          return update(state, {
            overrides: {
              [action.value.gameName]: {
                monitor: {
                  height: { $set: action.value.value }
                }
              }
            },
          })
        else
          return state
      }
      else
        return state
    case Symbols.UPDATE_GAME_OPTION:
      // See if we have these options yet
      if (!state.options.hasOwnProperty(action.value.gameAlias))
        state.options[action.value.gameAlias] = games[action.value.gameAlias].getDefaultOptions()
      return update(state, {
        options: {
          [action.value.gameAlias]: {
            [action.value.optionName]: { $set: action.value.value }
          }
        },
      })
    case Symbols.LOGIN_SUCCESS:
      // TODO make sure profile is good
      if (action.value.profile != null)
        return update(state, {
          $set: loadProfileTransform(action.value.profile)
        })
      else
        return state
    case Symbols.LOGOUT:
      // Reset the site's state
      return update(initialState, {})
    default:
      return state
  }
}

const v = new Validator();

const profileSchema = {
  "settings": {
    "monitor": {
      "required": true,
      "type": "array",
      "items": { "type": "string" },
      "minitems": 2,
      "maxItems": 2
    },
    "refreshRate": { "type": "integer", "required": true, "minimum": 30 },
    "dpi": {
      "actual": { "type": "integer", "required": true, "minimum": 0 },
      "recommended": { "type": "integer", "required": true, "minimum": 0 }
    },
    "sensitivity": {
      "actual": { "type": "integer", "required": true, "minimum": 0 },
      "recommended": { "type": "integer", "required": true, "minimum": 0 }
    },
    "toggle": {
      "actual": { "type": "any", "required": false },
      "recommended": { "type": "any", "required": false }
    },
    "usingCustomMonitor": { "type": "boolean", "required": false }
  },
  "ownedGames": {
    "type": "array",
    "items": { "type": "string" },
    "uniqueItems": true,
    "required": true
  },
  "ready": { "type": "boolean", "required": true },
  "ownedGames": {
    "type": "array",
    "items": { "type": "string" },
    "uniqueItems": true,
    "required": true
  },
  "overrides": { "type": "object", "required": true },
  "options": { "type": "object", "required": true },
  "customMonitor": {
    "name": { "type": "string" },
    "width": { "type": "integer", "minimum": 0 },
    "height": { "type": "integer", "minimum": 0 },
    "aspectRatio": { "type": "string" },
    "recommendedDpi": { "type": "integer", "minimum": 400 },
    "nonDescriptiveName": { "type": "boolean" },
    "common": { "type": "boolean" },
    "usable": { "type": "boolean" }
  }
}

export const validateProfile = profile => {
  // Returns true if profile submitted matches schem
  return v.validate(profile, profileSchema).valid
}

export const loadProfileTransform = outboundState => {
  if (outboundState.ready) {
    validateProfile(outboundState)
    let newState = {
      ...outboundState,
      modified: false,
      settings: {
        ...outboundState.settings,
        monitor: outboundState.settings.usingCustomMonitor ? outboundState.settings.monitor : monitors[outboundState.settings.monitor[0]][outboundState.settings.monitor[1]]
      }
    }
    return newState
  }
  else
    return outboundState
}

export default profileReducer