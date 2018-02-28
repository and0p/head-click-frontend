// Core imports
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
// Model imports
import HcModel from './hc-model/HcModel'
// Pages & styles
import HcRoot from './hc-components/HcRoot'
import WizardHome from './hc-pages/WizardHome'
import RoutingTestPage from './hc-pages/RoutingTestPage'
import styles from './index.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#75a0e5',
      main: '#3b70b4',
      dark: '#164178',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    type: 'dark'
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <HcRoot model={HcModel}>
        <Router>
          <div>
            <Route exact path="/" component={WizardHome} />
            <Route path="/test" component={RoutingTestPage} />
          </div>
        </Router>
      </HcRoot>
    </MuiThemeProvider>
  );
}

render(<App/>, document.querySelector('#app'));