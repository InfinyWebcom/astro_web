import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

export default {
  palette: {
    primary: {
      light: '#4326a7',
      main: '#4326a7',
      dark: '#4326a7',
      contrastText: '#FFFF'
    },
    // light: '#4326a7',
    //   main: '#4326a7',
    //   dark: '#4326a7',
    //   contrastText: '#4326a7'
    secondary: {
      light: red[300],
      main: red['A200'],
      dark: red[700],
      contrastText: '#fff'
    },
    warning: {
      light: '#ffee33',
      main: '#ffea00',
      dark: '#b2a300'
    }
  },
  status: {
    danger: 'orange',
  },
  typography: {
    button: {
      fontWeight: 400,
      textAlign: 'capitalize'
    },
  },
};
