import { applyMiddleware, combineReducers, createStore, } from 'redux';
import reduceReducers from 'reduce-reducers'
import * as Symbols from './HcSymbols'
import { games, mice, monitors } from '../model/HcModel'
import update from 'immutability-helper';
import { isValid } from '../util'

// States
const initialState = {
    sidebar: {
        mobileMenuOpen: false,
        selectedMenuItem: Symbols.HOME_MENU
    },
    profile: {
        monitor: monitors["16:9"]["1080p"],
        refreshRate: 60,
        mouse: mice["Logitech MX 400"],
        dPI: 1200,
        sensitivity: 34,
        ownedGames: [games["overwatch"], games["r6siege"]]
    },
    wizard: {
        wizardCompleted: false,
        activePage: 0,
        pagesReady: [true, false, false, false],
        monitorConcern: false,
        monitorSelected: false
    },
    ui: {
        contentComponent: null,
        alert: null
    }
}

// Reducers
function profileReducer (state = initialState, action) {
    switch(action.type) {
        case Symbols.SELECT_MONITOR:
            if(action.value != null)
            {
                // Update dpi if still doing wizard
                let newMouseDpi = state.profile.dPI
                if(!state.wizard.wizardCompleted) {
                    newMouseDpi = action.value.recommendedDpi
                }
                return update(state, {
                    profile: {
                        monitor: { $set: action.value },
                        dPI: { $set: newMouseDpi }
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
        case Symbols.SELECT_MOUSE:
            if(action.value != null)
            return update(state, {
                profile: {
                    mouse: { $set: action.value }
                }
            })
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
            if(state.profile.monitor != "undefined")
                return update(state, {
                    wizard: {
                        pagesReady: {
                            1: { $set: true }
                        }
                    }
                })
            return state
        case Symbols.WIZARD_NEXT:
            let newAlert = null
            if(state.wizard.activePage == 1)
                newAlert = Symbols.DPI_ASSIGN_ALERT
            if(state.wizard.activePage < 4 && state.wizard.pagesReady[state.wizard.activePage]) {
                return update(state, {
                    wizard: {
                        activePage: { $set: state.wizard.activePage + 1 }
                    },
                    ui: {
                        alert: { $set: newAlert }
                    }
                })
            }
        case Symbols.WIZARD_BACK:
            if(state.wizard.activePage > 0) {
                return update(state, {
                    wizard: {
                        activePage: { $set: state.wizard.activePage - 1 }
                    }
                })
            }
        default:
            return state;
    }
}

function uiReducer (state = initialState, action) {
    switch(action.type) {
        case Symbols.CLOSE_ALERT:
            return update(state, {
                ui: {
                    alert: { $set: null }
                }
            })
        default:
            return state;
    }
}

export default reduceReducers(
    profileReducer,
    sidebarReducer,
    wizardReducer,
    uiReducer
)