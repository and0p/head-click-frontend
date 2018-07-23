import { store, saveProfileTransform, loadProfileTransform } from './redux/HcRedux'
import { push } from 'connected-react-router'
import * as Symbols from './redux/HcSymbols'
import axios from 'axios'

const apiHost = 'http://localhost:8081' // 'https://api.head.click'

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
        })
        .catch(error => {
            console.log("errored")
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
                store.dispatch({ type: Symbols.ID_ACTION_FINISHED })
            })
    }
}

export const logout = () => {
    store.dispatch({ type: Symbols.LOGOUT })
    store.dispatch(push('/'))
}

export const checkJWT = jwt => {
    return true
}