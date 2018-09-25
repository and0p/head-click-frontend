import { createMuiTheme } from '@material-ui/core/styles';

//'Open Sans'

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
        subtle: '#999999',
        headline: '#FFFFFF'
      },
      background: {
        default: "#1e1d23",
        light: "#323141",
        paper: "#25252f"
      },
      type: 'dark'
    },
    typography: {
      fontFamily: [
        'Open Sans',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      body2: {
        a: {
          '&:hover': {
            color: "#AA00FF"
          } 
        }
      },
      button: {
        a: {
          "&:link": "#000000",
          "&:visited": "#000000"
        }
      },
      display2: {
        fontWeight: 700,
        color: "#FFFFFF"
      }
    },
    overrides: {
      MuiSnackbarContent: {
        root: {
          backgroundColor: "#25252f",
          color: "#FFFFFF"
        },
      },
      MuiToolbar: {
        gutters: {
          paddingLeft: '8px',
          paddingRight: '8px',
        }
      }
    },
  });

export default theme;

export const gradients = {
  purple: {
    background: theme.palette.custom.purple,  // fallback for old browsers
    background: "-webkit-linear-gradient(to right, " + theme.palette.custom.purple + ", #664ebf)",  // Chrome 10-25, Safari 5.1-6
    background: "linear-gradient(300deg, " + theme.palette.custom.purple + ", #664ebf)", //* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+
  },
  blue: {
    background: theme.palette.custom.blue,
    background: "-webkit-radial-gradient(at 60% bottom, " + theme.palette.custom.blue + ", #50aac2)",
    background: "radial-gradient(at 80% bottom, " + theme.palette.custom.blue + ", #50aac2)",
  },
  teal: {
    background: theme.palette.custom.teal,
    background: "-webkit-linear-gradient(to right, " + theme.palette.custom.teal + ", #46bd99)",
    background: "linear-gradient(45deg, " + theme.palette.custom.teal + ", #46bd99)",
  }
}

export const defaultPageCSS = {
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    maxWidth: '1639px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  wizardPageRoot: {
    flex: 1,
    marginTop: theme.spacing.unit * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '800px',
    [theme.breakpoints.up('md')]: {
      paddingBottom: "96px"
    },
    // [theme.breakpoints.down('sm')]: {
    //   paddingBottom: theme.spacing.unit
    // },
  },
  innerRoot: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  headline: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing.unit
    },
    marginBottom: theme.spacing.unit * 2,
    float: "left"
  },
  wizardHeadline: {
    textAlign: "center",
    color: theme.palette.custom.headline
  },
  informationSection: {
    //marginBottom: theme.spacing.unit * 4
  },
  subtle: {
    color: '#999999'
  },
  center: {
    textAlign: "center",
  },
  centerImage: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }
}
// {
//   "breakpoints": {
//     "keys": [
//       "xs",
//       "sm",
//       "md",
//       "lg",
//       "xl"
//     ],
//     "values": {
//       "xs": 0,
//       "sm": 600,
//       "md": 960,
//       "lg": 1280,
//       "xl": 1920
//     }
//   },
//   "direction": "ltr",
//   "mixins": {
//     "toolbar": {
//       "minHeight": 56,
//       "@media (min-width:0px) and (orientation: landscape)": {
//         "minHeight": 48
//       },
//       "@media (min-width:600px)": {
//         "minHeight": 64
//       }
//     }
//   },
//   "overrides": {},
//   "palette": {
//     "common": {
//       "black": "#000",
//       "white": "#fff"
//     },
//     "type": "light",
//     "primary": {
//       "50": "#e3f2fd",
//       "100": "#bbdefb",
//       "200": "#90caf9",
//       "300": "#64b5f6",
//       "400": "#42a5f5",
//       "500": "#2196f3",
//       "600": "#1e88e5",
//       "700": "#1976d2",
//       "800": "#1565c0",
//       "900": "#0d47a1",
//       "A100": "#82b1ff",
//       "A200": "#448aff",
//       "A400": "#2979ff",
//       "A700": "#2962ff",
//       "main": "#2196f3",
//       "light": "#64b5f6",
//       "dark": "#1976d2",
//       "contrastText": "#fff"
//     },
//     "secondary": {
//       "main": "rgb(225, 0, 80)",
//       "light": "rgb(231, 51, 115)",
//       "dark": "rgb(157, 0, 56)",
//       "contrastText": "#fff"
//     },
//     "error": {
//       "light": "#e57373",
//       "main": "#f44336",
//       "dark": "#d32f2f",
//       "contrastText": "#fff"
//     },
//     "grey": {
//       "50": "#fafafa",
//       "100": "#f5f5f5",
//       "200": "#eeeeee",
//       "300": "#e0e0e0",
//       "400": "#bdbdbd",
//       "500": "#9e9e9e",
//       "600": "#757575",
//       "700": "#616161",
//       "800": "#424242",
//       "900": "#212121",
//       "A100": "#d5d5d5",
//       "A200": "#aaaaaa",
//       "A400": "#303030",
//       "A700": "#616161"
//     },
//     "contrastThreshold": 3,
//     "tonalOffset": 0.2,
//     "text": {
//       "primary": "rgba(0, 0, 0, 0.87)",
//       "secondary": "rgba(0, 0, 0, 0.54)",
//       "disabled": "rgba(0, 0, 0, 0.38)",
//       "hint": "rgba(0, 0, 0, 0.38)"
//     },
//     "divider": "rgba(0, 0, 0, 0.12)",
//     "background": {
//       "paper": "#fff",
//       "default": "#fafafa"
//     },
//     "action": {
//       "active": "rgba(0, 0, 0, 0.54)",
//       "hover": "rgba(0, 0, 0, 0.08)",
//       "hoverOpacity": 0.08,
//       "selected": "rgba(0, 0, 0, 0.14)",
//       "disabled": "rgba(0, 0, 0, 0.26)",
//       "disabledBackground": "rgba(0, 0, 0, 0.12)"
//     }
//   },
//   "props": {},
//   "shadows": [
//     "none",
//     "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
//     "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
//     "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
//     "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
//     "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
//     "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
//     "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
//     "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
//     "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
//     "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
//     "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
//     "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
//     "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
//     "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
//     "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
//     "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
//     "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
//     "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
//     "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
//     "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
//     "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
//     "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
//     "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
//     "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)"
//   ],
//   "typography": {
//     "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//     "fontSize": 14,
//     "fontWeightLight": 300,
//     "fontWeightRegular": 400,
//     "fontWeightMedium": 500,
//     "display4": {
//       "fontSize": "7rem",
//       "fontWeight": 300,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "letterSpacing": "-.04em",
//       "lineHeight": "1.14286em",
//       "marginLeft": "-.04em",
//       "color": "rgba(0, 0, 0, 0.54)"
//     },
//     "display3": {
//       "fontSize": "3.5rem",
//       "fontWeight": 400,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "letterSpacing": "-.02em",
//       "lineHeight": "1.30357em",
//       "marginLeft": "-.02em",
//       "color": "rgba(0, 0, 0, 0.54)"
//     },
//     "display2": {
//       "fontSize": "2.8125rem",
//       "fontWeight": 400,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "lineHeight": "1.06667em",
//       "marginLeft": "-.02em",
//       "color": "rgba(0, 0, 0, 0.54)"
//     },
//     "display1": {
//       "fontSize": "2.125rem",
//       "fontWeight": 400,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "lineHeight": "1.20588em",
//       "color": "rgba(0, 0, 0, 0.54)"
//     },
//     "headline": {
//       "fontSize": "1.5rem",
//       "fontWeight": 400,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "lineHeight": "1.35417em",
//       "color": "rgba(0, 0, 0, 0.87)"
//     },
//     "title": {
//       "fontSize": "1.3125rem",
//       "fontWeight": 500,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "lineHeight": "1.16667em",
//       "color": "rgba(0, 0, 0, 0.87)"
//     },
//     "subheading": {
//       "fontSize": "1rem",
//       "fontWeight": 400,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "lineHeight": "1.5em",
//       "color": "rgba(0, 0, 0, 0.87)"
//     },
//     "body2": {
//       "fontSize": "0.875rem",
//       "fontWeight": 500,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "lineHeight": "1.71429em",
//       "color": "rgba(0, 0, 0, 0.87)"
//     },
//     "body1": {
//       "fontSize": "0.875rem",
//       "fontWeight": 400,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "lineHeight": "1.46429em",
//       "color": "rgba(0, 0, 0, 0.87)"
//     },
//     "caption": {
//       "fontSize": "0.75rem",
//       "fontWeight": 400,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
//       "lineHeight": "1.375em",
//       "color": "rgba(0, 0, 0, 0.54)"
//     },
//     "button": {
//       "fontSize": "0.875rem",
//       "textTransform": "uppercase",
//       "fontWeight": 500,
//       "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
//     }
//   },
//   "transitions": {
//     "easing": {
//       "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
//       "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
//       "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
//       "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
//     },
//     "duration": {
//       "shortest": 150,
//       "shorter": 200,
//       "short": 250,
//       "standard": 300,
//       "complex": 375,
//       "enteringScreen": 225,
//       "leavingScreen": 195
//     }
//   },
//   "spacing": {
//     "unit": 8
//   },
//   "zIndex": {
//     "mobileStepper": 1000,
//     "appBar": 1100,
//     "drawer": 1200,
//     "modal": 1300,
//     "snackbar": 1400,
//     "tooltip": 1500
//   },
//   "nprogress": {
//     "color": "#000"
//   }
