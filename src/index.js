// React imports
import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
// React router w/ redux
import { Provider } from 'react-redux';
import { Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
// Utility imports
import { store, history, persistor } from './redux/HcRedux'
import theme from './theme.js'
import { PersistGate } from 'redux-persist/integration/react'
import BeforeUnload from 'before-unload'
// Pages & styles
import Splash from './pages/splash/Splash'
import Dashboard from './pages/dashboard/Dashboard'
import MaterialRoot from './pages/materialroot/MaterialRoot'
import GamePage from './pages/gamepage/GamePage'
import BrowseGames from './pages/BrowseGames/BrowseGames'
import Stats from './pages/stats/Stats.js'
import Wizard from './pages/wizard/Wizard'
import styles from './index.css'
import PrivacyAlert from './components/PrivacyAlert'
import IdentityDialog from './pages/account/IdentityDialog'
import Axios from 'axios'
import ManualConfiguration from './pages/manual_configuration/ManualConfiguration'

// Subscribe console to state changes, while holding onto handle to unsub
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

const homeComponent = state => {
  if (state.profile.ready)
    return <Dashboard />
  else
    return <Splash />
}

// Delete the loading icon
let loader = document.getElementById("loader")
loader.parentElement.removeChild(loader)

new BeforeUnload('Are you sure you want to leave without saving?', function () {
  let state = store.getState();
  return state.profile.ready && state.identity.lastModified > state.identity.lastSaveAttempt;
});

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
              <MaterialRoot>
                <Route exact path="/" render={() => homeComponent(store.getState())} />
                <Route exact path="/wizard" component={Wizard} />
                <Route exact path="/browse_games" component={BrowseGames} />
                <Route exact path="/stats" component={Stats} />
                <Route exact path="/user/:user" component={Stats} />
                <Route exact path="/manual-configuration" component={ManualConfiguration} />
                <Route path="/game/:name" component={GamePage} />
              </MaterialRoot>
              <IdentityDialog />
              <PrivacyAlert />
            </MuiThemeProvider>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

render(<App />, document.querySelector('#app'));
Axios.get("https://api.head.click/check_for_updates")