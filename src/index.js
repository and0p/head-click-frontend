// React imports
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider } from 'material-ui/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Utility imports
import HcRedux from './redux/HcRedux'
import theme from './theme.js'
// Pages & styles
import MaterialRoot from './pages/materialroot/MaterialRoot'
import GamePage from './pages/gamepage/GamePage'
import WizardHome from './pages/WizardHome'
import RoutingTestPage from './pages/RoutingTestPage'
import styles from './index.css'

// Create Redux store from reducers in HcRedux
let store = createStore(HcRedux);
// Log initial state
console.log(store.getState());
// Subscribe console to state changes, while holding onto handle to unsub
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

class App extends React.Component {

  render() {
    return(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <MaterialRoot>
            <div>
              <Route exact path="/" component={WizardHome} />
              <Route path="/test" component={RoutingTestPage} />
              <Route path="/game/:name" component={GamePage} />
            </div>
          </MaterialRoot>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
  }

}

render(<App/>, document.querySelector('#app'));