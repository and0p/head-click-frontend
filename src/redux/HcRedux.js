// Redux imports
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import reduceReducers from 'reduce-reducers'
import { persistStore, persistReducer, createTransform  } from 'redux-persist'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import storage from 'redux-persist/lib/storage'
// HC import
import * as Symbols from './HcSymbols'
import { games, mice, monitors, customMonitor } from '../model/HcModel'
import update from 'immutability-helper';
import { validateProfile } from './Validation'
import { isValid, isInArray, getRecommendedDpi, getOverrideFromSettings, clamp } from '../util'

// Profile when it was last saved, for reverting
let lastSavedProfile = {}

// States
const initialState = {
    profile: {
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
        options: {},
        modified: false
    },
    wizard: {
        wizardCompleted: false,
        activePage: 1,
        pagesReady: [true, false, true, false, true],
        monitorConcern: false,
        monitorSelected: false,
        gamePagesRevealed: 1,
        monitorsExpanded: { "4:3":false, "16:9": false, "16:10":false, "21:9": true }
    },
    ui: {
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
            ready: false,
            login: {
                username: "",
                password: "",
                ready: false
            },
            register: {
                username: "",
                password: "",
                passwordConfirmation: "",
                ready: false,
                passwordsMatch: false,
                passwordComplex: true
            }
        },
        editingProfile: false,
        drawerOpenOnMobile: false,
        mobileMenuOpen: false,
        selectedMenuItem: Symbols.HOME_MENU,
        userMenuOpen: false,
    },
    identity: {
        email: null,
        alias: null,
        verified: false,
        loggedIn: false,
        jwt: "",
        lastSaveAttempt: null
    }
}

// Reducers
function profileReducer (state = initialState, action) {
    switch(action.type) {
        case Symbols.SELECT_MONITOR:
            if(action.value != null)
            {
                // Update dpi if still doing wizard
                let newMouseDpi = state.profile.settings.dpi
                if(!state.wizard.wizardCompleted) {
                    newMouseDpi = action.value.recommendedDpi
                }
                return update(state, {
                    profile: {
                        settings: {
                            monitor: { $set: action.value },
                            dpi: { 
                                actual: { $set: newMouseDpi },
                                recommended: {$set: newMouseDpi }
                            },
                            usingCustomMonitor: {$set: action.value === state.profile.customMonitor }
                        },
                        modified: { $set: new Date().getTime() }
                    }
                })
            }
            else {
                return state;
            }
        case Symbols.SELECT_REFRESH_RATE:
            if(action.value != null)
                return update(state, {
                    profile: {
                        refreshRate: { $set: action.value },
                        modified: { $set: new Date().getTime() }
                    }
                })
            else return state
        case Symbols.TOGGLE_GAME:
            if(isValid(action.value) && games.hasOwnProperty(action.value.alias)) {
                // See if we have this game already
                let index = state.profile.ownedGames.indexOf(action.value.alias)
                if(index > -1) {
                    // Remove game
                    return update(state, {
                        profile: {
                            ownedGames: { $splice: [[index, 1]] },
                            modified: { $set: new Date().getTime() }
                        }
                    })
                }
                else {
                    // Add game
                    return update(state, {
                        profile: {
                            ownedGames: { $push: [action.value.alias] },
                            options: { 
                                [action.value.alias]: { $set: action.value.getDefaultOptions() }
                            },
                            modified: { $set: new Date().getTime() }
                        }
                    })
                }
            }
            else return state
        case Symbols.WIZARD_NEXT:
            if(state.wizard.activePage == 3)
            {
                let recommendedSensitivity = getRecommendedDpi(state.profile.ownedGames)
                return update(state, {
                    profile: {
                        settings: {
                            sensitivity: {
                                actual: { $set: recommendedSensitivity},
                                recommended: { $set: recommendedSensitivity }
                            }
                        },
                        overrides: { $set: {} },
                        gamesOverriden: { $set: [] }
                    }
                })
            }
            return state
        case Symbols.SAVE_PROFILE:
            if(action.value != "undefined")
            {
                return update(state, {
                    profile: {
                        settings: {
                            sensitivity: {
                                actual: { $set: action.value.sensitivity }
                            },
                            dpi: {
                                actual: { $set: action.value.dpi }
                            },
                            monitor: { $set: action.value.monitor },
                            usingCustomMonitor: { $set: action.value.monitor == action.value.customMonitor }
                        },
                        customMonitor: { $set: action.value.customMonitor },
                        modified: { $set: new Date().getTime() }
                    }
                })
            }
            return state
        case Symbols.SET_CUSTOM_MONITOR_WIDTH:
            if(action.value != "undefined") {
                let cMonitor = {
                    ...state.profile.customMonitor,
                    name: action.value + "x" + state.profile.customMonitor.height,
                    recommendedDpi: clamp(400 * Math.ceil(((state.profile.customMonitor.height - 600) / 400)), 400, 6400),
                    width: action.value,
                    usable: action.value > 0 && state.profile.customMonitor.height > 0
                }
                return update(state, {
                    profile: {
                        customMonitor: { $set: cMonitor },
                        settings: {
                            monitor: { $set: state.profile.settings.usingCustomMonitor ? cMonitor : state.profile.settings.monitor }
                        },
                        modified: { $set: new Date().getTime() }
                    }
                })
            }
            else
                return state
        case Symbols.SET_CUSTOM_MONITOR_HEIGHT:
            if(action.value != "undefined") {
                let cMonitor = {
                    ...state.profile.customMonitor,
                    name: state.profile.customMonitor.width + "x" + action.value,
                    recommendedDpi: clamp(400 * Math.ceil(((state.profile.customMonitor.height - 600) / 400)), 400, 6400),
                    height: action.value,
                    usable: action.value > 0 && state.profile.customMonitor.width > 0
                }
                return update(state, {
                    profile: {
                        customMonitor: { $set: cMonitor},
                        settings: {
                            monitor: { $set: state.profile.settings.usingCustomMonitor ? cMonitor : state.profile.settings.monitor }
                        },
                        modified: { $set: new Date().getTime() }
                    }
                })
            }
            else
                return state
        case Symbols.SET_GAME_OVERRIDE:
            if(isValid(action.value.gameName)) {
                if(action.value.set)
                {
                    // If we haven't overriden game yet, give new overrides from current settings
                    if(!state.profile.overrides.hasOwnProperty(action.value.gameName))
                    {
                        // See if a profile exists, and use a generic one otherwise
                        let overrides = {}
                        if(state.profile.ready)
                            overrides = getOverrideFromSettings(state.profile.settings)
                        else
                            overrides = getOverrideFromSettings(null)
                        return update(state, {
                            profile: {
                                gamesOverriden: { $push: [action.value.gameName] },
                                overrides: {
                                    [action.value.gameName]: {$set: overrides}
                                },
                                modified: { $set: new Date().getTime() }
                            }
                        })
                    }
                    else
                        return update(state, {
                            profile: {
                                gamesOverriden: { $push: [action.value.gameName] },
                                modified: { $set: new Date().getTime() }
                            }
                        })
                }
                else    
                {
                    // Find the index of that game
                    return update(state, {
                        profile: {
                            gamesOverriden: { $set: state.profile.gamesOverriden.filter( (item) => item !== action.value.gameName) },
                            modified: { $set: new Date().getTime() }
                        }
                    })
                }
            }
            else
                return state
        case Symbols.UPDATE_GAME_OVERRIDE:
            if(isValid(action.value.gameName)) {
                if(action.value.override == 'cm360')
                    return update(state, {
                        profile: {
                            overrides: {
                                [action.value.gameName]: {
                                    sensitivity: {
                                        actual: {$set: action.value.value}
                                    }
                                }
                            },
                            modified: { $set: new Date().getTime() }
                        }
                    })
                else if(action.value.override == 'dpi')
                    return update(state, {
                        profile: {
                            overrides: {
                                [action.value.gameName]: {
                                    dpi: {
                                        actual: {$set: action.value.value}
                                    }
                                }
                            },
                            modified: { $set: new Date().getTime() }
                        }
                    })
                else if(action.value.override == 'resolutionx')
                    return update(state, {
                        profile: {
                            overrides: {
                                [action.value.gameName]: {
                                    monitor: {
                                        width: {$set: action.value.value}
                                    }
                                }
                            },
                            modified: { $set: new Date().getTime() }
                        }
                })
                else if(action.value.override == 'resolutiony')
                    return update(state, {
                        profile: {
                            overrides: {
                                [action.value.gameName]: {
                                    monitor: {
                                        height: {$set: action.value.value}
                                    }
                                }
                            },
                            modified: { $set: new Date().getTime() }
                        }
                    })
                else
                    return state
            }
            else
                return state
        case Symbols.UPDATE_GAME_OPTION:
            // See if we have these options yet
            if(!state.profile.options.hasOwnProperty(action.value.gameAlias))
                state.profile.options[action.value.gameAlias] = games[action.value.gameAlias].getDefaultOptions()
            return update(state, {
                profile: {
                    options:{
                        [action.value.gameAlias]: {
                            [action.value.optionName]: { $set: action.value.value }
                        }
                    },
                    modified: { $set: new Date().getTime() }
                }
            })
        case Symbols.LOGIN_SUCCESS:
            // TODO make sure profile is good
            console.log(action.value.profile)
            if(action.value.profile != null)
                return update(state, {
                    profile: { $set: loadProfileTransform(action.value.profile) }
                })
            else
                return state
        case Symbols.SAVE_SUCCESS:
          return update(state, {
                profile: {
                    // Only set modified to false if the user hasn't updated something since we last saved the profile
                    modified: { $set: state.identity.lastSaveAttempt < state.profile.modified ? true : false }
                }
            })
        default:
            return state
    }
}

function wizardReducer (state = initialState, action) {
    switch(action.type) {
        case Symbols.SELECT_MONITOR:
            if(state.profile.settings.monitor != "undefined" && state.profile.settings.monitor.usable)
                return update(state, {
                    wizard: {
                        pagesReady: {
                            1: { $set: true }
                        }
                    }
                })
            return state
        case Symbols.SET_CUSTOM_MONITOR_WIDTH:
            if(state.profile.settings.monitor != "undefined" && state.profile.settings.monitor.usable)
                return update(state, {
                    wizard: {
                        pagesReady: {
                            1: { $set: true }
                        }
                    }
                })
            return state
        case Symbols.SET_CUSTOM_MONITOR_HEIGHT:
            if(state.profile.settings.monitor != "undefined" && state.profile.settings.monitor.usable)
                return update(state, {
                    wizard: {
                        pagesReady: {
                            1: { $set: true }
                        }
                    }
                })
            return state
        case Symbols.WIZARD_NEXT:
            if(state.wizard.activePage < 4 && state.wizard.pagesReady[state.wizard.activePage]) {
                // Set the next page
                return update(state, {
                    wizard: {
                        activePage: { $set: state.wizard.activePage + 1 },
                        gamePagesRevealed: { $set: 1}
                    }
                })
            }
            else if(state.wizard.activePage == 4 && state.wizard.pagesReady[state.wizard.activePage])
            {
                // Finish the wizard
                return update(state, {
                    wizard: {
                        wizardCompleted: { $set: true }
                    },
                    profile: {
                        ready: {$set: true }
                    }
                })
            }
            else
                return state
        case Symbols.WIZARD_BACK:
            if(state.wizard.activePage > 1) {
                return update(state, {
                    wizard: {
                        activePage: { $set: state.wizard.activePage - 1 },
                        gamePagesRevealed: { $set: 1}
                    }
                })
            }
        case Symbols.EXPAND_MONITOR_SECTION:
            if(action.value != "undefined")
            {
                let category = String(action.value)
                return update(state, {
                    wizard: {
                        monitorsExpanded: {
                            [category]: {$set: true}
                        }
                    }
                })
            }
            return state
        case Symbols.SHOW_MORE_GAMES:
            let newValue = state.wizard.gamePagesRevealed + 1
            return update(state, {
                wizard: {
                    gamePagesRevealed: { $set: newValue }
                }
            })
        case Symbols.TOGGLE_GAME:
            if(state.profile.ownedGames.length < 1)
                return update(state, {
                    wizard: {
                        pagesReady: {
                            3: { $set: false }
                        }
                    }
                })
            else
                return update(state, {
                    wizard: {
                        pagesReady: {
                            3: { $set: true }
                        }
                    }
                })
        default:
            return state;
    }
}

function uiReducer (state = initialState, action) {
    switch(action.type) {
        case Symbols.OPEN_SIDEBAR:
            return update(state, {
                ui: {
                    mobileMenuOpen: { $set: true }
                }
            })
        case Symbols.CLOSE_SIDEBAR:
            return update(state, {
                ui: {
                    mobileMenuOpen: { $set: false }
                }
            })
        case Symbols.SELECT_SIDEBAR_ITEM:
            //if(!state.profile.ready)
                return update(state, {
                    ui: {
                        mobileMenuOpen: { $set: false },
                        selectedMenuItem: { $set: action.value},
                        // alert: {
                        //     open: { $set: true },
                        //     text: { $set: "Please complete the wizard first!"}
                        // }
                    }
                })
            //     })
            // else
            //     return state
        case Symbols.CLOSE_ALERT:
            return update(state, {
                ui: {
                    alert: {
                        open: { $set: false }
                    }
                }
            })
        case Symbols.START_EDIT_PROFILE:
        return update(state, {
            ui: {
                editingProfile: {$set: true}
            }
        })
        case Symbols.CANCEL_EDIT_PROFILE:
        return update(state, {
            ui: {
                editingProfile: {$set: false}
            }
        })
        case Symbols.SAVE_PROFILE:
            return update(state, {
                ui: {
                    editingProfile: {$set: false}
                }
            })
        case Symbols.SET_GAMEPAGE_SORT:
            return update(state, {
                ui: {
                    gameSelect: {
                        sort: {$set: action.value}
                    }
                }
            })
        case Symbols.SET_GAMEPAGE_FILTER:
            return update(state, {
                ui: {
                    gameSelect: {
                        filterQuery: {$set: action.value}
                    }
                }
            })
        case Symbols.OPEN_USER_MENU:
            return update(state, {
                ui: {
                    userMenuOpen: { $set: true }
                }
            })
        case Symbols.CLOSE_USER_MENU:
            return update(state, {
                ui: {
                    userMenuOpen: { $set: false }
                }
            })
        case Symbols.OPEN_ID_DIALOG:
            if(isValid(action.value))
                return update(state, {
                    ui: {
                        identity: {
                            dialogOpen: { $set: true },
                            dialogFunction: { $set: action.value }
                        }
                    }
                })
            else
                return update(state, {
                    ui: {
                        identity: {
                            dialogOpen: { $set: true },
                        }
                    }
                })
        case Symbols.CLOSE_ID_DIALOG:
            return update(state, {
                ui: {
                    identity: {
                        dialogOpen: { $set: false },
                        login: { 
                            email: { $set: "" },
                            password: { $set: "" },
                            ready: { $set: false }
                        },
                        register: { 
                            email: { $set: "" },
                            password: { $set: "" },
                            passwordConfirmation: { $set: "" },
                            ready: { $set: false }
                        },
                        error: { $set: "" }
                    }
                }
            })
        case Symbols.ID_ACTION_STARTED:
            return update(state, {
                ui: {
                    identity: {
                        actionPending: { $set: true }
                    }
                }
            })
        case Symbols.SAVE_SUCCESS:
            return update(state, {
                ui: {
                    identity: {
                        actionPending: { $set: false }
                    }
                }
            })
        case Symbols.ID_ACTION_FINISHED:
            return update(state, {
                ui: {
                    identity: {
                        actionPending: { $set: false }
                    }
                }
            })
        case Symbols.SET_ID_FUNCTION:
            if(action.value != "undefined")
                return update(state, {
                    ui: {
                        identity: {
                            dialogFunction: { $set: action.value },
                        }
                    }
                })
            else
                return state
        case Symbols.SET_ID_FAILURE:
            return update(state, {
                ui: {
                    identity: {
                        error: { $set: action.value },
                        actionPending: { $set: false }
                    }
                }
            })
        case Symbols.LOGIN_SUCCESS:
            return update(state, {
                ui: {
                    identity: {
                        actionPending: { $set: false },
                        dialogOpen: { $set: false }
                    }
                }
            })
        case Symbols.SET_ID_FIELD:
        if(isValid(action.value.field))
        {
            console.log(action.value)
            // Check for issues in input
            let j = { 
                email: state.ui.identity.email,
                password: state.ui.identity.password,
                passwordConfirmation: state.ui.identity.passwordConfirmation,
                ready: false,
                passwordsMatch: false,
                passwordComplex: false,
                error: state.ui.identity.error
            }
            j[action.value.field] = action.value.value
            switch(state.ui.identity.dialogFunction) {
                case "LOGIN":
                    j.ready = (j.email && j.password)
                    j.passwordsMatch = false
                    break
                case "REGISTER":
                    j.passwordsMatch = j.password === j.passwordConfirmation
                    j.passwordComplex = true // TODO actually check on client side
                    j.ready = (j.email && j.password && j.passwordConfirmation && j.passwordsMatch && j.passwordComplex)  // TODO check for valid email and password complexity
                    if(j.password && j.passwordConfirmation)
                        if(!j.passwordsMatch)
                            j.error = "Passwords do not match."
                        else
                            j.error = ""
                    break
            }
            // Return state
            return update(state, {
                    ui: {
                        identity: {
                            email: { $set: j.email },
                            password: { $set: j.password },
                            passwordConfirmation: { $set: j.passwordConfirmation },
                            passwordsMatch: { $set: j.passwordsMatch },
                            passwordComplex: { $set: j.passwordComplex },
                            ready: { $set: j.ready },
                            error: { $set: j.error }
                        }
                    }
                })
            }
            else
            {
                return state
            }
        default:
            return state
    }
}

function identityReducer (state = initialState, action)  {
    switch(action.type) {
        case Symbols.LOGIN_SUCCESS:
            return update(state, {
                identity: {
                    email: { $set: action.value.email },
                    verified: { $set: action.value.verified },
                    alias: { $set: action.value.alias },
                    jwt: { $set: action.value.jwt },
                    loggedIn: { $set: true }
                }
            })
        case Symbols.ID_ACTION_STARTED:
            if(action.value && action.value.type == "SAVE")
                return update(state, {
                    identity: {
                        lastSaveAttempt: { $set: new Date().getTime() }
                    }
                })
        case Symbols.LOGOUT: 
            return initialState
        default:
            return state
    }
}

const updateCustomMonitorDetails = customMonitor => {

}

// Combine reducers
const rootReducer = reduceReducers(
    profileReducer,
    wizardReducer,
    uiReducer,
    identityReducer
)

/*
 * Persistence
 */

export const saveProfileTransform = inboundState => {
    if(inboundState.ready)
        return { 
            ...inboundState,
            modified: false,
            settings: {
                ...inboundState.settings,
                monitor: inboundState.settings.usingCustomMonitor ? inboundState.settings.monitor : [inboundState.settings.monitor.aspectRatio, inboundState.settings.monitor.name]
            }
        }
    else
        return inboundState
}

export const loadProfileTransform = outboundState => {
    if(outboundState.ready)
    {
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

// Transform owned games from objects to keys and back
const HCTransform = createTransform(
    (inboundState, key) => 
    {
        switch(key) {
            case 'profile':
                return(saveProfileTransform(inboundState))
            default:
                return inboundState
        }
    },
    (outboundState, key) => 
    {
        switch(key) {
            case 'profile':
                return(loadProfileTransform(outboundState))
            default:
                return outboundState
        }
    },
    { whitelist: ['profile', 'identity'] });

// Config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['profile', 'identity'],
    transforms: [HCTransform]
}

// Create and export persisted reducer, connected to router + history
const persistedReducer = persistReducer(persistConfig, rootReducer)
// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
// Create store
export const store = createStore(
  connectRouter(history)(persistedReducer), // new root reducer with router state
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      // ... other middlewares ...
    ),
  ),
)
export const persistor = persistStore(store)