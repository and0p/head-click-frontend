import { applyMiddleware, combineReducers, createStore, } from 'redux';
import * as Symbols from './HcSymbols'
import { games, mice, monitors } from '../model/HcModel'

// States
const initialSidebarState = {
    mobileMenuOpen: false,
    selectedMenuItem: Symbols.HOME_MENU,
}

const initialProfileState = {
    monitor: monitors["4:3"]["800x600"],
    refreshRate: 144,
    mouse: mice["Logitech MX 400"],
    dPI: 1200,
    sensitivity: 34,
    ownedGames: [games["overwatch"], games["r6siege"]]
}

const initialWizardState = {
    completed: false,
    activePage: 0,
    pagesReady: [true, false, false, false],
    monitorConcern: false
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
            return state;
    }
}

function wizardState (state = initialWizardState, action) {
    switch(action.type) {
        case Symbols.SET_WIZARD_READY:
            state.pagesReady[action.value] = true
            return Object.assign({}, state)
        case Symbols.SET_WIZARD_NOT_READY:
            state.pagesReady[action.value] = false
            return Object.assign({}, state)
        case Symbols.WIZARD_NEXT:
            if(state.activePage < 4 && state.pagesReady[state.activePage]) {
                return Object.assign({}, state, {
                    activePage: state.activePage + 1
                })
            }
        case Symbols.WIZARD_BACK:
            if(state.activePage > 0) {
                return Object.assign({}, state, {
                    activePage: state.activePage - 1
                })
            }
        default:
            return state;
    }
}

const reducers = {profileState, sidebarState, wizardState }

export default reducers

// export default combineReducers({
//     profileState,
//     sidebarState,
//     wizardState
// })