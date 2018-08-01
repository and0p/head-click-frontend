import { store, saveProfileTransform, loadProfileTransform } from './redux/HcRedux'
import { push } from 'connected-react-router'
import * as Symbols from './redux/HcSymbols'
import axios from 'axios'

const apiHost = 'https://api.head.click' // 'http://localhost:8081'

let lastAliasChecked = null

export const register = () => {
    let state = store.getState()
    let options = state.ui.identity
    let identity = state.identity
    // Check that the passwords match
    if(!options.ready)
    {
        return
    }
    // Dispatch that we're starting a request
    store.dispatch({ type: Symbols.ID_ACTION_STARTED })
    // Send request
    axios.post(apiHost + '/register', { email: options.email, password: options.password, profile: saveProfileTransform(state.profile) })
        .then(response => {
            store.dispatch(
                {
                    type: Symbols.LOGIN_SUCCESS, 
                    value: { 
                        email: response.data.email, 
                        alias: response.data.alias,
                        profile: response.data.profile,
                        verified: response.data.verified,
                        jwt: response.data.token
                    }
                })
        })
        .catch(error => {
            store.dispatch({ type: Symbols.SET_ID_FAILURE, value: "Registration failed!"})
        })
}

export const verify = () => {
    let state = store.getState()
    if(!state.ui.identity.verificationTokenReady)
    {
        return
    }
    let jwt = state.identity.jwt
    let token = state.ui.identity.verificationToken
    // Dispatch that we're starting a request
    store.dispatch({ type: Symbols.ID_ACTION_STARTED })
    // Send request
    axios.post(apiHost + '/verify', { token: token },
    { headers: {'Authorization': "bearer " + jwt, 'Content-Type': 'application/json'} })
        .then(response => {
            store.dispatch({type: Symbols.VERIFY_SUCCESS})
        })
        .catch(error => {
            store.dispatch({ type: Symbols.SET_VERIFICATION_FAILURE, value: "Verification failed!"})
        })
}

export const login = () => {
    let state = store.getState()
    let options = state.ui.identity
    let identity = state.identity
    // Dispatch that we're starting a request
    store.dispatch({ type: Symbols.ID_ACTION_STARTED })
    axios.post(apiHost + '/login', { email: options.email, password: options.password })
        .then(response => {
            store.dispatch({
                type: Symbols.LOGIN_SUCCESS,
                value: {
                    email: response.data.email,
                    alias: response.data.alias,
                    profile: response.data.profile,
                    verified: response.data.verified,
                    jwt: response.data.token
                }
            })
            store.dispatch(push('/'))
        })
        .catch(error => {
            store.dispatch({ type: Symbols.SET_ID_FAILURE, value: "Login failed!"})
        })
}

export const save = () => {
    let state = store.getState()
    // See if the user is logged in, if not they need to make an account
    if(!store.getState().identity.loggedIn)
        store.dispatch({ type: Symbols.OPEN_ID_DIALOG, value: "REGISTER" })
    else {
        // Send the profile to the server, identifying with your JWT token
        let jwt = state.identity.jwt
        // Dispatch that we're starting a request
            store.dispatch({ type: Symbols.ID_ACTION_STARTED, value : { type: "SAVE" } })
        // Send POST to update page
        axios.post(apiHost + '/save',
            saveProfileTransform(state.profile),
            { headers: {'Authorization': "bearer " + jwt, 'Content-Type': 'application/json'} })
            .then(response => {
                store.dispatch({ type: Symbols.SAVE_SUCCESS })
            })
            .catch(error => {
                store.dispatch({ type: Symbols.SAVE_FAIL })
            })
    }
}

// Takes callback from react component, waits to see if they're still typing, and calls API
export const checkAlias = (alias, callback) => {
    lastAliasChecked = alias
    // Wait half a second to see if the user is still typing, and then call the API
    if(alias != null)
        setTimeout(() => { if(lastAliasChecked === alias) checkAliasCallback(alias, callback)}, 500)
}

const checkAliasCallback = (alias, callback) => {
    let state = store.getState()
    let jwt = state.identity.jwt
    // Send request
    axios.post(apiHost + '/check_alias', { alias: alias },
    { headers: {'Authorization': "bearer " + jwt, 'Content-Type': 'application/json'} })
        .then(response => {
            // Make sure the user hasn't changed what they want
            if(lastAliasChecked === alias && lastAliasChecked)
                callback(alias, response.data)
        })
        .catch(error => {
            // Make sure the user hasn't changed what they want
            if(lastAliasChecked === alias && lastAliasChecked)
                callback(alias, "Error checking name")
        })
}

export const changeAlias = (alias) => {
    let state = store.getState()
    let jwt = state.identity.jwt
    // Send request
    axios.post(apiHost + '/change_alias', { alias: alias },
    { headers: {'Authorization': "bearer " + jwt, 'Content-Type': 'application/json'} })
        .then(response => {
            // Tell redux it worked
            store.dispatch({type: Symbols.CHANGE_ALIAS_SUCCESS, value: alias })
        })
        .catch(error => {
            // Tell redux it failed
            store.dispatch({type: Symbols.CHANGE_ALIAS_FAILURE })
        })
}

export const logout = () => {
    store.dispatch({ type: Symbols.LOGOUT })
    store.dispatch(push('/'))
}

export const checkJWT = jwt => {
    return true
}