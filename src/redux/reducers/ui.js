import * as Symbols from '../HcSymbols'
import { games, mice, monitors, monitorsFlat, customMonitor } from '../../model/HcModel'
import { isValid, isInArray, getRecommendedDpi, getOverrideFromSettings, recommendSensitivity, getTypicalGameStyle, checkPassword } from '../../util'
import { clamp } from '../../math'
import update from 'immutability-helper'

const initialState = {
  contentComponent: null,
  gameSelect: {
    filterQuery: "",
    sort: "popularity"
  },
  alert: {
    show: false,
    text: "",
    type: 0
  },
  identity: {
    dialogOpen: false,
    dialogFunction: "LOGIN",  // LOGIN, SIGNUP, RESET, NEWPASS
    actionPending: false,
    error: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    oldPassword: "",
    resetToken: "",
    ready: false,
    resetResponse: "",
    verificationToken: "",
    verificationTokenReady: false,
    verificationFailure: null,
    resent: null,
    aliasBeingChanged: false
  },
  editingProfile: false,
  calculator: {
    open: false,
    initialGame: null
  },
  drawerOpenOnMobile: false,
  mobileMenuOpen: false,
  selectedMenuItem: Symbols.HOME_MENU,
  userMenuOpen: false,
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case Symbols.OPEN_CALCULATOR:
      return update(state, {
        calculator: {
          open: { $set: true },
          initialGame: { $set: action.value != undefined ? action.value : null }
        }
      })
    case Symbols.APPLY_CALCULATOR:
      return update(state, {
        calculator: {
          open: { $set: false }
        }
      })
    case Symbols.CLOSE_CALCULATOR:
      return update(state, {
        calculator: {
          open: { $set: false }
        }
      })
    case Symbols.OPEN_SIDEBAR:
      return update(state, {
        mobileMenuOpen: { $set: true }
      })
    case Symbols.CLOSE_SIDEBAR:
      return update(state, {
        mobileMenuOpen: { $set: false }
      })
    case Symbols.RESEND_VERIFY_RESPONSE:
      return update(state, {
        identity: {
          resent: { $set: action.value }
        }
      })
    case Symbols.RESET_TOKEN_RESPONSE:
      if (action.value.code == 200)
        return update(state, {
          identity: {
            dialogFunction: { $set: "RESET_PASSWORD_2" }
          }
        })
      else
        return update(state, {
          identity: {
            error: { $set: action.value.text }
          }
        })
    case Symbols.RESET_RESPONSE:
      if (action.value.code == 200)
        return update(state, {
          identity: {
            dialogFunction: { $set: "LOGIN" },
            password: { $set: "" },
            error: { $set: "Password reset successfully." }
          }
        })
      else
        return update(state, {
          identity: {
            error: { $set: action.value.text }
          }
        })
    case Symbols.SELECT_SIDEBAR_ITEM:
      return update(state, {
        mobileMenuOpen: { $set: false },
        selectedMenuItem: { $set: action.value },
      })
    case Symbols.CLOSE_ALERT:
      return update(state, {
        alert: {
          open: { $set: false }
        }
      })
    case Symbols.START_EDIT_PROFILE:
      return update(state, {
        editingProfile: { $set: true }
      })
    case Symbols.CANCEL_EDIT_PROFILE:
      return update(state, {
        editingProfile: { $set: false }
      })
    case Symbols.SAVE_PROFILE:
      return update(state, {
        editingProfile: { $set: false }
      })
    case Symbols.SET_GAMEPAGE_SORT:
      return update(state, {
        gameSelect: {
          sort: { $set: action.value }
        }
      })
    case Symbols.SET_GAMEPAGE_FILTER:
      return update(state, {
        gameSelect: {
          filterQuery: { $set: action.value }
        }
      })
    case Symbols.OPEN_USER_MENU:
      return update(state, {
        userMenuOpen: { $set: true }
      })
    case Symbols.CLOSE_USER_MENU:
      return update(state, {
        userMenuOpen: { $set: false }
      })
    case Symbols.OPEN_ID_DIALOG:
      if (isValid(action.value))
        return update(state, {
          identity: {
            dialogOpen: { $set: true },
            dialogFunction: { $set: action.value }
          }
        })
      else
        return update(state, {
          identity: {
            dialogOpen: { $set: true },
          }
        })
    case Symbols.CLOSE_ID_DIALOG:
      return update(state, {
        identity: {
          dialogOpen: { $set: false },
          email: { $set: "" },
          password: { $set: "" },
          passwordConfirmation: { $set: "" },
          error: { $set: "" }
        }
      })
    case Symbols.ID_ACTION_STARTED:
      return update(state, {
        identity: {
          actionPending: { $set: true }
        }
      })
    case Symbols.SAVE_SUCCESS:
      return update(state, {
        identity: {
          actionPending: { $set: false }
        }
      })
    case Symbols.ID_ACTION_FINISHED:
      return update(state, {
        identity: {
          actionPending: { $set: false }
        }
      })
    case Symbols.SAVE_FAIL:
      return update(state, {
        identity: {
          actionPending: { $set: false }
        }
      })
    case Symbols.SET_ID_FUNCTION:
      if (action.value != "undefined")
        return update(state, {
          identity: {
            dialogFunction: { $set: action.value },
            error: { $set: "" },
            password: { $set: "" },
            passwordConfirmation: { $set: "" },
            ready: { $set: action.value = "RESET_PASSWORD_1" && state.identity.email != "" }
          }
        })
      else
        return state
    case Symbols.VERIFY_SUCCESS:
      return update(state, {
        identity: {
          actionPending: { $set: false }
        }
      })
    case Symbols.SET_VERIFICATION_FAILURE:
      return update(state, {
        identity: {
          verificationFailure: { $set: "Verification failed." },
          actionPending: { $set: false }
        }
      })
    case Symbols.SET_ID_FAILURE:
      return update(state, {
        identity: {
          error: { $set: action.value },
          actionPending: { $set: false }
        }
      })
    case Symbols.LOGIN_SUCCESS:
      return update(state, {
        identity: {
          actionPending: { $set: false },
          dialogOpen: { $set: false }
        }
      })
    case Symbols.SET_VERIFICATION_TOKEN:
      return update(state, {
        identity: {
          verificationToken: { $set: action.value },
          verificationTokenReady: { $set: action.value.length >= 6 }
        }
      })
    case Symbols.SET_ID_FIELD:
      if (isValid(action.value.field)) {
        // Check for issues in input
        let j = {
          email: state.ui.identity.email,
          password: state.ui.identity.password,
          passwordConfirmation: state.ui.identity.passwordConfirmation,
          oldPassword: state.ui.identity.oldPassword,
          resetToken: state.ui.identity.resetToken,
          ready: false,
          passwordsMatch: false,
          passwordComplex: false,
          error: state.ui.identity.error
        }
        j[action.value.field] = action.value.value
        switch (state.ui.identity.dialogFunction) {
          case "LOGIN":
            j.ready = (j.email && j.password)
            j.passwordsMatch = false
            break
          case "REGISTER":
            j.passwordsMatch = j.password === j.passwordConfirmation
            j.passwordComplex = checkPassword(j.password)
            j.ready = (j.email && j.password && j.passwordConfirmation && j.passwordsMatch && j.passwordComplex == "")
            if (j.password && j.passwordConfirmation)
              if (!j.passwordsMatch)
                j.error = "Passwords do not match."
              else
                j.error = ""
            break
          case "RESET_PASSWORD_1":
            j.ready = j.email != ""
            break
          case "RESET_PASSWORD_2":
            j.passwordsMatch = j.password === j.passwordConfirmation
            j.passwordComplex = checkPassword(j.password)
            j.ready = (j.email && j.password && j.passwordConfirmation && j.passwordsMatch && j.passwordComplex == "" && j.resetToken)
            if (j.passwordConfirmation)
              if (!j.passwordsMatch)
                j.error = "Passwords do not match."
              else
                j.error = ""
            break
        }
        // Return state
        return update(state, {

          identity: {
            email: { $set: j.email },
            password: { $set: j.password },
            passwordConfirmation: { $set: j.passwordConfirmation },
            passwordsMatch: { $set: j.passwordsMatch },
            passwordComplex: { $set: j.passwordComplex },
            ready: { $set: j.ready },
            error: { $set: j.error },
            oldPassword: { $set: j.oldPassword },
            resetToken: { $set: j.resetToken },
          }
        })
      }
      else {
        return state
      }
    case Symbols.CHANGE_ALIAS_START:
      return update(state, {
        identity: {
          aliasBeingChanged: { $set: true }
        }
      })
    case Symbols.CHANGE_ALIAS_SUCCESS:
      return update(state, {
        identity: {
          aliasBeingChanged: { $set: false }
        }
      })
    case Symbols.CHANGE_ALIAS_FAILURE:
      return update(state, {
        identity: {
          aliasBeingChanged: { $set: false }
        }
      })
    case Symbols.LOGOUT:
      // Reset the site's state
      return update(initialState, {})
    default:
      return state
  }
}

export default uiReducer