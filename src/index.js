// React imports
import React from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// React router w/ redux
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
// Utility imports
import reducers from './redux/HcRedux'
import theme from './theme.js'
// Pages & styles
import MaterialRoot from './pages/materialroot/MaterialRoot'
import GamePage from './pages/gamepage/GamePage'
import Wizard from './pages/wizard/Wizard'
import styles from './index.css'

console.log(...reducers)
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
// Create Redux store from reducers in HcRedux
let store = createStore(
  combineReducers({
    ...reducers,
    router:routerReducer
  }),
  applyMiddleware(middleware)
);
// Log initial state
console.log(store.getState());
// Subscribe console to state changes, while holding onto handle to unsub
const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

class App extends React.Component {

  render() {
    return(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <MaterialRoot>
            <Route exact path="/" render={() => <Wizard theme={theme} />}/>
            <Route path="/game/:name" component={GamePage} />
          </MaterialRoot>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
    );
  }

}

render(<App/>, document.querySelector('#app'));