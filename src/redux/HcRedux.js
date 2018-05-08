import { applyMiddleware, combineReducers, createStore, } from 'redux';
import reduceReducers from 'reduce-reducers'
import * as Symbols from './HcSymbols'
import { games, mice, monitors, customMonitor } from '../model/HcModel'
import update from 'immutability-helper';
import { isValid, isInArray, getRecommendedDpi, getOverrideFromSettings } from '../util'

// States
const initialState = {
    sidebar: {
        mobileMenuOpen: false,
        selectedMenuItem: Symbols.HOME_MENU
    },
    profile: {
        settings: {
            monitor: monitors["16:9"]["1080p"],
            refreshRate: 60,
            dpi: {
                actual: 1200,
                recommended: 1200
            },
            sensitivity: {
                actual: 34,
                recommended: 34
            },
            toggle: {
                actual: null,
                recommended: null
            }
        },
        ownedGames: [],
        ready: false,
        gamesOverriden: [],
        overrides: {}
    },
    wizard: {
        wizardCompleted: false,
        activePage: 0,
        pagesReady: [true, false, true, false, true],
        monitorConcern: false,
        monitorSelected: false,
        gamePagesRevealed: 1,
        monitorsExpanded: { "4:3":false, "16:9": false, "16:10":false, "21:9": true }
    },
    ui: {
        contentComponent: null,
        alert: {
            show: false,
            text: "",
            type: 0
        },
        editingProfile: false,
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
                            }
                        }
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
                        refreshRate: { $set: action.value }
                    }
                })
            else return state
        case Symbols.TOGGLE_GAME:
            if(isValid(action.value) && games.hasOwnProperty(action.value.alias)) {
                // See if we have this game already
                let index = state.profile.ownedGames.indexOf(action.value)
                if(index > -1) {
                    // Remove game
                    return update(state, {
                        profile: {
                            ownedGames: { $splice: [[index, 1]] }
                        }
                    })
                }
                else {
                    // Add game
                    return update(state, {
                        profile: {
                            ownedGames: { $push: [action.value] }
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
                        }
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
                            monitor: { $set: action.value.monitor }
                        }
                    }
                })
            }
            return state
        case Symbols.SET_CUSTOM_MONITOR_WIDTH:
            if(action.value != "undefined") {
                customMonitor.width = action.value
                updateCustomMonitorDetails()
            }
            return update(state, {})
        case Symbols.SET_CUSTOM_MONITOR_HEIGHT:
            if(action.value != "undefined") {
                customMonitor.height = action.value
                updateCustomMonitorDetails()
            }
            return update(state, {})
        case Symbols.SET_GAME_OVERRIDE:
            if(action.value.set)
            {
                // If we haven't overriden game yet, give new overrides from current settings
                if(!state.profile.overrides.hasOwnProperty(action.value.gameName))
                    return update(state, {
                        profile: {
                            gamesOverriden: { $push: [action.value.gameName] },
                            overrides: {
                                [action.value.gameName]: {$set: getOverrideFromSettings(state.profile.settings)}
                            }
                        }
                    })
                else
                    return update(state, {
                        profile: {
                            gamesOverriden: { $push: [action.value.gameName] }
                        }
                    })
                
            }
            else    
            {
                // Find the index of that game
                let index = state.profile.gamesOverriden.findIndex(item => item === action.value.gameName);
                return update(state, {
                    profile: {
                        gamesOverriden: { $unset: [index] }
                    }
                })
            }
        case Symbols.UPDATE_GAME_OVERRIDE: 
            if(action.value.override == 'cm360')
                return update(state, {
                    profile: {
                        overrides: {
                            [action.value.gameName]: {
                                sensitivity: {
                                    actual: {$set: action.value.value}
                                }
                            }
                        }
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
                        }
                    }
                })
            else
                return state
        default:
            return state
    }
}

function sidebarReducer (state = initialState, action) {
    switch(action.type) {
        case Symbols.OPEN_SIDEBAR:
            return update(state, {
                sidebar: {
                    mobileMenuOpen: { $set: true }
                }
            })
        case Symbols.CLOSE_SIDEBAR:
            return update(state, {
                sidebar: {
                    mobileMenuOpen: { $set: false }
                }
            })
        case Symbols.SELECT_SIDEBAR_ITEM:
            return update(state, {
                sidebar: {
                    mobileMenuOpen: { $set: false },
                    selectedMenuItem: { $set: action.value}
                }
            })
        default:
            return state;
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
            if(state.wizard.activePage > 0) {
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
        case Symbols.SELECT_SIDEBAR_ITEM:
            if(!state.profile.ready)
                return update(state, {
                    ui: {
                        alert: {
                            open: { $set: true },
                            text: { $set: "Please complete the wizard first!"}
                        }
                    }
                })
            else
                return state
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
        default:
            return state
    }
}

const updateCustomMonitorDetails = () => {
    customMonitor.name = customMonitor.width + "x" + customMonitor.height;
    // Simple recommended DPI
    customMonitor.recommendedDpi = 400 * Math.ceil(((customMonitor.height - 600) / 400))
    if(customMonitor.recommendedDpi > 3200)
        customMonitor.recommendedDpi = 3200
    customMonitor.usable = true;
}

export default reduceReducers(
    profileReducer,
    sidebarReducer,
    wizardReducer,
    uiReducer
)