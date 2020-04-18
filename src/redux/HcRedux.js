// Redux imports
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import reduceReducers from 'reduce-reducers'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import storage from 'redux-persist/lib/storage'
// Reducers
import { profileReducer, validateProfile } from './reducers/profile'
import wizardReducer from './reducers/wizard'
import uiReducer from './reducers/ui'
import identityReducer from './reducers/identity'
// HC import
import * as Symbols from './HcSymbols'
import { games, mice, monitors, monitorsFlat, customMonitor } from '../model/HcModel'
import update from 'immutability-helper'
import { isValid, isInArray, getRecommendedDpi, getOverrideFromSettings, recommendSensitivity, getTypicalGameStyle, checkPassword } from '../util'
import { clamp } from '../math'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory()
history.listen((location, action) => {
    window.scrollTo(0, 0)
    if (window.ga && typeof window.ga === "function") {
        window.ga('set', 'page', location.pathname + location.search);
        window.ga('send', 'pageview');
    }
});

// Combine reducers
const rootReducer = combineReducers({
    profile: profileReducer,
    wizard: wizardReducer,
    ui: uiReducer,
    identity: identityReducer,
    history: connectRouter(history)
})

/*
 * Persistence
 */

export const saveProfileTransform = inboundState => {
    if (inboundState.ready)
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


// Profile when it was last saved, for reverting
let lastSavedProfile = {}

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

// Transform owned games from objects to keys and back
const HCTransform = createTransform(
    (inboundState, key) => {
        switch (key) {
            case 'profile':
                return (saveProfileTransform(inboundState))
            default:
                return inboundState
        }
    },
    (outboundState, key) => {
        switch (key) {
            case 'profile':
                return (loadProfileTransform(outboundState))
            default:
                return outboundState
        }
    },
    { whitelist: ['profile', 'identity'] }
);

// Config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['profile', 'identity'],
    transforms: [HCTransform]
}

// Create and export persisted reducer, connected to router + history
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create store
export const store = createStore(
    connectRouter(history)(persistedReducer), // new root reducer with router state
    {},
    compose(
        applyMiddleware(
            routerMiddleware(history), // for dispatching history actions
            // ... other middlewares ...
        ),
    ),
)
export const persistor = persistStore(store)