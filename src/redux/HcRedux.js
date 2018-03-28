import { applyMiddleware, combineReducers, createStore, } from 'redux';
import reduceReducers from 'reduce-reducers'
import * as Symbols from './HcSymbols'
import { games, mice, monitors } from '../model/HcModel'
import update from 'immutability-helper';

// States
const initalState = {
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
        monitorSelected: false,
    }
}

// Reducers
function profileState (state = initalState, action) {
    switch(action.type) {
        case Symbols.SELECT_MONITOR:
            if(action.value != null)
                return update(state, {
                    profile: {
                        monitor: { $set: action.value }
                    }
                })
        case Symbols.SELECT_REFRESH_RATE:
            if(action.value != null)
            return update(state, {
                profile: {
                    refreshRate: { $set: action.value }
                }
            })
        case Symbols.SELECT_MOUSE:
            if(action.value != null)
            return update(state, {
                profile: {
                    mouse: { $set: action.value }
                }
            })
        default:
            return state
    }
}

function sidebarState (state = initalState, action) {
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

function wizardState (state = initalState, action) {
    switch(action.type) {
        case Symbols.SELECT_MONITOR:
            if(state.profile.monitor != "undefined" && state.profile.refreshRate != "undefined")
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
                return update(state, {
                    wizard: {
                        activePage: { $set: state.wizard.activePage + 1 }
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

// const reducers = {
//     profileState,
//     wizardState, 
//     sidebarState 
// }

// export default reducers

export default reduceReducers(
    profileState,
    sidebarState,
    wizardState
)