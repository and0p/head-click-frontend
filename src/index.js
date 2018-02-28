import React from 'react';
import { render } from 'react-dom';
import HcModel from './hc-model/HcModel'
import HcRoot from './hc-components/HcRoot'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
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
      <HcRoot model={HcModel} />
    </MuiThemeProvider>
  );
}

render(<App/>, document.querySelector('#app'));