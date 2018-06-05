// React imports
import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// React router w/ redux
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// Utility imports
import { store, persistor } from './redux/HcRedux'
import theme from './theme.js'
import { PersistGate } from 'redux-persist/integration/react'
// Pages & styles
import Splash from './pages/splash/Splash'
import Dashboard from './pages/dashboard/Dashboard'
import MaterialRoot from './pages/materialroot/MaterialRoot'
import GamePage from './pages/gamepage/GamePage'
import SelectGames from './pages/selectgames/SelectGames.js'
import Wizard from './pages/wizard/Wizard'
import styles from './index.css'
import Alert from './components/Alert'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
// Subscribe console to state changes, while holding onto handle to unsub
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

const homeComponent = state => {
  if(state.profile.ready)
    return <Dashboard />
  else
    return <Splash />
}

// Delete the loading icon
let loader = document.getElementById("loader")
loader.parentElement.removeChild(loader)

class App extends React.Component {

  render() {
    return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <MaterialRoot>
              <Route exact path="/" render={() => homeComponent(store.getState())}/>
              <Route exact path="/wizard" component={Wizard} />
              <Route exact path="/browse_games" component={SelectGames} />
              <Route path="/game/:name" component={GamePage} />
            </MaterialRoot>
            <Alert />
          </MuiThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
    );
  }

}

render(<App/>, document.querySelector('#app'));