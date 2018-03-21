import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#8941af'
      },
      secondary: {
        main: '#4878c0'
      },
      custom: {
        red: '#DA3345',
        blue: '#4979C3',
        yellow: '#DEBA24',
        purple: '#8B41B0',
        teal: '#3EA3AD',
      },
      background: {
        default: "#1e1d23",
        light: "#323141",
        paper: "#25252f"
      },
      type: 'dark'
    },
  });

export default theme;