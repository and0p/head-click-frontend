import { createMuiTheme } from 'material-ui/styles';

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

export default theme;