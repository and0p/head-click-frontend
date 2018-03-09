// React imports
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider } from 'material-ui/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Utility imports
import HcRedux from './hc-redux/HcRedux'
import theme from './theme.js'
import HcModel from './hc-model/HcModel'
// Pages & styles
import HcRoot from './hc-components/HcRoot'
import WizardHome from './hc-pages/WizardHome'
import RoutingTestPage from './hc-pages/RoutingTestPage'
import GamePage from './hc-pages/GamePage'
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

  constructor(props) {
    super(props);
    this.state = {
      openPage: "test"
    }
  }

  render() {
    return(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <HcRoot model={HcModel}>
            <div>
              <Route exact path="/" component={WizardHome} />
              <Route path="/test" component={RoutingTestPage} />
              <Route path="/game/:name" component={GamePage} />
            </div>
          </HcRoot>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
  }

}

render(<App/>, document.querySelector('#app'));