// Core imports
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider } from 'material-ui/styles';
// Utility imports
import theme from './theme.js'
import HcModel from './hc-model/HcModel'
// Pages & styles
import HcRoot from './hc-components/HcRoot'
import WizardHome from './hc-pages/WizardHome'
import RoutingTestPage from './hc-pages/RoutingTestPage'
import styles from './index.css'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <HcRoot model={HcModel}>
          <div>
            <Route exact path="/" component={WizardHome} />
            <Route path="/test" component={RoutingTestPage} />
          </div>
        </HcRoot>
      </Router>
    </MuiThemeProvider>
  );
}

render(<App/>, document.querySelector('#app'));