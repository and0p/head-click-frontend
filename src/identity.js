import { store, saveProfileTransform } from './redux/HcRedux'
import { push } from 'connected-react-router'
import * as Symbols from './redux/HcSymbols'
import axios from 'axios'

const apiHost = "localhost:3001" // api.head.click:443

export const login = (email, password) => {
    // Dispatch that we're starting a request
    store.dispatch({ type: Symbols.ID_ACTION_STARTED })
    let body = JSON.stringify('')
    axios.post('http://' + apiHost + '/login', { username: email, password: password })
        .then(response => {
            store.dispatch({ type: Symbols.LOGIN_SUCCESS, value: { email: response.data.user.username, jwt: response.data.token, profile: response.data.user.profile }})
            store.dispatch({ type: Symbols.ID_ACTION_FINISHED })
        })
        .catch(error => {
            store.dispatch({ type: Symbols.ID_ACTION_FINISHED })
            store.dispatch({ type: Symbols.SET_ID_FAILURE, value: "Login failed!"})
        })
}

export const save = () => {
    let state = store.getState()
    let jwt = state.identity.jwt
    // Dispatch that we're starting a request
        store.dispatch({ type: Symbols.ID_ACTION_STARTED })
    // Send POST to update page
    axios.post('http://' + apiHost + '/save',
    { profile: JSON.stringify(saveProfileTransform(state.profile)) },
    { headers: {'Authorization': "bearer " + jwt} })
        .then(response => {
            console.log(response)
            store.dispatch({ type: Symbols.ID_ACTION_FINISHED })
            //store.dispatch({ type: Symbols.LOGIN_SUCCESS, value: { email: response.data.user.username, jwt: response.data.token, profile: response.data.user.profile }})
        })
        .catch(error => {
            store.dispatch({ type: Symbols.ID_ACTION_FINISHED })
            console.log(error)
            //store.dispatch({ type: Symbols.SET_ID_FAILURE, value: "Login failed!"})
        })
}

export const logout = () => {
    store.dispatch({ type: Symbols.LOGOUT })
    store.dispatch(push('/'))
}

export const checkJWT = jwt => {
    return true
}