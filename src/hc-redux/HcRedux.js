import { applyMiddleware, combineReducers, createStore, } from 'redux';
import * as Symbols from './HcSymbols'
import { games, mice, monitors } from '../hc-model/HcModel'
import Game from '../hc-model/Game'

// States
const initialSidebarState = {
    mobileMenuOpen: false,
    selectedMenuItem: Symbols.HOME_MENU,
}

const initialProfileState = {
    monitor: monitors["800x600"],
    refreshRate: 144,
    mouse: mice["Logitech MX 400"],
    dPI: 1200,
    sensitivity: 34,
    ownedGames: [games["overwatch"], games["r6siege"]]
}

// Reducers
function profileState (state = initialProfileState, action) {
    switch(action.type) {
        case Symbols.SELECT_MONITOR:
            return Object.assign({}, state, {
                monitor: action.value,
            })
        case Symbols.SELECT_MOUSE:
            return Object.assign({}, state, {
                mouse: action.value,
            })
        default:
            return state
    }
}

function sidebarState (state = initialSidebarState, action) {
    switch(action.type) {
        case Symbols.OPEN_SIDEBAR:
            return Object.assign({}, state, {
                mobileMenuOpen: true,
            })
            break;
        case Symbols.CLOSE_SIDEBAR:
            return Object.assign({}, state, {
                mobileMenuOpen: false
            })
            break;
        case Symbols.SELECT_SIDEBAR_ITEM:
            console.log(action.type)
            return Object.assign({}, state, {
                mobileMenuOpen: false,
                selectedMenuItem: action.value
            })
            break;
        default:
            return state
    }
}

// Export
export default combineReducers({
    profileState,
    sidebarState
})